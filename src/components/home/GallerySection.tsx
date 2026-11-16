import LinkButton from "@/components/LinkButton";
import SectionHeading from "@/components/SectionHeading";
import { galleryImages } from "@/data/content";

const GallerySection = () => (
  <section id="galerie" className="bg-gray-50 py-16 md:py-24">
    <div className="container mx-auto px-4 md:px-6">
      <SectionHeading
        title="Galerie photos"
        description="Découvrez les moments forts des événements passés de notre dahira"
      />

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {galleryImages.slice(0, 8).map((image) => (
          <li key={image.id} className="group relative h-64 overflow-hidden rounded-lg shadow-md">
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="px-2 text-center font-medium text-white">{image.alt}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-10 text-center">
        <LinkButton href="/galerie" arrow>
          Voir toutes les photos
        </LinkButton>
      </div>
    </div>
  </section>
);

export default GallerySection;
