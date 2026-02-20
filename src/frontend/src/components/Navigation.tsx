import { Link, useRouterState } from '@tanstack/react-router';
import { Home, Video, ShoppingBag, Mic, Shield } from 'lucide-react';
import { useGetCallerUserRole } from '../hooks/useQueries';

export default function Navigation() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const { data: userRole } = useGetCallerUserRole();
  const isAdmin = userRole === 'admin';

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/videos', label: 'Videos', icon: Video },
    { path: '/store', label: 'Store', icon: ShoppingBag },
    { path: '/podcast', label: 'Podcast', icon: Mic }
  ];

  if (isAdmin) {
    navItems.push({ path: '/admin', label: 'Admin', icon: Shield });
  }

  return (
    <nav className="bg-white border-b border-border shadow-sm sticky top-0 z-40">
      <div className="container mx-auto">
        <ul className="flex items-center justify-center gap-1 py-2 px-4 flex-wrap">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-md font-semibold text-sm uppercase tracking-wide transition-all ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
