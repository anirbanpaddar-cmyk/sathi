/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Package, CheckCircle, Clock, Truck, MapPin, Receipt, ArrowRight } from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface OrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export const OrdersModal: React.FC<OrdersModalProps> = ({
  isOpen,
  onClose,
  orders,
}) => {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  if (!isOpen) return null;

  const activeOrder = orders.find((o) => o.orderId === selectedOrderId) || orders[0];

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Placed':
        return <span className="bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-full text-xs">Order Placed</span>;
      case 'Processing':
        return <span className="bg-amber-50 text-amber-700 font-semibold px-2 py-0.5 rounded-full text-xs">Stitching & QC</span>;
      case 'Shipped':
        return <span className="bg-purple-50 text-purple-700 font-semibold px-2 py-0.5 rounded-full text-xs">In Transit (Shipped)</span>;
      case 'Delivered':
        return <span className="bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full text-xs">Delivered</span>;
      default:
        return <span className="bg-stone-100 text-stone-700 font-semibold px-2 py-0.5 rounded-full text-xs">{status}</span>;
    }
  };

  const steps = ['Placed', 'Processing', 'Shipped', 'Delivered'] as const;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden border border-stone-200">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">
                My Orders & Deliveries
              </h3>
              <p className="text-xs text-stone-500">
                Track handcrafted items from Sathi BOLUS Kolkata workshop
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
        {orders.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Package className="w-12 h-12 text-stone-300 mx-auto" />
            <p className="text-sm font-semibold text-stone-800">No placed orders yet</p>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Place your first order today to experience tailored Indian ethnic craftsmanship!
            </p>
          </div>
        ) : (
          <div className="p-5 sm:p-6 space-y-6">
            
            {/* Order Selector Tabs if multiple */}
            {orders.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 border-b border-stone-200">
                {orders.map((ord) => (
                  <button
                    key={ord.orderId}
                    onClick={() => setSelectedOrderId(ord.orderId)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      activeOrder?.orderId === ord.orderId
                        ? 'bg-rose-700 text-white shadow-xs'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    #{ord.orderId} ({ord.orderStatus})
                  </button>
                ))}
              </div>
            )}

            {activeOrder && (
              <div className="space-y-6">
                
                {/* Status Hero Card */}
                <div className="bg-stone-50 rounded-2xl p-4 sm:p-5 border border-stone-200 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-stone-900">
                          Order #{activeOrder.orderId}
                        </span>
                        {getStatusBadge(activeOrder.orderStatus)}
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Customer ID: {activeOrder.customerId} · Placed on {new Date(activeOrder.createdAt || activeOrder.orderDate || Date.now()).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <div className="text-xs text-stone-500">Expected Delivery</div>
                      <div className="text-sm font-bold text-stone-900">
                        {activeOrder.estimatedDeliveryDate || activeOrder.estimatedDelivery}
                      </div>
                    </div>
                  </div>

                  {/* Progress Timeline */}
                  <div className="pt-2">
                    <div className="grid grid-cols-4 relative text-center">
                      <div className="absolute top-4 left-6 right-6 h-0.5 bg-stone-200 -z-0" />
                      
                      {steps.map((st, idx) => {
                        const currentIdx = steps.indexOf(activeOrder.orderStatus as any);
                        const isDone = idx <= currentIdx;
                        const isCurrent = idx === currentIdx;

                        return (
                          <div key={st} className="flex flex-col items-center relative z-10">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                isDone
                                  ? 'bg-rose-700 text-white ring-4 ring-rose-100'
                                  : 'bg-stone-100 text-stone-400 border border-stone-300'
                              }`}
                            >
                              {isDone ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                            </div>
                            <span className={`text-[11px] font-semibold mt-1.5 ${isCurrent ? 'text-rose-700' : 'text-stone-600'}`}>
                              {st}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {activeOrder.trackingNumber && (
                    <div className="flex items-center justify-between text-xs bg-white p-2.5 rounded-xl border border-stone-200">
                      <div className="flex items-center gap-2 text-stone-700">
                        <Truck className="w-4 h-4 text-rose-700" />
                        <span>Courier Partner: Delhivery Express</span>
                      </div>
                      <span className="font-mono text-stone-800 font-bold">
                        AWB: {activeOrder.trackingNumber}
                      </span>
                    </div>
                  )}
                </div>

                {/* Items in this Order */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                    Ordered Boutique Items ({activeOrder.items.length})
                  </h4>

                  <div className="space-y-2.5 max-h-48 overflow-y-auto">
                    {activeOrder.items.map((it) => (
                      <div
                        key={it.id}
                        className="flex items-center justify-between p-3 rounded-xl border border-stone-200 bg-stone-50/40 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={it.image}
                            alt={it.name}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = '/src/assets/images/blouse_back_design_1791016577426.jpg';
                            }}
                            className="w-12 h-14 object-cover object-top rounded-lg border border-stone-200"
                          />
                          <div>
                            <div className="font-bold text-stone-900">{it.name}</div>
                            <div className="text-[11px] text-stone-500">
                              Size: <strong>{it.size}</strong> · Color: {it.color} · Qty: {it.quantity}
                            </div>
                            <div className="text-[10px] text-stone-400 font-mono">
                              SKU: {it.SKU}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-bold text-rose-700 tabular-nums">
                            ₹{it.lineTotal}
                          </div>
                          <div className="text-[10px] text-stone-400">
                            ₹{it.price} each
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping & Financial Breakdown (Matching Order entity specification) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  
                  {/* Delivery Address */}
                  <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/50 space-y-1.5">
                    <div className="font-bold text-stone-900 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-700" />
                      <span>Delivery Address</span>
                    </div>
                    <div className="text-stone-700 font-medium">
                      {activeOrder.shippingAddress.fullName}
                    </div>
                    <div className="text-stone-500 leading-snug">
                      {activeOrder.shippingAddress.streetAddress}, {activeOrder.shippingAddress.city}, {activeOrder.shippingAddress.state} - {activeOrder.shippingAddress.postalCode}
                    </div>
                    <div className="text-stone-500 pt-1">
                      Phone: <strong className="text-stone-700">{activeOrder.shippingAddress.phone}</strong>
                    </div>
                  </div>

                  {/* Financial Total */}
                  <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/50 space-y-1.5">
                    <div className="font-bold text-stone-900 flex items-center gap-1.5">
                      <Receipt className="w-3.5 h-3.5 text-rose-700" />
                      <span>Payment & Totals</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Subtotal:</span>
                      <span className="font-medium text-stone-800">₹{activeOrder.subtotal}</span>
                    </div>
                    {activeOrder.discount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-medium">
                        <span>Discount:</span>
                        <span>-₹{activeOrder.discount}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-stone-600">
                      <span>Shipping:</span>
                      <span>{activeOrder.shipping === 0 ? 'FREE' : `₹${activeOrder.shipping}`}</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Payment Status:</span>
                      <span className="font-semibold text-rose-700">{activeOrder.paymentStatus}</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-2 border-t border-stone-200 font-bold text-sm text-stone-900">
                      <span>Grand Total:</span>
                      <span className="text-rose-700 font-sans tabular-nums">₹{activeOrder.grandTotal}</span>
                    </div>
                  </div>

                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
