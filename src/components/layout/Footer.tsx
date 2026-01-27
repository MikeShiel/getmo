import { Link } from 'react-router-dom';
import { Gamepad2, Github, Twitter, MessageCircle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export function Footer() {
  const { t } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Gamepad2 className="h-8 w-8 text-primary" />
              <span className="font-display text-xl font-bold neon-text-cyan">
                Getmo
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm">
              The ultimate destination for HTML5 gaming. Play hundreds of games 
              instantly in your browser, no downloads required.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  {t('footer.privacy')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  {t('footer.contact')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/50 mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Getmo. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
