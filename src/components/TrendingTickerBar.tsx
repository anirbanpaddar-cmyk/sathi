/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Product } from '../types';

interface TickerItem {
  id: string;
  name: string;
  image: string;
  price: number;
  discountBadge: string;
  productId?: string;
}

interface TrendingTickerBarProps {
  onQuickViewProduct?: (productId: string) => void;
  products?: Product[];
}

export const TrendingTickerBar: React.FC<TrendingTickerBarProps> = ({
  onQuickViewProduct,
  products = [],
}) => {
  // Items matching the exact uploaded image reference
  const tickerItems: TickerItem[] = [
    {
      id: 'tick-1',
      name: 'STRAIGHT CUT SLEEVELESS SHORT KURTI',
      image: '/src/assets/images/kurti_printed_floral_1791016554938.jpg',
      price: 549,
      discountBadge: '31% OFF',
      productId: 'sb-prod-02',
    },
    {
      id: 'tick-2',
      name: 'CASUAL WEAR SLEEVELESS SHORT KURTI',
      image: '/src/assets/images/kurti_printed_floral_1791016554938.jpg',
      price: 529,
      discountBadge: '34% OFF',
      productId: 'sb-prod-04',
    },
    {
      id: 'tick-3',
      name: 'SATIN SLEEVELESS BLOUSE',
      image: '/src/assets/images/blouse_satin_pink_1791016542672.jpg',
      price: 499,
      discountBadge: '35% OFF',
      productId: 'sb-prod-01',
    },
    {
      id: 'tick-4',
      name: 'DESIGNER SLEEVELESS BLOUSE',
      image: '/src/assets/images/blouse_emerald_designer_1791016564875.jpg',
      price: 599,
      discountBadge: '40% OFF',
      productId: 'sb-prod-03',
    },
    {
      id: 'tick-5',
      name: 'BACK DORI FESTIVE BLOUSE',
      image: '/src/assets/images/blouse_back_design_1791016577426.jpg',
      price: 749,
      discountBadge: '42% OFF',
      productId: 'sb-prod-05',
    },
    {
      id: 'tick-6',
      name: 'FESTIVE ZARI PARTY BLOUSE',
      image: '/src/assets/images/hero_sathi_boutique_1791016528092.jpg',
      price: 649,
      discountBadge: '35% OFF',
      productId: 'sb-prod-06',
    },
  ];

  // Duplicate items twice to ensure seamless infinite looping with CSS translateX(-50%)
  const doubleItems = [...tickerItems, ...tickerItems];

  const handleClick = (productId?: string) => {
    if (productId && onQuickViewProduct) {
      onQuickViewProduct(productId);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
      {/* Outer Wine Capsule Strip matching the uploaded reference image */}
      <div className="relative overflow-hidden rounded-full bg-gradient-to-r from-[#45031b] via-[#6e0b32] to-[#45031b] border border-rose-900/70 shadow-lg shadow-rose-950/20 py-2.5 sm:py-3 px-2 select-none group">
        
        {/* Subtle left & right gradient fade scrims */}
        <div className="absolute left-0 inset-y-0 w-12 bg-gradient-to-r from-[#45031b] to-transparent z-10 pointer-events-none rounded-l-full" />
        <div className="absolute right-0 inset-y-0 w-12 bg-gradient-to-l from-[#45031b] to-transparent z-10 pointer-events-none rounded-r-full" />

        {/* Animated Marquee Strip */}
        <div className="animate-marquee-scroll flex items-center">
          {doubleItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              onClick={() => handleClick(item.productId)}
              className="inline-flex items-center gap-2.5 sm:gap-3 mx-4 sm:mx-6 cursor-pointer hover:opacity-90 transition-opacity shrink-0 group/item"
            >
              {/* Circular Avatar with Metallic Golden Ring */}
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full p-[1.5px] bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-500 shadow-sm shrink-0 flex items-center justify-center">
                <div className="w-full h-full rounded-full overflow-hidden bg-stone-900">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transform group-hover/item:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Product Name in Clean Uppercase */}
              <span className="text-[11px] sm:text-xs font-bold text-white tracking-wide uppercase whitespace-nowrap">
                {item.name}
              </span>

              {/* Price in Bold Golden Yellow */}
              <span className="text-xs sm:text-sm font-extrabold text-amber-300 tabular-nums whitespace-nowrap drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">
                ₹{item.price}
              </span>

              {/* Hot Pink Discount Pill Badge */}
              <span className="bg-gradient-to-r from-pink-600 to-rose-600 text-white font-extrabold text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs whitespace-nowrap">
                {item.discountBadge}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
