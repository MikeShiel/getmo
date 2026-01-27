import { Shield, Users, LogOut, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSocial } from './SocialContext';

export function ClansTab() {
  const { 
    availableClans, 
    currentClan, 
    clanMembershipStatus, 
    joinClan, 
    leaveClan 
  } = useSocial();

  const handleJoinClan = async (clanId: string) => {
    await joinClan(clanId);
  };

  return (
    <div className="space-y-6">
      {/* Current Clan Section */}
      {currentClan && (
        <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentClan.logoColor} flex items-center justify-center`}>
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-primary">[{currentClan.tag}]</span>
                  <h3 className="font-bold text-foreground">{currentClan.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {currentClan.memberCount} members
                </p>
              </div>
            </div>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={leaveClan}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Leave Clan
            </Button>
          </div>
        </div>
      )}

      {/* Discover Clans */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <Shield className="h-4 w-4" />
          {currentClan ? 'Other Clans' : 'Discover Clans'}
        </h3>
        
        <ScrollArea className="h-[300px]">
          <div className="space-y-3 pr-4">
            {availableClans
              .filter(clan => clan.id !== currentClan?.id)
              .map((clan) => {
                const status = clanMembershipStatus[clan.id] || 'none';
                
                return (
                  <div 
                    key={clan.id}
                    className="p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      {/* Clan Logo */}
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${clan.logoColor} flex items-center justify-center flex-shrink-0`}>
                        <Shield className="h-7 w-7 text-white" />
                      </div>
                      
                      {/* Clan Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-secondary">[{clan.tag}]</span>
                          <h4 className="font-bold text-foreground">{clan.name}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {clan.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {clan.memberCount} members
                          </span>
                          {clan.isRecruiting && (
                            <span className="text-green-400">Recruiting</span>
                          )}
                        </div>
                      </div>
                      
                      {/* Join Button */}
                      <div className="flex-shrink-0">
                        {status === 'none' && !currentClan && (
                          <Button 
                            size="sm"
                            onClick={() => handleJoinClan(clan.id)}
                            className="bg-primary hover:bg-primary/90"
                          >
                            Join
                          </Button>
                        )}
                        {status === 'pending' && (
                          <Button size="sm" disabled className="gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Pending...
                          </Button>
                        )}
                        {status === 'member' && (
                          <Button size="sm" disabled variant="secondary" className="gap-2">
                            <Check className="h-4 w-4" />
                            Member
                          </Button>
                        )}
                        {currentClan && status === 'none' && (
                          <Button size="sm" variant="outline" disabled>
                            Leave current clan first
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </ScrollArea>
      </div>

      {/* Clan Benefits Info */}
      <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
        <h4 className="text-sm font-medium text-foreground mb-2">Why Join a Clan?</h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Get a unique clan tag displayed next to your name</li>
          <li>• Participate in exclusive clan events and challenges</li>
          <li>• Earn bonus XP when playing with clan members</li>
          <li>• Compete on clan leaderboards</li>
        </ul>
      </div>
    </div>
  );
}
