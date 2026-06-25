import { CSSProperties, ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';

interface LayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
}

export function Layout({ children, hideFooter = false }: LayoutProps) {
  return (
    <SidebarProvider
      defaultOpen={true}
      style={{ "--sidebar-width-icon": "4rem" } as CSSProperties}
    >
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          {!hideFooter && <Footer />}
        </div>
      </div>
    </SidebarProvider>
  );
}
