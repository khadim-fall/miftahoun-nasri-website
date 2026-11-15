import type { ReactNode } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-primary text-white hover:bg-primary-light",
  gold: "bg-gold text-dark hover:bg-gold-light",
  white: "bg-white text-primary hover:bg-gray-100",
};

interface LinkButtonProps {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  arrow?: boolean;
  className?: string;
}

/** Lien de navigation interne présenté comme un bouton (un seul <a>, pas de liens imbriqués). */
const LinkButton = ({ href, children, variant = "primary", arrow = false, className }: LinkButtonProps) => (
  <Link
    href={href}
    className={cn(
      "inline-flex items-center justify-center rounded-md px-6 py-3 font-medium transition-colors duration-300",
      variants[variant],
      className,
    )}
  >
    <span>{children}</span>
    {arrow && <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />}
  </Link>
);

export default LinkButton;
