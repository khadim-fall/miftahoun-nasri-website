import { Facebook, Twitter, Instagram } from "lucide-react";
import { Leader } from "@/lib/types";
import imageOussmane from "../../images/membre-3.jpg";
import imagekhadim from "../../images/khadim-fall.jpg";
import imageLeader from "../../images/page-title-bg.jpg";
const LeadershipSection = () => {
  const leaders: Leader[] = [
    {
      id: 1,
      name: "Dieuwrine Serigne Ousmane Fall",
      role: "Président de la Dahira",
      description:
        "Coordonne toutes les activités et représente notre congrégation dans la communauté.",
      image: imageOussmane,
      socialLinks: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
      },
    },
    {
      id: 2,
      name: "Serigne Khadim Fall",
      role: "Président Culturel",
      description:
        "Organise et donne les cours de Coran, Xassida et Xam Xam tous les Dimanches.",
      image: imagekhadim,
      socialLinks: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
      },
    },
    {
      id: 3,
      name: "Sokhna Rouba Sow",
      role: "Dieuwrigne sokhna yi",
      description:
        "Organise les rencontres pour développer la connaissance religieuse.",
      image: imageLeader,
      socialLinks: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
      },
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-lora font-bold text-primary mb-4">
            Nos Responsables
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Découvrez les membres dévoués qui guident notre communauté avec
            sagesse et compassion
          </p>
          <div className="w-20 h-1 bg-gold mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {leaders.map((leader) => (
            <div
              key={leader.id}
              className="bg-gray-50 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
            >
              <div className="h-64 bg-gray-200 relative">
                {/* Ici, nous remplacerions cela par une vraie image */}
                <div className="h-64 bg-gray-200 relative" style={{ maxWidth: '100%', overflow: 'hidden' }}>
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                    style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                  />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-lora font-bold text-primary mb-2">
                  {leader.name}
                </h3>
                <p className="text-gold font-medium mb-3">{leader.role}</p>
                <p className="text-gray-600 mb-4">{leader.description}</p>
                <div className="flex space-x-3">
                  {leader.socialLinks?.facebook && (
                    <a
                      href={leader.socialLinks.facebook}
                      className="text-primary hover:text-gold transition"
                    >
                      <Facebook size={18} />
                    </a>
                  )}
                  {leader.socialLinks?.twitter && (
                    <a
                      href={leader.socialLinks.twitter}
                      className="text-primary hover:text-gold transition"
                    >
                      <Twitter size={18} />
                    </a>
                  )}
                  {leader.socialLinks?.instagram && (
                    <a
                      href={leader.socialLinks.instagram}
                      className="text-primary hover:text-gold transition"
                    >
                      <Instagram size={18} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
