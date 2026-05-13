import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface GuestProfile {
  id: string;
  name: string;
  xp: number;
  high_scores: Record<string, number>;
  favorites: string[];
}

interface GuestContextType {
  guestProfile: GuestProfile | null;
  isGuest: boolean;
  isAuthenticated: boolean;
  displayName: string;
  displayXp: number;
  displayLevel: number;
  addXp: (amount: number) => void;
  setHighScore: (gameId: string, score: number) => void;
  toggleFavorite: (gameId: string) => void;
  syncLocalToAccount: () => Promise<void>;
  showSaveProgressModal: boolean;
  setShowSaveProgressModal: (show: boolean) => void;
  nudgeSignup: () => void;
}

const GUEST_STORAGE_KEY = 'getmo_user';

function sanitizeName(name: string): string {
  // Strip HTML tags and control characters to prevent XSS
  return name
    .replace(/<[^>]*>/g, '')
    .replace(/[<>"'&]/g, '')
    .replace(/[\x00-\x1F\x7F]/g, '')
    .trim()
    .slice(0, 20);
}

function generateGuestId(): string {
  return `guest_${Math.random().toString(36).substring(2, 10)}`;
}

function createGuestProfile(): GuestProfile {
  return {
    id: generateGuestId(),
    name: 'Guest',
    xp: 0,
    high_scores: {},
    favorites: [],
  };
}

function loadGuestProfile(): GuestProfile {
  try {
    const stored = localStorage.getItem(GUEST_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Sanitize loaded name
      if (parsed.name) parsed.name = sanitizeName(parsed.name);
      return parsed;
    }
  } catch {
    // Corrupted data, reset
  }
  const profile = createGuestProfile();
  localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(profile));
  return profile;
}

function calcLevel(xp: number): number {
  return Math.floor(xp / 1000) + 1;
}

const GuestContext = createContext<GuestContextType | undefined>(undefined);

export function GuestProvider({ children }: { children: React.ReactNode }) {
  const { user, profile, refreshProfile } = useAuth();
  const [guestProfile, setGuestProfile] = useState<GuestProfile | null>(null);
  const [showSaveProgressModal, setShowSaveProgressModal] = useState(false);

  const isAuthenticated = !!user;
  const isGuest = !isAuthenticated;

  // Initialize guest profile on mount
  useEffect(() => {
    if (!isAuthenticated) {
      setGuestProfile(loadGuestProfile());
    } else {
      // Clear guest state when authenticated (after sync)
      setGuestProfile(null);
    }
  }, [isAuthenticated]);

  // Persist guest profile changes
  const saveGuestProfile = useCallback((updated: GuestProfile) => {
    setGuestProfile(updated);
    localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(updated));
  }, []);

  const addXp = useCallback((amount: number) => {
    if (isAuthenticated) return; // XP handled server-side for auth users
    setGuestProfile(prev => {
      if (!prev) return prev;
      const updated = { ...prev, xp: prev.xp + amount };
      localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, [isAuthenticated]);

  const setHighScore = useCallback((gameId: string, score: number) => {
    setGuestProfile(prev => {
      if (!prev) return prev;
      const currentHigh = prev.high_scores[gameId] || 0;
      if (score <= currentHigh) return prev;
      const updated = { ...prev, high_scores: { ...prev.high_scores, [gameId]: score } };
      localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const toggleFavorite = useCallback((gameId: string) => {
    setGuestProfile(prev => {
      if (!prev) return prev;
      const favorites = prev.favorites.includes(gameId)
        ? prev.favorites.filter(id => id !== gameId)
        : [...prev.favorites, gameId];
      const updated = { ...prev, favorites };
      localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Lazy migration: sync guest data to authenticated account
  const syncLocalToAccount = useCallback(async () => {
    if (!user) return;
    
    try {
      const stored = localStorage.getItem(GUEST_STORAGE_KEY);
      if (!stored) return;
      
      const guest: GuestProfile = JSON.parse(stored);
      if (guest.xp > 0) {
        // Server-side merge with cap to prevent leaderboard inflation.
        // Client xp_points/xp_level updates are revoked at the DB level.
        const safeXp = Math.max(0, Math.min(Math.floor(guest.xp), 5000));
        const { error } = await supabase.rpc('merge_guest_xp', { _xp: safeXp });
        if (error) {
          console.error('merge_guest_xp failed:', error);
        } else {
          await refreshProfile();
        }
      }

      // Clear guest data after successful sync
      localStorage.removeItem(GUEST_STORAGE_KEY);
      setGuestProfile(null);
    } catch (err) {
      console.error('Failed to sync guest data:', err);
    }
  }, [user, profile, refreshProfile]);

  // Auto-sync when user logs in and guest data exists
  useEffect(() => {
    if (isAuthenticated && localStorage.getItem(GUEST_STORAGE_KEY)) {
      syncLocalToAccount();
    }
  }, [isAuthenticated, syncLocalToAccount]);

  const nudgeSignup = useCallback(() => {
    if (isGuest) {
      setShowSaveProgressModal(true);
    }
  }, [isGuest]);

  const displayName = isAuthenticated
    ? (profile?.gamer_name || 'Player')
    : (guestProfile?.name || 'Guest');

  const displayXp = isAuthenticated
    ? (profile?.xp_points || 0)
    : (guestProfile?.xp || 0);

  const displayLevel = isAuthenticated
    ? (profile?.xp_level || 1)
    : calcLevel(guestProfile?.xp || 0);

  return (
    <GuestContext.Provider value={{
      guestProfile,
      isGuest,
      isAuthenticated,
      displayName,
      displayXp,
      displayLevel,
      addXp,
      setHighScore,
      toggleFavorite,
      syncLocalToAccount,
      showSaveProgressModal,
      setShowSaveProgressModal,
      nudgeSignup,
    }}>
      {children}
    </GuestContext.Provider>
  );
}

export function useGuest() {
  const context = useContext(GuestContext);
  if (!context) throw new Error('useGuest must be used within GuestProvider');
  return context;
}
