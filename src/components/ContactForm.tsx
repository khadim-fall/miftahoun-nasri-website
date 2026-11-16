import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { sendMemberForm } from "@/lib/forms";

// Numéros sénégalais ou étrangers : chiffres, espaces, +, -, ( ) ; entre 8 et 15 chiffres
const phoneOk = (v: string) => /^\+?[0-9 ().-]+$/.test(v) && v.replace(/\D/g, "").length >= 8 && v.replace(/\D/g, "").length <= 15;

const schema = z.object({
  firstName: z.string().trim().min(2, "Veuillez entrer votre prénom"),
  lastName: z.string().trim().min(2, "Veuillez entrer votre nom"),
  residence: z.string().trim().min(2, "Veuillez indiquer votre lieu d'habitation"),
  phone: z
    .string()
    .trim()
    .refine(phoneOk, "Numéro invalide (ex. +221 77 000 00 00)"),
  comment: z.string().trim().max(1000, "1000 caractères maximum").optional(),
});
type FormValues = z.infer<typeof schema>;

const Field = ({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) => (
  <div>
    <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-700">
      {label}
    </label>
    {children}
    {hint && !error && <p className="mt-1 text-xs text-gray-600">{hint}</p>}
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
    setSending(true);
    try {
      const result = await sendMemberForm(values);
      toast({
        title: result === "sent" ? "Informations enregistrées" : "Presque terminé",
        description:
          result === "sent"
            ? "Merci ! La dahira a bien reçu vos informations."
            : "Votre application de messagerie s'ouvre : validez l'envoi du message pré-rempli.",
      });
      reset();
    } catch (error) {
      console.error(error);
      toast({
        title: "Erreur",
        description: `L'envoi a échoué${error instanceof Error ? ` (${error.message})` : ""}. Veuillez réessayer.`,
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
        <Field id="member-firstname" label="Prénom" error={errors.firstName?.message}>
          <Input
            id="member-firstname"
            autoComplete="given-name"
            aria-invalid={!!errors.firstName}
            aria-describedby={describe("member-firstname", !!errors.firstName)}
            {...register("firstName")}
          />
        </Field>
        <Field id="member-lastname" label="Nom" error={errors.lastName?.message}>
          <Input
            id="member-lastname"
            autoComplete="family-name"
            aria-invalid={!!errors.lastName}
            aria-describedby={describe("member-lastname", !!errors.lastName)}
            {...register("lastName")}
          />
        </Field>
      </div>

      <Field
        id="member-residence"
        label="Lieu d'habitation"
        hint="Quartier et ville, par exemple : Notaire, Guediawaye"
        error={errors.residence?.message}
      >
        <Input
          id="member-residence"
          autoComplete="address-level2"
          aria-invalid={!!errors.residence}
          aria-describedby={describe("member-residence", !!errors.residence)}
          {...register("residence")}
        />
      </Field>

      <Field id="member-phone" label="Numéro de téléphone" error={errors.phone?.message}>
        <Input
          id="member-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+221 77 000 00 00"
          aria-invalid={!!errors.phone}
          aria-describedby={describe("member-phone", !!errors.phone)}
          {...register("phone")}
        />
      </Field>

      <Field id="member-comment" label="Commentaire (facultatif)" error={errors.comment?.message}>
        <Textarea
          id="member-comment"
          rows={4}
          aria-invalid={!!errors.comment}
          aria-describedby={describe("member-comment", !!errors.comment)}
          {...register("comment")}
        />
      </Field>

      <p className="text-xs text-gray-600">
        Ces informations sont utilisées uniquement par la dahira pour contacter ses membres. En envoyant ce
        formulaire, vous acceptez qu'elles soient conservées à cet effet.
      </p>

      <Button
        type="submit"
        size="lg"
        disabled={sending}
        className="bg-primary px-8 font-bold text-white hover:bg-primary-light"
      >
        {sending ? "Envoi en cours..." : "Envoyer"}
      </Button>
    </form>
  );
};

export default ContactForm;
