import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
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
import ContactSection from "@/components/home/ContactSection";

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

const Contact = () => {
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
      return apiRequest("POST", "/api/contact", data);
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

  useEffect(() => {
    document.title = "Contact - Dahira Miftahoun Nasri";

    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-lora font-bold mb-4">
            Contactez-Nous
          </h1>
          <p className="max-w-3xl mx-auto">
            Vous avez des questions ou souhaitez rejoindre notre dahira?
            N'hésitez pas à nous contacter
          </p>
        </div>
      </div>

      <ContactSection fullPage />

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-lora font-bold text-primary mb-4">
              Notre Emplacement
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Rendez-nous visite à la Dahira Miftahoun Nasri
            </p>
            <div className="w-20 h-1 bg-gold mx-auto mt-4"></div>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Carte (placeholder) */}
            <div className="h-96 bg-gray-200 mb-8 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 font-medium">Carte de localisation</p>
              {/* Dans une implémentation réelle, nous intégrerions ici une carte Google Maps ou similaire */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start">
                  <div className="bg-primary-light rounded-full p-3 text-white mr-4">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-primary mb-1">
                      Adresse
                    </h4>
                    <p className="text-gray-600">
                      Dahira Miftahoun Nasri, Quartier Notaire, Guediawaye,
                      Dakar, Sénégal
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
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
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start">
                  <div className="bg-primary-light rounded-full p-3 text-white mr-4">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-primary mb-1">
                      Email
                    </h4>
                    <p className="text-gray-600">sitedahira@gmail.com</p>
                    <p className="text-gray-600">sitedahira@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-lora font-semibold text-primary mb-6">
                  Envoyez-nous un message
                </h3>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Nom</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Votre nom complet"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Votre adresse email"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Sujet</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Sujet de votre message"
                              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">
                            Message
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Votre message..."
                              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                              rows={5}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="bg-primary hover:bg-primary-light text-white font-bold py-3 px-8 rounded-md transition-colors duration-300"
                      disabled={contactMutation.isPending}
                    >
                      {contactMutation.isPending
                        ? "Envoi en cours..."
                        : "Envoyer le message"}
                    </Button>
                  </form>
                </Form>
              </div>

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
                        Dahira Miftahoun Nasri, Quartier Notaire, Guediawaye,
                        Dakar, Sénégal
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
                      <p className="text-gray-600">sitedahira@gmail.com</p>
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
                      <p className="text-gray-600">- Vendredi: 20:00 - 00:00</p>
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
