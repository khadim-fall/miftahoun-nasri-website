import { SITE } from "@/config/site";
import JoinLink from "@/components/JoinLink";
import LinkButton from "@/components/LinkButton";

const HeroSection = () => (
  <section id="accueil" className="relative h-[600px] bg-primary text-white">
    <img
      src="/images/page-title-bg.jpg"
      alt=""
      className="absolute inset-0 h-full w-full object-cover"
      decoding="async"
    />
    <div className="absolute inset-0 bg-black/50" aria-hidden="true"></div>

    <div className="relative z-10 flex h-full items-center justify-center">
      <div className="px-4 text-center md:px-0">
        <h1 className="mb-4 font-lora text-4xl font-bold md:text-6xl">{SITE.name}</h1>
        <p className="mx-auto mb-8 max-w-3xl text-xl md:text-2xl">{SITE.tagline}</p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <JoinLink className="inline-flex items-center justify-center rounded-md bg-gold px-8 py-3 text-lg font-bold text-dark transition-colors duration-300 hover:bg-gold-light">
            Rejoindre la dahira
          </JoinLink>
          <LinkButton href="/a-propos" variant="white" className="px-8 text-lg font-bold">
            Découvrir
          </LinkButton>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
