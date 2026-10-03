/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, Check, Tag, Sparkles } from 'lucide-react';
import { RUBY_RED_BLOUSE_IMG } from '../data/mockData';

interface PromoBannerProps {
  onApplyCoupon: (couponCode: string) => void;
  onShopDeals: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({
  onApplyCoupon,
  onShopDeals,
}) => {
  const [applied, setApplied] = useState(false);

  const handleShopSale = () => {
    onApplyCoupon('SATHI20');
    setApplied(true);
    onShopDeals();
    setTimeout(() => setApplied(false), 3000);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-stone-900 via-rose-950 to-stone-900 text-white shadow-2xl border-2 border-amber-300/40">
        
        {/* Decorative background ambient glows */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 sm:p-10 lg:p-12">
          
          {/* Left Decorative Badge */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-2 bg-gradient-to-tr from-amber-300 via-rose-300 to-amber-100 shadow-2xl flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-stone-950/95 border-2 border-amber-300/80 flex flex-col items-center justify-center text-center p-3">
                <span className="text-amber-300 text-xs font-serif-luxury italic">Special Offer</span>
                <span className="text-white text-3xl sm:text-4xl font-extrabold font-cinzel tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-400">
                  20%
                </span>
                <span className="text-amber-300 text-xs sm:text-sm font-sans uppercase tracking-widest font-bold">
                  OFF
                </span>
                <div className="mt-1 flex items-center gap-1 text-[10px] text-rose-200 font-mono">
                  <Tag className="w-2.5 h-2.5" />
                  <span>SATHI20</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center Promo Copy & CTA */}
          <div className="lg:col-span-5 text-center lg:text-left space-y-3 sm:space-y-4">
            <div className="space-y-1">
              <div className="flex items-center justify-center lg:justify-start gap-1.5 text-amber-300 text-xs uppercase tracking-widest font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Season Special Offer</span>
              </div>
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold tracking-tight text-white leading-tight">
                FLAT 20% OFF ON SELECTED STYLES
              </h3>
              <p className="text-rose-100 text-xs sm:text-sm font-medium leading-relaxed max-w-md">
                Elevate your everyday wardrobe with our handpicked cotton, printed, and festive sleeveless kurtis.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={handleShopSale}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-500 hover:to-pink-600 text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-2 group active:scale-98 focus-visible:outline-none"
              >
                {applied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>SATHI20 Applied!</span>
                  </>
                ) : (
                  <>
                    <span>SHOP SALE</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <span className="text-xs text-rose-200 font-mono tracking-wide">
                Coupon: <strong className="text-amber-300 font-bold bg-white/10 px-2.5 py-1 rounded-md border border-amber-300/40">SATHI20</strong>
              </span>
            </div>
          </div>

          {/* Right Preview Image of Blouse */}
          <div className="lg:col-span-3 hidden lg:flex justify-end">
            <div className="w-44 h-56 rounded-2xl overflow-hidden border-2 border-amber-400/50 shadow-2xl relative group">
              <img
                src={RUBY_RED_BLOUSE_IMG}
                alt="Selected Styles on Sale"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/src/assets/images/blouse_back_design_1791016577426.jpg';
                }}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 inset-x-2 text-center">
                <span className="text-[11px] font-bold text-white block">
                  Ruby Red Sleeveless Blouse
                </span>
                <span className="text-[10px] text-amber-300 font-mono font-bold">
                  Now ₹749 <span className="line-through text-stone-400">₹1,199</span>
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
