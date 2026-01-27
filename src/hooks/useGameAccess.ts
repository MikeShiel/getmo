import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface GameAccessResult {
  canPlay: boolean;
  gameUrl: string | null;
  reason: 'free_game' | 'premium_user' | 'login_required' | 'subscription_required' | 'loading' | 'error';
  loading: boolean;
  error: string | null;
}

export function useGameAccess(gameId: string | undefined): GameAccessResult {
  const { session } = useAuth();
  const [result, setResult] = useState<GameAccessResult>({
    canPlay: false,
    gameUrl: null,
    reason: 'loading',
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!gameId) {
      setResult({
        canPlay: false,
        gameUrl: null,
        reason: 'error',
        loading: false,
        error: 'No game ID provided',
      });
      return;
    }

    const checkAccess = async () => {
      setResult(prev => ({ ...prev, loading: true, error: null }));

      try {
        const { data, error } = await supabase.functions.invoke('get-game-access', {
          body: { gameId },
        });

        if (error) {
          console.error('Error checking game access:', error);
          setResult({
            canPlay: false,
            gameUrl: null,
            reason: 'error',
            loading: false,
            error: error.message || 'Failed to check game access',
          });
          return;
        }

        if (data.error) {
          setResult({
            canPlay: false,
            gameUrl: null,
            reason: 'error',
            loading: false,
            error: data.error,
          });
          return;
        }

        setResult({
          canPlay: data.canPlay,
          gameUrl: data.gameUrl,
          reason: data.reason,
          loading: false,
          error: null,
        });
      } catch (err) {
        console.error('Unexpected error checking game access:', err);
        setResult({
          canPlay: false,
          gameUrl: null,
          reason: 'error',
          loading: false,
          error: 'Unexpected error occurred',
        });
      }
    };

    checkAccess();
  }, [gameId, session?.access_token]);

  return result;
}
