import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { MusicProvider } from './context/MusicContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from 'next-themes';
import Layout from './components/Layout';
import Home from './pages/Home';
import Videos from './pages/Videos';
import Store from './pages/Store';
import Podcast from './pages/Podcast';
import Admin from './pages/Admin';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailure from './pages/PaymentFailure';
import ProfileSetup from './components/ProfileSetup';
import BackgroundMusicPlayer from './components/BackgroundMusicPlayer';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Layout>
        <Outlet />
      </Layout>
      <ProfileSetup />
      <BackgroundMusicPlayer />
    </>
  )
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home
});

const videosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/videos',
  component: Videos
});

const storeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/store',
  component: Store
});

const podcastRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/podcast',
  component: Podcast
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: Admin
});

const paymentSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payment-success',
  component: PaymentSuccess
});

const paymentFailureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payment-failure',
  component: PaymentFailure
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  videosRoute,
  storeRoute,
  podcastRoute,
  adminRoute,
  paymentSuccessRoute,
  paymentFailureRoute
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <MusicProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </MusicProvider>
    </ThemeProvider>
  );
}

