import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { NewsletterFormData } from "@/lib/types";

const NewsletterSection = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const newsletterMutation = useMutation({
    mutationFn: (data: NewsletterFormData) => {
      return apiRequest("POST", "/api/newsletter", data);
    },
    onSuccess: () => {
      toast({
        title: "Inscription réussie",
        description: "Vous êtes maintenant inscrit à notre newsletter.",
        variant: "default",
      });
      setName("");
      setEmail("");
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
        variant: "destructive",
      });
      console.error(error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      newsletterMutation.mutate({ name, email });
    } else {
      toast({
        title: "Erreur de validation",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-lora font-bold mb-4">Restez Informé</h2>
          <p className="mb-8">
            Abonnez-vous à notre newsletter pour recevoir des mises à jour sur nos événements et activités
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              placeholder="Votre nom" 
              className="flex-1 px-4 py-3 rounded-md text-dark focus:outline-none focus:ring-2 focus:ring-gold" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input 
              type="email" 
              placeholder="Votre email" 
              className="flex-1 px-4 py-3 rounded-md text-dark focus:outline-none focus:ring-2 focus:ring-gold" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button 
              type="submit" 
              className="bg-gold hover:bg-gold-light text-dark font-bold py-3 px-6 rounded-md transition-colors duration-300"
              disabled={newsletterMutation.isPending}
            >
              {newsletterMutation.isPending ? "En cours..." : "S'abonner"}
            </button>
          </form>
          
          <p className="text-sm mt-4 text-gray-300">
            En vous abonnant, vous acceptez de recevoir nos communications par email. 
            Vous pouvez vous désabonner à tout moment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
