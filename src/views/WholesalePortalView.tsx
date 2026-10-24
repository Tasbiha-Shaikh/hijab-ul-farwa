import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { WHOLESALE_TIERS, WHOLESALE_FAQS, PAKISTAN_CITIES, PAKISTAN_PROVINCES, PRODUCTS } from '../data/catalog';
import {
  TrendingUp,
  Sliders,
  Store,
  Truck,
  CheckCircle2,
  Video,
  Send,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  FileSpreadsheet,
  Package,
} from 'lucide-react';

export const WholesalePortalView: React.FC = () => {
  const { openWhatsAppModal, sendDirectWhatsApp, openProduct, showToast } = useShop();

  // B2B Catalog Request Form State
  const [boutiqueName, setBoutiqueName] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [city, setCity] = useState('Lahore');
  const [province, setProvince] = useState('Punjab');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [monthlyQty, setMonthlyQty] = useState<'12 - 50' | '50 - 200' | '200+'>('12 - 50');
  const [productFocus, setProductFocus] = useState<string[]>([
    'Zardozi & Pearl Abayas',
    'Minimalist Nida Abayas',
  ]);

  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const toggleFocus = (item: string) => {
    setProductFocus(prev =>
      prev.includes(item) ? prev.filter(f => f !== item) : [...prev, item]
    );
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!boutiqueName || !buyerName || !whatsappNumber) {
      showToast('Please fill out boutique name, buyer name, and WhatsApp number');
      return;
    }

    const message = `Assalam-o-Alaikum Hijab Ul Farwa Atelier!\n*B2B Wholesale Catalog Request*\n• Store: ${boutiqueName}\n• Buyer: ${buyerName}\n• City: ${city}, ${province}\n• WhatsApp: ${whatsappNumber}\n• Expected Volume: ${monthlyQty} pcs/month\n• Focus: ${productFocus.join(', ')}\nPlease transmit your wholesale line sheet PDF and video previews.`;

    sendDirectWhatsApp(message);
    setFormSubmitted(true);
    showToast('Wholesale request transmitted to Karachi Trade Desk!');
  };

  return (
    <div className="pb-24 space-y-16">
      {/* Top B2B Header & Hero (Matches Image 1 screenshot) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#171717] text-white rounded-md text-[11px] font-bold tracking-widest uppercase">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#C4A977]" />
            <span>OFFICIAL B2B PORTAL</span>
          </div>

          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#171717] tracking-tight leading-[1.15]">
            Bespoke Wholesale Atelier
          </h1>

          <p className="text-sm sm:text-base text-[#524538] leading-relaxed">
            Direct from Bombay Bazar, Bolton Market, Karachi. High-margin modest luxury, artisan zardozi handwork, and scalable bulk replenishment for regional boutiques and international resellers.
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-md pt-2">
            <div className="p-4 bg-white rounded-xl border border-[#E3D6C5] shadow-xs flex items-center gap-3">
              <Package className="w-5 h-5 text-[#9B804E] shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
                  STARTING MOQ
                </span>
                <span className="font-bold text-xs sm:text-sm text-[#171717]">
                  12 Pcs Mix &amp; Match
                </span>
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-[#E3D6C5] shadow-xs flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
                  B2B MARGIN
                </span>
                <span className="font-bold text-xs sm:text-sm text-[#171717]">
                  Up to 45% Margin
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Factory Inventory Card */}
        <div className="mt-8 relative rounded-2xl overflow-hidden bg-neutral-900 border border-[#3E372E] text-white shadow-lg">
          <div className="relative aspect-[16/7] sm:aspect-[16/6] lg:aspect-[16/5] overflow-hidden">
            <img
              src="/assets/aistudio/Image_1_4854a278.png"
              alt="Bolton Market Production Lines"
              className="w-full h-full object-cover opacity-60"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                  LIVE FACTORY INVENTORY
                </span>
              </div>
              <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white mb-1">
                Bolton Market Production Lines
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300">
                Ready master cartons available for immediate dispatch across Pakistan, Gulf corridors, and UK boutique hubs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Retailers Partner With Us - 4 Key Assurances (Matches screenshot) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-[#E2D6C5]">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8C7A6B] block">
              WHY RETAILERS PARTNER WITH US
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#171717]">
              4 Key Assurances
            </h2>
          </div>
        </div>

        <div className="space-y-4">
          {/* Item 1: Tiered Bulk Margins */}
          <div className="p-5 sm:p-6 bg-white rounded-xl border border-[#E7DDD0] shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#171717] text-white flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm sm:text-base font-bold text-[#171717]">
                Tiered Bulk Margins
              </h3>
              <p className="text-xs sm:text-sm text-[#5C5044] leading-relaxed">
                Earn up to 45% profit margin on ceremonial, casual, and seasonal collections. Guaranteed price stability for registered retail partners without volatile seasonal spikes.
              </p>
            </div>
          </div>

          {/* Item 2: Low MOQ Flexibility */}
          <div className="p-5 sm:p-6 bg-white rounded-xl border border-[#E7DDD0] shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#171717] text-white flex items-center justify-center shrink-0">
              <Sliders className="w-5 h-5 text-[#C4A977]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm sm:text-base font-bold text-[#171717]">
                Low MOQ Flexibility
              </h3>
              <p className="text-xs sm:text-sm text-[#5C5044] leading-relaxed">
                Begin with just 12 pieces per order. Mix silhouettes, standard length tiers (50&quot; to 60&quot;), and colorways freely across the catalog to test local retail demand.
              </p>
            </div>
          </div>

          {/* Item 3: Direct Karachi Atelier Rates */}
          <div className="p-5 sm:p-6 bg-white rounded-xl border border-[#E7DDD0] shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#171717] text-white flex items-center justify-center shrink-0">
              <Store className="w-5 h-5 text-[#C4A977]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm sm:text-base font-bold text-[#171717]">
                Direct Karachi Atelier Rates
              </h3>
              <p className="text-xs sm:text-sm text-[#5C5044] leading-relaxed">
                Eliminate middlemen markups. Sourced and stitched directly from Bombay Bazar fabric hubs with strict quality inspection prior to packing.
              </p>
            </div>
          </div>

          {/* Item 4: Express Cargo & COD Distribution */}
          <div className="p-5 sm:p-6 bg-white rounded-xl border border-[#E7DDD0] shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#171717] text-white flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm sm:text-base font-bold text-[#171717]">
                Express Cargo &amp; COD Distribution
              </h3>
              <p className="text-xs sm:text-sm text-[#5C5044] leading-relaxed">
                Reliable delivery nationwide via TCS, Leopard, Daewoo Cargo with Cash On Delivery options, plus DHL/FedEx worldwide for UAE, UK, and US boutiques.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Lot Pricing - Wholesale Volume Tiers (Matches screenshot) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 pb-3 border-b border-[#E2D6C5]">
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8C7A6B] block">
            STRUCTURED LOT PRICING
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#171717]">
            Wholesale Volume Tiers
          </h2>
          <p className="text-xs sm:text-sm text-[#5C5044] mt-1">
            Transparent wholesale matrices calculated against active Karachi retail market rates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {WHOLESALE_TIERS.map((tier) => (
            <div
              key={tier.tier}
              className={`rounded-2xl p-6 border transition-all flex flex-col justify-between space-y-6 ${
                tier.tag === 'MOST SELECTED'
                  ? 'bg-white border-[#171717] shadow-lg ring-1 ring-[#171717]'
                  : 'bg-white border-[#E5DACD] shadow-xs'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-[#FAF6F0] text-[#7A6443] border border-[#E3D6C5]">
                    {tier.tier}
                  </span>
                  {tier.tag && (
                    <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-[#171717] text-white">
                      {tier.tag}
                    </span>
                  )}
                </div>

                <div className="flex items-baseline justify-between pt-2">
                  <div>
                    <span className="font-serif-luxury text-2xl font-bold text-[#171717] font-mono block">
                      {tier.avgPrice}
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      Average piece wholesale rate
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-[#9B804E] block">
                      {tier.discount}
                    </span>
                    <span className="text-xs font-bold font-mono text-[#171717]">
                      {tier.pcs}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#F0E6D8] space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C7A6B] block">
                    {tier.subtitle}
                  </span>
                  <ul className="space-y-2 text-xs text-[#4A3E33]">
                    {tier.perks.map((perk, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => {
                  setMonthlyQty(tier.tier === 'STARTER LOT' ? '12 - 50' : tier.tier === 'BOUTIQUE GROWTH LOT' ? '50 - 200' : '200+');
                  const formEl = document.getElementById('b2b-form');
                  formEl?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-center ${
                  tier.tag === 'MOST SELECTED'
                    ? 'bg-[#171717] hover:bg-neutral-800 text-white'
                    : 'bg-[#FAF8F5] hover:bg-[#F2ECE1] text-[#171717] border border-[#D5C7B5]'
                }`}
              >
                SELECT {tier.tier}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Direct Merchant Access - Request B2B Catalog & Rate Sheet Form (Matches screenshot) */}
      <section id="b2b-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-[#E3D6C5] shadow-md space-y-8">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8C7A6B] block">
              DIRECT MERCHANT ACCESS
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#171717]">
              Request B2B Catalog &amp; Rate Sheet
            </h2>
            <p className="text-xs sm:text-sm text-[#5C5044] mt-1 leading-relaxed">
              Fill out your retail requirements below. Our Bolton Market trade desk transmits digital line sheets and wholesale video previews directly via WhatsApp.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#3D3328] block mb-1.5">
                  BOUTIQUE / STORE NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Al-Noor Modest Wear Lahore"
                  value={boutiqueName}
                  onChange={(e) => setBoutiqueName(e.target.value)}
                  className="w-full text-xs p-3 rounded-lg border border-[#D5C9B8] bg-[#FAF8F5] focus:outline-none focus:ring-1 focus:ring-[#171717]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#3D3328] block mb-1.5">
                  OWNER / BUYER FULL NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maryam Siddiqui"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full text-xs p-3 rounded-lg border border-[#D5C9B8] bg-[#FAF8F5] focus:outline-none focus:ring-1 focus:ring-[#171717]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#3D3328] block mb-1.5">
                  CITY &amp; PROVINCE *
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full text-xs p-3 rounded-lg border border-[#D5C9B8] bg-[#FAF8F5] focus:outline-none focus:ring-1 focus:ring-[#171717]"
                >
                  {PAKISTAN_CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#3D3328] block mb-1.5">
                  PROVINCE / REGION
                </label>
                <select
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full text-xs p-3 rounded-lg border border-[#D5C9B8] bg-[#FAF8F5] focus:outline-none focus:ring-1 focus:ring-[#171717]"
                >
                  {PAKISTAN_PROVINCES.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#3D3328] block mb-1.5">
                WHATSAPP MOBILE NUMBER *
              </label>
              <div className="flex items-center rounded-lg border border-[#D5C9B8] bg-[#FAF8F5] overflow-hidden">
                <span className="px-3.5 py-3 text-xs font-semibold bg-[#EAE2D5] text-[#3D3328] border-r border-[#D5C9B8]">
                  +92
                </span>
                <input
                  type="tel"
                  required
                  placeholder="3001234567"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  className="w-full text-xs p-3 bg-transparent focus:outline-none"
                />
              </div>
              <p className="text-[11px] text-neutral-400 mt-1">
                We will deliver the private catalog &amp; PDF invoice sheet here.
              </p>
            </div>

            {/* Expected Monthly Quantity Buttons */}
            <div>
              <label className="text-xs font-semibold text-[#3D3328] block mb-2">
                EXPECTED MONTHLY QUANTITY
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['12 - 50', '50 - 200', '200+'] as const).map((qty) => {
                  const isSelected = monthlyQty === qty;
                  const label = qty === '12 - 50' ? 'Starter' : qty === '50 - 200' ? 'Boutique' : 'Master Lot';
                  return (
                    <button
                      type="button"
                      key={qty}
                      onClick={() => setMonthlyQty(qty)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#171717] text-white border-[#171717] shadow-sm'
                          : 'bg-[#FAF8F5] text-neutral-700 border-[#D8CCBD] hover:border-[#171717]'
                      }`}
                    >
                      <span className="block font-bold font-mono text-sm">{qty}</span>
                      <span className={`text-[10px] ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary Product Focus Checkboxes */}
            <div>
              <label className="text-xs font-semibold text-[#3D3328] block mb-2">
                PRIMARY PRODUCT FOCUS
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  'Zardozi & Pearl Abayas',
                  'Minimalist Nida Abayas',
                  'Modal & Georgette Wraps',
                  'Printed Silhouettes',
                ].map((item) => {
                  const isChecked = productFocus.includes(item);
                  return (
                    <div
                      key={item}
                      onClick={() => toggleFocus(item)}
                      className={`p-3 rounded-lg border flex items-center gap-3 cursor-pointer transition-colors ${
                        isChecked
                          ? 'bg-[#F7F2EB] border-[#171717]'
                          : 'bg-[#FAF8F5] border-[#D8CCBD] hover:border-neutral-500'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                        isChecked ? 'bg-[#171717] border-[#171717] text-white' : 'border-neutral-400 bg-white'
                      }`}>
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <span className="font-medium text-[#2C231A]">{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Form Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-[#171717] hover:bg-neutral-800 text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#C4A977]" />
              <span>REQUEST WHOLESALE PRICE SHEET VIA WHATSAPP</span>
            </button>

            {formSubmitted && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Line sheet dispatched! Check your WhatsApp window for instant transmission.</span>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Live Bolton Market Trade Desk Card (Matches screenshot) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF4EB] rounded-2xl p-6 sm:p-8 border border-[#E2D5C3] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#171717] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Video className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-serif-luxury font-bold text-lg text-[#171717]">
                  Live Bolton Market Trade Desk
                </h3>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C7A6B] block mb-1">
                DIRECT WHATSAPP VIDEO INSPECTION
              </span>
              <p className="text-xs text-[#5C5044] leading-relaxed max-w-xl">
                Prefer immediate visual stock auditing? Schedule an instant live WhatsApp video walkthrough directly inside our Karachi wholesale atelier warehouse to examine hand-beaded borders, cuff finishes, and fabric fall.
              </p>
            </div>
          </div>

          <button
            onClick={() => openWhatsAppModal('Assalam-o-Alaikum, I want to book an immediate 5-minute WhatsApp video stock walkthrough of your Karachi atelier inventory.')}
            className="w-full sm:w-auto px-6 py-3 bg-[#171717] hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shrink-0 shadow-sm flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>CHAT WITH WHOLESALE MANAGER (WA.ME)</span>
          </button>
        </div>
      </section>

      {/* B2B Core Silhouettes (Export Grade) (Matches screenshot) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-[#E2D6C5]">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8C7A6B] block">
              B2B CORE SILHOUETTES
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#171717]">
              Export Grade Stock
            </h2>
          </div>
          <span className="text-xs font-bold font-mono text-[#8C7A6B]">
            EXPORT GRADE
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.slice(4, 6).concat([PRODUCTS[0]]).map((p) => (
            <div
              key={p.id}
              onClick={() => openProduct(p)}
              className="bg-white rounded-xl overflow-hidden border border-[#E5DACD] hover:border-[#171717] transition-all cursor-pointer group shadow-xs"
            >
              <div className="aspect-[4/3] bg-neutral-900 overflow-hidden relative">
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                  {p.category}
                </div>
              </div>
              <div className="p-4 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
                  {p.category}
                </span>
                <h4 className="font-serif-luxury font-bold text-base text-[#171717] group-hover:text-[#9B804E] transition-colors">
                  {p.name}
                </h4>
                <div className="flex items-baseline gap-2 pt-1 font-mono">
                  <span className="font-bold text-sm text-[#171717]">
                    PKR {p.wholesalePrice.toLocaleString()}
                  </span>
                  <span className="text-xs text-neutral-500">/ pc bulk (MOQ 12)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions (Matches screenshot) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 pb-3 border-b border-[#E2D6C5]">
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8C7A6B] block">
            TRANSPARENT OPERATIONS
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#171717]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#5C5044] mt-1">
            Essential policies for domestic boutique owners and overseas distributors.
          </p>
        </div>

        <div className="divide-y divide-[#E2D5C3] border-y border-[#E2D5C3]">
          {WHOLESALE_FAQS.map((faq, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <div key={idx} className="py-4">
                <button
                  onClick={() => setExpandedFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between text-left text-sm sm:text-base font-serif-luxury font-bold text-[#171717] hover:text-[#9B804E] transition-colors cursor-pointer"
                >
                  <span className="pr-4">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-neutral-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-neutral-500 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <p className="pt-3 text-xs sm:text-sm text-[#5C5044] leading-relaxed animate-in fade-in duration-150">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
