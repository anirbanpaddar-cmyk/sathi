/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, User, Package, MapPin, Heart, Shield, Plus, Edit2, Trash2, CheckCircle2, Clock, Truck, TrendingUp, DollarSign, Box } from 'lucide-react';
import { CustomerUser, Order, Product, ShippingAddress, OrderStatus } from '../types';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: CustomerUser;
  orders: Order[];
  products: Product[];
  wishlistCount: number;
  onOpenWishlist: () => void;
  onUpdateProducts?: (newProducts: Product[]) => void;
  onUpdateOrderStatus?: (orderId: string, newStatus: OrderStatus) => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  user,
  orders,
  products,
  wishlistCount,
  onOpenWishlist,
  onUpdateProducts,
  onUpdateOrderStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses' | 'admin'>('profile');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Admin states
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState<any>('Sleeveless Cotton Kurti');
  const [newProductPrice, setNewProductPrice] = useState(899);
  const [newProductSalePrice, setNewProductSalePrice] = useState(549);
  const [newProductStock, setNewProductStock] = useState(25);

  if (!isOpen) return null;

  const totalSales = orders.reduce((acc, o) => acc + o.grandTotal, 0);
  const totalUnits = orders.reduce((acc, o) => acc + o.items.reduce((sum, item) => sum + item.quantity, 0), 0);

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onUpdateProducts) return;

    if (editingProduct) {
      const updated = products.map((p) =>
        p.productId === editingProduct.productId
          ? {
              ...p,
              name: editingProduct.name,
              price: editingProduct.price,
              salePrice: editingProduct.salePrice,
              stock: editingProduct.stock,
              category: editingProduct.category,
            }
          : p
      );
      onUpdateProducts(updated);
      setEditingProduct(null);
    } else {
      const created: Product = {
        productId: `kurti-${Date.now()}`,
        name: newProductName || 'New Designer Kurti',
        category: newProductCategory,
        price: Number(newProductPrice),
        salePrice: Number(newProductSalePrice),
        stock: Number(newProductStock),
        images: ['/src/assets/images/kurti_indigo_front_1791019961352.jpg'],
        description: 'New seasonal arrival in premium breathable fabric.',
        SKU: `SKU-NEW-${Math.floor(Math.random() * 900 + 100)}`,
        rating: 5.0,
        reviewsCount: 1,
        fabric: '100% Pure Cotton',
        pattern: 'Contemporary',
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        colors: [{ name: 'Indigo Blue', hex: '#1E3A8A' }],
        variants: [],
        reviews: [],
        isNew: true,
      };
      onUpdateProducts([created, ...products]);
      setShowAddProductModal(false);
      setNewProductName('');
    }
  };

  const handleDeleteProduct = (prodId: string) => {
    if (!onUpdateProducts) return;
    if (confirm('Are you sure you want to remove this product from the catalog?')) {
      onUpdateProducts(products.filter((p) => p.productId !== prodId));
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border border-stone-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-stone-900 via-rose-950 to-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-rose-600/30 border border-rose-400/50 flex items-center justify-center text-amber-300">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-serif-luxury tracking-wide">
                Customer &amp; Boutique Account
              </h2>
              <p className="text-xs text-rose-200/90">
                {isLoggedIn ? `Welcome back, ${user.name}` : 'Sign in to access orders & saved items'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-stone-300 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-4 sm:px-6 overflow-x-auto text-xs sm:text-sm font-semibold text-stone-600 gap-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-3 sm:px-4 border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'profile'
                ? 'border-rose-600 text-rose-700 bg-white rounded-t-lg'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>My Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-3 sm:px-4 border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'orders'
                ? 'border-rose-600 text-rose-700 bg-white rounded-t-lg'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>My Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`py-3 px-3 sm:px-4 border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'addresses'
                ? 'border-rose-600 text-rose-700 bg-white rounded-t-lg'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses</span>
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`py-3 px-3 sm:px-4 border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ml-auto ${
              activeTab === 'admin'
                ? 'border-amber-600 text-amber-800 bg-amber-50 rounded-t-lg'
                : 'border-transparent text-amber-700 hover:text-amber-900'
            }`}
          >
            <Shield className="w-4 h-4 text-amber-600" />
            <span className="font-bold">Admin Commerce</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          
          {/* ================= TAB 1: PROFILE ================= */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs text-rose-800 font-medium">Customer Name</div>
                    <div className="text-sm font-bold text-stone-900">{user.name}</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100">
                  <div className="text-xs text-amber-800 font-medium">Registered Email</div>
                  <div className="text-sm font-bold text-stone-900 truncate">{user.email}</div>
                </div>

                <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200">
                  <div className="text-xs text-stone-600 font-medium">Mobile Phone</div>
                  <div className="text-sm font-bold text-stone-900">{user.phone}</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="border-t border-stone-200 pt-4 flex items-center justify-between flex-wrap gap-3">
                <button
                  onClick={() => {
                    onClose();
                    onOpenWishlist();
                  }}
                  className="px-4 py-2.5 rounded-xl border border-rose-200 hover:border-rose-400 bg-rose-50 text-rose-800 text-xs font-bold flex items-center gap-2"
                >
                  <Heart className="w-4 h-4 text-rose-600" />
                  <span>View Wishlist ({wishlistCount} items)</span>
                </button>

                <div className="text-xs text-stone-500">
                  Member since <strong className="text-stone-700">October 2026</strong> · Kolkata Atelier
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 2: ORDERS ================= */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-stone-900 text-base">Your Recent Purchases</h3>
                <span className="text-xs text-stone-500">{orders.length} orders found</span>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12 text-stone-500 text-sm">
                  No orders placed yet. Start shopping our new arrivals!
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.orderId}
                    className="p-4 rounded-2xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition-colors space-y-3"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2 text-xs pb-2 border-b border-stone-200">
                      <div>
                        <span className="font-bold text-stone-900 text-sm">{order.orderId}</span>
                        <span className="text-stone-500 ml-2">Placed on {order.orderDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                          order.orderStatus === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {order.orderStatus}
                        </span>
                        <span className="font-bold text-stone-900 text-sm">
                          ₹{order.grandTotal}
                        </span>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-14 object-cover rounded-lg border border-stone-200 shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs font-bold text-stone-900 truncate">{item.name}</h4>
                            <p className="text-[11px] text-stone-500">
                              Size: <strong>{item.size}</strong> · Qty: {item.quantity} · ₹{item.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tracking details */}
                    <div className="bg-white p-3 rounded-xl border border-stone-200 text-xs flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2 text-stone-700">
                        <Truck className="w-4 h-4 text-rose-600" />
                        <span>Tracking: <strong className="font-mono text-stone-900">{order.trackingNumber}</strong></span>
                      </div>
                      <span className="text-stone-500 text-[11px]">
                        Estimated Delivery: <strong className="text-stone-800">{order.estimatedDelivery}</strong>
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* ================= TAB 3: ADDRESSES ================= */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <h3 className="font-bold text-stone-900 text-base">Saved Delivery Addresses</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {user.savedAddresses.map((addr, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border-2 border-rose-200 bg-rose-50/30 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-950 text-sm">Default Home</span>
                      <span className="text-[10px] bg-rose-200 text-rose-800 font-bold px-2 py-0.5 rounded-full">Primary</span>
                    </div>
                    <p className="font-semibold text-stone-900">{addr.fullName}</p>
                    <p className="text-stone-600 leading-relaxed">{addr.streetAddress}, {addr.city}, {addr.state} - {addr.postalCode}</p>
                    <p className="text-stone-700 font-medium">Phone: {addr.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 4: ADMIN COMMERCE ================= */}
          {activeTab === 'admin' && (
            <div className="space-y-6">
              
              {/* Admin Overview Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
                  <div className="flex items-center justify-between text-amber-700 text-xs font-semibold">
                    <span>Total Revenue</span>
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div className="text-xl font-bold text-amber-950 mt-1 font-mono">₹{totalSales.toLocaleString()}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200">
                  <div className="flex items-center justify-between text-rose-700 text-xs font-semibold">
                    <span>Total Orders</span>
                    <Box className="w-4 h-4" />
                  </div>
                  <div className="text-xl font-bold text-rose-950 mt-1">{orders.length}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center justify-between text-emerald-700 text-xs font-semibold">
                    <span>Active Catalog</span>
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div className="text-xl font-bold text-emerald-950 mt-1">{products.length} Items</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200">
                  <div className="flex items-center justify-between text-sky-700 text-xs font-semibold">
                    <span>Units Sold</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="text-xl font-bold text-sky-950 mt-1">{totalUnits}</div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
                <h3 className="font-bold text-stone-900 text-base">Product Inventory Management</h3>
                <button
                  onClick={() => setShowAddProductModal(true)}
                  className="px-4 py-2 bg-gradient-to-r from-rose-700 to-pink-700 hover:from-rose-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Kurti</span>
                </button>
              </div>

              {/* Add / Edit Form Modal if active */}
              {(showAddProductModal || editingProduct) && (
                <form
                  onSubmit={handleSaveProduct}
                  className="p-4 rounded-2xl bg-stone-50 border-2 border-amber-300 space-y-3"
                >
                  <div className="font-bold text-sm text-stone-900 flex items-center justify-between">
                    <span>{editingProduct ? 'Edit Product Details' : 'Add New Sleeveless Kurti'}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProduct(null);
                        setShowAddProductModal(false);
                      }}
                      className="text-stone-400 hover:text-stone-700"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="font-semibold block mb-1">Product Title</label>
                      <input
                        type="text"
                        value={editingProduct ? editingProduct.name : newProductName}
                        onChange={(e) =>
                          editingProduct
                            ? setEditingProduct({ ...editingProduct, name: e.target.value })
                            : setNewProductName(e.target.value)
                        }
                        required
                        className="w-full p-2 border rounded-lg bg-white"
                        placeholder="e.g. Royal Maroon Silk Kurti"
                      />
                    </div>

                    <div>
                      <label className="font-semibold block mb-1">Category</label>
                      <select
                        value={editingProduct ? editingProduct.category : newProductCategory}
                        onChange={(e) =>
                          editingProduct
                            ? setEditingProduct({ ...editingProduct, category: e.target.value as any })
                            : setNewProductCategory(e.target.value as any)
                        }
                        className="w-full p-2 border rounded-lg bg-white"
                      >
                        <option value="Sleeveless Cotton Kurti">Sleeveless Cotton Kurti</option>
                        <option value="Printed Kurti">Printed Kurti</option>
                        <option value="Anarkali Kurti">Anarkali Kurti</option>
                        <option value="A-Line Kurti">A-Line Kurti</option>
                        <option value="Straight Kurti">Straight Kurti</option>
                        <option value="Embroidered Kurti">Embroidered Kurti</option>
                        <option value="Festive Kurti">Festive Kurti</option>
                        <option value="Casual Daily-Wear Kurti">Casual Daily-Wear Kurti</option>
                        <option value="Office-Wear Kurti">Office-Wear Kurti</option>
                        <option value="Designer Kurti">Designer Kurti</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold block mb-1">Original MRP (₹)</label>
                      <input
                        type="number"
                        value={editingProduct ? editingProduct.price : newProductPrice}
                        onChange={(e) =>
                          editingProduct
                            ? setEditingProduct({ ...editingProduct, price: Number(e.target.value) })
                            : setNewProductPrice(Number(e.target.value))
                        }
                        className="w-full p-2 border rounded-lg bg-white"
                      />
                    </div>

                    <div>
                      <label className="font-semibold block mb-1">Selling Sale Price (₹)</label>
                      <input
                        type="number"
                        value={editingProduct ? editingProduct.salePrice : newProductSalePrice}
                        onChange={(e) =>
                          editingProduct
                            ? setEditingProduct({ ...editingProduct, salePrice: Number(e.target.value) })
                            : setNewProductSalePrice(Number(e.target.value))
                        }
                        className="w-full p-2 border rounded-lg bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProduct(null);
                        setShowAddProductModal(false);
                      }}
                      className="px-3 py-1.5 rounded-lg border text-stone-600 text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-lg bg-rose-700 text-white font-bold text-xs"
                    >
                      Save Product
                    </button>
                  </div>
                </form>
              )}

              {/* Products Table */}
              <div className="border border-stone-200 rounded-2xl overflow-hidden overflow-x-auto text-xs">
                <table className="w-full text-left">
                  <thead className="bg-stone-100 text-stone-700 font-bold border-b">
                    <tr>
                      <th className="p-2.5">Item</th>
                      <th className="p-2.5">Category</th>
                      <th className="p-2.5">Price</th>
                      <th className="p-2.5">Stock</th>
                      <th className="p-2.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {products.slice(0, 10).map((prod) => (
                      <tr key={prod.productId} className="hover:bg-stone-50">
                        <td className="p-2.5 flex items-center gap-2">
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            className="w-8 h-10 object-cover rounded shrink-0 border"
                          />
                          <span className="font-semibold text-stone-900 truncate max-w-[180px]">{prod.name}</span>
                        </td>
                        <td className="p-2.5 text-stone-600">{prod.category}</td>
                        <td className="p-2.5 font-bold text-rose-700">₹{prod.salePrice}</td>
                        <td className="p-2.5">
                          <span className={`px-2 py-0.5 rounded-full font-bold ${
                            prod.stock > 10 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {prod.stock} in stock
                          </span>
                        </td>
                        <td className="p-2.5 text-right space-x-1.5">
                          <button
                            onClick={() => setEditingProduct(prod)}
                            className="p-1 hover:text-rose-700"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(prod.productId)}
                            className="p-1 hover:text-red-700"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Order Status Manager */}
              <div className="border-t border-stone-200 pt-4 space-y-3">
                <h4 className="font-bold text-sm text-stone-900">Manage Order Fulfillment Status</h4>
                {orders.map((ord) => (
                  <div key={ord.orderId} className="p-3 bg-stone-50 rounded-xl border flex items-center justify-between text-xs flex-wrap gap-2">
                    <div>
                      <span className="font-bold text-stone-900">{ord.orderId}</span>
                      <span className="text-stone-500 ml-2">({ord.items.length} items)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-stone-600 font-medium">Update Status:</span>
                      <select
                        value={ord.orderStatus}
                        onChange={(e) => onUpdateOrderStatus?.(ord.orderId, e.target.value as OrderStatus)}
                        className="p-1.5 rounded-lg border bg-white font-bold text-stone-800 text-xs"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Packed">Packed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
