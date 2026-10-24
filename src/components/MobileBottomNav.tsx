import React from 'react';
import { useShop } from '../context/ShopContext';
import { Store, Building2, MessageCircle, ShoppingBag } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { currentView, setCurrentView, cartCount, cartSubtotal, openWhatsAppModal } = useShop();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F5]/98 backdrop-blur-md border-t border-[#E5DCD0] md:hidden px-3 py-2 shadow-lg">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* Shop tab */}
        <button
          onClick={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 px-3 text-[10px] font-semibold tracking-wider transition-colors cursor-pointer ${
            currentView === 'home' || currentView === 'product'
              ? 'text-[#171717]'
              : 'text-[#8C7A6B] hover:text-[#171717]'
          }`}
        >
          <Store className="w-5 h-5 mb-0.5" />
          <span>SHOP</span>
        </button>

        {/* Wholesale tab */}
        <button
          onClick={() => {
            setCurrentView('wholesale');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 px-3 text-[10px] font-semibold tracking-wider transition-colors cursor-pointer ${
            currentView === 'wholesale'
              ? 'text-[#171717]'
              : 'text-[#8C7A6B] hover:text-[#171717]'
          }`}
        >
          <Building2 className="w-5 h-5 mb-0.5" />
          <span>WHOLESALE</span>
        </button>

        {/* WhatsApp Chat Center Button */}
        <button
          onClick={() => openWhatsAppModal('Assalam-o-Alaikum, I would like direct trade desk support from Karachi.')}
          aria-label="Direct WhatsApp Concierge"
          className="flex items-center justify-center w-11 h-11 bg-[#171717] text-white rounded-full shadow-md hover:bg-neutral-800 transition-all -mt-3 border-2 border-[#FAF8F5] cursor-pointer"
        >
          <MessageCircle className="w-5 h-5 text-emerald-400" />
        </button>

        {/* Bag / Cart */}
        <button
          onClick={() => {
            setCurrentView('checkout');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 px-3 text-[10px] font-semibold tracking-wider transition-colors relative cursor-pointer ${
            currentView === 'checkout'
              ? 'text-[#171717]'
              : 'text-[#8C7A6B] hover:text-[#171717]'
          }`}
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#9B804E] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="font-mono tabular-nums">
            {cartSubtotal > 0 ? `PKR ${cartSubtotal.toLocaleString()}` : 'PKR 0'}
          </span>
        </button>
      </div>
    </div>
  );
};
