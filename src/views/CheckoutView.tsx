import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { CheckoutFormData } from '../types';
import { PAKISTAN_CITIES, PAKISTAN_PROVINCES, ATELIER_WHATSAPP } from '../data/catalog';
import {
  ShieldCheck,
  Truck,
  RefreshCw,
  MessageCircle,
  Plus,
  Minus,
  Trash2,
  CheckCircle,
  PackageCheck,
  Building,
  Smartphone,
  Check,
  ArrowRight,
  Download,
} from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    shippingFee,
    totalPayable,
    updateCartQuantity,
    removeFromCart,
    submitOrder,
    lastPlacedOrder,
    currentView,
    setCurrentView,
    showToast,
  } = useShop();

  const [fullName, setFullName] = useState('Ayesha Siddiqui');
  const [whatsappNumber, setWhatsappNumber] = useState('0300-1234567');
  const [address, setAddress] = useState('House 42-B, Street 7, Block 4, Clifton, Karachi');
  const [city, setCity] = useState('Karachi');
  const [province, setProvince] = useState('Sindh');
  const [specialInstructions, setSpecialInstructions] = useState('Call before arrival, allow open parcel inspection');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank_transfer' | 'easypaisa_jazzcash'>('cod');
  const [isWholesaleInquiry, setIsWholesaleInquiry] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If order was just placed, show confirmation screen
  if (currentView === 'order-confirmed' && lastPlacedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8 animate-in fade-in duration-300">
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-[#E3D6C5] shadow-lg text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <PackageCheck className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] uppercase font-bold tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
              ORDER AUTHORIZED • OPEN PARCEL APPROVED
            </span>
            <h1 className="font-serif-luxury text-3xl font-bold text-[#171717]">
              Thank You, {lastPlacedOrder.customer.fullName}!
            </h1>
            <p className="text-xs sm:text-sm text-[#5C5044]">
              Your order <strong className="font-mono text-[#171717]">#{lastPlacedOrder.orderId}</strong> has been transmitted to our Bolton Market dispatch desk.
            </p>
          </div>

          {/* Tracking Card */}
          <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E5DACD] text-left space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              <span>Courier Tracking Code</span>
              <span className="text-emerald-700">Dispatch in 24-48 Hours</span>
            </div>
            <div className="font-mono text-base font-bold text-[#171717]">
              {lastPlacedOrder.trackingNumber}
            </div>
            <p className="text-xs text-neutral-500">
              Assigned Courier: <strong>{lastPlacedOrder.courier}</strong> with doorstep cash collection.
            </p>
          </div>

          {/* Receipt Breakdown */}
          <div className="border-t border-b border-[#F0E6D8] py-4 text-xs space-y-3 text-left">
            <h4 className="font-bold uppercase tracking-wider text-[#171717]">
              Summary of Items
            </h4>
            <div className="divide-y divide-[#F0E6D8]">
              {lastPlacedOrder.items.map((it, idx) => (
                <div key={idx} className="py-2 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-[#171717]">{it.product.name}</span>
                    <span className="text-neutral-500 block text-[11px]">
                      {it.selectedColor} • {it.selectedSize ? `Size ${it.selectedSize}"` : 'Standard'} • Qty: {it.quantity}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-[#171717]">
                    PKR {(it.pricePerUnit * it.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-between font-bold text-sm text-[#171717] font-mono border-t border-[#F0E6D8]">
              <span>Total Payable upon Doorstep Delivery:</span>
              <span>PKR {lastPlacedOrder.totalPayable.toLocaleString()}</span>
            </div>
          </div>

          {/* Actions: Send to WhatsApp & Back to Store */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => {
                const text = `Assalam-o-Alaikum Hijab Ul Farwa! Here is my confirmed order receipt:\n• Order ID: #${lastPlacedOrder.orderId}\n• Name: ${lastPlacedOrder.customer.fullName}\n• Address: ${lastPlacedOrder.customer.address}, ${lastPlacedOrder.customer.city}\n• Total: PKR ${lastPlacedOrder.totalPayable.toLocaleString()}\n• Payment: Cash on Delivery\nPlease share dispatch updates on this WhatsApp.`;
                const cleanNumber = ATELIER_WHATSAPP.replace(/\D/g, '');
                window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`, '_blank');
              }}
              className="flex-1 py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>SEND CONFIRMATION TO ATELIER WHATSAPP</span>
            </button>

            <button
              onClick={() => {
                window.print();
              }}
              className="px-4 py-3.5 bg-white border border-[#D5C7B5] hover:bg-[#FAF8F5] text-[#171717] text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-neutral-600" />
              <span>PRINT RECEIPT</span>
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs text-neutral-500 hover:text-[#171717] underline font-medium cursor-pointer"
            >
              ← Continue Shopping Atelier Collections
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Regular Cart & Checkout View
  const handlePlaceOrder = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (cart.length === 0) {
      showToast('Your Atelier Bag is empty!');
      return;
    }
    if (!fullName || !whatsappNumber || !address) {
      showToast('Please fill in your recipient name, phone, and complete delivery address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const formData: CheckoutFormData = {
        fullName,
        whatsappNumber,
        address,
        city,
        province,
        specialInstructions,
        paymentMethod,
        isWholesaleInquiry,
      };
      submitOrder(formData);
      setIsSubmitting(false);
    }, 600);
  };

  const handleWhatsAppConfirm = () => {
    if (cart.length === 0) {
      showToast('Your Atelier Bag is empty!');
      return;
    }
    const itemsText = cart
      .map(
        i =>
          `• ${i.product.name} (${i.selectedColor}, ${i.selectedSize ? `Size ${i.selectedSize}"` : 'Std'}, Qty: ${i.quantity}) - PKR ${(i.pricePerUnit * i.quantity).toLocaleString()}`
      )
      .join('\n');

    const msg = `Assalam-o-Alaikum Hijab Ul Farwa Atelier!\nI want to place an order via Cash on Delivery:\n\n*CUSTOMER DETAILS*\n• Name: ${fullName}\n• Phone: ${whatsappNumber}\n• Delivery Address: ${address}\n• City: ${city}, ${province}\n• Notes: ${specialInstructions}\n\n*ITEMS ORDERED*\n${itemsText}\n\n*TOTAL PAYABLE*: PKR ${totalPayable.toLocaleString()} (Free Nationwide COD)\nPlease confirm availability and dispatch!`;

    const cleanNumber = ATELIER_WHATSAPP.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 pb-28">
      {/* Step Progress Bar (Matches Image 4 screenshot) */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E2D5C3]">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#8C7A6B]">
          <span className="text-[#171717] font-bold">1. CART</span>
          <span>&gt;</span>
          <span className="text-[#171717] font-bold">2. DELIVERY</span>
          <span>&gt;</span>
          <span>3. CONFIRMATION</span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#EBF5EE] text-emerald-800 text-[11px] font-bold tracking-wider uppercase border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>COD READY</span>
        </div>
      </div>

      {/* Review Selection - Your Atelier Bag (Matches screenshot) */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E3D6C5] shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#F0E6D8]">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8C7A6B] block">
              REVIEW SELECTION
            </span>
            <h2 className="font-serif-luxury text-2xl font-bold text-[#171717]">
              Your Atelier Bag ({cartCount})
            </h2>
          </div>
          <span className="text-xs font-bold font-mono text-[#8C7A6B]">
            {cart.length} Items
          </span>
        </div>

        {cart.length === 0 ? (
          <div className="py-12 text-center space-y-4">
            <p className="text-sm text-neutral-500">Your bag is currently empty.</p>
            <button
              onClick={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-2.5 bg-[#171717] text-white text-xs font-bold uppercase rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Browse New Arrivals
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-[#EBE1D3] bg-[#FAF8F5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-20 rounded-lg overflow-hidden bg-neutral-900 border border-black/10 shrink-0 relative">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {item.selectedSize > 0 && (
                      <span className="absolute bottom-1 right-1 text-[9px] font-mono bg-black/70 text-white px-1 rounded">
                        SZ {item.selectedSize}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif-luxury font-bold text-sm sm:text-base text-[#171717]">
                        {item.product.name}
                      </h4>
                    </div>

                    <p className="text-xs text-[#6B5D4F]">
                      {item.selectedColor} • {item.selectedSize > 0 ? `Size ${item.selectedSize}"` : 'Standard One Size'} • {item.product.fabric.split('&')[0]}
                    </p>

                    {item.product.includesMatchingHijab && (
                      <span className="inline-block text-[10px] font-bold text-[#7A6443] bg-[#F3ECE1] border border-[#DFD1BE] px-2 py-0.5 rounded uppercase">
                        🎁 INCLUDES FREE MATCHING HIJAB
                      </span>
                    )}
                  </div>
                </div>

                <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#EAE0D2]">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#D5C7B6] rounded-lg bg-white overflow-hidden text-xs">
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                      className="p-1.5 hover:bg-[#F2ECE1] transition-colors cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5 text-neutral-600" />
                    </button>
                    <span className="px-3 font-mono font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                      className="p-1.5 hover:bg-[#F2ECE1] transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-neutral-600" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <span className="font-mono font-bold text-sm sm:text-base text-[#171717] block tabular-nums">
                      PKR {(item.pricePerUnit * item.quantity).toLocaleString()}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">
                      ATELIER IN-STOCK
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                    className="text-neutral-400 hover:text-red-500 p-1 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Calculations Breakdown */}
            <div className="pt-4 border-t border-[#F0E6D8] space-y-2 text-xs">
              <div className="flex justify-between text-[#5C5044]">
                <span>Bag Subtotal</span>
                <span className="font-mono font-semibold text-[#171717] tabular-nums">
                  PKR {cartSubtotal.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center text-[#5C5044]">
                <span>Shipping &amp; COD Handling</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
                  FREE (NATIONWIDE PROMO)
                </span>
              </div>

              <div className="flex justify-between items-baseline pt-3 border-t border-[#F0E6D8] text-base">
                <div>
                  <span className="font-serif-luxury font-bold text-[#171717] block">
                    Total Payable
                  </span>
                  <span className="text-[11px] text-neutral-400">
                    No hidden taxes • Pay at delivery
                  </span>
                </div>
                <span className="font-serif-luxury font-bold text-xl sm:text-2xl text-[#171717] font-mono tabular-nums">
                  PKR {totalPayable.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Wholesale / Resale Inquiry Toggle Card (Matches screenshot) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#F6EFE5] border border-[#DFD1BE] flex items-start gap-3">
        <input
          type="checkbox"
          id="wholesale-inquiry-toggle"
          checked={isWholesaleInquiry}
          onChange={(e) => setIsWholesaleInquiry(e.target.checked)}
          className="mt-1 w-4 h-4 rounded border-[#D5C9B8] text-[#171717] focus:ring-[#171717] cursor-pointer"
        />
        <label htmlFor="wholesale-inquiry-toggle" className="text-xs cursor-pointer select-none space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#171717]">
              Wholesale / Resale Inquiry
            </span>
            <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.2 bg-[#171717] text-white rounded">
              BOLTON B2B
            </span>
          </div>
          <p className="text-[#665749] leading-relaxed">
            Are you purchasing for boutique resale? Check here to register your order as a volume wholesale inquiry for 12+ items and lock in Bolton Market rates.
          </p>
        </label>
      </div>

      {/* Recipient Details Form (Matches Image 4 screenshot) */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E3D6C5] shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#F0E6D8]">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8C7A6B] block">
              SHIPPING ADDRESS
            </span>
            <h2 className="font-serif-luxury text-2xl font-bold text-[#171717]">
              Recipient Details
            </h2>
          </div>
          <Truck className="w-5 h-5 text-[#8C7A6B]" />
        </div>

        <form onSubmit={handlePlaceOrder} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#3D3328] block mb-1">
              FULL NAME *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Ayesha Siddiqui"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full text-xs p-3 rounded-lg border border-[#D5C9B8] bg-[#FAF8F5] focus:outline-none focus:ring-1 focus:ring-[#171717]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-[#3D3328] block">
                WHATSAPP / MOBILE NUMBER *
              </label>
              <span className="text-[10px] text-neutral-400">
                For Dispatch Updates
              </span>
            </div>
            <input
              type="tel"
              required
              placeholder="0300-1234567"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              className="w-full text-xs p-3 rounded-lg border border-[#D5C9B8] bg-[#FAF8F5] focus:outline-none focus:ring-1 focus:ring-[#171717]"
            />
            <p className="text-[11px] text-neutral-400 mt-1">
              We will share real-time Trax / Leopards courier tracking link via WhatsApp.
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#3D3328] block mb-1">
              COMPLETE STREET ADDRESS / HOUSE / FLAT # *
            </label>
            <input
              type="text"
              required
              placeholder="House/Apartment #, Street, Block/Sector, Landmark near you"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full text-xs p-3 rounded-lg border border-[#D5C9B8] bg-[#FAF8F5] focus:outline-none focus:ring-1 focus:ring-[#171717]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-[#3D3328] block mb-1">
                CITY *
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
              <label className="text-xs font-semibold text-[#3D3328] block mb-1">
                PROVINCE *
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
            <label className="text-xs font-semibold text-[#3D3328] block mb-1">
              SPECIAL DELIVERY INSTRUCTIONS (OPTIONAL)
            </label>
            <input
              type="text"
              placeholder="e.g. Call before arrival, leave with security guard"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full text-xs p-3 rounded-lg border border-[#D5C9B8] bg-[#FAF8F5] focus:outline-none focus:ring-1 focus:ring-[#171717]"
            />
          </div>
        </form>
      </section>

      {/* Select Checkout Method (Matches Image 4 screenshot) */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E3D6C5] shadow-xs space-y-6">
        <div className="pb-4 border-b border-[#F0E6D8]">
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8C7A6B] block">
            PAYMENT MODE
          </span>
          <h2 className="font-serif-luxury text-2xl font-bold text-[#171717]">
            Select Checkout Method
          </h2>
        </div>

        <div className="space-y-3">
          {/* Radio 1: COD */}
          <div
            onClick={() => setPaymentMethod('cod')}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              paymentMethod === 'cod'
                ? 'bg-[#FAF6F0] border-[#171717] ring-1 ring-[#171717]'
                : 'bg-white border-[#E5DACD] hover:border-neutral-500'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-1 text-[#171717] focus:ring-[#171717]"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#171717]">
                      Cash on Delivery (COD)
                    </span>
                  </div>
                  <p className="text-xs text-[#5C5044]">
                    Pay exact cash safely to the rider when the parcel is handed over at your doorstep.
                  </p>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold pt-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Open Parcel Verification Accepted</span>
                  </div>
                </div>
              </div>

              <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 bg-[#171717] text-white rounded shrink-0">
                MOST POPULAR
              </span>
            </div>
          </div>

          {/* Radio 2: Direct Bank Transfer */}
          <div
            onClick={() => setPaymentMethod('bank_transfer')}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              paymentMethod === 'bank_transfer'
                ? 'bg-[#FAF6F0] border-[#171717] ring-1 ring-[#171717]'
                : 'bg-white border-[#E5DACD] hover:border-neutral-500'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'bank_transfer'}
                  onChange={() => setPaymentMethod('bank_transfer')}
                  className="mt-1 text-[#171717] focus:ring-[#171717]"
                />
                <div className="space-y-1">
                  <span className="text-sm font-bold text-[#171717]">
                    Direct Bank Transfer
                  </span>
                  <p className="text-xs text-[#5C5044]">
                    Official atelier IBAN provided upon placing order. Simply send screenshot on WhatsApp.
                  </p>
                </div>
              </div>

              <span className="text-[10px] uppercase font-mono text-neutral-500 shrink-0">
                MEEZAN / HBL / FAYSAL
              </span>
            </div>
          </div>

          {/* Radio 3: Easypaisa / JazzCash */}
          <div
            onClick={() => setPaymentMethod('easypaisa_jazzcash')}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              paymentMethod === 'easypaisa_jazzcash'
                ? 'bg-[#FAF6F0] border-[#171717] ring-1 ring-[#171717]'
                : 'bg-white border-[#E5DACD] hover:border-neutral-500'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'easypaisa_jazzcash'}
                  onChange={() => setPaymentMethod('easypaisa_jazzcash')}
                  className="mt-1 text-[#171717] focus:ring-[#171717]"
                />
                <div className="space-y-1">
                  <span className="text-sm font-bold text-[#171717]">
                    Easypaisa / JazzCash
                  </span>
                  <p className="text-xs text-[#5C5044]">
                    Fast wallet transfer directly to our Karachi merchant account.
                  </p>
                </div>
              </div>

              <span className="text-[10px] uppercase font-mono text-neutral-500 shrink-0">
                INSTANT MOBILE WALLET
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Guarantees (Matches screenshot) */}
      <section className="bg-white rounded-2xl p-6 border border-[#E3D6C5] shadow-xs space-y-4">
        <h4 className="text-[11px] uppercase font-bold tracking-wider text-[#8C7A6B]">
          OUR SIGNATURE GUARANTEES
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#524538]">
          <div className="flex items-start gap-3">
            <PackageCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#171717] block">100% Open Parcel Checking</strong>
              <span>Inspect fabric and stitch before payment with courier rider.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <RefreshCw className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#171717] block">7-Day Easy Exchange Policy</strong>
              <span>Hassle-free size or color alterations across Pakistan.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Order Actions (Matches screenshot) */}
      <div className="space-y-3">
        <button
          onClick={() => handlePlaceOrder()}
          disabled={cart.length === 0 || isSubmitting}
          className="w-full py-4 bg-[#171717] hover:bg-neutral-800 disabled:bg-neutral-400 text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>PLACE ORDER VIA COD — PKR {totalPayable.toLocaleString()}</span>
        </button>

        <button
          onClick={handleWhatsAppConfirm}
          disabled={cart.length === 0}
          className="w-full py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4" />
          <span>CONFIRM &amp; SEND ORDER VIA WHATSAPP</span>
        </button>

        <div className="pt-2 text-center text-xs text-neutral-500">
          <p className="flex items-center justify-center gap-1.5 font-medium">
            <Building className="w-3.5 h-3.5 text-[#8C7A6B]" />
            <span>BOLTON MARKET, KARACHI SUPPORT: MON-SAT 11 AM - 9 PM</span>
          </p>
          <p className="text-[11px] text-neutral-400 mt-0.5">
            Need custom sizing or sleeve length? Tap WhatsApp above for concierge service.
          </p>
        </div>
      </div>
    </div>
  );
};
