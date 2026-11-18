import type { MouseEventHandler, ReactNode } from "react";
import { Link, useLocation } from "wouter";

/**
 * Lien « Rejoindre » : sur l'accueil il fait défiler jusqu'au formulaire déjà présent sur la page,
 * ailleurs il ouvre la page Contact qui contient le même formulaire.
 */
const JoinLink = ({
  className,
  children,
  onClick,
  primaryFocus,
}: {
  className?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  /** Marque ce lien comme élément à mettre en avant au clavier quand une fenêtre s'ouvre. */
  primaryFocus?: boolean;
}) => {
  const marker = primaryFocus ? { "data-autofocus": true } : {};
  const [location] = useLocation();
  if (location === "/") {
    return (
      <a href="#rejoindre" className={className} onClick={onClick} {...marker}>
        {children}
      </a>
    );
  }
  return (
    <Link href="/contact" className={className} onClick={onClick} {...marker}>
      {children}
    </Link>
  );
};

export default JoinLink;
