import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { WhatsAppConciergeModal } from './components/WhatsAppConciergeModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { SearchModal } from './components/SearchModal';
import { HomeStorefront } from './views/HomeStorefront';
import { ProductDetailView } from './views/ProductDetailView';
import { WholesalePortalView } from './views/WholesalePortalView';
import { CheckoutView } from './views/CheckoutView';
import { WishlistView } from './views/WishlistView';
import { CheckCircle2 } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { currentView, toastMessage } = useShop();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#171717] selection:bg-[#9B804E] selection:text-white">
      {/* Top Header */}
      <Header />

      {/* Main View Area */}
      <main className="flex-grow">
        {currentView === 'home' && <HomeStorefront />}
        {currentView === 'product' && <ProductDetailView />}
        {currentView === 'wholesale' && <WholesalePortalView />}
        {(currentView === 'checkout' || currentView === 'order-confirmed') && <CheckoutView />}
        {currentView === 'wishlist' && <WishlistView />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Native Bottom Navigation */}
      <MobileBottomNav />

      {/* Floating Modals */}
      <WhatsAppConciergeModal />
      <SizeGuideModal />
      <SearchModal />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#171717] text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200 border border-white/20">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainAppContent />
    </ShopProvider>
  );
}
