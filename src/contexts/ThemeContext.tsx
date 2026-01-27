import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';
type Language = 'en' | 'es';

interface ThemeContextType {
  theme: Theme;
  language: Language;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.profile': 'Profile',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    'nav.install': 'Install App',
    
    // Home
    'home.hero.title': 'Play Amazing Games',
    'home.hero.subtitle': 'Discover hundreds of HTML5 games. Play instantly, no downloads required.',
    'home.hero.cta': 'Play Now',
    'home.freeGames': 'Try 5 Free Games',
    'home.trending': 'Trending Now',
    'home.mostLoved': 'Most Loved',
    
    // Game
    'game.play': 'Play Now',
    'game.free': 'FREE',
    'game.premium': 'PREMIUM',
    'game.publisher': 'Publisher',
    'game.genre': 'Genre',
    'game.rating': 'Rating',
    'game.recommended': 'Recommended Games',
    'game.fullscreen': 'Fullscreen',
    'game.exitFullscreen': 'Exit Fullscreen',
    
    // Auth
    'auth.login': 'Login',
    'auth.signup': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.gamerName': 'Gamer Name',
    'auth.forgotPassword': 'Forgot Password?',
    'auth.noAccount': "Don't have an account?",
    'auth.hasAccount': 'Already have an account?',
    
    // Profile
    'profile.title': 'Profile',
    'profile.account': 'Account',
    'profile.subscription': 'Subscription',
    'profile.preferences': 'Preferences',
    'profile.gamerName': 'Gamer Name',
    'profile.email': 'Email',
    'profile.changePassword': 'Change Password',
    'profile.currentPlan': 'Current Plan',
    'profile.free': 'Free',
    'profile.premium': 'Premium',
    'profile.upgrade': 'Upgrade to Premium',
    'profile.language': 'Language',
    'profile.theme': 'Theme',
    'profile.save': 'Save Changes',
    
    // Subscribe Modal
    'subscribe.title': 'Unlock Premium Gaming',
    'subscribe.subtitle': 'Get unlimited access to all games',
    'subscribe.price': '$5/month',
    'subscribe.features.unlimited': 'Unlimited game access',
    'subscribe.features.exclusive': 'Exclusive premium titles',
    'subscribe.features.noAds': 'Ad-free experience',
    'subscribe.cta': 'Subscribe Now',
    'subscribe.cancel': 'Maybe Later',
    
    // Exit Intent
    'exit.title': "Don't Leave Yet!",
    'exit.subtitle': 'We have more games for you to explore',
    'exit.nextGame': 'Try Next Game',
    'exit.keepPlaying': 'Keep Playing',
    
    // Footer
    'footer.contact': 'Contact Us',
    'footer.terms': 'Terms & Conditions',
    'footer.privacy': 'Privacy Policy',
    'footer.rights': 'All rights reserved.',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.success': 'Message sent successfully!',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Something went wrong',
    'common.back': 'Back',
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.profile': 'Perfil',
    'nav.login': 'Iniciar Sesión',
    'nav.logout': 'Cerrar Sesión',
    'nav.install': 'Instalar App',
    
    // Home
    'home.hero.title': 'Juega Juegos Increíbles',
    'home.hero.subtitle': 'Descubre cientos de juegos HTML5. Juega al instante, sin descargas.',
    'home.hero.cta': 'Jugar Ahora',
    'home.freeGames': 'Prueba 5 Juegos Gratis',
    'home.trending': 'Tendencias',
    'home.mostLoved': 'Más Queridos',
    
    // Game
    'game.play': 'Jugar Ahora',
    'game.free': 'GRATIS',
    'game.premium': 'PREMIUM',
    'game.publisher': 'Editor',
    'game.genre': 'Género',
    'game.rating': 'Calificación',
    'game.recommended': 'Juegos Recomendados',
    'game.fullscreen': 'Pantalla Completa',
    'game.exitFullscreen': 'Salir de Pantalla Completa',
    
    // Auth
    'auth.login': 'Iniciar Sesión',
    'auth.signup': 'Registrarse',
    'auth.email': 'Correo Electrónico',
    'auth.password': 'Contraseña',
    'auth.gamerName': 'Nombre de Jugador',
    'auth.forgotPassword': '¿Olvidaste tu contraseña?',
    'auth.noAccount': '¿No tienes cuenta?',
    'auth.hasAccount': '¿Ya tienes cuenta?',
    
    // Profile
    'profile.title': 'Perfil',
    'profile.account': 'Cuenta',
    'profile.subscription': 'Suscripción',
    'profile.preferences': 'Preferencias',
    'profile.gamerName': 'Nombre de Jugador',
    'profile.email': 'Correo Electrónico',
    'profile.changePassword': 'Cambiar Contraseña',
    'profile.currentPlan': 'Plan Actual',
    'profile.free': 'Gratis',
    'profile.premium': 'Premium',
    'profile.upgrade': 'Actualizar a Premium',
    'profile.language': 'Idioma',
    'profile.theme': 'Tema',
    'profile.save': 'Guardar Cambios',
    
    // Subscribe Modal
    'subscribe.title': 'Desbloquea Gaming Premium',
    'subscribe.subtitle': 'Obtén acceso ilimitado a todos los juegos',
    'subscribe.price': '$5/mes',
    'subscribe.features.unlimited': 'Acceso ilimitado a juegos',
    'subscribe.features.exclusive': 'Títulos premium exclusivos',
    'subscribe.features.noAds': 'Experiencia sin anuncios',
    'subscribe.cta': 'Suscribirse Ahora',
    'subscribe.cancel': 'Quizás Después',
    
    // Exit Intent
    'exit.title': '¡No Te Vayas!',
    'exit.subtitle': 'Tenemos más juegos para ti',
    'exit.nextGame': 'Probar Siguiente Juego',
    'exit.keepPlaying': 'Seguir Jugando',
    
    // Footer
    'footer.contact': 'Contáctanos',
    'footer.terms': 'Términos y Condiciones',
    'footer.privacy': 'Política de Privacidad',
    'footer.rights': 'Todos los derechos reservados.',
    
    // Contact
    'contact.title': 'Contáctanos',
    'contact.name': 'Nombre',
    'contact.email': 'Correo Electrónico',
    'contact.subject': 'Asunto',
    'contact.message': 'Mensaje',
    'contact.send': 'Enviar Mensaje',
    'contact.success': '¡Mensaje enviado exitosamente!',
    
    // Common
    'common.loading': 'Cargando...',
    'common.error': 'Algo salió mal',
    'common.back': 'Volver',
  }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'dark';
  });

  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <ThemeContext.Provider value={{ theme, language, setTheme, setLanguage, t }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
