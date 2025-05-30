import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import { ContactFormData } from "@/lib/types";
import { Link } from "wouter";

interface ContactSectionProps {
  fullPage?: boolean;
}

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z
    .string()
    .email({ message: "Veuillez entrer une adresse email valide" }),
  subject: z
    .string()
    .min(5, { message: "Le sujet doit contenir au moins 5 caractères" }),
  message: z
    .string()
    .min(10, { message: "Le message doit contenir au moins 10 caractères" }),
});

const ContactSection = ({ fullPage = false }: ContactSectionProps) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: (data: ContactFormData) => {
      return new Promise((resolve) => setTimeout(resolve, 1000));
    },
    onSuccess: () => {
      toast({
        title: "Message envoyé",
        description: "Nous vous répondrons dans les plus brefs délais.",
        variant: "default",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description:
          "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.",
        variant: "destructive",
      });
      console.error(error);
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    contactMutation.mutate(data);
  };
  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {!fullPage && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-lora font-bold text-primary mb-4">
              Contactez-Nous
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Vous avez des questions ou souhaitez rejoindre notre dahira?
              N'hésitez pas à nous contacter
            </p>
            <div className="w-20 h-1 bg-gold mx-auto mt-4"></div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-lora font-semibold text-primary mb-6">
              Informations de Contact
            </h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary-light rounded-full p-3 text-white mr-4">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-lg text-primary mb-1">
                    Adresse
                  </h4>
                  <p className="text-gray-600">
                    Dahira Miftahoun Nasri, Quartier Notaire, Guediawaye, Dakar,
                    Sénégal
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary-light rounded-full p-3 text-white mr-4">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-lg text-primary mb-1">
                    Téléphone
                  </h4>
                  <p className="text-gray-600">+221 77 762 18 06</p>
                  <p className="text-gray-600">+221 33 800 00 00</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary-light rounded-full p-3 text-white mr-4">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-lg text-primary mb-1">
                    Email
                  </h4>
                  <p className="text-gray-600">sitedahira@gmail.com</p>
                  <p className="text-gray-600">fall.khadim2803@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary-light rounded-full p-3 text-white mr-4">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-lg text-primary mb-1">
                    Heures d'ouverture
                  </h4>
                  <p className="text-gray-600"> Vendredi: 20:30 - 00:00</p>
                  <p className="text-gray-600">
                    {" "}
                    Dimanche: 12:00 - 14:00 | 17:00 - 00:00
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-medium text-lg text-primary mb-3">
                  Suivez-nous
                </h4>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="bg-primary hover:bg-primary-light text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-300"
                  >
                    <Facebook size={18} />
                  </a>
                  <a
                    href="#"
                    className="bg-primary hover:bg-primary-light text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-300"
                  >
                    <Twitter size={18} />
                  </a>
                  <a
                    href="#"
                    className="bg-primary hover:bg-primary-light text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-300"
                  >
                    <Instagram size={18} />
                  </a>
                  <a
                    href="#"
                    className="bg-primary hover:bg-primary-light text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-300"
                  >
                    <Youtube size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Image à droite */}
          <div className="flex-1">
            <img
      src="images/page-title-bg.jpg"
      alt="Photo du siège de notre daara"
      className="w-full rounded-lg shadow-lg object-cover max-h-96"
    />
            <div className="mt-8 h-64 w-full rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!4v1748543030523!6m8!1m7!1s6CYDT6qZPwPFkz9dfcBT4A!2m2!1d14.7742005239495!2d-17.38952665254646!3f19.8893690421542!4f-0.7589820127834912!5f2.071032434232568"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {!fullPage && (
          <div className="text-center mt-10">
            <Link href="/contact">
              <a className="inline-flex items-center bg-primary hover:bg-primary-light text-white font-medium py-3 px-6 rounded-md transition-colors duration-300">
                <span>Voir toutes nos coordonnées</span>
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </a>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
