import { Layout } from '@/components/layout/Layout';

export default function Privacy() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-display font-bold mb-8 neon-text-cyan">
          Privacy Policy
        </h1>

        <div className="glass-card p-8 prose prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">
            Last updated: January 2025
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground">1. Information We Collect</h2>
          <p className="text-muted-foreground mb-4">
            We collect information you provide directly to us, such as when you create an 
            account, subscribe to our service, or contact us for support. This information 
            may include your name, email address, and payment information.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground">2. How We Use Your Information</h2>
          <p className="text-muted-foreground mb-4">
            We use the information we collect to provide, maintain, and improve our services, 
            process transactions, send you technical notices and support messages, and respond 
            to your comments and questions.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground">3. Information Sharing</h2>
          <p className="text-muted-foreground mb-4">
            We do not share your personal information with third parties except as described 
            in this policy. We may share information with vendors, consultants, and other 
            service providers who need access to such information to carry out work on our behalf.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground">4. Data Security</h2>
          <p className="text-muted-foreground mb-4">
            We take reasonable measures to help protect information about you from loss, theft, 
            misuse, unauthorized access, disclosure, alteration, and destruction.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground">5. Cookies</h2>
          <p className="text-muted-foreground mb-4">
            We use cookies and similar tracking technologies to track activity on our Service 
            and hold certain information. You can instruct your browser to refuse all cookies 
            or to indicate when a cookie is being sent.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground">6. Your Rights</h2>
          <p className="text-muted-foreground mb-4">
            You have the right to access, update, or delete your personal information at any 
            time through your account settings. You may also contact us to request this information.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground">7. Children's Privacy</h2>
          <p className="text-muted-foreground mb-4">
            Our Service does not address anyone under the age of 13. We do not knowingly 
            collect personally identifiable information from children under 13.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground">8. Changes to This Policy</h2>
          <p className="text-muted-foreground mb-4">
            We may update our Privacy Policy from time to time. We will notify you of any 
            changes by posting the new Privacy Policy on this page.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground">9. Contact Us</h2>
          <p className="text-muted-foreground mb-4">
            If you have any questions about this Privacy Policy, please contact us through 
            our contact form.
          </p>
        </div>
      </div>
    </Layout>
  );
}
