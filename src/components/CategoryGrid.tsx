/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CATEGORIES_DATA } from '../data/mockData';

interface CategoryGridProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section id="categories" className="py-12 sm:py-16 bg-[#FFFDF9] border-b border-rose-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 uppercase tracking-widest mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Curation by Silhouette</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-stone-900 tracking-tight">
              Featured Kurti Categories
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Explore 5 distinct styles tailored for everyday comfort, office hours, and celebratory occasions.
            </p>
          </div>

          <button
            onClick={() => onSelectCategory('All')}
            className="group flex items-center gap-1.5 text-xs sm:text-sm font-bold text-rose-700 hover:text-rose-900 transition-colors focus-visible:outline-none"
          >
            <span>Explore All 25 Styles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 5 Kurti Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-6">
          {CATEGORIES_DATA.map((cat) => {
            const isSelected = selectedCategory === cat.name;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  // Map category name to product filter
                  if (cat.name === 'Cotton Kurtis') onSelectCategory('Sleeveless Cotton Kurti');
                  else if (cat.name === 'Printed Kurtis') onSelectCategory('Printed Kurti');
                  else if (cat.name === 'Office Wear') onSelectCategory('Office-Wear Kurti');
                  else if (cat.name === 'Festive Collection') onSelectCategory('Festive Kurti');
                  else if (cat.name === 'Designer Kurtis') onSelectCategory('Designer Kurti');
                  else onSelectCategory(cat.name);

                  const catalogEl = document.getElementById('catalog');
                  if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group flex flex-col text-left rounded-3xl overflow-hidden border-2 transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-xl focus-visible:outline-none bg-white ${
                  isSelected
                    ? 'border-rose-600 ring-4 ring-rose-100 shadow-lg'
                    : 'border-stone-200/80 hover:border-rose-300'
                }`}
              >
                {/* Category Image Box */}
                <div className="relative aspect-4/5 w-full overflow-hidden bg-stone-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/src/assets/images/blouse_back_design_1791016577426.jpg';
                    }}
                    className="w-full h-full object-cover object-top group-hover:scale-106 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent pointer-events-none" />
                  
                  {cat.badge && (
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-bold text-rose-800 shadow-sm border border-rose-100">
                        {cat.badge}
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-2 left-3 right-3 text-white">
                    <span className="text-[10px] font-mono text-amber-200 font-semibold">
                      {cat.itemCount}
                    </span>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-3 sm:p-4 flex flex-col justify-between flex-1 bg-white">
                  <div>
                    <h3 className="font-bold text-sm text-stone-900 leading-snug group-hover:text-rose-700 transition-colors line-clamp-1">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-stone-500 line-clamp-2 mt-1 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-rose-700 font-bold pt-2 border-t border-stone-100 mt-2">
                    <span>Shop Style</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
