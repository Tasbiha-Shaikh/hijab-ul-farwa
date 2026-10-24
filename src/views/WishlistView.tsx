import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/catalog';
import { Heart, Plus, ArrowLeft, Trash2 } from 'lucide-react';

export const WishlistView: React.FC = () => {
  const { wishlist, toggleWishlist, openProduct, addToCart, setCurrentView } = useShop();

  const savedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E2D5C3]">
        <div className="space-y-1">
          <button
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-xs font-semibold text-[#8C7A6B] hover:text-[#171717] transition-colors cursor-pointer mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO STORE</span>
          </button>
          <h1 className="font-serif-luxury text-3xl font-bold text-[#171717]">
            Your Saved Wishlist ({savedProducts.length})
          </h1>
          <p className="text-xs text-[#6B5E52]">
            Keep track of your favorite bespoke abayas and ceremonial handwork pieces.
          </p>
        </div>
      </div>

      {savedProducts.length === 0 ? (
        <div className="py-16 text-center space-y-4 bg-white rounded-2xl border border-[#E5DACD] p-8">
          <Heart className="w-12 h-12 text-[#D5C7B5] mx-auto stroke-1" />
          <h3 className="font-serif-luxury text-xl font-bold text-[#171717]">
            No items in your wishlist yet
          </h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Tap the heart icon on any abaya card to save pieces for later review or wedding gifting.
          </p>
          <button
            onClick={() => setCurrentView('home')}
            className="px-6 py-2.5 bg-[#171717] text-white text-xs font-bold uppercase rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Explore New Arrivals
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {savedProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => openProduct(p)}
              className="group bg-white rounded-xl overflow-hidden border border-[#E7DDD0] hover:border-[#171717] transition-all flex flex-col cursor-pointer shadow-xs"
            >
              <div className="relative aspect-[3/4] bg-neutral-900 overflow-hidden">
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(p.id);
                  }}
                  aria-label="Remove from Wishlist"
                  className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white text-red-500 shadow-sm cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 flex flex-col flex-grow justify-between space-y-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8C7A6B] block">
                    {p.category}
                  </span>
                  <h4 className="font-serif-luxury font-bold text-sm text-[#171717] group-hover:text-[#9B804E] transition-colors line-clamp-1">
                    {p.name}
                  </h4>
                  <span className="text-sm font-bold font-mono text-[#171717] pt-1 block">
                    PKR {p.price.toLocaleString()}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(p, p.colors[0]?.name || 'Jet Black', 54, 1, false);
                  }}
                  className="w-full py-2 bg-[#171717] hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>ADD TO BAG</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
