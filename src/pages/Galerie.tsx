import { useEffect, useState } from "react";
const imageDahira = "../../images/page-title-bg.jpg";
const video1 = "../../public/videos/video-1.mp4";
const video2 = "../../public/videos/video-2.mp4";
const video3 = "../../public/videos/video-3.mp4";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

const Galerie = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const imagesPerPage = 8;

  const videos = [
    {
      src: video1,
      title: "Célébration du Grand Magal",
      desc: "Moments forts de notre dernière célébration du Grand Magal.",
      monthsAgo: 1,
    },
    {
      src: video2,
      title: "Conférence sur les enseignements",
      desc: "Conférence sur les enseignements de Cheikh Ahmadou Bamba.",
      monthsAgo: 2,
    },
    {
      src: video3,
      title: "Récitation de poèmes religieux",
      desc: "Séance de récitation des khassidas (poèmes).",
      monthsAgo: 3,
    },
  ];

  useEffect(() => {
    document.title = "Galerie - Dahira Miftahoun Nasri";
    window.scrollTo(0, 0);
  }, []);

  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: imageDahira,
      alt: "Célébration religieuse",
      category: "Événements",
    },
    {
      id: 2,
      src: imageDahira,
      alt: "Séance d'enseignement",
      category: "Éducation",
    },
    {
      id: 3,
      src: imageDahira,
      alt: "Distribution de nourriture",
      category: "Charité",
    },
    {
      id: 4,
      src: imageDahira,
      alt: "Lecture du Coran",
      category: "Spiritualité",
    },
    {
      id: 5,
      src: imageDahira,
      alt: "Rassemblement communautaire",
      category: "Communauté",
    },
    {
      id: 6,
      src: imageDahira,
      alt: "Cours pour enfants",
      category: "Éducation",
    },
    {
      id: 7,
      src: imageDahira,
      alt: "Cérémonie spirituelle",
      category: "Événements",
    },
    { id: 8, src: imageDahira, alt: "Conférence", category: "Événements" },
    {
      id: 9,
      src: imageDahira,
      alt: "Prière collective",
      category: "Spiritualité",
    },
    {
      id: 10,
      src: imageDahira,
      alt: "Étude religieuse",
      category: "Éducation",
    },
    {
      id: 11,
      src: imageDahira,
      alt: "Activité caritative",
      category: "Charité",
    },
    {
      id: 12,
      src: imageDahira,
      alt: "Rassemblement religieux",
      category: "Communauté",
    },
    {
      id: 13,
      src: imageDahira,
      alt: "Activité sociale",
      category: "Communauté",
    },
    {
      id: 14,
      src: imageDahira,
      alt: "Rencontre spirituelle",
      category: "Spiritualité",
    },
    {
      id: 15,
      src: imageDahira,
      alt: "Atelier éducatif",
      category: "Éducation",
    },
    {
      id: 16,
      src: imageDahira,
      alt: "Soutien aux démunis",
      category: "Charité",
    },
  ];

  const categories = [
    "Tous",
    "Événements",
    "Éducation",
    "Charité",
    "Spiritualité",
    "Communauté",
  ];

  const filteredImages =
    selectedCategory === "Tous"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const totalPages = Math.ceil(filteredImages.length / imagesPerPage);
  const currentImages = filteredImages.slice(
    (currentPage - 1) * imagesPerPage,
    currentPage * imagesPerPage
  );

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      {/* En-tête */}
      <div className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-lora font-bold mb-4">
            Galerie Photos
          </h1>
          <p className="max-w-3xl mx-auto">
            Découvrez les moments forts de la Dahira Miftahoun Nasri
          </p>
        </div>
      </div>

      {/* Filtres & Galerie */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Filtres */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-5 py-2 rounded-full border text-sm ${
                  selectedCategory === category
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-primary hover:text-white"
                } transition-colors duration-300`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Galerie */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentImages.map((image) => (
              <div
                key={image.id}
                className="group overflow-hidden rounded-lg shadow-md relative"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="text-white text-center">
                    <p className="text-sm">{image.category}</p>
                    <h3 className="text-lg font-semibold">{image.alt}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-10 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-10 h-10 border rounded-md flex items-center justify-center text-gray-700 hover:bg-primary hover:text-white disabled:opacity-50"
            >
              &lt;
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`w-10 h-10 border rounded-md flex items-center justify-center ${
                  currentPage === index + 1
                    ? "bg-primary text-white"
                    : "bg-white text-gray-700 hover:bg-primary hover:text-white"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-10 h-10 border rounded-md flex items-center justify-center text-gray-700 hover:bg-primary hover:text-white disabled:opacity-50"
            >
              &gt;
            </button>
          </div>
        </div>
      </section>

      {/* Section Vidéos */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-lora font-bold text-primary mb-4">
              Nos Vidéos
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Revivez nos événements à travers ces vidéos
            </p>
            <div className="w-20 h-1 bg-gold mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg shadow-md overflow-hidden"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 relative">
                  <video controls className="w-full h-full object-cover">
                    <source src={video.src} type="video/mp4" />
                    Votre navigateur ne supporte pas la lecture de vidéos.
                  </video>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {video.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{video.desc}</p>
                  <p className="text-gray-500 text-sm">{`Il y a ${video.monthsAgo} mois`}</p>
                </div>
              </div>
            ))}
          </div>

          {/* <div className="text-center mt-10">
            <button className="bg-primary hover:bg-primary-light text-white py-3 px-6 rounded-md">
              Voir toutes les vidéos
            </button>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default Galerie;
