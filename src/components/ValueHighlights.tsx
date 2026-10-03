/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Gem, Scissors, Sparkles, Send } from 'lucide-react';

export const ValueHighlights: React.FC = () => {
  const highlights = [
    {
      icon: Gem,
      title: 'Trendy Designs',
      subtitle: 'Latest Fashion',
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      border: 'border-rose-100',
    },
    {
      icon: Scissors,
      title: 'Perfect Fit',
      subtitle: 'Comfort & Style',
      color: 'text-pink-600',
      bg: 'bg-pink-50',
      border: 'border-pink-100',
    },
    {
      icon: Sparkles,
      title: 'Premium Fabric',
      subtitle: 'Soft & Skin Friendly',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-100',
    },
    {
      icon: Send,
      title: 'Nationwide Delivery',
      subtitle: 'Fast & Safe',
      color: 'text-rose-700',
      bg: 'bg-rose-50',
      border: 'border-rose-100',
    },
  ];

  return (
    <section className="bg-white border-b border-stone-200/80 py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {highlights.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3.5 p-3 rounded-2xl bg-stone-50/60 border border-stone-200/60 hover:bg-stone-50 transition-colors"
              >
                <div className={`w-11 h-11 rounded-full ${item.bg} ${item.color} flex items-center justify-center shrink-0 border ${item.border}`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-stone-900 truncate">
                    {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-stone-600 truncate">
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
