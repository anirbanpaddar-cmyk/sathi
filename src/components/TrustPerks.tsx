/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Gift, Percent, Headphones, Crown } from 'lucide-react';

export const TrustPerks: React.FC = () => {
  const perks = [
    {
      icon: Gift,
      title: 'Exclusive Offers',
      subtitle: 'Save more every day',
      color: 'text-rose-600',
      bg: 'bg-rose-50',
    },
    {
      icon: Percent,
      title: 'Secure Payments',
      subtitle: '100% safe & secure',
      color: 'text-pink-600',
      bg: 'bg-pink-50',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      subtitle: "We're here to help",
      color: 'text-rose-700',
      bg: 'bg-rose-50',
    },
    {
      icon: Crown,
      title: 'Loyalty Rewards',
      subtitle: 'Earn points & get rewards',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
  ];

  return (
    <section className="bg-white border-t border-stone-200/80 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {perks.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-stone-50/50 border border-stone-200/60 hover:bg-stone-50 transition-colors"
              >
                <div className={`w-12 h-12 rounded-full ${item.bg} ${item.color} flex items-center justify-center shrink-0 border border-stone-200/40`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-stone-900 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-stone-600 leading-snug mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
