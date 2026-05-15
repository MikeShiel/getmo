import { Layout } from '@/components/layout/Layout';
import { MyProgress as MyProgressContent } from '@/components/rewards/MyProgress';

export default function MyProgressPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto" style={{ maxWidth: 1100 }}>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">My Progress</h1>
          <MyProgressContent />
        </div>
      </div>
    </Layout>
  );
}
