import { Link, NavLink, useNavigate } from "react-router-dom";
import { Home, Store, Flag, Gift, Users, Trophy, Zap, Play, X } from "lucide-react";
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

  const renderCollapsedLink = (item: typeof mainItems[number]) => (
    <NavLink
      key={item.title}
      to={item.url}
      end={item.url === "/"}
      title={item.title}
      className={({ isActive }) =>
        `relative flex h-16 w-full items-center justify-center transition ${
          isActive
            ? "bg-sidebar-accent text-secondary before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-secondary"
            : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
        }`
      }
    >
      <item.icon className="h-8 w-8" strokeWidth={2.2} />
      <span className="sr-only">{item.title}</span>
    </NavLink>
  );

  const renderExpandedLink = (item: typeof mainItems[number]) => (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild tooltip={item.title}>
        <NavLink
          to={item.url}
          end={item.url === "/"}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg ${
              isActive
                ? "bg-secondary/15 text-secondary border-l-2 border-secondary"
                : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/60"
            }`
          }
        >
          <item.icon className="h-5 w-5" />
          <span className="text-sm font-medium">{item.title}</span>
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );

  const renderCollapsedSidebar = () => (
    <Sidebar
      collapsible="icon"
      className="border-r-0 md:!left-7 md:!top-[12.75rem] md:!bottom-7 md:!h-auto md:!w-28 md:overflow-hidden md:rounded-[2rem]"
    >
      <SidebarContent className="gap-0 overflow-hidden rounded-[2rem] bg-sidebar">
        <nav className="flex min-h-full flex-col overflow-hidden rounded-[2rem]" aria-label="Primary">
          <div className="overflow-hidden rounded-t-[2rem] bg-sidebar">
            <div className="h-8 bg-sidebar" aria-hidden="true" />
            {mainItems.map(renderCollapsedLink)}
          </div>

          <div className="flex flex-col items-center gap-8 bg-sidebar py-8">
            <div className="h-px w-12 bg-sidebar-foreground/70" />
            {socialItems.map((item) => (
              <NavLink
                key={item.title}
                to={item.url}
                title={item.title}
                className={({ isActive }) =>
                  `flex h-12 w-full items-center justify-center transition ${
                    isActive
                      ? "text-secondary"
                      : "text-sidebar-foreground hover:text-sidebar-foreground/80"
                  }`
                }
              >
                <item.icon className="h-8 w-8" strokeWidth={2.1} />
                <span className="sr-only">{item.title}</span>
              </NavLink>
            ))}
          </div>

          <div className="mt-auto flex flex-col items-center gap-4 bg-sidebar-accent px-3 py-7">
            <button
              onClick={quickPick}
              title="Quick Pick"
              className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-sidebar-foreground bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition hover:scale-105"
            >
              <Zap className="h-8 w-8 fill-current" />
              <span className="sr-only">Quick Pick</span>
            </button>
            <button
              onClick={randomPlay}
              title="Random Play"
              className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-sidebar-foreground bg-secondary text-secondary-foreground shadow-lg shadow-secondary/30 transition hover:scale-105"
            >
              <Play className="h-8 w-8 fill-current" />
              <span className="sr-only">Random Play</span>
            </button>
          </div>
        </nav>
      </SidebarContent>
    </Sidebar>
  );

  if (collapsed) {
    return renderCollapsedSidebar();
  }

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarHeader className="bg-sidebar h-16 px-3 flex-row items-center gap-2">
        <button
          onClick={toggleSidebar}
          className="h-9 w-9 flex items-center justify-center rounded-md text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/60"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>
        <Link to="/" className="flex items-center">
          <img src={getmoLogo} alt="Getmo" className="h-9" />
        </Link>
      </SidebarHeader>
      <SidebarContent className="bg-sidebar gap-0">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map(renderExpandedLink)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] tracking-widest text-sidebar-foreground/40 uppercase">
            Social
          </SidebarGroupLabel>
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
                            : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/60"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent className="px-2 space-y-2">
            <Button
              onClick={quickPick}
              className="w-full justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full"
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
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-sidebar px-4 pb-4 pt-2 text-xs text-sidebar-foreground/50 space-y-1">
        <Link to="/contact" className="block hover:text-sidebar-foreground">Contact</Link>
        <Link to="/terms" className="block hover:text-sidebar-foreground">Terms &amp; Conditions</Link>
        <Link to="/privacy" className="block hover:text-sidebar-foreground">Privacy Policy</Link>
        <Link to="/" className="block hover:text-sidebar-foreground">FAQ</Link>
        <p className="pt-2 text-[10px] text-sidebar-foreground/30">© {new Date().getFullYear()} Getmo Games</p>
      </SidebarFooter>
    </Sidebar>
  );
}