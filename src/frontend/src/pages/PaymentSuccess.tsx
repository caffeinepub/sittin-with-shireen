import { Link } from '@tanstack/react-router';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function PaymentSuccess() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-24 h-24 text-green-500" />
        </div>
        <h1 className="text-5xl font-display font-black text-foreground mb-6">
          Payment Successful!
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Thank you for your purchase! Your order has been confirmed and will be processed shortly.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/store">
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" className="font-bold">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

