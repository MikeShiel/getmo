import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNotifications, timeAgo } from './NotificationsContext';
import { NotifIcon } from './notifIcon';
import { useFriends } from '@/components/friends/FriendsContext';

const PURPLE = '#7C3AED';
const UNREAD_BG = '#1E1A40';

export function NotificationsBell() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const { notifications, unreadCount, markAllRead, dismiss, accept, decline, markRead } = useNotifications();
  const friends = useFriends();

  const enter = () => {
    if (isMobile) return;
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const leave = () => {
    if (isMobile) return;
    closeTimer.current = window.setTimeout(() => setOpen(false), 150);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMobile) {
      navigate('/notifications');
    } else {
      setOpen((o) => !o);
    }
  };

  const top5 = notifications.slice(0, 5);

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        aria-label="Notifications"
        onClick={handleClick}
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span
            className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold text-white flex items-center justify-center"
            style={{ backgroundColor: '#EF4444' }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Button>

      {open && !isMobile && (
        <div
          className="absolute right-0 top-full mt-2 z-50 animate-fade-in"
          style={{
            minWidth: 340,
            backgroundColor: '#1A1730',
            border: '1px solid #2E2A50',
            borderRadius: 12,
            boxShadow: '0 12px 32px rgba(0,0,0,0.45)',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid #2E2A50' }}>
            <span className="text-sm font-bold text-white">Notifications</span>
            <button
              onClick={markAllRead}
              className="text-xs font-semibold hover:underline"
              style={{ color: PURPLE }}
            >
              Mark All Read
            </button>
          </div>

          {/* List */}
          <ul className="max-h-[420px] overflow-y-auto py-1">
            {top5.length === 0 && (
              <li className="px-4 py-6 text-center text-sm text-muted-foreground">
                You're all caught up 🎉
              </li>
            )}
            {top5.map((n) => (
              <li
                key={n.id}
                className="relative flex items-start gap-3 px-4 py-3"
                style={{
                  backgroundColor: n.read ? 'transparent' : UNREAD_BG,
                  borderLeft: n.read ? '2px solid transparent' : `2px solid ${PURPLE}`,
                }}
              >
                {!n.read && (
                  <span
                    className="absolute left-[10px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: PURPLE }}
                  />
                )}
                <div
                  className="flex items-center justify-center rounded-full flex-shrink-0 ml-2"
                  style={{ width: 32, height: 32, backgroundColor: '#2E2A50', color: '#fff' }}
                >
                  <NotifIcon type={n.type} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white leading-snug">{n.message}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{timeAgo(n.agoMs)}</p>
                  {n.actionable === 'accept_decline' && (
                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={() => {
                          if (n.type === 'friend_request' && n.requestId) {
                            friends.acceptIncoming(n.requestId);
                          } else {
                            accept(n.id);
                          }
                        }}
                        className="px-2.5 py-1 rounded text-[11px] font-semibold text-white"
                        style={{ backgroundColor: '#22C55E' }}
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => {
                          if (n.type === 'friend_request' && n.requestId) {
                            friends.declineIncoming(n.requestId);
                          } else {
                            decline(n.id);
                          }
                        }}
                        className="px-2.5 py-1 rounded text-[11px] font-semibold text-white"
                        style={{ backgroundColor: '#EF4444' }}
                      >
                        Decline
                      </button>
                    </div>
                  )}
                  {n.actionable === 'play_now' && (
                    <button
                      onClick={() => markRead(n.id)}
                      className="mt-2 px-2.5 py-1 rounded text-[11px] font-semibold text-white"
                      style={{ backgroundColor: PURPLE }}
                    >
                      Play Now
                    </button>
                  )}
                  {n.actionable === 'view_rewards' && (
                    <button
                      onClick={() => { markRead(n.id); navigate('/my-progress?tab=rewards&scrollTo=badges'); setOpen(false); }}
                      className="mt-2 px-2.5 py-1 rounded text-[11px] font-semibold text-white"
                      style={{ backgroundColor: PURPLE }}
                    >
                      View Rewards
                    </button>
                  )}
                  {n.actionable === 'equip_now' && (
                    <button
                      onClick={() => { markRead(n.id); navigate('/my-progress?tab=rewards&scrollTo=avatars&openAvatar=1'); setOpen(false); }}
                      className="mt-2 px-2.5 py-1 rounded text-[11px] font-semibold text-white"
                      style={{ backgroundColor: PURPLE }}
                    >
                      Equip Now
                    </button>
                  )}
                </div>
                <button
                  aria-label="Dismiss notification"
                  onClick={() => dismiss(n.id)}
                  className="text-muted-foreground hover:text-white p-1"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="p-3" style={{ borderTop: '1px solid #2E2A50' }}>
            <Link to="/notifications" onClick={() => setOpen(false)}>
              <button
                className="w-full text-sm font-semibold py-2 rounded-lg text-white hover:opacity-90"
                style={{ backgroundColor: PURPLE }}
              >
                View All Notifications →
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
