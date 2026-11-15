/**
 * Google Apps Script : reçoit les formulaires du site et les range dans un Google Sheet.
 *  - Onglet "Newsletter" : Date | Nom | Email   (la liste de vos abonnés, sans doublons)
 *  - Onglet "Messages"   : Date | Nom | Email | Sujet | Message
 * Les messages de contact vous sont aussi envoyés par e-mail.
 */
const NOTIFY_EMAIL = "sitedahira@gmail.com"; // où recevoir les messages de contact

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    const name = clean(data.name, 100);
    const email = clean(data.email, 150);
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reply({ ok: false, error: "Données invalides" });

    if (data.type === "newsletter") {
      const sheet = getSheet(ss, "Newsletter", ["Date", "Nom", "Email"]);
      const emails = sheet.getLastRow() > 1
        ? sheet.getRange(2, 3, sheet.getLastRow() - 1, 1).getValues().flat().map(String)
        : [];
      if (emails.map(function (x) { return x.toLowerCase(); }).indexOf(email.toLowerCase()) === -1) {
        sheet.appendRow([new Date(), name, email]);
      }
      return reply({ ok: true });
    }

    if (data.type === "contact") {
      const subject = clean(data.subject, 200);
      const message = clean(data.message, 5000);
      if (!subject || !message) return reply({ ok: false, error: "Données invalides" });
      getSheet(ss, "Messages", ["Date", "Nom", "Email", "Sujet", "Message"])
        .appendRow([new Date(), name, email, subject, message]);
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        replyTo: email,
        subject: "[Site] " + subject,
        body: "De : " + name + " (" + email + ")\n\n" + message,
      });
      return reply({ ok: true });
    }

    return reply({ ok: false, error: "Type inconnu" });
  } catch (err) {
    return reply({ ok: false, error: "Erreur serveur" });
  } finally {
    lock.releaseLock();
  }
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
