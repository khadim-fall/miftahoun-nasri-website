import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import { galleryImages, videos, VIDEO_POSTER } from "@/data/content";
import { usePageMeta } from "@/hooks/usePageMeta";
import { formatLongDate } from "@/lib/events";
import { cn } from "@/lib/utils";

const IMAGES_PER_PAGE = 8;
const categories = ["Tous", ...Array.from(new Set(galleryImages.map((i) => i.category)))];

const Galerie = () => {
  usePageMeta("Galerie");
  const [category, setCategory] = useState("Tous");
  const [page, setPage] = useState(1);

  const filtered =
    category === "Tous" ? galleryImages : galleryImages.filter((i) => i.category === category);
  const totalPages = Math.max(1, Math.ceil(filtered.length / IMAGES_PER_PAGE));
  const current = filtered.slice((page - 1) * IMAGES_PER_PAGE, page * IMAGES_PER_PAGE);

  const pageBtn = "flex h-10 w-10 items-center justify-center rounded-md border";

  return (
    <>
      <PageHeader title="Galerie photos" description="Découvrez les moments forts de la Dahira Miftahoun Nasri" />

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-wrap justify-center gap-3" role="group" aria-label="Filtrer par catégorie">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => {
                  setCategory(c);
                  setPage(1);
                }}
                className={cn(
                  "rounded-full border px-5 py-2 text-sm transition-colors duration-300",
                  category === c
                    ? "border-primary bg-primary text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:bg-primary hover:text-white",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {current.map((image) => (
              <li key={image.id} className="group relative overflow-hidden rounded-lg shadow-md">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="px-2 text-center text-white">
                    <p className="text-sm">{image.category}</p>
                    <p className="text-lg font-semibold">{image.alt}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {totalPages > 1 && (
            <nav aria-label="Pagination de la galerie" className="mt-10 flex justify-center space-x-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                aria-label="Page précédente"
                className={cn(pageBtn, "text-gray-700 hover:bg-primary hover:text-white disabled:opacity-50")}
              >
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  aria-label={`Page ${n}`}
                  aria-current={page === n ? "page" : undefined}
                  className={cn(
                    pageBtn,
                    page === n ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-primary hover:text-white",
                  )}
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                aria-label="Page suivante"
                className={cn(pageBtn, "text-gray-700 hover:bg-primary hover:text-white disabled:opacity-50")}
              >
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </nav>
          )}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <SectionHeading title="Nos vidéos" description="Revivez nos événements à travers ces vidéos" />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <article key={video.title} className="overflow-hidden rounded-lg bg-gray-50 shadow-md">
                <video
                  controls
                  preload="none"
                  poster={VIDEO_POSTER}
                  className="aspect-video w-full bg-gray-200 object-cover"
                >
                  <source src={video.src} type="video/mp4" />
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-primary">{video.title}</h3>
                  <p className="mb-2 text-gray-600">{video.desc}</p>
                  {video.date && (
                    <p className="text-sm text-gray-600">
                      <time dateTime={video.date}>{formatLongDate(video.date)}</time>
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Galerie;
