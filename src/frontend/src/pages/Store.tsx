import { useGetProducts } from '../hooks/useQueries';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import ShoppingCart from '../components/ShoppingCart';
import { Loader2, ShoppingBag } from 'lucide-react';

export default function Store() {
  const { data: products, isLoading } = useGetProducts();
  const { items } = useCart();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-secondary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-8 h-8 text-secondary" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Official Merchandise
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Show your support with exclusive Sittin with Shireen merch
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {!products || products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">No products available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <ShoppingCart />
          </div>
        </div>
      </div>
    </div>
  );
}
