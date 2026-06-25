import { Link, NavLink, useNavigate } from "react-router-dom";
import { Home, Store, Flag, Gift, Users, Trophy, Zap, Play } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { getFreeGames } from "@/data/mockGames";
import getmoLogo from "@/assets/getmo-logo.png";
import { X } from "lucide-react";

const mainItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Store", url: "/store", icon: Store },
  { title: "Challenges", url: "/challenges", icon: Flag },
  { title: "Rewards", url: "/rewards", icon: Gift },
];

const socialItems = [
  { title: "Friends", url: "/social", icon: Users },
  { title: "Clans", url: "/social", icon: Users },
  { title: "Leaderboards", url: "/rewards", icon: Trophy },
];

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();

  const randomPlay = () => {
    const free = getFreeGames();
    if (!free.length) return;
    const pick = free[Math.floor(Math.random() * free.length)];
    navigate(`/game/${pick.id}`);
  };

  const quickPick = () => {
    const free = getFreeGames();
    const featured = free.find(g => g.is_featured) || free[0];
    if (featured) navigate(`/game/${featured.id}`);
  };

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      {!collapsed && (
        <SidebarHeader className="bg-[hsl(268_45%_10%)] h-16 px-3 flex-row items-center gap-2">
          <button
            onClick={toggleSidebar}
            className="h-9 w-9 flex items-center justify-center rounded-md text-white/80 hover:text-white hover:bg-white/5"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
          <Link to="/" className="flex items-center">
            <img src={getmoLogo} alt="Getmo" className="h-9" />
          </Link>
        </SidebarHeader>
      )}
      <SidebarContent className="bg-[hsl(268_45%_10%)] gap-0">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg ${
                          isActive
                            ? "bg-secondary/15 text-secondary border-l-2 border-secondary"
                            : "text-white/80 hover:text-white hover:bg-white/5"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="text-sm font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-[10px] tracking-widest text-white/40 uppercase">
              Social
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {socialItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg ${
                          isActive
                            ? "bg-secondary/15 text-secondary"
                            : "text-white/80 hover:text-white hover:bg-white/5"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="text-sm font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent className="px-2 space-y-2">
            {collapsed ? (
              <>
                <button
                  onClick={quickPick}
                  title="Quick Pick"
                  className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-105 transition"
                >
                  <Zap className="h-5 w-5 fill-current" />
                </button>
                <button
                  onClick={randomPlay}
                  title="Random Play"
                  className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shadow-lg shadow-secondary/30 hover:scale-105 transition"
                >
                  <Play className="h-5 w-5 fill-current" />
                </button>
              </>
            ) : (
              <>
                <Button
                  onClick={quickPick}
                  className="w-full justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold rounded-full"
                >
                  <Zap className="h-4 w-4 fill-current" />
                  QUICK PICK
                </Button>
                <Button
                  onClick={randomPlay}
                  className="w-full justify-center gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold rounded-full"
                >
                  <Play className="h-4 w-4 fill-current" />
                  RANDOM PLAY
                </Button>
              </>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {!collapsed && (
        <SidebarFooter className="bg-[hsl(268_45%_10%)] px-4 pb-4 pt-2 text-xs text-white/50 space-y-1">
          <Link to="/contact" className="block hover:text-white">Contact</Link>
          <Link to="/terms" className="block hover:text-white">Terms &amp; Conditions</Link>
          <Link to="/privacy" className="block hover:text-white">Privacy Policy</Link>
          <Link to="/" className="block hover:text-white">FAQ</Link>
          <p className="pt-2 text-[10px] text-white/30">© {new Date().getFullYear()} Getmo Games</p>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}