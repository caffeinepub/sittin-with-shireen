import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Shield } from 'lucide-react';
import VideoUpload from '../components/admin/VideoUpload';
import ProductManager from '../components/admin/ProductManager';
import EpisodeManager from '../components/admin/EpisodeManager';
import StripeSetup from '../components/admin/StripeSetup';
import { useGetCallerUserRole } from '../hooks/useQueries';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

export default function Admin() {
  const { data: userRole, isLoading } = useGetCallerUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && userRole !== 'admin') {
      navigate({ to: '/' });
    }
  }, [userRole, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center">
        <p className="text-xl text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (userRole !== 'admin') {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <Shield className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-5xl font-display font-black text-foreground mb-4">
          Admin Dashboard
        </h1>
        <p className="text-xl text-muted-foreground">
          Manage your content and settings
        </p>
      </div>

      <Tabs defaultValue="videos" className="max-w-6xl mx-auto">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="podcast">Podcast</TabsTrigger>
          <TabsTrigger value="stripe">Stripe</TabsTrigger>
        </TabsList>

        <TabsContent value="videos">
          <VideoUpload />
        </TabsContent>

        <TabsContent value="products">
          <ProductManager />
        </TabsContent>

        <TabsContent value="podcast">
          <EpisodeManager />
        </TabsContent>

        <TabsContent value="stripe">
          <StripeSetup />
        </TabsContent>
      </Tabs>
    </div>
  );
}

