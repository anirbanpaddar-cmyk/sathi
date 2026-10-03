/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, ShieldCheck, Truck, RotateCcw, Check, Sparkles, MessageSquare } from 'lucide-react';
import { Product, ProductVariant, Review } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, variant: ProductVariant, quantity: number) => void;
  onBuyNow?: (product: Product, variant: ProductVariant, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onAddReview: (productId: string, review: Review) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
  onAddReview,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  // New review form states
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerRating, setReviewerRating] = useState(5);
  const [reviewerComment, setReviewerComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  if (!product) return null;

  const currentVariant = product.variants[selectedVariantIndex] || product.variants[0];

  const handleAddToCart = () => {
    onAddToCart(product, currentVariant, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewerComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      reviewer: reviewerName.trim(),
      rating: reviewerRating,
      comment: reviewerComment.trim(),
      date: 'Just now',
      verified: true,
    };

    onAddReview(product.productId, newRev);
    setReviewerName('');
    setReviewerComment('');
    setShowReviewForm(false);
  };

  const discountPercent = Math.round(((product.price - product.salePrice) / product.price) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border border-stone-200 my-8">
        
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/90 hover:bg-white text-stone-600 hover:text-stone-950 rounded-full shadow-md transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 p-6 sm:p-8">
          
          {/* Gallery Column (md:col-span-6) */}
          <div className="md:col-span-6 space-y-4">
            {/* Primary Main Image */}
            <div className="relative aspect-3/4 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/src/assets/images/blouse_back_design_1791016577426.jpg';
                }}
                className="w-full h-full object-cover object-top"
              />
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                {product.isHot && (
                  <span className="bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                    Hot Seller
                  </span>
                )}
                {product.isNew && (
                  <span className="bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                    New Design
                  </span>
                )}
              </div>

              {/* Wishlist button */}
              <button
                onClick={() => onToggleWishlist(product.productId)}
                className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md shadow-xs transition-colors ${
                  isWishlisted
                    ? 'bg-rose-50 text-rose-600 fill-rose-600'
                    : 'bg-white/80 text-stone-700 hover:text-rose-600 hover:bg-white'
                }`}
                aria-label="Toggle Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
              </button>
            </div>

            {/* Thumbnails row */}
            {product.images.length > 1 && (
              <div className="flex gap-2.5">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === idx
                        ? 'border-rose-600 ring-2 ring-rose-200'
                        : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx}`}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/src/assets/images/blouse_back_design_1791016577426.jpg';
                      }}
                      className="w-full h-full object-cover object-top"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Value Guarantees */}
            <div className="p-3.5 bg-rose-50/50 rounded-xl border border-rose-100/70 text-xs text-stone-700 space-y-2">
              <div className="flex items-center gap-2 font-medium">
                <Truck className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Fast Dispatch from Kolkata Boutique within 24 Hours</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Handpicked Quality with soft cotton inner lining</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <RotateCcw className="w-4 h-4 text-amber-600 shrink-0" />
                <span>7-Day Easy Exchange policy</span>
              </div>
            </div>
          </div>

          {/* Details & Purchase Module Column (md:col-span-6) */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-5">
            <div>
              {/* Category, SKU, and Rating */}
              <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
                <span className="font-bold text-rose-700 uppercase tracking-wider">
                  {product.category}
                </span>
                <span className="font-mono text-stone-500">
                  SKU: <strong className="text-stone-700">{product.SKU}</strong>
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-serif-luxury font-bold text-stone-900 leading-snug">
                {product.name}
              </h2>

              {/* Rating stars & review jump */}
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${
                        s <= Math.round(product.rating)
                          ? 'text-amber-500 fill-amber-500'
                          : 'text-stone-300'
                      }`}
                    />
                  ))}
                  <span className="font-bold text-xs text-stone-900 ml-1">{product.rating}</span>
                </div>
                <span className="text-stone-300">|</span>
                <span className="text-xs text-stone-600">
                  {product.reviews.length} Verified Reviews
                </span>
                <span className="text-stone-300">|</span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {product.stock > 0 ? `In Stock (${product.stock} units)` : 'Out of Stock'}
                </span>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mt-4 pt-3 border-t border-stone-200">
                <span className="text-2xl sm:text-3xl font-bold text-rose-700 tabular-nums font-sans">
                  ₹{product.salePrice}
                </span>
                {product.price > product.salePrice && (
                  <span className="text-base text-stone-600 line-through tabular-nums">
                    ₹{product.price}
                  </span>
                )}
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
                  {discountPercent}% OFF (Save ₹{product.price - product.salePrice})
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-3">
                {product.description}
              </p>

              {/* Fabric Specs */}
              {product.fabric && (
                <div className="mt-3 p-3 bg-stone-50 rounded-xl text-xs space-y-1 border border-stone-200/70">
                  <div>
                    <strong className="text-stone-800">Fabric Composition:</strong> {product.fabric}
                  </div>
                  {product.careInstructions && (
                    <div>
                      <strong className="text-stone-800">Care:</strong> {product.careInstructions}
                    </div>
                  )}
                </div>
              )}

              {/* Variant Selector: Color */}
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-stone-800">
                    Select Color:{' '}
                    <span className="font-semibold text-rose-700">{currentVariant.color}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {product.variants.map((variant, idx) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariantIndex(idx)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                        selectedVariantIndex === idx
                          ? 'border-rose-600 bg-rose-50 text-rose-900 ring-1 ring-rose-500'
                          : 'border-stone-200 hover:border-stone-300 text-stone-700'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-stone-300"
                        style={{ backgroundColor: variant.colorHex }}
                      />
                      <span>{variant.color}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Variant Selector: Size */}
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-stone-800">
                    Select Size:{' '}
                    <span className="font-semibold text-rose-700">{currentVariant.size}</span>
                  </span>
                  <span className="text-[11px] text-stone-500">
                    Bust 34"-42" with 2" alteration margin
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {(['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const).map((sz) => {
                    const exists = product.variants.some((v) => v.size === sz);
                    const isSelected = currentVariant.size === sz;
                    return (
                      <button
                        key={sz}
                        disabled={!exists}
                        onClick={() => {
                          const idx = product.variants.findIndex((v) => v.size === sz);
                          if (idx !== -1) setSelectedVariantIndex(idx);
                        }}
                        className={`w-11 h-9 rounded-lg border text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-rose-700 text-white border-rose-700 shadow-xs'
                            : exists
                            ? 'border-stone-300 text-stone-700 hover:border-rose-600'
                            : 'border-stone-200 text-stone-300 line-through cursor-not-allowed'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Stepper & Buy Actions */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-stone-300 rounded-xl bg-white p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center text-stone-600 hover:text-stone-950 font-bold"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-stone-900 tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-8 h-8 flex items-center justify-center text-stone-600 hover:text-stone-950 font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* Button 1: [ ADD TO CART ] */}
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-3.5 px-5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                      addedNotice
                        ? 'bg-emerald-600 text-white'
                        : 'bg-rose-700 hover:bg-rose-800 text-white shadow-rose-700/25 active:scale-98'
                    }`}
                  >
                    {addedNotice ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>ADD TO CART</span>
                      </>
                    )}
                  </button>

                  {/* Button 2: [ BUY NOW ] */}
                  <button
                    onClick={() => {
                      if (onBuyNow) {
                        onBuyNow(product, currentVariant, quantity);
                      } else {
                        handleAddToCart();
                      }
                    }}
                    className="py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-md active:scale-98 transition-all"
                  >
                    BUY NOW
                  </button>
                </div>

                {/* Button 3: [ ♡ ADD TO WISHLIST ] */}
                <button
                  onClick={() => onToggleWishlist(product.productId)}
                  className={`w-full py-2.5 px-4 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    isWishlisted
                      ? 'bg-rose-50 border-rose-300 text-rose-700'
                      : 'bg-white border-stone-300 text-stone-700 hover:border-rose-400 hover:text-rose-700'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
                  <span>{isWishlisted ? 'IN YOUR WISHLIST' : '♡ ADD TO WISHLIST'}</span>
                </button>
              </div>
            </div>

            {/* Customer Reviews Section */}
            <div className="pt-4 border-t border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-rose-700" />
                  <span>Customer Reviews ({product.reviews.length})</span>
                </h4>
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="text-xs font-semibold text-rose-700 hover:text-rose-900"
                >
                  {showReviewForm ? 'Cancel' : '+ Write a Review'}
                </button>
              </div>

              {/* Review Input Box */}
              {showReviewForm && (
                <form onSubmit={handleReviewSubmit} className="p-3 bg-stone-50 rounded-xl space-y-2 border border-stone-200 text-xs">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Swarnali Chakraborty"
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-stone-300 rounded-md bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Rating</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setReviewerRating(s)}
                          className="p-1 focus:outline-none"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              s <= reviewerRating ? 'text-amber-500 fill-amber-500' : 'text-stone-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Your Feedback</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Tell us about the fabric quality, stitching, and fit..."
                      value={reviewerComment}
                      onChange={(e) => setReviewerComment(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-stone-300 rounded-md bg-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-rose-700 text-white font-semibold rounded-md text-xs hover:bg-rose-800"
                  >
                    Submit Review
                  </button>
                </form>
              )}

              {/* List of customer reviews */}
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {product.reviews.map((rev) => (
                  <div key={rev.id} className="p-2.5 bg-stone-50/60 rounded-xl border border-stone-200/60 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <strong className="text-stone-900 font-semibold">{rev.reviewer}</strong>
                        {rev.verified && (
                          <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1 rounded-sm font-medium">
                            Verified Buyer
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-stone-400">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-0.5 mb-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3 h-3 ${
                            s <= rev.rating ? 'text-amber-500 fill-amber-500' : 'text-stone-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-stone-600 leading-snug">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
