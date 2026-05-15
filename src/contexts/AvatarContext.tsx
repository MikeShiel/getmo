import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type AvatarId = 'standard' | 'king';

interface AvatarCtx {
  equipped: AvatarId;
  kingUnlocked: boolean;
  setEquipped: (id: AvatarId) => void;
  setKingUnlocked: (v: boolean) => void;
}

const Ctx = createContext<AvatarCtx | null>(null);
const KEY_EQUIP = 'getmo_avatar_equipped';
const KEY_KING = 'getmo_avatar_king_unlocked';

export function AvatarProvider({ children }: { children: ReactNode }) {
  const [equipped, setEquippedState] = useState<AvatarId>('standard');
  // Mock unlocked so the user can demo the equip flow
  const [kingUnlocked, setKingUnlockedState] = useState<boolean>(true);

  useEffect(() => {
    try {
      const e = localStorage.getItem(KEY_EQUIP) as AvatarId | null;
      const k = localStorage.getItem(KEY_KING);
      if (e === 'standard' || e === 'king') setEquippedState(e);
      if (k !== null) setKingUnlockedState(k === '1');
    } catch {}
  }, []);

  const setEquipped = (id: AvatarId) => {
    setEquippedState(id);
    try { localStorage.setItem(KEY_EQUIP, id); } catch {}
  };
  const setKingUnlocked = (v: boolean) => {
    setKingUnlockedState(v);
    try { localStorage.setItem(KEY_KING, v ? '1' : '0'); } catch {}
  };

  return (
    <Ctx.Provider value={{ equipped, kingUnlocked, setEquipped, setKingUnlocked }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAvatar() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useAvatar must be used inside AvatarProvider');
  return v;
}

/** Shared visual representation used in navbar / cards / leaderboard rows. */
export function AvatarVisual({
  id,
  size = 32,
  initial,
}: {
  id: AvatarId;
  size?: number;
  initial: string;
}) {
  const isKing = id === 'king';
  return (
    <div
      className="relative flex items-center justify-center rounded-full text-white font-bold flex-shrink-0 overflow-hidden"
      style={{
        width: size,
        height: size,
        background: isKing
          ? 'linear-gradient(135deg, #F5C41A 0%, #B8860B 100%)'
          : '#7C3AED',
        boxShadow: isKing ? '0 0 0 2px #F5C41A55' : undefined,
        fontSize: Math.round(size * 0.42),
      }}
      aria-label={isKing ? 'King Getmo avatar' : 'Standard Getmo avatar'}
    >
      {isKing ? (
        <span style={{ fontSize: Math.round(size * 0.55), lineHeight: 1 }} aria-hidden>
          👑
        </span>
      ) : (
        initial
      )}
    </div>
  );
}