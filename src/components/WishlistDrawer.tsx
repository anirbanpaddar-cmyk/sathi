/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product, ProductVariant } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  products: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product, variant: ProductVariant, quantity: number) => void;
  onQuickView: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  products,
  onRemoveFromWishlist,
  onAddToCart,
  onQuickView,
}) => {
  if (!isOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.productId));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center">
                <Heart className="w-4 h-4 fill-rose-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  My Wishlist ({wishlistedProducts.length})
                </h3>
                <p className="text-[10px] text-stone-500">Saved items for festive occasions</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {wishlistedProducts.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <Heart className="w-12 h-12 text-rose-200 mx-auto" />
                <p className="text-sm font-bold text-stone-800">Your wishlist is empty</p>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Click the heart icon on any blouse or kurti to save it for later.
                </p>
              </div>
            ) : (
              wishlistedProducts.map((prod) => (
                <div
                  key={prod.productId}
                  className="flex gap-3.5 p-3 rounded-xl border border-stone-200 bg-stone-50/50"
                >
                  <div
                    onClick={() => {
                      onClose();
                      onQuickView(prod);
                    }}
                    className="w-20 h-24 rounded-lg overflow-hidden bg-stone-100 shrink-0 cursor-pointer"
                  >
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/src/assets/images/blouse_back_design_1791016577426.jpg';
                      }}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4
                          onClick={() => {
                            onClose();
                            onQuickView(prod);
                          }}
                          className="text-xs sm:text-sm font-bold text-stone-900 line-clamp-1 cursor-pointer hover:text-rose-700"
                        >
                          {prod.name}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(prod.productId)}
                          className="text-stone-400 hover:text-rose-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-xs font-bold text-rose-700 tabular-nums mt-1 font-sans">
                        ₹{prod.salePrice}
                        <span className="text-[11px] text-stone-400 line-through font-normal ml-2">
                          ₹{prod.price}
                        </span>
                      </div>
                      <div className="text-[10px] text-stone-400 font-mono mt-0.5">
                        SKU: {prod.SKU}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onAddToCart(prod, prod.variants[0], 1);
                        onRemoveFromWishlist(prod.productId);
                      }}
                      className="mt-2 w-full py-1.5 px-3 bg-rose-700 hover:bg-rose-800 text-white text-[11px] font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
