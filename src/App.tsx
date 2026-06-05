import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { GuestProvider } from "@/contexts/GuestContext";
import { PlayAndEarnProvider } from "@/components/earn/PlayAndEarnContext";
import { SocialProvider } from "@/components/social/SocialContext";
import { NotificationsProvider } from "@/components/notifications/NotificationsContext";
import { FriendsProvider } from "@/components/friends/FriendsContext";
import { AvatarProvider } from "@/contexts/AvatarContext";
import { SaveProgressModal } from "@/components/modals/SaveProgressModal";
import Index from "./pages/Index";
import GameDetail from "./pages/GameDetail";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import PlayAndEarn from "./pages/PlayAndEarn";
import PlayAndWin from "./pages/PlayAndWin";
import VoucherStore from "./pages/VoucherStore";
import VoucherDetail from "./pages/VoucherDetail";
import VoucherCategory from "./pages/VoucherCategory";
import NotFound from "./pages/NotFound";
import Subscriptions from "./pages/Subscriptions";
import Rewards from "./pages/Rewards";
import MyVouchers from "./pages/MyVouchers";
import Social from "./pages/Social";
import DailyMissions from "./pages/DailyMissions";
import MyProgressPage from "./pages/MyProgress";
import NotificationsPage from "./pages/Notifications";
import UserProfile from "./pages/UserProfile";
import Challenges from "./pages/Challenges";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <GuestProvider>
          <PlayAndEarnProvider>
            <SocialProvider>
              <NotificationsProvider>
              <FriendsProvider>
              <AvatarProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                <SaveProgressModal />
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/game/:id" element={<GameDetail />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/play-and-earn" element={<PlayAndEarn />} />
                    <Route path="/play-and-win" element={<PlayAndWin />} />
                    <Route path="/vouchers" element={<VoucherStore />} />
                    <Route path="/vouchers/category/:slug" element={<VoucherCategory />} />
                    <Route path="/vouchers/:id" element={<VoucherDetail />} />
                    <Route path="/subscriptions" element={<Subscriptions />} />
                    <Route path="/rewards" element={<Rewards />} />
                    <Route path="/my-orders" element={<MyVouchers />} />
                    <Route path="/my-vouchers" element={<Navigate to="/my-orders" replace />} />
                    <Route path="/social" element={<Social />} />
                    <Route path="/daily-missions" element={<DailyMissions />} />
                    <Route path="/my-progress" element={<MyProgressPage />} />
                    <Route path="/notifications" element={<NotificationsPage />} />
                    <Route path="/user/:username" element={<UserProfile />} />
                    <Route path="/challenges" element={<Challenges />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </TooltipProvider>
              </AvatarProvider>
              </FriendsProvider>
              </NotificationsProvider>
            </SocialProvider>
          </PlayAndEarnProvider>
        </GuestProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
