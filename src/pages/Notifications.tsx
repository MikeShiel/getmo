import { useState, useMemo } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useNotifications, timeAgo, dayBucket, Notification } from '@/components/notifications/NotificationsContext';
import { NotifIcon } from '@/components/notifications/notifIcon';
import { useFriends } from '@/components/friends/FriendsContext';

const PURPLE = '#7C3AED';
const UNREAD_BG = '#1E1A40';
const READ_BG = '#0D0B1E';

type Filter = 'all' | 'unread' | 'social' | 'progress';

export default function NotificationsPage() {
  const { notifications, unreadCount, markAllRead, clearRead, dismiss, accept, decline, markRead } = useNotifications();
  const friends = useFriends();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = useMemo(() => {
    return notifications.filter(n => {
      if (filter === 'all') return true;
      if (filter === 'unread') return !n.read;
      return n.group === filter;
    });
  }, [notifications, filter]);

  const groups = useMemo(() => {
    const buckets: Record<'Today' | 'Yesterday' | 'Earlier', Notification[]> = {
      Today: [], Yesterday: [], Earlier: [],
    };
    for (const n of filtered) buckets[dayBucket(n.agoMs)].push(n);
    return buckets;
  }, [filtered]);

  const tabs: { id: Filter; label: string }[] = [
    { id: 'all',      label: 'All' },
    { id: 'unread',   label: 'Unread' },
    { id: 'social',   label: 'Social' },
    { id: 'progress', label: 'Progress' },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto" style={{ maxWidth: 880 }}>
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-bold text-white">Notifications</h1>
              {unreadCount > 0 && (
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: PURPLE }}
                >
                  {unreadCount} unread
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <button onClick={markAllRead} className="text-sm font-semibold hover:underline" style={{ color: PURPLE }}>
                Mark All Read
              </button>
              <button onClick={clearRead} className="text-sm font-semibold text-muted-foreground hover:text-white">
                Clear Read
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6 flex gap-2 border-b" style={{ borderColor: '#2E2A50' }}>
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setFilter(t.id)}
                className="px-4 py-2 text-sm font-semibold transition-colors"
                style={{
                  color: filter === t.id ? '#fff' : 'hsl(var(--muted-foreground))',
                  borderBottom: filter === t.id ? `2px solid ${PURPLE}` : '2px solid transparent',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Groups */}
          <div className="mt-6 space-y-8">
            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground py-12">You're all caught up 🎉</p>
            )}

            {(['Today', 'Yesterday', 'Earlier'] as const).map(label => {
              const items = groups[label];
              if (items.length === 0) return null;
              return (
                <section key={label}>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">{label}</h2>
                  <ul className="space-y-2">
                    {items.map(n => (
                      <li
                        key={n.id}
                        className="flex items-start gap-3 px-4 py-3 rounded-xl"
                        style={{
                          backgroundColor: n.read ? READ_BG : UNREAD_BG,
                          borderLeft: n.read ? '2px solid transparent' : `2px solid ${PURPLE}`,
                          border: `1px solid #2E2A50`,
                        }}
                      >
                        <div
                          className="flex items-center justify-center rounded-full flex-shrink-0"
                          style={{ width: 36, height: 36, backgroundColor: '#2E2A50', color: '#fff' }}
                        >
                          <NotifIcon type={n.type} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm text-white ${n.read ? 'font-normal' : 'font-bold'}`}>
                            {n.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">{timeAgo(n.agoMs)}</p>
                          {n.actionable === 'accept_decline' && (
                            <div className="mt-2 flex gap-2">
                              <button
                                onClick={() =>
                                  n.type === 'friend_request' && n.requestId
                                    ? friends.acceptIncoming(n.requestId)
                                    : accept(n.id)
                                }
                                className="px-3 py-1 rounded text-xs font-semibold text-white"
                                style={{ backgroundColor: '#22C55E' }}
                              >
                                Accept
                              </button>
                              <button
                                onClick={() =>
                                  n.type === 'friend_request' && n.requestId
                                    ? friends.declineIncoming(n.requestId)
                                    : decline(n.id)
                                }
                                className="px-3 py-1 rounded text-xs font-semibold text-white"
                                style={{ backgroundColor: '#EF4444' }}
                              >
                                Decline
                              </button>
                            </div>
                          )}
                          {n.actionable === 'play_now' && (
                            <button onClick={() => markRead(n.id)} className="mt-2 px-3 py-1 rounded text-xs font-semibold text-white" style={{ backgroundColor: PURPLE }}>
                              Play Now
                            </button>
                          )}
                          {n.actionable === 'view_rewards' && (
                            <button onClick={() => { markRead(n.id); navigate('/my-progress'); }} className="mt-2 px-3 py-1 rounded text-xs font-semibold text-white" style={{ backgroundColor: PURPLE }}>
                              View Rewards
                            </button>
                          )}
                          {n.actionable === 'equip_now' && (
                            <button onClick={() => { markRead(n.id); navigate('/my-progress?openAvatar=1'); }} className="mt-2 px-3 py-1 rounded text-xs font-semibold text-white" style={{ backgroundColor: PURPLE }}>
                              Equip Now
                            </button>
                          )}
                        </div>
                        <button aria-label="Delete" onClick={() => dismiss(n.id)} className="text-muted-foreground hover:text-white p-1">
                          <X className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
