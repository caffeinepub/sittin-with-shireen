import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '../context/CartContext';
import type { Product } from '../backend';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const imageUrl = product.image.getDirectURL();
  const priceInDollars = Number(product.priceInCents) / 100;

  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all border border-border">
      <div className="aspect-square bg-muted">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-2">{product.name}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-foreground">
            ${priceInDollars.toFixed(2)}
          </span>
          <Button
            onClick={() => addItem(product)}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
