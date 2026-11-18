import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const VERSE = {
  src: "/images/verset.webp",
  width: 1560,
  height: 192,
  alt: "Vers en calligraphie arabe",
  translation: "Ô vous, génération des jeunes\u00a0! Si vous craignez l’ignorance, faites précéder l’action de la science.",
};

// Une série de 4 images est plus large que n'importe quel écran ; la piste en contient 2 (boucle sans coupure)
const COPIES_PER_SET = 4;
const imageClass = "h-16 w-auto max-w-none shrink-0 select-none sm:h-20 md:h-24";

/**
 * Ruban défilant de gauche à droite dans la bannière : le vers en calligraphie, puis sa traduction.
 * Accessibilité : bouton pause, pause au survol, animation désactivée si le visiteur le demande
 * (réglage « réduire les animations » du système).
 */
const VerseBanner = () => {
  const [paused, setPaused] = useState(false);

  return (
    <figure className="w-full">
      <h2 className="sr-only">Un vers à méditer</h2>

      <div className="relative overflow-hidden border-y-2 border-gold bg-paper shadow-lg">
        <div
          data-testid="verse-track"
          className={cn(
            "flex w-max animate-marquee-right motion-reduce:animate-none",
            "hover:[animation-play-state:paused]", // survol de l’image seulement (pas du bouton)
            paused && "[animation-play-state:paused]",
          )}
        >
          {[0, 1].flatMap((set) =>
            Array.from({ length: COPIES_PER_SET }, (_, i) => {
              const first = set === 0 && i === 0;
              return (
                <img
                  key={`${set}-${i}`}
                  src={VERSE.src}
                  width={VERSE.width}
                  height={VERSE.height}
                  alt={first ? VERSE.alt : ""}
                  aria-hidden={first ? undefined : true}
                  draggable={false}
                  decoding="async"
                  className={imageClass}
                />
              );
            }),
          )}
        </div>

        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={paused ? "Reprendre le défilement" : "Mettre en pause le défilement"}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-dark shadow transition-colors hover:bg-white motion-reduce:hidden"
        >
          {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
        </button>
      </div>

      <figcaption className="container mx-auto px-4 pt-4 text-center md:px-6">
        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gold-light">Traduction</p>
        <p className="mx-auto max-w-3xl font-lora text-lg font-semibold italic text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.75)] md:text-2xl">
          «&nbsp;{VERSE.translation}&nbsp;»
        </p>
      </figcaption>
    </figure>
  );
};

export default VerseBanner;
