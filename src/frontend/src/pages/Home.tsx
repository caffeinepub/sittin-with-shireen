import { Link } from '@tanstack/react-router';
import { Video, ShoppingBag, Mic, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[500px] md:h-[600px] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: 'url(/assets/generated/hero-background.dim_1920x1080.png)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-4 tracking-tight">
            Sittin with Shireen
          </h1>
          <p className="text-xl md:text-2xl text-white/95 font-medium mb-8 max-w-2xl mx-auto">
            Real conversations. Inspiring stories. Unforgettable moments.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/videos">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 shadow-lg">
                <Video className="w-5 h-5 mr-2" />
                Watch Now
              </Button>
            </Link>
            <Link to="/store">
              <Button size="lg" variant="outline" className="bg-white/95 hover:bg-white text-foreground font-semibold px-8 shadow-lg border-0">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Shop Merch
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Welcome to the Show
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Hi, I'm Shireen! Welcome to my corner of the internet. I'm a talk show host passionate about bringing you 
              authentic conversations, inspiring stories, and unforgettable moments. Join me as we sit 
              down with amazing guests and explore topics that matter.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you're here for the videos, the podcast, or the exclusive merch, I'm so glad 
              you're here. Let's make every conversation count!
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Explore the Show
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Link
              to="/videos"
              className="group bg-card rounded-lg p-8 shadow-md hover:shadow-xl transition-all border border-border"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all">
                <Video className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Episodes</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Watch full episodes and highlights from Sittin with Shireen. New content added regularly!
              </p>
              <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                Watch Now <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </Link>

            <Link
              to="/store"
              className="group bg-card rounded-lg p-8 shadow-md hover:shadow-xl transition-all border border-border"
            >
              <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-all">
                <ShoppingBag className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Merchandise</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Shop official Sittin with Shireen merchandise. Show your support in style!
              </p>
              <div className="flex items-center text-secondary font-semibold text-sm group-hover:gap-2 transition-all">
                Shop Now <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </Link>

            <Link
              to="/podcast"
              className="group bg-card rounded-lg p-8 shadow-md hover:shadow-xl transition-all border border-border"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all">
                <Mic className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Podcast</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Listen to extended conversations and exclusive podcast content on the go.
              </p>
              <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                Listen Now <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
