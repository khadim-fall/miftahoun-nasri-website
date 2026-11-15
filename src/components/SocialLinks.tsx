import { Facebook, Instagram, Twitter, Youtube, type LucideIcon } from "lucide-react";
import { SITE, type SocialNetwork } from "@/config/site";
import { cn } from "@/lib/utils";

const NETWORKS: { key: SocialNetwork; label: string; Icon: LucideIcon }[] = [
  { key: "facebook", label: "Facebook", Icon: Facebook },
  { key: "twitter", label: "Twitter", Icon: Twitter },
  { key: "instagram", label: "Instagram", Icon: Instagram },
  { key: "youtube", label: "YouTube", Icon: Youtube },
];

/** N'affiche que les réseaux dont le lien est renseigné dans src/config/site.ts. */
const SocialLinks = ({ className, linkClassName }: { className?: string; linkClassName: string }) => {
  const items = NETWORKS.filter((n) => SITE.social[n.key]);
  if (items.length === 0) return null;
  return (
    <ul className={cn("flex space-x-4", className)}>
      {items.map(({ key, label, Icon }) => (
        <li key={key}>
          <a
            href={SITE.social[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} (nouvelle fenêtre)`}
            className={linkClassName}
          >
            <Icon size={18} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;
