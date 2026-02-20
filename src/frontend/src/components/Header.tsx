import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

export default function Header() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const disabled = loginStatus === 'logging-in';
  const text = loginStatus === 'logging-in' ? 'Logging in...' : isAuthenticated ? 'Logout' : 'Login';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <header className="bg-white border-b border-border py-4 px-4 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src="/assets/SwS Green Vector v1.png" 
            alt="Sittin with Shireen" 
            className="h-12 md:h-14 w-auto"
          />
        </div>
        <button
          onClick={handleAuth}
          disabled={disabled}
          className={`px-5 py-2 rounded-md transition-all font-semibold text-sm uppercase tracking-wide shadow-sm hover:shadow ${
            isAuthenticated
              ? 'bg-muted text-foreground hover:bg-muted/80'
              : 'bg-primary text-primary-foreground hover:bg-primary/90'
          } disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
        >
          {disabled && <Loader2 className="w-4 h-4 animate-spin" />}
          {text}
        </button>
      </div>
    </header>
  );
}
