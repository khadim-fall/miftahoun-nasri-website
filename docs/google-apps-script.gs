/**
 * Google Apps Script : reçoit les formulaires du site et les range dans le Google Sheet.
 *  - "Newsletter" : Date | Nom | Email          (abonnés, sans doublons)
 *  - "Membres"    : Date | Prénom | Nom | Lieu d'habitation | Téléphone | Commentaire (doublons refusés)
 *  - "Messages"   : ancien formulaire de contact (conservé pour compatibilité)
 * Chaque nouveau membre / message vous est aussi envoyé par e-mail.
 */
const NOTIFY_EMAIL = "sitedahira@gmail.com";
const MAX_PER_MINUTE = 30; // protection anti-abus : nombre maximum d'envois par minute, tous formulaires confondus

// Ouvrir l'adresse /exec dans un navigateur doit afficher {"ok":true} : le déploiement est actif.
function doGet() {
  return reply({ ok: true, service: "dahira-forms" });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    if (tooMany()) return reply({ ok: false, error: "Trop de demandes, réessayez dans une minute" });

    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (data.type === "newsletter") {
      const name = clean(data.name, 100);
      const email = clean(data.email, 150);
      if (!name || !isEmail(email)) return reply({ ok: false, error: "Données invalides" });
      const sheet = getSheet(ss, "Newsletter", ["Date", "Nom", "Email"]);
      const emails = sheet.getLastRow() > 1
        ? sheet.getRange(2, 3, sheet.getLastRow() - 1, 1).getValues().flat().map(function (x) { return String(x).toLowerCase(); })
        : [];
      if (emails.indexOf(email.toLowerCase()) !== -1) return reply({ ok: true, duplicate: true });
      sheet.appendRow([new Date(), name, email]);
      return reply({ ok: true });
    }

    if (data.type === "member") {
      const firstName = clean(data.firstName, 80);
      const lastName = clean(data.lastName, 80);
      const residence = clean(data.residence, 150);
      const phone = String(data.phone == null ? "" : data.phone).trim().slice(0, 25);
      const comment = clean(data.comment, 1000);
      if (!firstName || !lastName || !residence || !/^\+?[0-9 ().-]{8,25}$/.test(phone)) {
        return reply({ ok: false, error: "Données invalides" });
      }
      const sheet = getSheet(ss, "Membres", ["Date", "Prénom", "Nom", "Lieu d'habitation", "Téléphone", "Commentaire"]);
      // Doublon : même prénom + même nom + même téléphone (les accents, majuscules et "+221" sont ignorés)
      const key = memberKey(firstName, lastName, phone);
      const last = sheet.getLastRow();
      if (last > 1) {
        const existing = sheet.getRange(2, 2, last - 1, 4).getValues(); // colonnes B à E
        for (let i = 0; i < existing.length; i++) {
          if (memberKey(existing[i][0], existing[i][1], existing[i][3]) === key) return reply({ ok: true, duplicate: true });
        }
      }
      const row = last + 1;
      sheet.getRange(row, 5).setNumberFormat("@"); // le téléphone reste du texte (garde le "+")
      sheet.getRange(row, 1, 1, 6).setValues([[new Date(), firstName, lastName, residence, phone, comment]]);
      notify("[Site] Nouveau membre : " + firstName + " " + lastName,
        "Prénom : " + firstName + "\nNom : " + lastName + "\nLieu d'habitation : " + residence +
        "\nTéléphone : " + phone + (comment ? "\n\nCommentaire :\n" + comment : ""));
      return reply({ ok: true });
    }

    // Ancien formulaire de contact (nom / e-mail / sujet / message)
    if (data.type === "contact") {
      const name = clean(data.name, 100);
      const email = clean(data.email, 150);
      const subject = clean(data.subject, 200);
      const message = clean(data.message, 5000);
      if (!name || !isEmail(email) || !subject || !message) return reply({ ok: false, error: "Données invalides" });
      getSheet(ss, "Messages", ["Date", "Nom", "Email", "Sujet", "Message"])
        .appendRow([new Date(), name, email, subject, message]);
      notify("[Site] " + subject, "De : " + name + " (" + email + ")\n\n" + message, email);
      return reply({ ok: true });
    }

    return reply({ ok: false, error: "Type inconnu" });
  } catch (err) {
    console.error(err); // visible dans Apps Script > Exécutions
    return reply({ ok: false, error: "Erreur serveur" });
  } finally {
    lock.releaseLock();
  }
}

// Clé de comparaison d'un membre : prénom + nom sans accents ni majuscules + 9 derniers chiffres du téléphone
function memberKey(firstName, lastName, phone) {
  return [normalizeName(firstName), normalizeName(lastName), String(phone).replace(/\D/g, "").slice(-9)].join("|");
}

function normalizeName(s) {
  return String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function isEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

// Un échec d'envoi d'e-mail (quota...) ne doit jamais faire perdre l'enregistrement déjà fait dans le Sheet
function notify(subject, body, replyTo) {
  try {
    const options = { to: NOTIFY_EMAIL, subject: subject, body: body };
    if (replyTo) options.replyTo = replyTo;
    MailApp.sendEmail(options);
  } catch (err) {
    console.error(err);
  }
}

function tooMany() {
  const cache = CacheService.getScriptCache();
  const key = "rate:" + Math.floor(Date.now() / 60000);
  const n = Number(cache.get(key) || 0) + 1;
  cache.put(key, String(n), 120);
  return n > MAX_PER_MINUTE;
}

function getSheet(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) { sheet = ss.insertSheet(name); sheet.appendRow(headers); sheet.setFrozenRows(1); }
  return sheet;
}

// Coupe la longueur et neutralise les formules (=, +, -, @) pour qu'une cellule ne soit jamais exécutée
function clean(v, max) {
  let s = String(v == null ? "" : v).trim().slice(0, max);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
