import { useState, type FormEvent } from "react";
import { useToast } from "@/hooks/use-toast";
import { subscribeToNewsletter } from "@/lib/forms";

const fieldClass =
  "w-full flex-1 rounded-md px-4 py-3 text-dark focus:outline-none focus:ring-2 focus:ring-gold";

const NewsletterSection = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // robot : on ignore silencieusement
    if (!name.trim() || !email.trim()) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }
    setSending(true);
    try {
      const result = await subscribeToNewsletter({ name: name.trim(), email: email.trim() });
      toast({
        title: result === "sent" ? "Inscription réussie" : "Presque terminé",
        description:
          result === "sent"
            ? "Merci ! Vous recevrez bientôt nos actualités."
            : "Votre application de messagerie s'ouvre : validez l'envoi du message pré-rempli.",
      });
      setName("");
      setEmail("");
    } catch (error) {
      console.error(error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="bg-primary py-16 text-white" aria-labelledby="newsletter-title">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="newsletter-title" className="mb-4 font-lora text-3xl font-bold md:text-4xl">
            Restez Informé
          </h2>
          <p className="mb-8">
            Abonnez-vous à notre newsletter pour recevoir des mises à jour sur nos événements et activités
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:flex-row" noValidate>
            <label className="flex-1">
              <span className="sr-only">Votre nom</span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Votre nom"
                className={fieldClass}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label className="flex-1">
              <span className="sr-only">Votre email</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Votre email"
                className={fieldClass}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            {/* Champ piège anti-robots : invisible pour les humains */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="rounded-md bg-gold px-6 py-3 font-bold text-dark transition-colors duration-300 hover:bg-gold-light disabled:opacity-60"
              disabled={sending}
            >
              {sending ? "En cours..." : "S'abonner"}
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-200">
            En vous abonnant, vous acceptez de recevoir nos communications par email. Vous pouvez vous
            désabonner à tout moment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
