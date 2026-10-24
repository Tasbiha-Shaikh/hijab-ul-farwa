import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/catalog';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, openProduct } = useShop();
  const [term, setTerm] = useState('');

  const filteredProducts = useMemo(() => {
    if (!term.trim()) return [];
    const query = term.toLowerCase();
    return PRODUCTS.filter(
      p =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.fabric.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
  }, [term]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FAF8F5] rounded-xl max-w-xl w-full overflow-hidden shadow-2xl border border-[#DED4C7] animate-in fade-in slide-in-from-top-4 duration-200">
        {/* Search Input Bar */}
        <div className="p-4 bg-white border-b border-[#E5DACD] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#8C7A6B] shrink-0" />
          <input
            type="text"
            autoFocus
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search by abaya style, zardozi stonework, nida, georgette..."
            className="w-full text-sm bg-transparent border-none focus:outline-none text-[#171717] placeholder:text-[#9E8E80]"
          />
          {term && (
            <button
              onClick={() => setTerm('')}
              className="text-neutral-400 hover:text-neutral-600 p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            aria-label="Close search"
            className="text-xs font-semibold px-2.5 py-1 text-neutral-500 hover:text-neutral-800 cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Results or Suggested Tags */}
        <div className="p-5 max-h-[60vh] overflow-y-auto">
          {term.trim() === '' ? (
            <div className="space-y-4">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8C7A6B] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#9B804E]" />
                <span>Popular Atelier Searches</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {['Noor Luxury Handwork', 'Plain Nida Minimalist', 'Stone Work & Pearls', 'Coat Style Abaya', 'Georgette Hijabs', 'Wholesale Lots'].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => setTerm(tag)}
                      className="px-3 py-1.5 rounded-full bg-white border border-[#E0D5C7] text-[#3D3328] hover:border-[#171717] hover:bg-[#F5EFE6] transition-colors cursor-pointer"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="space-y-3">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">
                Found {filteredProducts.length} Atelier Styles
              </span>
              <div className="divide-y divide-[#EBE2D5]">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      openProduct(product);
                      setIsSearchOpen(false);
                      setTerm('');
                    }}
                    className="py-3 flex items-center justify-between gap-3 group cursor-pointer hover:bg-white/60 px-2 rounded-lg transition-colors"
                  >
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-[#8C7A6B] block">
                        {product.category}
                      </span>
                      <h4 className="text-sm font-semibold text-[#171717] group-hover:text-[#9B804E] transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs text-neutral-500 line-clamp-1">
                        {product.fabric}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-bold font-mono text-[#171717]">
                        PKR {product.price.toLocaleString()}
                      </span>
                      <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-[#171717] group-hover:translate-x-1 transition-all ml-auto mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-neutral-500 space-y-2">
              <p>No abayas or hijabs found matching &quot;{term}&quot;.</p>
              <p className="text-neutral-400">
                Try searching &quot;Noor&quot;, &quot;Zardozi&quot;, &quot;Georgette&quot;, or tap WhatsApp for custom stock check.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
