import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/games/HeroSection';
import { GameRow } from '@/components/games/GameRow';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  getFeaturedGames, 
  getFreeGames, 
  getTrendingGames, 
  getMostLovedGames 
} from '@/data/mockGames';

const Index = () => {
  const { t } = useTheme();
  
  const featuredGames = getFeaturedGames();
  const freeGames = getFreeGames();
  const trendingGames = getTrendingGames();
  const mostLovedGames = getMostLovedGames();

  // Get featured games for the hero
  const heroGames = featuredGames.length > 0 ? featuredGames : trendingGames;

  return (
    <Layout>
      {/* Hero Section with multiple games */}
      <HeroSection games={heroGames} />

      {/* Free Games Section - Highlighted */}
      <GameRow 
        title={t('home.freeGames')} 
        games={freeGames} 
        highlight={true}
      />

      {/* Trending Games */}
      <GameRow 
        title={t('home.trending')} 
        games={trendingGames} 
      />

      {/* Most Loved Games */}
      <GameRow 
        title={t('home.mostLoved')} 
        games={mostLovedGames} 
      />
    </Layout>
  );
};

export default Index;
