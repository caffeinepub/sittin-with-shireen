import { X, ShoppingCart as CartIcon, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useCart } from '../context/CartContext';
import { useCreateCheckoutSession } from '../hooks/useQueries';
import type { ShoppingItem } from '../backend';

export default function ShoppingCart() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCart();
  const createCheckoutSession = useCreateCheckoutSession();

  const handleCheckout = async () => {
    if (items.length === 0) return;

    const shoppingItems: ShoppingItem[] = items.map((item) => ({
      productName: item.product.name,
      productDescription: item.product.description,
      priceInCents: item.product.priceInCents,
      quantity: BigInt(item.quantity),
      currency: 'usd',
    }));

    try {
      const session = await createCheckoutSession.mutateAsync(shoppingItems);
      if (!session?.url) throw new Error('Stripe session missing url');
      window.location.href = session.url;
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to create checkout session. Please try again.');
    }
  };

  return (
    <Card className="shadow-lg border-border">
      <CardHeader className="border-b border-border">
        <CardTitle className="flex items-center gap-2 text-xl">
          <CartIcon className="w-5 h-5" />
          Shopping Cart
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {items.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3 pb-4 border-b border-border last:border-0">
                  <img
                    src={item.product.image.getDirectURL()}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-foreground truncate">{item.product.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      ${(Number(item.product.priceInCents) / 100).toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        className="w-6 h-6 rounded border border-border hover:bg-muted flex items-center justify-center text-sm font-semibold"
                      >
                        -
                      </button>
                      <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 rounded border border-border hover:bg-muted flex items-center justify-center text-sm font-semibold"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="ml-auto text-muted-foreground hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 mb-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-lg">Total:</span>
                <span className="font-bold text-2xl text-foreground">${getTotalPrice().toFixed(2)}</span>
              </div>
              <Button
                onClick={handleCheckout}
                disabled={createCheckoutSession.isPending}
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
              >
                {createCheckoutSession.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Checkout'
                )}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
