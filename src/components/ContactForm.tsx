import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { sendContactMessage } from "@/lib/forms";

const schema = z.object({
  name: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().trim().email("Veuillez entrer une adresse email valide"),
  subject: z.string().trim().min(5, "Le sujet doit contenir au moins 5 caractères"),
  message: z.string().trim().min(10, "Le message doit contenir au moins 10 caractères"),
  website: z.string().max(0).optional(), // champ piège anti-robots
});
type FormValues = z.infer<typeof schema>;

const Field = ({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) => (
  <div>
    <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-700">
      {label}
    </label>
    {children}
    {error && (
      <p id={`${id}-error`} role="alert" className="mt-1 text-sm text-red-600">
        {error}
      </p>
    )}
  </div>
);

const ContactForm = () => {
  const { toast } = useToast();
  const [sending, setSending] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    if (values.website) return; // robot
    setSending(true);
    try {
      const result = await sendContactMessage({
        name: values.name,
        email: values.email,
        subject: values.subject,
        message: values.message,
      });
      toast({
        title: result === "sent" ? "Message envoyé" : "Presque terminé",
        description:
          result === "sent"
            ? "Nous vous répondrons dans les plus brefs délais."
            : "Votre application de messagerie s'ouvre : validez l'envoi du message pré-rempli.",
      });
      reset();
    } catch (error) {
      console.error(error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const describe = (id: string, hasError: boolean) => (hasError ? `${id}-error` : undefined);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field id="contact-name" label="Nom" error={errors.name?.message}>
          <Input
            id="contact-name"
            autoComplete="name"
            placeholder="Votre nom complet"
            aria-invalid={!!errors.name}
            aria-describedby={describe("contact-name", !!errors.name)}
            {...register("name")}
          />
        </Field>
        <Field id="contact-email" label="Email" error={errors.email?.message}>
          <Input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder="Votre adresse email"
            aria-invalid={!!errors.email}
            aria-describedby={describe("contact-email", !!errors.email)}
            {...register("email")}
          />
        </Field>
      </div>

      <Field id="contact-subject" label="Sujet" error={errors.subject?.message}>
        <Input
          id="contact-subject"
          placeholder="Sujet de votre message"
          aria-invalid={!!errors.subject}
          aria-describedby={describe("contact-subject", !!errors.subject)}
          {...register("subject")}
        />
      </Field>

      <Field id="contact-message" label="Message" error={errors.message?.message}>
        <Textarea
          id="contact-message"
          rows={5}
          placeholder="Votre message..."
          aria-invalid={!!errors.message}
          aria-describedby={describe("contact-message", !!errors.message)}
          {...register("message")}
        />
      </Field>

      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <Button type="submit" size="lg" disabled={sending} className="bg-primary px-8 font-bold text-white hover:bg-primary-light">
        {sending ? "Envoi en cours..." : "Envoyer le message"}
      </Button>
    </form>
  );
};

export default ContactForm;
