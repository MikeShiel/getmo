import { Layout } from '@/components/layout/Layout';
import { SocialTab } from '@/components/social/SocialTab';
import { Users } from 'lucide-react';

export default function Social() {
  return (
    <Layout hideFooter>
      <div className="min-h-[calc(100vh-4rem)] bg-background">
        {/* Page Header */}
        <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold font-display text-foreground">Social Hub</h1>
                <p className="text-sm text-muted-foreground">Connect with friends, join clans, and track achievements</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-6">
          <SocialTab />
        </div>
      </div>
    </Layout>
  );
}
