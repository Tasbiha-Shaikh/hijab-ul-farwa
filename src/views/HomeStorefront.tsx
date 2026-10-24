import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Product, HijabShade } from '../types';
import { PRODUCTS, HIJAB_SHADES, REVIEWS } from '../data/catalog';
import {
  Heart,
  Plus,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Scissors,
  Star,
  Check,
  MessageCircle,
  PackageOpen,
  ArrowUpRight,
  Layers,
  ChevronRight,
  SlidersHorizontal,
} from 'lucide-react';

export const HomeStorefront: React.FC = () => {
  const {
    openProduct,
    addToCart,
    wishlist,
    toggleWishlist,
    setCurrentView,
    openWhatsAppModal,
  } = useShop();

  const [activeCategory, setActiveCategory] = useState<'all' | 'plain' | 'stonework' | 'printed' | 'hijabs'>('all');
  const [selectedHijabShade, setSelectedHijabShade] = useState<HijabShade>(HIJAB_SHADES[0]);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, number>>({
    'prod-001': 54,
    'prod-002': 54,
    'prod-003': 54,
    'prod-004': 54,
    'prod-005': 54,
    'prod-006': 54,
  });

  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({
    'prod-001': 'Jet Black',
    'prod-002': 'Jet Black',
    'prod-003': 'Jet Black',
    'prod-004': 'Jet Black',
    'prod-005': 'Jet Black',
    'prod-006': 'Jet Black',
  });

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.categoryGroup === activeCategory);

  const handleSizeSelect = (productId: string, size: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleColorSelect = (productId: string, colorName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedColors(prev => ({ ...prev, [productId]: colorName }));
  };

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const size = selectedSizes[product.id] || product.sizes[0].length;
    const color = selectedColors[product.id] || product.colors[0].name;
    addToCart(product, color, size, 1, false);
  };

  const handleAddHijabShade = () => {
    const dummyProduct: Product = {
      id: `hijab-${selectedHijabShade.id}`,
      name: `Premium Georgette Hijab (${selectedHijabShade.name})`,
      slug: `georgette-hijab-${selectedHijabShade.id}`,
      sku: `HUF-GH-${selectedHijabShade.id.toUpperCase()}`,
      category: 'HIJAB ESSENTIALS',
      categoryGroup: 'hijabs',
      price: selectedHijabShade.price,
      wholesalePrice: 650,
      wholesaleMinQty: 24,
      fabric: 'Pure Double Georgette Crepe',
      description: selectedHijabShade.description,
      craftsmanshipNote: 'Double hand-rolled baby hem stitch',
      colors: [{ name: selectedHijabShade.name, hex: selectedHijabShade.hex }],
      sizes: [{ length: 0, heightGuide: 'Standard 72x28"', inStock: true }],
      images: ['/assets/aistudio/Image_5_1e26a4f2.png', '/assets/aistudio/Image_3_5f0ec3e8.png'],
      rating: 4.9,
      reviewsCount: 84,
      includesMatchingHijab: false,
    };
    addToCart(dummyProduct, selectedHijabShade.name, 0, 1, false);
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Secondary Ticker Strip */}
      <div className="bg-[#EFE8DD] border-b border-[#E2D5C3] py-2 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 text-xs font-medium text-[#4A3F33] flex-wrap">
          <span className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-[#171717]" />
            <span>CASH ON DELIVERY ACROSS PAKISTAN</span>
          </span>
          <span className="text-[#C5B49E] hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <PackageOpen className="w-3.5 h-3.5 text-[#171717]" />
            <span>100% OPEN PARCEL INSPECTION GUARANTEED</span>
          </span>
          <span className="text-[#C5B49E] hidden md:inline">•</span>
          <span className="hidden md:flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#171717]" />
            <span>WHOLESALE & RETAIL UNDER ONE ATELIER ROOF</span>
          </span>
        </div>
      </div>

      {/* Hero Section (Matches Image 2 screenshot) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-[#1D1B18] text-[#FAF8F5] min-h-[520px] sm:min-h-[580px] lg:min-h-[620px] flex items-center shadow-xl border border-[#38332B]">
          {/* Background image & gradient overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="/assets/aistudio/Image_3_5f0ec3e8.png"
              alt="Hijab Ul Farwa Karachi Atelier Edition"
              className="w-full h-full object-cover object-top opacity-55 scale-102 hover:scale-100 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 p-6 sm:p-10 lg:p-16 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[11px] font-semibold tracking-widest uppercase text-[#FAF8F5]">
              <span className="w-2 h-2 rounded-full bg-[#E5C158]" />
              <span>Karachi Atelier Edition</span>
            </div>

            <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.15] text-balance">
              Premium Abayas &amp; Hijabs, Beautifully Crafted
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-xl">
              Karachi&apos;s bespoke modest wear crafted with exquisite fabrics, fine stonework and artisan beadwork. Direct from Bolton Market artisans to your doorstep.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#catalog"
                className="px-6 py-3 bg-[#FAF8F5] text-[#171717] hover:bg-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Shop Abayas</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => {
                  setCurrentView('wholesale');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-[#FAF8F5] border border-white/30 text-xs font-bold uppercase tracking-wider rounded-lg transition-all backdrop-blur-xs flex items-center gap-2 cursor-pointer"
              >
                <span>Wholesale B2B</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="pt-4 flex items-center gap-6 text-xs text-neutral-400 border-t border-white/15">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cash on Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Open Parcel Checking</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Starting MOQ 12 Pcs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop By Category Section (Circular Avatar Pills with Swipe) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6 pb-2 border-b border-[#E2D6C5]">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8C7A6B] block">
              COLLECTIONS
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#171717]">
              Shop By Category
            </h2>
          </div>
          <span className="text-xs font-medium text-[#8C7A6B] flex items-center gap-1">
            SWIPE <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Circular Category Avatars Carousel */}
        <div className="flex items-center gap-6 sm:gap-10 overflow-x-auto pb-4 no-scrollbar">
          <button
            onClick={() => setActiveCategory('plain')}
            className="flex flex-col items-center gap-2.5 shrink-0 group cursor-pointer focus:outline-none"
          >
            <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 p-0.5 transition-all ${
              activeCategory === 'plain' ? 'border-[#171717] scale-105 shadow-md' : 'border-transparent group-hover:border-[#9B804E]'
            }`}>
              <div className="w-full h-full rounded-full overflow-hidden bg-neutral-900">
                <img
                  src="/assets/aistudio/Image_3_5f0ec3e8.png"
                  alt="Plain & Simple"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <span className={`text-xs font-bold tracking-wide uppercase transition-colors ${
              activeCategory === 'plain' ? 'text-[#171717]' : 'text-[#66594C] group-hover:text-[#171717]'
            }`}>
              Plain &amp; Simple
            </span>
          </button>

          <button
            onClick={() => setActiveCategory('stonework')}
            className="flex flex-col items-center gap-2.5 shrink-0 group cursor-pointer focus:outline-none"
          >
            <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 p-0.5 transition-all ${
              activeCategory === 'stonework' ? 'border-[#171717] scale-105 shadow-md' : 'border-transparent group-hover:border-[#9B804E]'
            }`}>
              <div className="w-full h-full rounded-full overflow-hidden bg-[#2D2319]">
                <img
                  src="/assets/aistudio/Image_1_4854a278.png"
                  alt="Stone Work & Pearls"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <span className={`text-xs font-bold tracking-wide uppercase transition-colors ${
              activeCategory === 'stonework' ? 'text-[#171717]' : 'text-[#66594C] group-hover:text-[#171717]'
            }`}>
              Stone Work
            </span>
          </button>

          <button
            onClick={() => setActiveCategory('printed')}
            className="flex flex-col items-center gap-2.5 shrink-0 group cursor-pointer focus:outline-none"
          >
            <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 p-0.5 transition-all ${
              activeCategory === 'printed' ? 'border-[#171717] scale-105 shadow-md' : 'border-transparent group-hover:border-[#9B804E]'
            }`}>
              <div className="w-full h-full rounded-full overflow-hidden bg-[#948373]">
                <img
                  src="/assets/aistudio/Image_3_5f0ec3e8.png"
                  alt="Printed Abayas"
                  className="w-full h-full object-cover object-bottom group-hover:scale-110 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <span className={`text-xs font-bold tracking-wide uppercase transition-colors ${
              activeCategory === 'printed' ? 'text-[#171717]' : 'text-[#66594C] group-hover:text-[#171717]'
            }`}>
              Printed Abayas
            </span>
          </button>

          <button
            onClick={() => setActiveCategory('hijabs')}
            className="flex flex-col items-center gap-2.5 shrink-0 group cursor-pointer focus:outline-none"
          >
            <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 p-0.5 transition-all ${
              activeCategory === 'hijabs' ? 'border-[#171717] scale-105 shadow-md' : 'border-transparent group-hover:border-[#9B804E]'
            }`}>
              <div className="w-full h-full rounded-full overflow-hidden bg-[#88786A]">
                <img
                  src="/assets/aistudio/Image_5_1e26a4f2.png"
                  alt="Georgette Hijabs"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <span className={`text-xs font-bold tracking-wide uppercase transition-colors ${
              activeCategory === 'hijabs' ? 'text-[#171717]' : 'text-[#66594C] group-hover:text-[#171717]'
            }`}>
              Georgette Hijabs
            </span>
          </button>

          <button
            onClick={() => setActiveCategory('all')}
            className="flex flex-col items-center gap-2.5 shrink-0 group cursor-pointer focus:outline-none"
          >
            <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 p-0.5 transition-all ${
              activeCategory === 'all' ? 'border-[#171717] scale-105 shadow-md' : 'border-transparent group-hover:border-[#9B804E]'
            }`}>
              <div className="w-full h-full rounded-full flex items-center justify-center bg-[#E5DACD] text-[#171717] font-serif-luxury font-bold text-sm">
                VIEW ALL
              </div>
            </div>
            <span className={`text-xs font-bold tracking-wide uppercase transition-colors ${
              activeCategory === 'all' ? 'text-[#171717]' : 'text-[#66594C] group-hover:text-[#171717]'
            }`}>
              All Silhouettes
            </span>
          </button>
        </div>
      </section>

      {/* Fresh Off The Loom - New Arrivals Catalog Section (Matches screenshot grid) */}
      <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-[#E2D6C5]">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8C7A6B] block">
              FRESH OFF THE LOOM
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#171717]">
              New Arrivals
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#DCD0C0] rounded-lg text-xs font-medium text-[#4A3F33] hover:border-[#171717] transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>FILTER ({filteredProducts.length})</span>
            </button>
          </div>
        </div>

        {/* Product Grid (2 columns on mobile, 4 columns on large desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredProducts.map((product) => {
            const currentSize = selectedSizes[product.id] || product.sizes[0].length;
            const currentColor = selectedColors[product.id] || product.colors[0].name;
            const isFav = wishlist.includes(product.id);

            return (
              <div
                key={product.id}
                onClick={() => openProduct(product)}
                className="group bg-white rounded-xl overflow-hidden border border-[#E7DDD0] hover:border-[#C4B39F] hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer relative"
              >
                {/* Product Image Slot with Badges and Wishlist Button */}
                <div className="relative aspect-[3/4] bg-[#F3EDE4] overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-top group-hover:scale-104 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <span className="bg-[#171717] text-white text-[9px] font-bold tracking-wider px-2 py-0.5 uppercase rounded-sm shadow-sm">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    aria-label="Save to Wishlist"
                    className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#171717] hover:bg-white transition-all shadow-sm cursor-pointer"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isFav ? 'fill-red-500 text-red-500' : 'text-[#171717]'
                      }`}
                    />
                  </button>
                </div>

                {/* Details Container */}
                <div className="p-3.5 sm:p-4 flex flex-col flex-grow space-y-2.5">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-[#8C7A6B] block">
                    {product.category}
                  </span>

                  <h3 className="font-serif-luxury font-semibold text-sm sm:text-base text-[#171717] line-clamp-1 group-hover:text-[#9B804E] transition-colors">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 font-mono">
                    <span className="font-bold text-sm sm:text-base text-[#171717] tabular-nums">
                      PKR {product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-neutral-400 line-through tabular-nums">
                        PKR {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Size Selector Buttons */}
                  <div className="flex items-center gap-1.5 pt-1">
                    {product.sizes.map((s) => (
                      <button
                        key={s.length}
                        type="button"
                        onClick={(e) => handleSizeSelect(product.id, s.length, e)}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                          currentSize === s.length
                            ? 'bg-[#171717] text-white border-[#171717] font-bold'
                            : 'bg-white text-neutral-700 border-[#D8CCBD] hover:border-neutral-500'
                        }`}
                      >
                        {s.length}
                      </button>
                    ))}
                  </div>

                  {/* Color Swatches */}
                  <div className="flex items-center gap-1.5 pt-0.5">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={(e) => handleColorSelect(product.id, c.name, e)}
                        title={c.name}
                        aria-label={`Select ${c.name}`}
                        className={`w-4 h-4 rounded-full border transition-all cursor-pointer ${
                          currentColor === c.name
                            ? 'ring-2 ring-[#171717] ring-offset-1 scale-110'
                            : 'border-black/20 hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>

                  {/* Add To Bag Button */}
                  <div className="pt-2 mt-auto">
                    <button
                      type="button"
                      onClick={(e) => handleQuickAdd(product, e)}
                      className="w-full py-2 bg-[#171717] hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>ADD</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Georgette Hijab Bar Section (Matches screenshot) */}
      <section id="hijab-bar" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F4ECE1] rounded-2xl p-6 sm:p-10 border border-[#E2D5C3] shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#DFD1BD]">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8C7A6B] block">
                ATELIER ESSENTIALS
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#171717]">
                Georgette Hijab Bar
              </h2>
              <p className="text-xs sm:text-sm text-[#5C5044] mt-1 max-w-xl">
                Soft, breathable, non-slip double georgette with artisan hem finishes. Tap to preview fabric shades:
              </p>
            </div>

            <div className="text-left lg:text-right shrink-0">
              <span className="font-serif-luxury text-2xl font-bold text-[#171717] font-mono">
                PKR 950
              </span>
              <span className="text-[11px] uppercase tracking-wider text-[#8C7A6B] block">
                PER PIECE • FULL COVERAGE
              </span>
            </div>
          </div>

          {/* Color shade picker buttons */}
          <div className="pt-6 space-y-6">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {HIJAB_SHADES.map((shade) => {
                const isSelected = selectedHijabShade.id === shade.id;
                return (
                  <button
                    key={shade.id}
                    onClick={() => setSelectedHijabShade(shade)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs font-medium tracking-wide transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#171717] text-white border-[#171717] shadow-sm'
                        : 'bg-white text-[#3D3328] border-[#D8CCBD] hover:border-[#171717]'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/20"
                      style={{ backgroundColor: shade.hex }}
                    />
                    <span className="uppercase text-[11px] font-semibold">{shade.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Shade Preview Card */}
            <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#E3D7C5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-lg border border-black/10 shrink-0 shadow-inner flex items-center justify-center"
                  style={{ backgroundColor: selectedHijabShade.hex }}
                >
                  <Sparkles className="w-5 h-5 text-white/70" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[#171717]">
                    Selected: {selectedHijabShade.name}
                  </h4>
                  <p className="text-xs text-[#6B5E52]">
                    {selectedHijabShade.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddHijabShade}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#171717] hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  QUICK BUY
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spotlight: Karachi Karigari - The Art of Hand Embroidery (Matches screenshot) */}
      <section id="karigari" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-[#1E1B17] text-white shadow-xl border border-[#3A332A]">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            {/* Visual Column */}
            <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-full overflow-hidden bg-neutral-900">
              <img
                src="/assets/aistudio/Image_1_4854a278.png"
                alt="Karachi Karigari Hand Embroidery"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-bold tracking-widest uppercase text-white rounded-sm">
                  KARACHI KARIGARI
                </span>
              </div>
            </div>

            {/* Narrative Column */}
            <div className="p-8 sm:p-12 lg:p-16 space-y-6">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#C4A977] block">
                HERITAGE CRAFT
              </span>

              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-semibold leading-tight text-white">
                The Art of Hand Embroidery
              </h2>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                Hand-set pearls, cut-dana beads, and subtle stonework intricately needle-threaded by generational artisans in our Karachi studio. Built for modesty without compromise on haute couture texture. Sourced straight from Bombay Bazar fabric hubs.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2.5 p-3 rounded-lg bg-white/5 border border-white/10 text-xs">
                  <Scissors className="w-4 h-4 text-[#C4A977] shrink-0" />
                  <span className="font-medium text-neutral-200">NO GLUE / PURE STITCHED</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-lg bg-white/5 border border-white/10 text-xs">
                  <Sparkles className="w-4 h-4 text-[#C4A977] shrink-0" />
                  <span className="font-medium text-neutral-200">EVERLASTING LUSTER</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => openWhatsAppModal('Assalam-o-Alaikum, I want to inquire about custom bespoke hand embroidery for a wedding abaya.')}
                  className="px-5 py-2.5 bg-[#C4A977] hover:bg-[#b59863] text-[#171717] text-xs font-bold uppercase tracking-wider rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Inquire Bespoke Karigari</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Seamless Ways To Order: Retail vs Boutique Reseller (Matches screenshot) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8C7A6B] block">
            TWO SEAMLESS WAYS TO ORDER
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#171717]">
            Retail Shopper or Boutique Reseller?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1: Retail Shopper */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E3D7C5] shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#FAF6F0] border border-[#E0D3C2] flex items-center justify-center text-[#171717]">
                <PackageOpen className="w-6 h-6 text-[#9B804E]" />
              </div>
              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-[#171717]">
                  Retail Shopper Service
                </h3>
                <span className="text-[11px] uppercase tracking-wider text-[#8C7A6B] font-semibold">
                  SINGLE PIECE DIRECT TO HOME
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#5C5044] leading-relaxed">
                Single piece delivery across Pakistan. Cash on delivery available at your doorstep with our 7-day hassle-free size &amp; fabric exchange guarantee.
              </p>

              <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#EBE1D3] flex items-center gap-2 text-xs font-medium text-[#2E251E]">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>COD Available Nationwide (Trax / Leopards)</span>
              </div>
            </div>

            <a
              href="#catalog"
              className="w-full py-3 bg-[#FAF8F5] hover:bg-[#F3ECE1] border border-[#D5C7B5] text-[#171717] text-xs font-bold uppercase tracking-wider rounded-lg transition-colors text-center cursor-pointer block"
            >
              BROWSE CATALOG
            </a>
          </div>

          {/* Card 2: Wholesale & Bulk Buyers */}
          <div className="bg-[#171717] text-[#FAF8F5] rounded-2xl p-6 sm:p-8 border border-neutral-800 shadow-md flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-[#C4A977]">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-white">
                  Wholesale &amp; Bulk Buyers
                </h3>
                <span className="text-[11px] uppercase tracking-wider text-[#C4A977] font-semibold">
                  MOQ: 12 PIECES | DIRECT ATELIER
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Special bundle tiered pricing for boutiques in the UK, UAE, and Pakistan. Bolton Market wholesale rates, custom tag branding, and export-grade bubble packaging.
              </p>

              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-neutral-800/80 border border-neutral-700 flex justify-between items-center">
                  <span className="text-neutral-300">TIER 1 (12 - 24 PCS)</span>
                  <span className="text-[#C4A977] font-bold">UP TO 35% OFF RETAIL</span>
                </div>
                <div className="p-2.5 rounded-lg bg-neutral-800/80 border border-neutral-700 flex justify-between items-center">
                  <span className="text-neutral-300">TIER 2 (25+ PCS / FULL BUNDLES)</span>
                  <span className="text-emerald-400 font-bold">KARACHI MANDI FLAT RATE</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setCurrentView('wholesale');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full py-3 bg-[#FAF8F5] hover:bg-white text-[#171717] text-xs font-bold uppercase tracking-wider rounded-lg transition-colors text-center cursor-pointer flex items-center justify-center gap-2"
            >
              <span>GET WHOLESALE CATALOG &amp; RATES</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Verified Pakistani Customers: Words of Elegance (Matches screenshot) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-[#E2D6C5]">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8C7A6B] block">
              VERIFIED PAKISTANI CUSTOMERS
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#171717]">
              Words of Elegance
            </h2>
          </div>
          <div className="flex items-center gap-1.5 font-bold text-sm text-[#171717]">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>4.9 / 5.0</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl p-6 border border-[#E7DDD0] shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-[#3D3328] italic leading-relaxed">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-[#F0E6D8] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#171717]">{review.author}</h4>
                  <span className="text-[11px] text-neutral-400">{review.location}</span>
                </div>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 bg-[#FAF6F0] text-[#7A6443] border border-[#E5DACD] rounded">
                  {review.orderType}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Value Props 4-Grid (Matches screenshot) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white rounded-xl p-5 border border-[#E5DACD] space-y-2">
            <ShieldCheck className="w-5 h-5 text-[#9B804E]" />
            <h4 className="font-bold text-xs sm:text-sm text-[#171717]">
              100% Premium Fabric
            </h4>
            <p className="text-xs text-neutral-500 leading-snug">
              Imported Korean Nida &amp; Silk Georgette with opaque weave.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-[#E5DACD] space-y-2">
            <Scissors className="w-5 h-5 text-[#9B804E]" />
            <h4 className="font-bold text-xs sm:text-sm text-[#171717]">
              Artisan Handwork
            </h4>
            <p className="text-xs text-neutral-500 leading-snug">
              Hand-stitched pearls, cut-dana beads &amp; zardozi needles.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-[#E5DACD] space-y-2">
            <Truck className="w-5 h-5 text-[#9B804E]" />
            <h4 className="font-bold text-xs sm:text-sm text-[#171717]">
              COD Nationwide
            </h4>
            <p className="text-xs text-neutral-500 leading-snug">
              Safe door-to-door delivery with open parcel inspection.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-[#E5DACD] space-y-2">
            <PackageOpen className="w-5 h-5 text-[#9B804E]" />
            <h4 className="font-bold text-xs sm:text-sm text-[#171717]">
              Karachi Mandi Rates
            </h4>
            <p className="text-xs text-neutral-500 leading-snug">
              Direct Bolton Market supply without distributor markups.
            </p>
          </div>
        </div>
      </section>

      {/* Join Our Circle - Styled by You (@HIJAB_UL_FARWA123) (Matches screenshot) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-1 mb-8">
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8C7A6B] block">
            JOIN OUR CIRCLE
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#171717]">
            Styled by You
          </h2>
          <span className="text-xs text-[#8C7A6B] font-medium block">
            @HIJAB_UL_FARWA123
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-6">
          <div className="aspect-square rounded-xl overflow-hidden bg-neutral-900 border border-[#E3D7C5]">
            <img
              src="/assets/aistudio/Image_3_5f0ec3e8.png"
              alt="Styled by you modest look 1"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="aspect-square rounded-xl overflow-hidden bg-neutral-900 border border-[#E3D7C5]">
            <img
              src="/assets/aistudio/Image_5_1e26a4f2.png"
              alt="Styled by you modest look 2"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="aspect-square rounded-xl overflow-hidden bg-neutral-900 border border-[#E3D7C5]">
            <img
              src="/assets/aistudio/Image_1_4854a278.png"
              alt="Styled by you modest look 3"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="text-center pt-4">
          <span className="inline-flex items-center gap-2 text-xs text-neutral-500 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            84.7K MODEST WOMEN ON INSTAGRAM
          </span>
        </div>
      </section>

      {/* Floating Sticky WhatsApp Button */}
      <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-40">
        <button
          onClick={() => openWhatsAppModal('Assalam-o-Alaikum, I am browsing your abayas and would like to place an order via WhatsApp!')}
          className="flex items-center gap-2 px-4 py-3 bg-[#171717] hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-2xl transition-all hover:scale-105 border border-white/20 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <span className="hidden sm:inline">WHATSAPP ORDER</span>
          <span className="sm:hidden">ORDER</span>
        </button>
      </div>
    </div>
  );
};
