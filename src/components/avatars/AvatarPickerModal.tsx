import { useState } from 'react';
import { toast } from 'sonner';
import { Lock, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useAvatar, AvatarVisual, AvatarId } from '@/contexts/AvatarContext';

const PURPLE = '#7C3AED';
const GOLD = '#F5C41A';
const BG = '#0D0B1E';
const CARD = '#1A1730';
const BORDER = '#2E2A50';

type Tab = 'default' | 'earned';

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initialTab?: Tab;
}

export function AvatarPickerModal({ open, onOpenChange, initialTab = 'default' }: Props) {
  const { equipped, kingUnlocked, setEquipped } = useAvatar();
  const [tab, setTab] = useState<Tab>(initialTab);

  const equip = (id: AvatarId) => {
    setEquipped(id);
    toast('Avatar updated');
    setTimeout(() => onOpenChange(false), 800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[480px] p-0 overflow-hidden"
        style={{ backgroundColor: BG, border: `1px solid ${BORDER}`, borderRadius: 16 }}
      >
        <div className="px-6 pt-6">
          <DialogTitle className="text-white text-xl font-bold">Customise Your Avatar</DialogTitle>
        </div>

        {/* Tabs */}
        <div className="mt-4 px-6 flex gap-1 border-b" style={{ borderColor: BORDER }}>
          {(['default', 'earned'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-4 py-2 text-sm font-semibold capitalize transition-colors"
              style={{
                color: tab === t ? '#fff' : 'hsl(var(--muted-foreground))',
                borderBottom: tab === t ? `2px solid ${PURPLE}` : '2px solid transparent',
              }}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="p-6">
          {tab === 'default' && (
            <div className="flex justify-center">
              <BigAvatarCard
                id="standard"
                title="Standard Getmo"
                subtitle="Default"
                equipped={equipped === 'standard'}
                onEquip={() => equip('standard')}
              />
            </div>
          )}

          {tab === 'earned' && (
            <div className="grid grid-cols-2 gap-3">
              <KingCard
                unlocked={kingUnlocked}
                equipped={equipped === 'king'}
                onEquip={() => equip('king')}
              />
              <ComingSoonCard />
              <ComingSoonCard />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function BigAvatarCard({ id, title, subtitle, equipped, onEquip }: { id: AvatarId; title: string; subtitle: string; equipped: boolean; onEquip: () => void }) {
  return (
    <div
      className="p-5 flex flex-col items-center text-center w-full max-w-[260px]"
      style={{ backgroundColor: CARD, borderRadius: 12, border: `1px solid ${BORDER}` }}
    >
      <AvatarVisual id={id} size={120} initial="G" />
      <p className="mt-3 text-base font-bold text-white">{title}</p>
      <span className="text-[10px] font-bold uppercase mt-0.5 text-muted-foreground">{subtitle}</span>
      <div className="mt-4 w-full">
        {equipped ? (
          <span className="inline-flex items-center justify-center gap-1 w-full py-2 rounded-md text-xs font-bold text-white" style={{ backgroundColor: '#22C55E' }}>
            <Check className="h-3.5 w-3.5" /> Currently Equipped
          </span>
        ) : (
          <button onClick={onEquip} className="w-full py-2 rounded-md text-xs font-bold text-white" style={{ backgroundColor: PURPLE }}>
            Equip
          </button>
        )}
      </div>
    </div>
  );
}

function KingCard({ unlocked, equipped, onEquip }: { unlocked: boolean; equipped: boolean; onEquip: () => void }) {
  return (
    <div
      className="relative p-4 flex flex-col items-center text-center"
      style={{ backgroundColor: CARD, borderRadius: 12, border: `2px solid ${GOLD}` }}
    >
      <span
        className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-bold"
        style={{ backgroundColor: 'rgba(245,196,26,0.15)', color: GOLD }}
      >
        LEGENDARY
      </span>
      <div className="relative" style={{ opacity: unlocked ? 1 : 0.4 }}>
        <AvatarVisual id="king" size={72} initial="G" />
        {!unlocked && <Lock className="absolute inset-0 m-auto h-6 w-6 text-white drop-shadow" />}
      </div>
      <p className="mt-2 text-sm font-bold text-white">King Getmo</p>
      {!unlocked && (
        <p className="mt-1 text-[11px] leading-snug" style={{ color: GOLD }}>
          Reach #1 on any leaderboard to unlock 👑
        </p>
      )}
      <div className="mt-3 w-full">
        {unlocked && (
          equipped ? (
            <span className="inline-flex items-center justify-center gap-1 w-full py-1.5 rounded-md text-xs font-bold text-white" style={{ backgroundColor: '#22C55E' }}>
              <Check className="h-3 w-3" /> Equipped
            </span>
          ) : (
            <button onClick={onEquip} className="w-full py-1.5 rounded-md text-xs font-bold text-white" style={{ backgroundColor: PURPLE }}>
              Use as Avatar
            </button>
          )
        )}
      </div>
    </div>
  );
}

function ComingSoonCard() {
  return (
    <div
      className="relative p-4 flex flex-col items-center text-center opacity-60"
      style={{ backgroundColor: CARD, borderRadius: 12, border: `2px dashed ${BORDER}` }}
    >
      <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center" style={{ backgroundColor: '#0F0D1F' }}>
        <Lock className="h-6 w-6 text-muted-foreground" />
      </div>
      <p className="mt-2 text-sm font-bold text-white">Mystery Avatar</p>
      <span className="text-[10px] font-bold uppercase mt-1 text-muted-foreground">Coming Soon</span>
    </div>
  );
}