import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { apiRequest } from '@/lib/queryClient';
import { Inbox, RefreshCw, ChevronLeft } from 'lucide-react';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

const Admin = () => {
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  // Requête pour charger les messages de contact
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['/api/admin/contact-messages'],
    queryFn: async () => {
      const response = await apiRequest<{
        success: boolean;
        data: ContactMessage[];
      }>('GET', '/api/admin/contact-messages');
      return response.data;
    }
  });

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd MMMM yyyy à HH:mm', { locale: fr });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="py-8 px-4 container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-lora font-bold text-primary">Administration</h1>
          <p className="text-gray-600 mt-1">Gérez les messages et les contenus du site</p>
        </div>
        <Link href="/">
          <Button variant="ghost" className="flex items-center">
            <ChevronLeft className="mr-2 h-4 w-4" /> Retour au site
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Section de navigation */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Menu</CardTitle>
            <CardDescription>Accédez aux différentes sections</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="border-b border-gray-100 p-4 bg-primary-light/10">
              <div className="flex items-center">
                <Inbox className="h-5 w-5 mr-2 text-primary" />
                <span className="font-medium text-primary">Messages de contact</span>
              </div>
            </div>
            {/* Autres sections peuvent être ajoutées ici */}
          </CardContent>
        </Card>

        {/* Liste des messages */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex-row justify-between items-center">
              <div>
                <CardTitle>Messages de contact</CardTitle>
                <CardDescription>Liste des messages reçus via le formulaire de contact</CardDescription>
              </div>
              <Button variant="outline" onClick={() => refetch()} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Actualiser
              </Button>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <RefreshCw className="h-8 w-8 animate-spin mx-auto text-primary" />
                  <p className="mt-2 text-gray-600">Chargement des messages...</p>
                </div>
              ) : isError ? (
                <div className="text-center py-8 text-red-500">
                  <p>Erreur lors du chargement des messages</p>
                  <Button variant="outline" onClick={() => refetch()} className="mt-2">
                    Réessayer
                  </Button>
                </div>
              ) : !data || data.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Inbox className="h-12 w-12 mx-auto mb-2 opacity-40" />
                  <p>Aucun message n'a été reçu pour le moment</p>
                </div>
              ) : selectedMessage ? (
                <div>
                  <Button variant="ghost" onClick={() => setSelectedMessage(null)} className="mb-4">
                    <ChevronLeft className="mr-2 h-4 w-4" /> Retour à la liste
                  </Button>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <h3 className="text-xl font-semibold text-primary">{selectedMessage.subject}</h3>
                      <Badge>{formatDate(selectedMessage.createdAt)}</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-500">De:</p>
                        <p>{selectedMessage.name}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Email:</p>
                        <p>{selectedMessage.email}</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-gray-100">
                      <p className="font-medium text-gray-500 mb-2">Message:</p>
                      <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap">
                        {selectedMessage.message}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Table>
                  <TableCaption>Liste des messages de contact</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Nom</TableHead>
                      <TableHead>Sujet</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((message) => (
                      <TableRow key={message.id}>
                        <TableCell className="font-medium">
                          {formatDate(message.createdAt)}
                        </TableCell>
                        <TableCell>{message.name}</TableCell>
                        <TableCell>{message.subject}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setSelectedMessage(message)}
                          >
                            Voir
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;