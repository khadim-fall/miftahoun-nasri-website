import { SITE } from "@/config/site";
import type { MemberFormData, NewsletterFormData } from "./types";

/**
 * Envoi des formulaires vers un Google Sheet via un Google Apps Script (gratuit, sans service tiers).
 * Si SITE.formsEndpoint est vide, on ouvre la messagerie du visiteur (rien n’est faussement "envoyé").
 */
export type SubmitResult = "sent" | "duplicate" | "mailto";

let lastSent = 0;

/** Renvoie true si le script a signalé que ces informations existaient déjà (rien n’a été ajouté). */
async function postToScript(payload: Record<string, string>): Promise<boolean> {
  const now = Date.now();
  if (now - lastSent < 10_000) throw new Error("Veuillez patienter quelques secondes.");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15_000);
  try {
    const res = await fetch(SITE.formsEndpoint, {
      method: "POST",
      // text/plain évite la requête de pré-vérification CORS que Google Apps Script ne gère pas
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const json = (await res.json().catch(() => null)) as { ok?: boolean; duplicate?: boolean; error?: string } | null;
    if (!res.ok || !json?.ok) throw new Error(json?.error || `HTTP ${res.status}`);
    lastSent = Date.now();
    return json.duplicate === true;
  } finally {
    clearTimeout(timer);
  }
}

function openMailClient(subject: string, body: string) {
  window.location.href =
    `mailto:${SITE.emails[0]}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export async function subscribeToNewsletter({ name, email }: NewsletterFormData): Promise<SubmitResult> {
  if (!SITE.formsEndpoint) {
    openMailClient("Inscription à la newsletter", `Bonjour,\n\nJe souhaite recevoir la newsletter.\n\nNom : ${name}\nEmail : ${email}`);
    return "mailto";
  }
  const duplicate = await postToScript({ type: "newsletter", name, email });
  return duplicate ? "duplicate" : "sent";
}

export async function sendMemberForm(data: MemberFormData): Promise<SubmitResult> {
  if (!SITE.formsEndpoint) {
    openMailClient(
      `Nouveau membre : ${data.firstName} ${data.lastName}`,
      `Prénom : ${data.firstName}\nNom : ${data.lastName}\nLieu d’habitation : ${data.residence}\nTéléphone : ${data.phone}` +
        (data.comment ? `\n\nCommentaire :\n${data.comment}` : ""),
    );
    return "mailto";
  }
  const duplicate = await postToScript({ type: "member", ...data, comment: data.comment ?? "" });
  return duplicate ? "duplicate" : "sent";
}
