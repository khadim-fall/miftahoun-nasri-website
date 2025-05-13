import { Link } from "wouter";
import { GalleryImage } from "@/lib/types";

import imageDahira from "../../images/page-title-bg.jpg";
const GallerySection = () => {
  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: imageDahira,
      alt: "Grande célébration religieuse"
    },
    {
      id: 2,
      src: imageDahira,
      alt: "Séance d'enseignement religieux"
    },
    {
      id: 3,
      src: imageDahira,
      alt: "Membres participant à une activité caritative"
    },
    {
      id: 4,
      src: imageDahira,
      alt: "Cérémonie religieuse importante"
    },
    {
      id: 5,
      src: imageDahira,
      alt: "Rassemblement religieux"
    },
    {
      id: 6,
      src: imageDahira,
      alt: "Membres participant à une prière collective"
    },
    {
      id: 7,
      src: imageDahira,
      alt: "Événement communautaire"
    },
    {
      id: 8,
      src: imageDahira,
      alt: "Conférence ou séminaire"
    }
  ];

  // Display only first 8 images
  const displayImages = galleryImages.slice(0, 8);

  return (
    <section id="galerie" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-lora font-bold text-primary mb-4">Galerie Photos</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Découvrez les moments forts des événements passés de notre dahira
          </p>
          <div className="w-20 h-1 bg-gold mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayImages.map((image) => (
            <div 
              key={image.id} 
              className="gallery-item overflow-hidden rounded-lg shadow-md cursor-pointer h-64 relative group"
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white font-medium">{image.alt}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link href="/galerie">
            <a className="inline-flex items-center bg-primary hover:bg-primary-light text-white font-medium py-3 px-6 rounded-md transition-colors duration-300">
              <span>Voir toutes les photos</span>
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
