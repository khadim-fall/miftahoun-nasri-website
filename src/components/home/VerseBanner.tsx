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

// Une série de 3 images est plus large que n'importe quel écran ; la piste en contient 2 (boucle sans coupure)
const COPIES_PER_SET = 3;
const imageClass = "h-20 w-auto max-w-none shrink-0 select-none sm:h-24 md:h-28";

/**
 * Bande défilante de gauche à droite : le vers en calligraphie, puis sa traduction.
 * Accessibilité : bouton pause, pause au survol, animation désactivée si le visiteur le demande
 * (réglage « réduire les animations » du système).
 */
const VerseBanner = () => {
  const [paused, setPaused] = useState(false);

  return (
    <section aria-labelledby="verse-title" className="border-y-2 border-gold bg-paper">
      <h2 id="verse-title" className="sr-only">
        Un vers à méditer
      </h2>

      <figure>
        <div className="relative overflow-hidden">
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
            className="absolute right-3 top-3 rounded-full bg-white/80 p-2 text-dark shadow transition-colors hover:bg-white motion-reduce:hidden"
          >
            {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
          </button>
        </div>

        <figcaption className="container mx-auto px-4 pb-6 pt-4 text-center md:px-6">
          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-700">Traduction</p>
          <p className="mx-auto max-w-3xl font-lora text-lg font-semibold italic text-dark md:text-2xl">
            «&nbsp;{VERSE.translation}&nbsp;»
          </p>
        </figcaption>
      </figure>
    </section>
  );
};

export default VerseBanner;
