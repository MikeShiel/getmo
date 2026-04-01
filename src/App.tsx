import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { GuestProvider } from "@/contexts/GuestContext";
import { PlayAndEarnProvider } from "@/components/earn/PlayAndEarnContext";
import { SocialProvider } from "@/components/social/SocialContext";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <GuestProvider>
          <PlayAndEarnProvider>
            <SocialProvider>
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
                    <Route path="/my-vouchers" element={<MyVouchers />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </TooltipProvider>
            </SocialProvider>
          </PlayAndEarnProvider>
        </GuestProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
