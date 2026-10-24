import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import { ACCESSORIES, REVIEWS } from '../data/catalog';
import {
  ArrowLeft,
  Heart,
  Star,
  MessageCircle,
  Truck,
  ShieldCheck,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Ruler,
  Check,
  Plus,
  Share2,
} from 'lucide-react';

export const ProductDetailView: React.FC = () => {
  const {
    selectedProduct,
    setCurrentView,
    addToCart,
    wishlist,
    toggleWishlist,
    openWhatsAppModal,
    setIsSizeGuideOpen,
    showToast,
  } = useShop();

  const product = selectedProduct;
  const isFav = wishlist.includes(product.id);

  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Jet Black');
  const [selectedLength, setSelectedLength] = useState<number>(54);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>('fabric');
  const [quantity, setQuantity] = useState<number>(1);

  // Review submission state
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewCity, setNewReviewCity] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [localReviews, setLocalReviews] = useState(REVIEWS);

  const toggleAccordion = (section: string) => {
    setOpenAccordion(prev => (prev === section ? null : section));
  };

  const handleAddToBag = () => {
    addToCart(product, selectedColor, selectedLength, quantity, false);
  };

  const handleOrderWhatsApp = () => {
    const text = `Assalam-o-Alaikum! I want to order the "${product.name}" from Hijab Ul Farwa.\n• Color: ${selectedColor}\n• Abaya Length: ${selectedLength} inches\n• Price: PKR ${product.price.toLocaleString()}\n• Delivery: Cash on Delivery\nPlease confirm availability & dispatch timeline.`;
    openWhatsAppModal(text);
  };

  const handleAddAccessory = (acc: typeof ACCESSORIES[0]) => {
    const accessoryProduct: Product = {
      id: acc.id,
      name: acc.name,
      slug: acc.name.toLowerCase().replace(/\s+/g, '-'),
      sku: `HUF-ACC-${acc.id}`,
      category: 'HIJAB ESSENTIALS',
      categoryGroup: 'hijabs',
      price: acc.price,
      wholesalePrice: Math.round(acc.price * 0.7),
      wholesaleMinQty: 12,
      fabric: 'Textured Breathable Accessory',
      description: acc.variant,
      craftsmanshipNote: 'Curated accessory pairing',
      colors: [{ name: 'Standard', hex: '#111111' }],
      sizes: [{ length: 0, heightGuide: 'One Size', inStock: true }],
      images: [acc.image],
      rating: 4.9,
      reviewsCount: 30,
      includesMatchingHijab: false,
    };
    addToCart(accessoryProduct, acc.variant, 0, 1, false);
  };

  const handleAddReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor,
      location: newReviewCity || 'Karachi',
      size: selectedLength,
      rating: newReviewRating,
      comment: newReviewComment,
      date: 'Just now',
      verifiedBuyer: true,
      orderType: 'COD ORDER' as const,
    };

    setLocalReviews([newRev, ...localReviews]);
    setNewReviewAuthor('');
    setNewReviewCity('');
    setNewReviewComment('');
    setShowAddReview(false);
    showToast('Thank you! Your verified review has been published.');
  };

  return (
    <div className="pb-24">
      {/* Top Breadcrumb & Back Bar */}
      <div className="bg-[#FAF8F5] border-b border-[#EAE2D5] sticky top-16 sm:top-20 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <button
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-xs font-semibold text-[#524538] hover:text-[#171717] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO COLLECTION</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                showToast('Product link copied to clipboard');
              }}
              aria-label="Share Link"
              className="p-1.5 text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Wishlist"
              className="p-1.5 text-neutral-500 hover:text-red-500 transition-colors cursor-pointer"
            >
              <Heart
                className={`w-4 h-4 ${
                  isFav ? 'fill-red-500 text-red-500' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 lg:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Image Lookbook Gallery (Matches screenshot) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden bg-[#F3EDE4] border border-[#E5DACD] shadow-sm">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />

              {/* Bespoke Handcrafted Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-[#FAF8F5]/90 backdrop-blur-md text-[#171717] text-[10px] font-bold tracking-widest px-3 py-1 uppercase rounded-sm border border-[#E0D5C7] shadow-xs">
                  BESPOKE HANDCRAFTED
                </span>
              </div>

              {/* Lookbook Indicator (01/03) */}
              <div className="absolute bottom-4 left-4 z-10">
                <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-mono tracking-wider px-2.5 py-1 uppercase rounded-sm">
                  LOOKBOOK 0{activeImageIndex + 1}/0{product.images.length}
                </span>
              </div>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5">
                {product.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'w-6 bg-white'
                        : 'w-1.5 bg-white/50 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-[#171717] ring-1 ring-[#171717]'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module (Matches screenshot) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Rating, Title, SKU */}
            <div className="space-y-2 border-b border-[#E5DACD] pb-5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-amber-500">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  <span className="font-bold text-[#171717] font-mono">
                    {product.rating}
                  </span>
                  <span className="text-neutral-500">
                    ({product.reviewsCount} Reviews)
                  </span>
                </div>

                <span className="font-mono text-[11px] text-neutral-400">
                  SKU: {product.sku}
                </span>
              </div>

              <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#171717] leading-snug">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#171717] font-mono tabular-nums">
                  PKR {product.price.toLocaleString()}
                </span>
                <span className="text-xs text-neutral-500">Inclusive of all taxes</span>
              </div>

              {/* Wholesale B2B Banner Note */}
              <div className="mt-3 p-2.5 rounded-lg bg-[#F4EDE2] border border-[#DFD1BE] flex items-center justify-between text-xs">
                <span className="text-[#5C4D3E]">
                  Wholesale Rate: <strong className="text-[#171717] font-mono">PKR {product.wholesalePrice.toLocaleString()}</strong> / piece
                </span>
                <button
                  onClick={() => {
                    setCurrentView('wholesale');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="font-bold text-[#171717] hover:underline uppercase text-[10px] tracking-wider cursor-pointer"
                >
                  12+ PCS TIER →
                </button>
              </div>
            </div>

            {/* Color Shade Selector */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-[#171717]">
                  COLOR: <span className="font-normal text-neutral-600">{selectedColor}</span>
                </span>
                <span className="text-[11px] text-neutral-400 font-medium">
                  {product.colors.length} Shades
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                {product.colors.map((c) => {
                  const isSelected = selectedColor === c.name;
                  return (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer ${
                        isSelected
                          ? 'border-[#171717] scale-110 shadow-sm'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {isSelected && (
                        <Check
                          className={`w-4 h-4 ${
                            c.hex === '#FFFFFF' || c.hex === '#F4EFEA' || c.hex === '#D6C7B2'
                              ? 'text-black'
                              : 'text-white'
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Abaya Length Selector with Size Guide Link */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-[#171717]">
                  ABAYA LENGTH: <span className="font-mono text-neutral-600">{selectedLength} IN</span>
                </span>

                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="flex items-center gap-1 text-[#9B804E] hover:text-[#7A643E] font-medium transition-colors cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span className="underline uppercase text-[11px] font-bold">SIZE GUIDE</span>
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((s) => {
                  const isSelected = selectedLength === s.length;
                  return (
                    <button
                      key={s.length}
                      onClick={() => setSelectedLength(s.length)}
                      className={`py-2.5 px-2 rounded-lg border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#171717] text-white border-[#171717] shadow-sm'
                          : 'bg-white text-neutral-800 border-[#D8CCBD] hover:border-neutral-500'
                      }`}
                    >
                      <span className="block font-serif-luxury font-bold text-sm">
                        {s.length}
                      </span>
                      <span className={`block text-[10px] ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                        {s.heightGuide}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3 pt-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                QUANTITY:
              </span>
              <div className="flex items-center border border-[#D5C7B6] rounded-lg bg-white overflow-hidden text-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 hover:bg-[#F2ECE1] transition-colors cursor-pointer font-bold"
                >
                  -
                </button>
                <span className="px-4 py-1.5 font-mono font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 hover:bg-[#F2ECE1] transition-colors cursor-pointer font-bold"
                >
                  +
                </button>
              </div>
              <span className="text-[11px] text-emerald-700 font-medium">
                In Stock at Karachi Atelier
              </span>
            </div>

            {/* Action Buttons: Add to Bag & Order Instantly via WhatsApp (Matches screenshot) */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleAddToBag}
                className="w-full py-3.5 bg-[#171717] hover:bg-neutral-800 text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>ADD TO SHOPPING BAG</span>
              </button>

              <button
                onClick={handleOrderWhatsApp}
                className="w-full py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>ORDER INSTANTLY VIA WHATSAPP</span>
              </button>
            </div>

            {/* Trust Badges (Matches screenshot) */}
            <div className="pt-2 space-y-3 text-xs text-[#524538] border-t border-[#E5DACD]">
              <div className="flex items-start gap-3">
                <Truck className="w-4 h-4 text-[#171717] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#171717] block">Cash on Delivery Pakistan-wide</strong>
                  <span>Inspect upon arrival, payment right at your doorstep with open parcel check.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-[#171717] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#171717] block">Premium Korean Nidha &amp; Silk Georgette</strong>
                  <span>Wrinkle-resistant, opaque luxury drape suited for Pakistani weather.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <RefreshCw className="w-4 h-4 text-[#171717] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#171717] block">Easy Exchange within 7 Days</strong>
                  <span>Hassle-free size swaps coordinated through our WhatsApp desk.</span>
                </div>
              </div>
            </div>

            {/* Accordions (Matches screenshot) */}
            <div className="border-t border-[#E5DACD] pt-4 divide-y divide-[#E5DACD]">
              {/* Fabric & Craftsmanship */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('fabric')}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#171717] cursor-pointer"
                >
                  <span>Fabric &amp; Craftsmanship</span>
                  {openAccordion === 'fabric' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'fabric' && (
                  <div className="pt-3 text-xs text-[#5E5144] leading-relaxed space-y-2 animate-in fade-in duration-150">
                    <p>{product.description}</p>
                    <p className="bg-[#F6EFE5] p-2.5 rounded-lg border border-[#E3D7C5]">
                      <strong>Artisan Touch:</strong> {product.craftsmanshipNote}
                    </p>
                    <p><strong>Care Advice:</strong> Dry clean recommended for heavy zardozi stonework. For plain cuts, gentle cold machine wash with mild detergent and hang to drip dry.</p>
                  </div>
                )}
              </div>

              {/* Size & Fit Advice */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('sizing')}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#171717] cursor-pointer"
                >
                  <span>Size &amp; Fit Advice</span>
                  {openAccordion === 'sizing' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'sizing' && (
                  <div className="pt-3 text-xs text-[#5E5144] leading-relaxed space-y-2 animate-in fade-in duration-150">
                    <p>Standard silhouette is a classic flared drape with relaxed chest tolerance (42&quot; - 46&quot; circumference).</p>
                    <p>If you wear modest platform flats or heels, choose one size longer (e.g. 56&quot; instead of 54&quot;).</p>
                    <button
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-[#9B804E] font-bold underline cursor-pointer"
                    >
                      Open Interactive Height &amp; Length Calculator →
                    </button>
                  </div>
                )}
              </div>

              {/* Delivery & COD Timeline */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion('delivery')}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#171717] cursor-pointer"
                >
                  <span>Delivery &amp; COD Timeline</span>
                  {openAccordion === 'delivery' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === 'delivery' && (
                  <div className="pt-3 text-xs text-[#5E5144] leading-relaxed space-y-2 animate-in fade-in duration-150">
                    <p><strong>Karachi Hub:</strong> 24 to 48 hours via local courier dispatch.</p>
                    <p><strong>Lahore, Islamabad, Rawalpindi, Faisalabad:</strong> 2 to 3 business days via Trax &amp; Leopards Express.</p>
                    <p><strong>Remote Cities &amp; Balochistan:</strong> 3 to 4 business days.</p>
                    <p><strong>Worldwide Exports:</strong> 4 to 7 business days via DHL/FedEx Express.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Pair With Precision - Complete The Look (Matches screenshot) */}
        <section className="mt-16 pt-10 border-t border-[#E5DACD]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8C7A6B] block">
                PAIR WITH PRECISION
              </span>
              <h2 className="font-serif-luxury text-2xl font-semibold text-[#171717]">
                Complete The Look
              </h2>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-[#FAF6F0] border border-[#E0D5C7] text-[#7A6443] rounded">
              CURATED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ACCESSORIES.slice(0, 2).map((acc) => (
              <div
                key={acc.id}
                className="bg-white rounded-xl p-4 border border-[#E5DACD] flex items-center justify-between gap-4 shadow-xs"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-16 h-16 rounded-lg bg-neutral-900 overflow-hidden shrink-0 border border-black/10">
                    <img
                      src={acc.image}
                      alt={acc.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs sm:text-sm text-[#171717]">
                      {acc.name}
                    </h4>
                    <p className="text-[11px] text-neutral-500">{acc.variant}</p>
                    <span className="text-xs font-bold font-mono text-[#171717] pt-1 block">
                      PKR {acc.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleAddAccessory(acc)}
                  className="px-3.5 py-1.5 bg-[#171717] hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer shrink-0 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>ADD</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Customer Reviews Section (Matches screenshot) */}
        <section className="mt-16 pt-10 border-t border-[#E5DACD]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8C7A6B] block">
                VERIFIED CLIENT FEEDBACK
              </span>
              <h2 className="font-serif-luxury text-2xl font-semibold text-[#171717]">
                Customer Reviews
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 font-bold text-sm text-[#171717]">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>4.9 / 5.0</span>
              </div>

              <button
                onClick={() => setShowAddReview(!showAddReview)}
                className="px-3 py-1.5 border border-[#171717] text-[#171717] hover:bg-[#171717] hover:text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                {showAddReview ? 'Cancel' : 'Write Review'}
              </button>
            </div>
          </div>

          {/* New Review Form Drawer */}
          {showAddReview && (
            <form onSubmit={handleAddReviewSubmit} className="mb-8 p-5 bg-white rounded-xl border border-[#DED4C7] space-y-4 animate-in fade-in duration-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                Share Your Experience with {product.name}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maryam Siddiqui"
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-[#D5C9B8] bg-[#FAF8F5]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
                    City / Area
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. DHA Phase 6, Karachi"
                    value={newReviewCity}
                    onChange={(e) => setNewReviewCity(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-[#D5C9B8] bg-[#FAF8F5]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
                  Rating
                </label>
                <div className="flex items-center gap-1 text-amber-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewReviewRating(star)}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          newReviewRating >= star ? 'fill-amber-500' : 'text-neutral-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
                  Your Review / Fit Comments *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell us about the fabric drape, handwork, opacity, and sizing..."
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-[#D5C9B8] bg-[#FAF8F5]"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-[#171717] hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg uppercase tracking-wider transition-colors cursor-pointer"
              >
                Submit Verified Review
              </button>
            </form>
          )}

          {/* Reviews List */}
          <div className="space-y-4">
            {localReviews.slice(0, 3).map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-xl p-5 sm:p-6 border border-[#E7DDD0] shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#F3EDE4] text-[#171717] font-bold text-xs flex items-center justify-center border border-[#E2D5C3]">
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#171717]">
                        {rev.author}
                      </h4>
                      <p className="text-[11px] text-neutral-500">
                        {rev.location} • Size {rev.size}&quot;
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#453A30] leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>

                <div className="flex items-center gap-2 text-[10px] text-emerald-700 pt-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Verified Buyer via COD</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
