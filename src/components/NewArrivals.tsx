/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { ArrowRight, SlidersHorizontal, Filter, X, RotateCcw, Check, Sparkles, Star } from 'lucide-react';
import { Product, ProductVariant } from '../types';
import { ProductCard } from './ProductCard';

interface NewArrivalsProps {
  products: Product[];
  onAddToCart: (product: Product, variant: ProductVariant, quantity: number) => void;
  onQuickView: (product: Product) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const NewArrivals: React.FC<NewArrivalsProps> = ({
  products,
  onAddToCart,
  onQuickView,
  wishlist,
  onToggleWishlist,
  selectedCategory,
  onSelectCategory,
}) => {
  // Sorting state
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Filter states
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('All');
  const [selectedFabric, setSelectedFabric] = useState<string>('All');
  const [selectedPattern, setSelectedPattern] = useState<string>('All');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // Available filter options for 25 Sleeveless Blouse Collection
  const categoriesList = [
    'All',
    'Classic Silk & Satin',
    'Festive & Bridal',
    'Dori & Back Designs',
    'Contemporary & Velvet',
    'Breathable Cotton & Floral',
  ];

  const sizesList = ['All', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const fabricsList = ['All', 'Raw Silk', 'Duchess Satin', 'Micro-Velvet', 'Chanderi Silk', 'Tussar Silk', 'Cotton'];
  const patternsList = ['All', 'Zari Embroidery', 'Dori & Cutout', 'Solid Silk', 'Resham Threadwork', 'Zardozi', 'Floral Print'];
  const colorsList = ['All', 'Black', 'Red', 'Green', 'Blue', 'Wine', 'Mustard', 'Pink', 'Ivory', 'Teal', 'Purple', 'Gold'];

  // Reset all filters
  const handleResetFilters = () => {
    onSelectCategory('All');
    setSelectedSize('All');
    setSelectedColor('All');
    setSelectedPriceRange('All');
    setSelectedFabric('All');
    setSelectedPattern('All');
    setInStockOnly(false);
    setMinRating(0);
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedSize !== 'All' ||
    selectedColor !== 'All' ||
    selectedPriceRange !== 'All' ||
    selectedFabric !== 'All' ||
    selectedPattern !== 'All' ||
    inStockOnly ||
    minRating > 0;

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Category filter
      if (selectedCategory !== 'All') {
        if (selectedCategory === 'New' && !prod.isNew && !prod.isHot) return false;
        else if (selectedCategory === 'Sale' && !prod.isSale && (prod.price - prod.salePrice < 250)) return false;
        else if (
          selectedCategory !== 'New' &&
          selectedCategory !== 'Sale' &&
          prod.category.toLowerCase() !== selectedCategory.toLowerCase()
        ) {
          return false;
        }
      }

      // Size filter
      if (selectedSize !== 'All') {
        const hasSize = prod.sizes?.includes(selectedSize as any);
        if (!hasSize) return false;
      }

      // Color filter
      if (selectedColor !== 'All') {
        const matchesColor =
          prod.colors?.some((c) => c.name.toLowerCase().includes(selectedColor.toLowerCase())) ||
          prod.name.toLowerCase().includes(selectedColor.toLowerCase());
        if (!matchesColor) return false;
      }

      // Price range filter
      if (selectedPriceRange !== 'All') {
        if (selectedPriceRange === 'under-600' && prod.salePrice >= 600) return false;
        if (selectedPriceRange === '600-750' && (prod.salePrice < 600 || prod.salePrice > 750)) return false;
        if (selectedPriceRange === 'above-750' && prod.salePrice <= 750) return false;
      }

      // Fabric filter
      if (selectedFabric !== 'All') {
        if (!prod.fabric?.toLowerCase().includes(selectedFabric.toLowerCase())) return false;
      }

      // Pattern / Craft filter
      if (selectedPattern !== 'All') {
        const matchesPattern =
          prod.pattern?.toLowerCase().includes(selectedPattern.toLowerCase()) ||
          prod.craftsmanship?.toLowerCase().includes(selectedPattern.toLowerCase()) ||
          prod.neckline?.toLowerCase().includes(selectedPattern.toLowerCase());
        if (!matchesPattern) return false;
      }

      // Stock availability
      if (inStockOnly && prod.stock <= 0) return false;

      // Minimum rating
      if (minRating > 0 && prod.rating < minRating) return false;

      return true;
    });
  }, [
    products,
    selectedCategory,
    selectedSize,
    selectedColor,
    selectedPriceRange,
    selectedFabric,
    selectedPattern,
    inStockOnly,
    minRating,
  ]);

  // Sort products
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (sortBy === 'price-asc') return a.salePrice - b.salePrice;
      if (sortBy === 'price-desc') return b.salePrice - a.salePrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [filteredProducts, sortBy]);

  return (
    <section id="catalog" className="py-12 sm:py-16 bg-stone-50/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#e60070] animate-ping inline-block" />
              <span className="text-xs uppercase tracking-widest text-[#e60070] font-extrabold">
                Sathi Boutique Atelier · 25 Exclusive Styles
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-stone-900 tracking-tight mt-1">
              {selectedCategory === 'All' ? '25 Stylish Sleeveless Blouse Collection' : selectedCategory}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Showing {sortedProducts.length} of {products.length} sleeveless blouses showcasing necklines, sleeve cuts, fabrics, and artisan embroidery.
            </p>
          </div>

          {/* Right Action Bar: Sorting Dropdown & Filter Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            
            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden px-3.5 py-2 rounded-xl bg-white border border-stone-200 text-xs font-bold text-stone-800 flex items-center gap-1.5 shadow-2xs"
            >
              <Filter className="w-3.5 h-3.5 text-[#e60070]" />
              <span>Filters {hasActiveFilters && '(Active)'}</span>
            </button>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-stone-700 bg-white border border-stone-200 px-3 py-2 rounded-xl shadow-2xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
              <label htmlFor="blouse-sort" className="font-semibold text-stone-500 hidden sm:inline">Sort:</label>
              <select
                id="blouse-sort"
                aria-label="Sort products"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-bold text-stone-900 focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured Collection</option>
                <option value="newest">Newest Designs</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated (4.8★+)</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-xs font-bold text-[#e60070] hover:text-[#c2005e] bg-rose-50 px-3 py-2 rounded-xl border border-rose-200 flex items-center gap-1"
                title="Clear all filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex items-center gap-1.5 flex-wrap pb-4">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Active:</span>
            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-semibold">
                Category: {selectedCategory}
                <button onClick={() => onSelectCategory('All')}>✕</button>
              </span>
            )}
            {selectedSize !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-200 text-stone-800 text-xs font-semibold">
                Size: {selectedSize}
                <button onClick={() => setSelectedSize('All')}>✕</button>
              </span>
            )}
            {selectedColor !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-pink-100 text-pink-900 text-xs font-semibold">
                Color: {selectedColor}
                <button onClick={() => setSelectedColor('All')}>✕</button>
              </span>
            )}
            {selectedFabric !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
                Fabric: {selectedFabric}
                <button onClick={() => setSelectedFabric('All')}>✕</button>
              </span>
            )}
            {inStockOnly && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold">
                In Stock Only
                <button onClick={() => setInStockOnly(false)}>✕</button>
              </span>
            )}
          </div>
        )}

        {/* Main Layout: Left Filters + 4-Column Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ================= LEFT SIDEBAR FILTER PANEL ================= */}
          <aside
            className={`lg:col-span-3 bg-white p-5 rounded-3xl border border-stone-200 shadow-sm space-y-6 ${
              showMobileFilters ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#e60070]" />
                <span>Filter Blouses</span>
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-semibold text-[#e60070] hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* 1. Category Filter */}
            <div>
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2.5">
                Blouse Category
              </h4>
              <div className="space-y-1.5 text-xs pr-1">
                {categoriesList.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => onSelectCategory(cat)}
                    className={`w-full text-left py-1.5 px-2.5 rounded-lg transition-colors flex items-center justify-between ${
                      selectedCategory === cat
                        ? 'bg-rose-50 text-[#e60070] font-bold'
                        : 'text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <span className="truncate">{cat}</span>
                    {selectedCategory === cat && <Check className="w-3.5 h-3.5 text-[#e60070]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Size Filter */}
            <div className="pt-2 border-t border-stone-100">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2.5">
                Bust Size
              </h4>
              <div className="grid grid-cols-4 gap-1.5 text-xs">
                {sizesList.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-1.5 text-center font-bold rounded-lg border transition-all ${
                      selectedSize === s
                        ? 'bg-[#e60070] text-white border-[#e60070] shadow-xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:border-rose-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Color Filter */}
            <div className="pt-2 border-t border-stone-100">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                Color Palette
              </h4>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {colorsList.map((col) => (
                  <button
                    key={col}
                    onClick={() => setSelectedColor(col)}
                    className={`px-2.5 py-1 rounded-full border text-[11px] font-semibold transition-all ${
                      selectedColor === col
                        ? 'bg-[#e60070] text-white border-[#e60070]'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Fabric Filter */}
            <div className="pt-2 border-t border-stone-100">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                Fabric Material
              </h4>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {fabricsList.map((fab) => (
                  <button
                    key={fab}
                    onClick={() => setSelectedFabric(fab)}
                    className={`px-2.5 py-1 rounded-full border text-[11px] font-semibold transition-all ${
                      selectedFabric === fab
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    {fab}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Pattern & Craft Filter */}
            <div className="pt-2 border-t border-stone-100">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                Neckline &amp; Craft
              </h4>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {patternsList.map((pat) => (
                  <button
                    key={pat}
                    onClick={() => setSelectedPattern(pat)}
                    className={`px-2.5 py-1 rounded-full border text-[11px] font-semibold transition-all ${
                      selectedPattern === pat
                        ? 'bg-[#e60070] text-white border-[#e60070]'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    {pat}
                  </button>
                ))}
              </div>
            </div>

            {/* 6. Stock Availability */}
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="font-bold text-stone-800">In Stock Only</span>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 text-[#e60070] rounded cursor-pointer accent-[#e60070]"
              />
            </div>

            {/* 7. Customer Rating Filter */}
            <div className="pt-2 border-t border-stone-100">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2">
                Minimum Rating
              </h4>
              <div className="flex items-center gap-2 text-xs">
                {[0, 4.7, 4.9].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setMinRating(rate)}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-bold flex items-center gap-1 ${
                      minRating === rate
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-stone-50 text-stone-600 border-stone-200'
                    }`}
                  >
                    {rate === 0 ? 'All' : `${rate}★+`}
                  </button>
                ))}
              </div>
            </div>

          </aside>

          {/* ================= RIGHT 4-COLUMN PRODUCT GRID =================
              Desktop: 4 columns
              Tablet: 3 columns
              Mobile: 2 columns
          */}
          <div className="lg:col-span-9">
            
            {sortedProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 p-8 space-y-3">
                <div className="text-3xl">🪡</div>
                <h3 className="font-bold text-stone-900 text-base">No Matching Blouses Found</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Try broadening your category or size filters to discover more handcrafted sleeveless blouse designs.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 bg-[#e60070] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#c2005e] transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5">
                {sortedProducts.map((prod, idx) => (
                  <ProductCard
                    key={prod.productId}
                    product={prod}
                    onAddToCart={onAddToCart}
                    onQuickView={onQuickView}
                    isWishlisted={wishlist.includes(prod.productId)}
                    onToggleWishlist={onToggleWishlist}
                    isHighlighted={idx === 9}
                  />
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
