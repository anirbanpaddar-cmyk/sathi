/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, MapPin, CreditCard, Banknote, Truck, ArrowRight } from 'lucide-react';
import { Cart, Order, ShippingAddress } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Cart;
  onPlaceOrder: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onPlaceOrder,
}) => {
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: 'Anirban Poddar',
    phone: '+91 98301 23456',
    email: 'anirbanpaddar@gmail.com',
    streetAddress: 'Flat 4B, Sonar Tori Apartments, Lake Gardens',
    city: 'Kolkata',
    state: 'West Bengal',
    postalCode: '700045',
    country: 'India',
  });

  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking' | 'Cash on Delivery'>('UPI');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `SB-ORD-${Math.floor(1000 + Math.random() * 9000)}`;
      const trackingNumber = `DELHIVERY-WB-${Math.floor(100000 + Math.random() * 900000)}`;

      const newOrder: Order = {
        orderId,
        customerId: cart.customerId,
        items: [...cart.items],
        shippingAddress: { ...address },
        paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Cash on Delivery' : 'Paid',
        orderStatus: 'Placed',
        subtotal: cart.subtotal,
        discount: cart.discount,
        shipping: cart.shipping,
        grandTotal: cart.total,
        createdAt: new Date().toISOString(),
        paymentMethod,
        estimatedDeliveryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        trackingNumber,
      };

      setIsSubmitting(false);
      setCompletedOrder(newOrder);
      onPlaceOrder(newOrder);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-stone-200">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">
                {completedOrder ? 'Order Confirmed!' : 'Boutique Express Checkout'}
              </h3>
              <p className="text-xs text-stone-500">
                {completedOrder ? 'Thank you for shopping with Sathi BOLUS' : 'Fill details for nationwide door delivery'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {completedOrder ? (
          /* Order Confirmation View */
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full">
                Order Placed Successfully
              </span>
              <h4 className="text-xl font-serif-luxury font-bold text-stone-900">
                Order #{completedOrder.orderId}
              </h4>
              <p className="text-xs text-stone-600">
                A confirmation SMS & email receipt has been sent to <strong>{completedOrder.shippingAddress.email}</strong>
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-stone-50 rounded-2xl p-4 text-left border border-stone-200 text-xs space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                <span className="font-semibold text-stone-700">Estimated Delivery:</span>
                <span className="text-stone-900 font-bold">{completedOrder.estimatedDeliveryDate}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                <span className="font-semibold text-stone-700">Tracking AWB:</span>
                <span className="font-mono text-rose-700 font-bold">{completedOrder.trackingNumber}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-stone-200">
                <span className="font-semibold text-stone-700">Delivery Address:</span>
                <span className="text-stone-800 text-right max-w-xs">
                  {completedOrder.shippingAddress.streetAddress}, {completedOrder.shippingAddress.city} - {completedOrder.shippingAddress.postalCode}
                </span>
              </div>
              <div className="flex justify-between items-center pt-1 font-bold text-sm text-stone-900">
                <span>Grand Total ({completedOrder.paymentStatus}):</span>
                <span className="text-rose-700 font-sans tabular-nums">₹{completedOrder.grandTotal}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="w-full py-3 bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* Step 1: Shipping Address */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-stone-900 border-b border-stone-200 pb-2">
                <MapPin className="w-4 h-4 text-rose-700" />
                <span>1. Shipping Address</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-rose-600"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Phone Number (with WhatsApp)</label>
                  <input
                    type="tel"
                    required
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-rose-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-700 font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={address.email}
                    onChange={(e) => setAddress({ ...address, email: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-rose-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-700 font-semibold mb-1">Street Address / Landmark</label>
                  <input
                    type="text"
                    required
                    value={address.streetAddress}
                    onChange={(e) => setAddress({ ...address, streetAddress: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-rose-600"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-rose-600"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-rose-600"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">PIN / Postal Code</label>
                  <input
                    type="text"
                    required
                    value={address.postalCode}
                    onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-rose-600"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Country</label>
                  <input
                    type="text"
                    disabled
                    value={address.country}
                    className="w-full px-3 py-2 border border-stone-200 bg-stone-100 rounded-lg text-stone-600"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-stone-900 border-b border-stone-200 pb-2">
                <CreditCard className="w-4 h-4 text-rose-700" />
                <span>2. Payment Option</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { id: 'UPI', label: 'UPI / GPay / QR', icon: CreditCard },
                  { id: 'Card', label: 'Credit / Debit', icon: CreditCard },
                  { id: 'NetBanking', label: 'Net Banking', icon: Banknote },
                  { id: 'Cash on Delivery', label: 'Cash on Delivery', icon: Truck },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setPaymentMethod(item.id as any)}
                    className={`p-3 rounded-xl border text-center flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === item.id
                        ? 'border-rose-600 bg-rose-50 text-rose-900 font-bold ring-1 ring-rose-500'
                        : 'border-stone-200 hover:border-stone-300 text-stone-700'
                    }`}
                  >
                    <item.icon className="w-4 h-4 text-rose-700" />
                    <span className="text-[11px] leading-tight">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Order Summary Pill */}
            <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200 text-xs flex items-center justify-between">
              <div>
                <span className="font-semibold text-stone-800">{cart.quantity} items</span>
                <span className="text-stone-500 ml-1.5">in your shopping bag</span>
              </div>
              <div className="text-right">
                <span className="text-stone-500 mr-2">Grand Total:</span>
                <span className="text-base font-bold text-rose-700 font-sans tabular-nums">
                  ₹{cart.total}
                </span>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-rose-700 hover:bg-rose-800 active:scale-98 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-rose-700/25 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Processing Order...</span>
                ) : (
                  <>
                    <span>Place Order · Pay ₹{cart.total}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
