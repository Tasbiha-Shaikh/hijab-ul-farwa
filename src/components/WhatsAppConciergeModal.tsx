import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, MessageCircle, Send, CheckCircle2, ShieldCheck, Video, FileText, Ruler } from 'lucide-react';
import { ATELIER_WHATSAPP, ATELIER_WHATSAPP_DISPLAY } from '../data/catalog';

export const WhatsAppConciergeModal: React.FC = () => {
  const { isWhatsAppModalOpen, setIsWhatsAppModalOpen, whatsAppMessage, sendDirectWhatsApp } = useShop();
  const [customText, setCustomText] = useState('');

  if (!isWhatsAppModalOpen) return null;

  const currentMessage = customText || whatsAppMessage;

  const handleQuickOption = (prompt: string) => {
    setCustomText(prompt);
  };

  const handleSend = () => {
    sendDirectWhatsApp(currentMessage);
    setIsWhatsAppModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FAF8F5] rounded-xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#DED4C7] animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-[#171717] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-inner">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif-luxury font-semibold text-lg text-[#F6F2EB]">
                  Karachi Trade Desk & Concierge
                </h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <p className="text-xs text-neutral-400">
                Direct WhatsApp • {ATELIER_WHATSAPP_DISPLAY} (Bombay Bazar)
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsWhatsAppModalOpen(false)}
            aria-label="Close"
            className="text-neutral-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <p className="text-xs text-[#5C5045] leading-relaxed">
            Connect directly with our master karigar and wholesale order coordinators in Bolton Market. Real-time video audits, custom length hem adjustments, and export inquiries.
          </p>

          {/* Quick Option Prompts */}
          <div className="space-y-2">
            <span className="text-[11px] font-semibold text-[#8C7A6B] uppercase tracking-wider block">
              Quick Selection:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickOption('Assalam-o-Alaikum, I need custom size assistance (height/sleeve measurement) for an abaya order.')}
                className="flex items-center gap-2 p-2.5 rounded-lg border border-[#E3D9CC] bg-white hover:border-[#171717] text-left transition-colors cursor-pointer text-[#2C241E]"
              >
                <Ruler className="w-4 h-4 text-[#9B804E] shrink-0" />
                <span>Custom Size & Fit Advice</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickOption('Assalam-o-Alaikum, please send your latest B2B Wholesale line sheet and bulk rate card.')}
                className="flex items-center gap-2 p-2.5 rounded-lg border border-[#E3D9CC] bg-white hover:border-[#171717] text-left transition-colors cursor-pointer text-[#2C241E]"
              >
                <FileText className="w-4 h-4 text-[#9B804E] shrink-0" />
                <span>Request B2B Rate Sheet PDF</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickOption('I would like to schedule a 5-minute WhatsApp video walkthrough inside your Bolton Market atelier to view handwork.')}
                className="flex items-center gap-2 p-2.5 rounded-lg border border-[#E3D9CC] bg-white hover:border-[#171717] text-left transition-colors cursor-pointer text-[#2C241E]"
              >
                <Video className="w-4 h-4 text-[#9B804E] shrink-0" />
                <span>Live Video Stock Audit</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickOption('Assalam-o-Alaikum, please verify my Trax/Leopard tracking status for my abaya order.')}
                className="flex items-center gap-2 p-2.5 rounded-lg border border-[#E3D9CC] bg-white hover:border-[#171717] text-left transition-colors cursor-pointer text-[#2C241E]"
              >
                <CheckCircle2 className="w-4 h-4 text-[#9B804E] shrink-0" />
                <span>Check Parcel Tracking</span>
              </button>
            </div>
          </div>

          {/* Editable Text Area */}
          <div>
            <label className="text-xs font-semibold text-[#3D332A] block mb-1.5">
              Your WhatsApp Message:
            </label>
            <textarea
              rows={3}
              value={currentMessage}
              onChange={(e) => setCustomText(e.target.value)}
              className="w-full text-xs p-3 rounded-lg border border-[#D5C9B8] bg-white focus:outline-none focus:ring-1 focus:ring-[#171717] text-[#171717]"
              placeholder="Write your custom inquiry here..."
            />
          </div>

          {/* Trust points */}
          <div className="flex items-center gap-4 text-[11px] text-[#716355] pt-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified Atelier Account
            </span>
            <span className="flex items-center gap-1">
              <span>⏱️</span>
              Avg. Reply: 5-10 Minutes
            </span>
          </div>

          {/* Submit Action */}
          <button
            onClick={handleSend}
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3 px-4 rounded-lg text-sm font-semibold tracking-wide transition-colors shadow-md cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Open WhatsApp & Send Message</span>
          </button>
        </div>
      </div>
    </div>
  );
};
