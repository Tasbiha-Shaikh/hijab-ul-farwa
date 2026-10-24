import React from 'react';
import { useShop } from '../context/ShopContext';
import { Search, Heart, User, ShoppingBag, ArrowUpRight } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartCount,
    cartSubtotal,
    wishlist,
    setIsSearchOpen,
    openWhatsAppModal,
  } = useShop();

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE3D8] transition-all">
      {/* Top Marquee Bar */}
      <div className="bg-[#171717] text-[#FAF8F5] text-[11px] py-1.5 px-4 overflow-hidden border-b border-neutral-800">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-6 whitespace-nowrap overflow-x-auto no-scrollbar font-medium">
            <span className="flex items-center gap-1.5">
              <span>🚚</span> CASH ON DELIVERY ALL OVER PAKISTAN
            </span>
            <span className="text-neutral-500 hidden sm:inline">•</span>
            <span className="hidden sm:flex items-center gap-1.5">
              <span>🛍️</span> WHOLESALE & BULK ORDERS (MOQ 12 PCS)
            </span>
            <span className="text-neutral-500 hidden md:inline">•</span>
            <span className="hidden md:flex items-center gap-1.5">
              <span>⚡</span> 24-48 HR DISPATCH FROM BOLTON MARKET, KARACHI
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-4 text-[11px] shrink-0 text-[#D7C7B3]">
            <button
              onClick={() => openWhatsAppModal('Hello! I would like to track my existing order status.')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Track Order
            </button>
            <span>|</span>
            <button
              onClick={() => openWhatsAppModal('Assalam-o-Alaikum, I am inquiring about wholesale rates.')}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              Wholesale Desk <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <span className="block font-serif-luxury text-xl sm:text-2xl lg:text-3xl tracking-tight text-[#171717] font-semibold group-hover:text-[#9B804E] transition-colors">
                HIJAB UL FARWA
              </span>
              <span className="block text-[10px] tracking-[0.2em] uppercase text-[#8C7A6B] -mt-1 font-medium">
                Karachi Atelier & Wholesale
              </span>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium tracking-wide">
              <button
                onClick={() => {
                  setCurrentView('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`transition-colors cursor-pointer ${
                  currentView === 'home'
                    ? 'text-[#171717] font-semibold border-b-2 border-[#171717] pb-0.5'
                    : 'text-[#665B51] hover:text-[#171717]'
                }`}
              >
                Retail Store
              </button>

              <button
                onClick={() => {
                  setCurrentView('wholesale');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex items-center gap-1 transition-colors cursor-pointer ${
                  currentView === 'wholesale'
                    ? 'text-[#171717] font-semibold border-b-2 border-[#171717] pb-0.5'
                    : 'text-[#665B51] hover:text-[#171717]'
                }`}
              >
                <span>Wholesale B2B</span>
                <span className="text-[9px] px-1.5 py-0.2 bg-[#EDE4D6] text-[#7A5B36] font-semibold rounded-sm">
                  MOQ 12
                </span>
              </button>

              <a
                href="#catalog"
                onClick={() => {
                  if (currentView !== 'home') setCurrentView('home');
                }}
                className="text-[#665B51] hover:text-[#171717] transition-colors"
              >
                New Arrivals
              </a>

              <a
                href="#hijab-bar"
                onClick={() => {
                  if (currentView !== 'home') setCurrentView('home');
                }}
                className="text-[#665B51] hover:text-[#171717] transition-colors"
              >
                Georgette Hijab Bar
              </a>

              <a
                href="#karigari"
                onClick={() => {
                  if (currentView !== 'home') setCurrentView('home');
                }}
                className="text-[#665B51] hover:text-[#171717] transition-colors"
              >
                Karachi Karigari
              </a>
            </nav>
          </div>

          {/* Right: Actions (Search, Wishlist, Bag, WhatsApp) */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search Catalog"
              className="p-2 sm:p-2.5 text-[#4A4036] hover:text-[#171717] hover:bg-[#EFE8DD] rounded-full transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={() => setCurrentView('wishlist')}
              aria-label="Wishlist"
              className="relative p-2 sm:p-2.5 text-[#4A4036] hover:text-[#171717] hover:bg-[#EFE8DD] rounded-full transition-colors cursor-pointer"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#171717] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Account / Concierge Trigger */}
            <button
              onClick={() => openWhatsAppModal('Assalam-o-Alaikum, I would like concierge assistance from Hijab Ul Farwa.')}
              aria-label="Concierge Support"
              className="hidden sm:flex p-2 sm:p-2.5 text-[#4A4036] hover:text-[#171717] hover:bg-[#EFE8DD] rounded-full transition-colors cursor-pointer"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Atelier Bag Trigger */}
            <button
              onClick={() => {
                setCurrentView('checkout');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 bg-[#171717] text-[#FAF8F5] hover:bg-neutral-800 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs font-medium tracking-wide transition-all shadow-sm cursor-pointer"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#9B804E] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-mono tabular-nums">
                PKR {cartSubtotal.toLocaleString()}
              </span>
              <span className="sm:hidden text-[11px] font-mono tabular-nums">
                ({cartCount})
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
