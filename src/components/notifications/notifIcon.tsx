import { UserPlus, Trophy, Star, Flame, Swords, Shield, Zap, AlertCircle, Crown, Award, Target } from 'lucide-react';
import type { NotifType } from './NotificationsContext';

export function NotifIcon({ type, className = 'h-4 w-4' }: { type: NotifType; className?: string }) {
  switch (type) {
    case 'friend_request':   return <UserPlus className={className} />;
    case 'friend_accepted':  return <UserPlus className={className} />;
    case 'score_beaten':     return <Trophy className={className} />;
    case 'challenge':        return <Swords className={className} />;
    case 'clan_invite':      return <Shield className={className} />;
    case 'level_up':         return <Star className={className} />;
    case 'mission_complete': return <Flame className={className} />;
    case 'daily_cap':        return <AlertCircle className={className} />;
    case 'badge_unlocked':   return <Award className={className} />;
    case 'avatar_unlocked':  return <Crown className={className} />;
    case 'badge_close':      return <Target className={className} />;
    default:                 return <Zap className={className} />;
  }
}
