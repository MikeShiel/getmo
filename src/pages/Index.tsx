import { Layout } from '@/components/layout/Layout';
import { HeroBanner } from '@/components/games/HeroBanner';
import { SubscriptionHeroBanner } from '@/components/home/SubscriptionHeroBanner';
import { GameRow } from '@/components/games/GameRow';
import { ProductEntryGrid } from '@/components/home/ProductEntryGrid';
import { PlayAndEarnTeaser } from '@/components/earn/PlayAndEarnTeaser';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { 
  getFeaturedGames, 
  getFreeGames, 
  getTrendingGames, 
  getMostLovedGames 
} from '@/data/mockGames';

const Index = () => {
  const { t } = useTheme();
  const { user, profile } = useAuth();
  
  const featuredGames = getFeaturedGames();
  const freeGames = getFreeGames();
  const trendingGames = getTrendingGames();
  const mostLovedGames = getMostLovedGames();

  const heroFeaturedGame = featuredGames[0] || trendingGames[0];

  // Show subscription hero for logged-out users or non-premium subscribers
  const showSubscriptionHero = !user || !profile?.is_premium;

  return (
    <Layout>
      {showSubscriptionHero ? (
        <SubscriptionHeroBanner />
      ) : (
        <HeroBanner featuredGame={heroFeaturedGame} freeGames={freeGames} />
      )}

      <ProductEntryGrid />

      <GameRow 
        title="Featured Games" 
        games={featuredGames.length > 0 ? featuredGames : trendingGames} 
      />

      <GameRow 
        title={t('home.freeGames')} 
        games={freeGames} 
        highlight={true}
      />

      <GameRow 
        title={t('home.trending')} 
        games={trendingGames} 
      />

      <PlayAndEarnTeaser />

      <GameRow 
        title={t('home.mostLoved')} 
        games={mostLovedGames} 
      />
    </Layout>
  );
};

export default Index;
