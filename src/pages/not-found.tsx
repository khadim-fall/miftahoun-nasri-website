import { AlertCircle } from "lucide-react";
import LinkButton from "@/components/LinkButton";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function NotFound() {
  usePageMeta("Page introuvable");
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <AlertCircle className="mx-auto mb-4 h-12 w-12 text-primary" aria-hidden="true" />
      <h1 className="mb-3 font-lora text-3xl font-bold text-primary">Page introuvable</h1>
      <p className="mb-8 text-gray-600">La page que vous cherchez n'existe pas ou a été déplacée.</p>
      <LinkButton href="/">Retour à l'accueil</LinkButton>
    </div>
  );
}
