/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star, Check } from 'lucide-react';
import { Product, ProductVariant } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, variant: ProductVariant, quantity: number) => void;
  onQuickView: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  isFeaturedCard?: boolean;
  isHighlighted?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  isWishlisted,
  onToggleWishlist,
  isFeaturedCard = false,
  isHighlighted = false,
}) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  const selectedVariant = product.variants[selectedVariantIndex] || product.variants[0] || {
    id: `var-${product.productId}-m`,
    size: 'M',
    color: product.colors?.[0]?.name || 'Standard',
    colorHex: product.colors?.[0]?.hex || '#18181b',
    stock: product.stock,
    inStock: product.stock > 0,
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedVariant, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const discountPercent = Math.round(((product.price - product.salePrice) / product.price) * 100);
  const primaryColor = product.colors?.[0]?.name || selectedVariant?.color || 'Boutique Shade';
  const displayReviewCount = product.reviewsCount || product.reviews.length || 48;

  return (
    <div
      onClick={() => onQuickView(product)}
      className={`group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border ${
        isHighlighted
          ? 'bg-[#e60070] border-[#c2005e] ring-2 ring-[#e60070] shadow-xl shadow-[#e60070]/20'
          : isFeaturedCard
          ? 'bg-white border-rose-400 ring-2 ring-rose-300/60 shadow-lg shadow-rose-900/5'
          : 'bg-white border-stone-200/90 hover:border-rose-300 hover:shadow-xl hover:shadow-stone-900/8'
      }`}
    >
      {/* 1. Visual Image Container */}
      <div className="relative aspect-3/4 w-full bg-stone-100 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/src/assets/images/blouse_back_design_1791016577426.jpg';
          }}
          className="w-full h-full object-cover object-top group-hover:scale-106 transition-transform duration-500 ease-out"
        />

        {/* Top Badges (Discount % & Badges) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {discountPercent > 0 && (
            <span className="bg-[#e60070] text-white text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
          {product.badge && (
            <span className="bg-stone-900/85 backdrop-blur-xs text-amber-300 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
              {product.badge}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.productId);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            isWishlisted
              ? 'bg-rose-50 text-[#e60070] fill-[#e60070] shadow-sm'
              : 'bg-white/85 text-stone-700 hover:text-[#e60070] hover:bg-white shadow-xs'
          }`}
          title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          aria-label="Wishlist toggle"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#e60070] text-[#e60070]' : ''}`} />
        </button>

        {/* Quick View Button overlay on hover */}
        <div className="absolute inset-x-0 bottom-2.5 px-3 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full py-1.5 bg-stone-950/90 hover:bg-stone-900 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 shadow-md"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* 2. Product Content Details (Styled with #e60070 when targeted/highlighted) */}
      <div
        className={`p-3.5 sm:p-4 flex flex-col justify-between flex-1 space-y-2.5 transition-colors ${
          isHighlighted
            ? 'bg-[#e60070] text-white'
            : 'bg-white text-stone-900'
        }`}
      >
        {/* Rating & Review Count */}
        <div className="flex items-center justify-between text-[11px]">
          <div className={`flex items-center gap-1 font-bold ${isHighlighted ? 'text-white' : 'text-stone-800'}`}>
            <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>{product.rating}</span>
            <span className={isHighlighted ? 'text-pink-100 font-normal' : 'text-stone-400 font-normal'}>
              ({displayReviewCount})
            </span>
          </div>
          
          {/* Stock Status */}
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-sm ${
            isHighlighted
              ? 'bg-white/20 text-white'
              : product.stock > 10
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-amber-50 text-amber-800'
          }`}>
            {product.stock > 0 ? `${product.stock} In Stock` : 'Out of Stock'}
          </span>
        </div>

        {/* Product Title */}
        <div>
          <h3 className={`font-bold text-sm line-clamp-1 transition-colors ${
            isHighlighted
              ? 'text-white group-hover:text-amber-200'
              : 'text-stone-900 group-hover:text-[#e60070]'
          }`}>
            {product.name}
          </h3>

          {/* Short Description */}
          <p className={`text-[11px] line-clamp-2 mt-0.5 leading-relaxed ${
            isHighlighted ? 'text-pink-100' : 'text-stone-500'
          }`}>
            {product.shortDescription || product.description}
          </p>
        </div>

        {/* Fabric & Color Badges */}
        <div className="flex items-center gap-2 text-[10px] font-medium pt-0.5">
          <span className={`px-2 py-0.5 rounded-md truncate max-w-[120px] ${
            isHighlighted ? 'bg-white/20 text-white border border-white/30' : 'bg-stone-100 text-stone-600'
          }`}>
            {product.fabric}
          </span>
          <span className={`px-2 py-0.5 rounded-md truncate ${
            isHighlighted ? 'bg-white text-[#e60070] font-bold shadow-xs' : 'bg-rose-50 text-rose-900'
          }`}>
            {primaryColor}
          </span>
        </div>

        {/* Available Sizes List */}
        <div className={`flex items-center gap-1 text-[10px] font-mono ${
          isHighlighted ? 'text-pink-100' : 'text-stone-500'
        }`}>
          <span className={`text-[9px] uppercase font-sans font-bold ${
            isHighlighted ? 'text-pink-200' : 'text-stone-400'
          }`}>
            Sizes:
          </span>
          {product.sizes?.map((sz) => (
            <span
              key={sz}
              className={`px-1 py-0.2 rounded text-[10px] ${
                isHighlighted
                  ? 'border border-white/40 text-white bg-white/10'
                  : 'border border-stone-200 text-stone-600'
              }`}
            >
              {sz}
            </span>
          ))}
        </div>

        {/* Price & Discount Row */}
        <div className={`flex items-baseline justify-between pt-1 border-t ${
          isHighlighted ? 'border-white/20' : 'border-stone-100'
        }`}>
          <div className="flex items-baseline gap-1.5">
            <span className={`text-base font-extrabold font-sans ${
              isHighlighted ? 'text-white' : 'text-[#e60070]'
            }`}>
              ₹{product.salePrice}
            </span>
            {product.price > product.salePrice && (
              <span className={`text-xs line-through ${
                isHighlighted ? 'text-pink-200' : 'text-stone-400'
              }`}>
                ₹{product.price}
              </span>
            )}
          </div>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
            isHighlighted
              ? 'bg-white text-[#e60070] font-extrabold shadow-xs'
              : 'text-emerald-700 bg-emerald-50'
          }`}>
            Save ₹{product.price - product.salePrice}
          </span>
        </div>

        {/* [ ADD TO CART ] Action Button */}
        <div className="pt-1">
          <button
            onClick={handleAdd}
            className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : isHighlighted
                ? 'bg-white text-[#e60070] hover:bg-amber-100 active:scale-98 font-extrabold shadow-md'
                : 'bg-[#e60070] hover:bg-[#c2005e] text-white active:scale-98 shadow-rose-700/20'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Bag!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>ADD TO CART</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
