import { Layout } from '@/components/layout/Layout';
import { HeroBanner } from '@/components/games/HeroBanner';
import { GameRow } from '@/components/games/GameRow';
import { PlayAndEarnTeaser } from '@/components/earn/PlayAndEarnTeaser';
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

  // Pick one featured game for the hero banner
  const heroFeaturedGame = featuredGames[0] || trendingGames[0];

  return (
    <Layout>
      {/* Hero Banner - Quick play CTA */}
      <HeroBanner featuredGame={heroFeaturedGame} freeGames={freeGames} />

      {/* Featured Games Section */}
      <GameRow 
        title="Featured Games" 
        games={featuredGames.length > 0 ? featuredGames : trendingGames} 
      />

      {/* Free Games Section - Highlighted */}
      <GameRow 
        title={t('home.freeGames')} 
        games={freeGames} 
        highlight={true}
      />

      {/* Play & Earn Teaser - CTA to dedicated page */}
      <PlayAndEarnTeaser />

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
