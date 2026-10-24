import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, CheckCircle, Ruler } from 'lucide-react';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();
  const [userHeightFt, setUserHeightFt] = useState('5');
  const [userHeightIn, setUserHeightIn] = useState('4');

  if (!isSizeGuideOpen) return null;

  // Calculate recommended abaya size based on height
  const totalInches = parseInt(userHeightFt, 10) * 12 + parseInt(userHeightIn, 10);
  let recommendedSize = 54;
  let reason = "Ideal for standard floor-length drape with modest flats or 1-inch heels.";

  if (totalInches <= 62) {
    recommendedSize = 52;
    reason = "Recommended for heights 5'0\" to 5'2\". Skims right above the floor.";
  } else if (totalInches <= 65) {
    recommendedSize = 54;
    reason = "Recommended for heights 5'3\" to 5'5\". Standard Pakistani best-selling size.";
  } else if (totalInches <= 67) {
    recommendedSize = 56;
    reason = "Recommended for heights 5'5\" to 5'7\". Full coverage without dragging.";
  } else {
    recommendedSize = 58;
    reason = "Recommended for heights 5'8\" and above or wearing elevated heels.";
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FAF8F5] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#DED4C7] animate-in fade-in duration-200">
        {/* Header */}
        <div className="bg-[#171717] text-white p-5 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <Ruler className="w-5 h-5 text-[#C4A977]" />
            <h3 className="font-serif-luxury font-semibold text-lg text-[#FAF8F5]">
              Atelier Abaya Sizing & Measurement Guide
            </h3>
          </div>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            aria-label="Close"
            className="text-neutral-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Interactive Height Calculator */}
          <div className="p-4 rounded-xl bg-white border border-[#E5DACD] space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#171717]">
              Instant Size Recommendation Calculator
            </h4>
            <p className="text-xs text-[#635649]">
              Select your natural height to find the perfect shoulder-to-floor length:
            </p>

            <div className="flex items-center gap-3">
              <div>
                <label className="text-[11px] font-semibold text-neutral-500 block mb-1">
                  Feet:
                </label>
                <select
                  value={userHeightFt}
                  onChange={(e) => setUserHeightFt(e.target.value)}
                  className="bg-[#FAF8F5] border border-[#D5C7B6] rounded-md px-3 py-1.5 text-xs font-semibold text-[#171717] focus:outline-none"
                >
                  <option value="4">4 Feet</option>
                  <option value="5">5 Feet</option>
                  <option value="6">6 Feet</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-neutral-500 block mb-1">
                  Inches:
                </label>
                <select
                  value={userHeightIn}
                  onChange={(e) => setUserHeightIn(e.target.value)}
                  className="bg-[#FAF8F5] border border-[#D5C7B6] rounded-md px-3 py-1.5 text-xs font-semibold text-[#171717] focus:outline-none"
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(n => (
                    <option key={n} value={n.toString()}>{n} Inches</option>
                  ))}
                </select>
              </div>

              <div className="ml-auto pl-4 border-l border-[#EFE8DE] text-right">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block">
                  Recommended Abaya Length
                </span>
                <span className="font-serif-luxury text-2xl font-bold text-[#171717]">
                  Size {recommendedSize}&quot;
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FAF8F5] text-xs text-[#4A3F35]">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{reason}</span>
            </div>
          </div>

          {/* Standard Atelier Sizing Matrix Table */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#171717]">
              Standard Silhouette Measurements (Inches)
            </h4>
            <div className="overflow-x-auto rounded-lg border border-[#E5DACD] bg-white">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#F5EFE6] text-[#3D3328] font-semibold border-b border-[#E5DACD]">
                  <tr>
                    <th className="py-2.5 px-3">Size (Length)</th>
                    <th className="py-2.5 px-3">Recommended Height</th>
                    <th className="py-2.5 px-3">Bust / Chest</th>
                    <th className="py-2.5 px-3">Sleeve Length</th>
                    <th className="py-2.5 px-3">Shoulder</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1E8DC] text-[#2C231B] font-mono tabular-nums">
                  <tr className={recommendedSize === 52 ? 'bg-[#F9F4EC] font-semibold' : ''}>
                    <td className="py-2.5 px-3 font-bold">52&quot;</td>
                    <td className="py-2.5 px-3 font-sans">5&apos;0&quot; – 5&apos;2&quot;</td>
                    <td className="py-2.5 px-3">42&quot; – 44&quot;</td>
                    <td className="py-2.5 px-3">27&quot;</td>
                    <td className="py-2.5 px-3">15.5&quot;</td>
                  </tr>
                  <tr className={recommendedSize === 54 ? 'bg-[#F9F4EC] font-semibold' : ''}>
                    <td className="py-2.5 px-3 font-bold">54&quot;</td>
                    <td className="py-2.5 px-3 font-sans">5&apos;3&quot; – 5&apos;5&quot;</td>
                    <td className="py-2.5 px-3">44&quot; – 46&quot;</td>
                    <td className="py-2.5 px-3">28&quot;</td>
                    <td className="py-2.5 px-3">16.0&quot;</td>
                  </tr>
                  <tr className={recommendedSize === 56 ? 'bg-[#F9F4EC] font-semibold' : ''}>
                    <td className="py-2.5 px-3 font-bold">56&quot;</td>
                    <td className="py-2.5 px-3 font-sans">5&apos;5&quot; – 5&apos;7&quot;</td>
                    <td className="py-2.5 px-3">46&quot; – 48&quot;</td>
                    <td className="py-2.5 px-3">28.5&quot;</td>
                    <td className="py-2.5 px-3">16.5&quot;</td>
                  </tr>
                  <tr className={recommendedSize === 58 ? 'bg-[#F9F4EC] font-semibold' : ''}>
                    <td className="py-2.5 px-3 font-bold">58&quot;</td>
                    <td className="py-2.5 px-3 font-sans">5&apos;8&quot; and above</td>
                    <td className="py-2.5 px-3">48&quot; – 50&quot;</td>
                    <td className="py-2.5 px-3">29&quot;</td>
                    <td className="py-2.5 px-3">17.0&quot;</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* How to Measure Note */}
          <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E5DACD] text-xs text-[#52463B] space-y-2">
            <h5 className="font-semibold text-[#171717]">How to Measure at Home:</h5>
            <ol className="list-decimal list-inside space-y-1 pl-1">
              <li><strong>Length:</strong> Measure with a tape from highest point of shoulder straight down to top of feet or floor.</li>
              <li><strong>Heels:</strong> If you plan to wear 2-3 inch heels with your abaya, size up by 2 inches (e.g. from 54&quot; to 56&quot;).</li>
              <li><strong>Bespoke Custom Sizes:</strong> We can custom stitch 48&quot;, 50&quot;, or 60&quot; lengths on special WhatsApp pre-orders.</li>
            </ol>
          </div>

          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="w-full bg-[#171717] hover:bg-neutral-800 text-white py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
          >
            Done / Close Size Guide
          </button>
        </div>
      </div>
    </div>
  );
};
