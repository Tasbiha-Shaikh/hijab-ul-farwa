import React from 'react';
import { useShop } from '../context/ShopContext';
import { MapPin, Instagram, PhoneCall, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { ATELIER_LOCATION, ATELIER_INSTAGRAM, ATELIER_WHATSAPP_DISPLAY } from '../data/catalog';

export const Footer: React.FC = () => {
  const { setCurrentView, openWhatsAppModal, setIsSizeGuideOpen } = useShop();

  return (
    <footer className="bg-[#171717] text-[#FAF8F5] pt-16 pb-24 md:pb-16 border-t border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-14 border-b border-neutral-800">
          {/* Brand Info */}
          <div className="space-y-4 lg:col-span-1">
            <span className="block font-serif-luxury text-2xl tracking-wide font-semibold text-[#F7F4EE]">
              HIJAB UL FARWA
            </span>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              Karachi&apos;s premier bespoke & wholesale modest wear atelier. Articulating timeless elegance, refined abayas, modal hijabs, and curated ceremonial silhouettes for modern women.
            </p>

            <div className="space-y-2.5 text-xs text-neutral-300 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C4A977] shrink-0 mt-0.5" />
                <span>{ATELIER_LOCATION}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-[#C4A977] shrink-0" />
                <span className="text-neutral-300">IG: {ATELIER_INSTAGRAM}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-[#C4A977] shrink-0" />
                <span>Trade Desk: {ATELIER_WHATSAPP_DISPLAY}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#C4A977]">
              Client Services
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => {
                    setCurrentView('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Retail Store Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('wholesale');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Wholesale B2B Rate Sheet
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Abaya Sizing Guide (52&quot; - 58&quot;)
                </button>
              </li>
              <li>
                <button
                  onClick={() => openWhatsAppModal('Assalam-o-Alaikum, I want to inquire about custom length tailoring.')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Custom Sizing & Sleeve Concierge
                </button>
              </li>
              <li>
                <button
                  onClick={() => openWhatsAppModal('I would like to track my order dispatched via Trax/Leopard.')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Track Dispatch Status
                </button>
              </li>
            </ul>
          </div>

          {/* Guarantees */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#C4A977]">
              Karachi Atelier Commitments
            </h4>
            <div className="space-y-3 text-xs text-neutral-400">
              <div className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-neutral-200 font-medium block">Open Parcel Verification</span>
                  <span>Inspect fabric cut & handwork before paying the courier rider.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <RefreshCw className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-neutral-200 font-medium block">7-Day Easy Exchange</span>
                  <span>Hassle-free size swaps coordinated through WhatsApp desk.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-neutral-200 font-medium block">Direct Mandi Pricing</span>
                  <span>No distributor markups. Sourced directly from Bombay Bazar.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#C4A977]">
              Accepted Payment Methods
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Safe domestic and export payment channels supporting seamless retail shopping and volume container clearing.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-1 bg-neutral-800 text-neutral-200 text-[11px] font-medium rounded border border-neutral-700">
                Cash on Delivery (COD)
              </span>
              <span className="px-2.5 py-1 bg-neutral-800 text-neutral-200 text-[11px] font-medium rounded border border-neutral-700">
                Meezan Bank IBAN
              </span>
              <span className="px-2.5 py-1 bg-neutral-800 text-neutral-200 text-[11px] font-medium rounded border border-neutral-700">
                HBL / Faysal
              </span>
              <span className="px-2.5 py-1 bg-neutral-800 text-neutral-200 text-[11px] font-medium rounded border border-neutral-700">
                JazzCash / Easypaisa
              </span>
              <span className="px-2.5 py-1 bg-neutral-800 text-neutral-200 text-[11px] font-medium rounded border border-neutral-700">
                Daewoo Cargo Cash
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-neutral-500 text-xs gap-4">
          <p>© 2025 Hijab Ul Farwa Atelier Karachi. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span>Bolton Market Support: Mon–Sat 11 AM – 9 PM</span>
            <span className="text-[#C4A977]">Exporting to UK, UAE, USA & Canada</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
