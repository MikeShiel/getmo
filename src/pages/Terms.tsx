import { Layout } from '@/components/layout/Layout';

export default function Terms() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-display font-bold mb-8 neon-text-cyan">
          Terms & Conditions
        </h1>

        <div className="glass-card p-8 prose prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">
            Last updated: January 2025
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground mb-4">
            By accessing and using Getmo, you accept and agree to be bound by the terms and 
            provision of this agreement. If you do not agree to abide by these terms, please 
            do not use this service.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground">2. Use License</h2>
          <p className="text-muted-foreground mb-4">
            Permission is granted to temporarily access the games and materials on Getmo 
            for personal, non-commercial transitory viewing only. This is the grant of a 
            license, not a transfer of title.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground">3. User Accounts</h2>
          <p className="text-muted-foreground mb-4">
            When you create an account with us, you must provide accurate, complete, and 
            current information at all times. Failure to do so constitutes a breach of the 
            Terms, which may result in immediate termination of your account.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground">4. Premium Subscriptions</h2>
          <p className="text-muted-foreground mb-4">
            Some parts of the Service are billed on a subscription basis. You will be billed 
            in advance on a recurring and periodic basis. Billing cycles are set on a monthly basis.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground">5. Content</h2>
          <p className="text-muted-foreground mb-4">
            Our Service allows you to play games provided by third-party publishers. You are 
            responsible for ensuring that your use of the games complies with all applicable 
            laws and regulations.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground">6. Prohibited Activities</h2>
          <p className="text-muted-foreground mb-4">
            You may not use the Service for any illegal or unauthorized purpose. You must not, 
            in the use of the Service, violate any laws in your jurisdiction.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground">7. Termination</h2>
          <p className="text-muted-foreground mb-4">
            We may terminate or suspend your account immediately, without prior notice or 
            liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground">8. Contact Us</h2>
          <p className="text-muted-foreground mb-4">
            If you have any questions about these Terms, please contact us through our 
            contact form.
          </p>
        </div>
      </div>
    </Layout>
  );
}
