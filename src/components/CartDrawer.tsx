/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, ShieldCheck, Check } from 'lucide-react';
import { Cart } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Cart;
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onApplyCoupon: (code: string) => boolean;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onApplyCoupon,
  onProceedToCheckout,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; success: boolean } | null>(null);

  if (!isOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const ok = onApplyCoupon(couponInput.trim());
    if (ok) {
      setCouponMessage({ text: `Code ${couponInput.toUpperCase()} applied successfully!`, success: true });
    } else {
      setCouponMessage({ text: 'Invalid coupon. Try SATHI30 for 30% off.', success: false });
    }
  };

  const freeDeliveryThreshold = 499;
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - cart.subtotal);
  const freeDeliveryProgress = Math.min(100, Math.round((cart.subtotal / freeDeliveryThreshold) * 100));

  const savingsAmount = (cart.price - cart.subtotal) + cart.discount;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
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
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                  <span>Shopping Cart</span>
                  <span className="text-xs bg-rose-100 text-rose-800 font-semibold px-2 py-0.5 rounded-full">
                    {cart.quantity} items
                  </span>
                </h3>
                <span className="text-[10px] text-stone-600 font-mono">
                  Cart ID: {cart.cartId}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-200 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-rose-50/60 p-3 border-b border-rose-100 text-xs">
            {amountNeededForFreeDelivery > 0 ? (
              <p className="text-rose-900 font-medium">
                Add <strong className="font-bold">₹{amountNeededForFreeDelivery}</strong> more for <strong>FREE Delivery</strong> across India!
              </p>
            ) : (
              <p className="text-emerald-700 font-semibold flex items-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>You unlocked <strong>FREE Nationwide Delivery!</strong> 🎉</span>
              </p>
            )}
            <div className="w-full bg-rose-200/80 rounded-full h-1.5 mt-2 overflow-hidden">
              <div
                className="bg-rose-600 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${freeDeliveryProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="text-base font-bold text-stone-800">Your bag is empty</p>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto">
                    Explore our Bengali boutique collection of designer sleeveless blouses and stylish short kurtis!
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-rose-700 text-white text-xs font-semibold rounded-full hover:bg-rose-800 transition-colors shadow-sm"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3 rounded-xl border border-stone-200/80 bg-stone-50/40 hover:bg-stone-50 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-24 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/src/assets/images/blouse_back_design_1791016577426.jpg';
                      }}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-stone-900 line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-0.5"
                          title="Remove item"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                        <span>Size: <strong className="text-stone-800">{item.size}</strong></span>
                        <span>·</span>
                        <span>{item.color}</span>
                      </div>
                      <span className="text-[10px] text-stone-400 font-mono">
                        SKU: {item.SKU}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-200/60">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-stone-300 rounded-md bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 text-stone-500 hover:text-stone-900 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-stone-800 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 text-stone-500 hover:text-stone-900 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line Total */}
                      <div className="text-right">
                        <span className="text-sm font-bold text-rose-700 tabular-nums font-sans">
                          ₹{item.lineTotal}
                        </span>
                        {item.quantity > 1 && (
                          <div className="text-[10px] text-stone-400 tabular-nums">
                            ₹{item.price} each
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Calculations (Matching Cart schema) */}
          {cart.items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50/80 space-y-3.5">
              
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Coupon (e.g. SATHI30)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 uppercase font-mono placeholder:normal-case placeholder:font-sans focus:outline-rose-600"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </div>
                {couponMessage && (
                  <p className={`text-[11px] font-medium ${couponMessage.success ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {couponMessage.text}
                  </p>
                )}
              </form>

              {/* Breakdown Fields */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-1">
                <div className="flex justify-between">
                  <span>Catalog MRP</span>
                  <span className="tabular-nums font-mono">₹{cart.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Boutique Subtotal</span>
                  <span className="tabular-nums font-medium text-stone-900">₹{cart.subtotal}</span>
                </div>
                {cart.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span className="flex items-center gap-1">
                      <span>Festive Coupon ({cart.appliedCoupon || 'SATHI30'})</span>
                    </span>
                    <span className="tabular-nums font-mono">-₹{cart.discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span className="tabular-nums font-medium">
                    {cart.shipping === 0 ? (
                      <span className="text-emerald-600 font-bold uppercase tracking-wider text-[11px]">FREE</span>
                    ) : (
                      `₹${cart.shipping}`
                    )}
                  </span>
                </div>

                {savingsAmount > 0 && (
                  <div className="py-1 px-2.5 bg-emerald-50 text-emerald-700 rounded-md text-[11px] font-medium flex items-center justify-between">
                    <span>Your Total Savings:</span>
                    <strong className="font-bold font-mono">₹{savingsAmount}</strong>
                  </div>
                )}

                <div className="flex justify-between items-baseline pt-2 border-t border-stone-200 text-sm font-bold text-stone-900">
                  <span>Grand Total</span>
                  <span className="text-lg text-rose-700 tabular-nums font-sans">₹{cart.total}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-rose-700/25 transition-all flex items-center justify-center gap-2 group active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone-500 pt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Safe Payments & Cash on Delivery Available</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
