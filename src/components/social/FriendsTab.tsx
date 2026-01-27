import { useState } from 'react';
import { Search, UserPlus, Loader2, Gamepad2, Clock, Check, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSocial } from './SocialContext';

export function FriendsTab() {
  const { 
    friends, 
    friendRequests, 
    pendingInvites,
    sendClanInvite,
    acceptFriendRequest,
    declineFriendRequest,
    searchUsers,
    currentClan
  } = useSocial();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<{ username: string; status: string } | null>(null);

  const handleSearch = async () => {
    if (searchQuery.length < 2) return;
    
    setIsSearching(true);
    setSearchResult(null);
    
    const result = await searchUsers(searchQuery);
    setSearchResult(result);
    setIsSearching(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'in-game': return 'bg-primary';
      case 'offline': return 'bg-muted-foreground';
      default: return 'bg-muted-foreground';
    }
  };

  const getStatusText = (status: string, currentGame?: string, lastSeen?: Date) => {
    switch (status) {
      case 'online': return 'Online';
      case 'in-game': return `Playing ${currentGame}`;
      case 'offline': return lastSeen ? `Last seen ${getTimeAgo(lastSeen)}` : 'Offline';
      default: return 'Unknown';
    }
  };

  return (
    <div className="space-y-6">
      {/* Friend Requests Section */}
      {friendRequests.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Friend Requests ({friendRequests.length})
          </h3>
          <div className="space-y-2">
            {friendRequests.map((request) => (
              <div 
                key={request.id}
                className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold">
                    {request.from.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{request.from}</p>
                    <p className="text-xs text-muted-foreground">Wants to be friends</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => acceptFriendRequest(request.id)}
                    className="bg-green-600 hover:bg-green-700 h-8"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => declineFriendRequest(request.id)}
                    className="h-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">Find Players</h3>
        <div className="flex gap-2">
          <Input
            placeholder="Search by username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="bg-muted/50"
          />
          <Button onClick={handleSearch} disabled={isSearching || searchQuery.length < 2}>
            {isSearching ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        {isSearching && (
          <div className="flex items-center justify-center gap-2 py-4 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Searching...</span>
          </div>
        )}
        
        {searchResult && !isSearching && (
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-primary-foreground font-bold">
                {searchResult.username.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-foreground">{searchResult.username}</p>
                <p className="text-xs text-muted-foreground capitalize">{searchResult.status}</p>
              </div>
            </div>
            <Button size="sm" className="gap-2">
              <UserPlus className="h-4 w-4" />
              Add Friend
            </Button>
          </div>
        )}
      </div>

      {/* Friends List */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">
          Friends ({friends.length})
        </h3>
        <ScrollArea className="h-[250px]">
          <div className="space-y-2 pr-4">
            {friends.map((friend) => (
              <div 
                key={friend.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {/* Avatar with status indicator */}
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-muted to-muted-foreground/30 flex items-center justify-center text-foreground font-bold">
                      {friend.username.charAt(0)}
                    </div>
                    <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${getStatusColor(friend.status)}`} />
                  </div>
                  
                  <div>
                    <p className="font-medium text-foreground">{friend.username}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      {friend.status === 'in-game' && <Gamepad2 className="h-3 w-3" />}
                      {friend.status === 'offline' && <Clock className="h-3 w-3" />}
                      {getStatusText(friend.status, friend.currentGame, friend.lastSeen)}
                    </p>
                  </div>
                </div>
                
                {currentClan && !pendingInvites.includes(friend.id) && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => sendClanInvite(friend.id)}
                    className="text-xs"
                  >
                    Invite to Clan
                  </Button>
                )}
                {pendingInvites.includes(friend.id) && (
                  <span className="text-xs text-muted-foreground">Invited</span>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
