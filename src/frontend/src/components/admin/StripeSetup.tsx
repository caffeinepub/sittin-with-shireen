import { useState, useEffect } from 'react';
import { useIsStripeConfigured, useSetStripeConfiguration } from '../../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Loader2, CreditCard, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

export default function StripeSetup() {
  const { data: isConfigured, isLoading } = useIsStripeConfigured();
  const setConfig = useSetStripeConfiguration();
  const [secretKey, setSecretKey] = useState('');
  const [countries, setCountries] = useState('US,CA,GB');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!secretKey.trim()) return;

    try {
      const countryList = countries.split(',').map((c) => c.trim()).filter(Boolean);
      await setConfig.mutateAsync({
        secretKey: secretKey.trim(),
        allowedCountries: countryList
      });
      setSecretKey('');
    } catch (error) {
      console.error('Stripe configuration error:', error);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Stripe Configuration
        </CardTitle>
        <CardDescription>
          Configure Stripe to enable payment processing for your merchandise store
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isConfigured ? (
          <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              Stripe is configured and ready to process payments!
            </AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="secretKey">Stripe Secret Key</Label>
              <Input
                id="secretKey"
                type="password"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                placeholder="sk_test_..."
                disabled={setConfig.isPending}
              />
              <p className="text-xs text-muted-foreground">
                Get your secret key from the Stripe Dashboard
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="countries">Allowed Countries (comma-separated)</Label>
              <Input
                id="countries"
                value={countries}
                onChange={(e) => setCountries(e.target.value)}
                placeholder="US,CA,GB"
                disabled={setConfig.isPending}
              />
              <p className="text-xs text-muted-foreground">
                Use ISO 3166-1 alpha-2 country codes (e.g., US, CA, GB)
              </p>
            </div>

            <Button
              type="submit"
              disabled={!secretKey.trim() || setConfig.isPending}
              className="w-full bg-secondary hover:bg-secondary/90 font-bold"
            >
              {setConfig.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Configure Stripe
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}

