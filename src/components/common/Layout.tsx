import { ReactNode } from 'react';
import { Navigation } from './Navigation';
import { BetaBanner } from './BetaBanner';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <BetaBanner />
      <main className="pt-14 pb-20">
        {children}
      </main>
      <Navigation />
    </div>
  );
}