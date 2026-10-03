/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryGrid } from './components/CategoryGrid';
import { BestSellers } from './components/BestSellers';
import { NewArrivals } from './components/NewArrivals';
import { PromoBanner } from './components/PromoBanner';
import { ValueHighlights } from './components/ValueHighlights';
import { TrustPerks } from './components/TrustPerks';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { OrdersModal } from './components/OrdersModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AccountModal } from './components/AccountModal';
import { BackgroundMusicPlayer, AudioPlayerProvider } from './components/BackgroundMusicPlayer';
import { TrendingTickerBar } from './components/TrendingTickerBar';

import {
  Product,
  ProductVariant,
  Cart,
  CartItem,
  Order,
  Review,
  CustomerUser,
  OrderStatus,
} from './types';
import {
  PRODUCTS_DATA,
  INITIAL_CART,
  INITIAL_ORDERS,
  INITIAL_USER,
} from './data/mockData';

export default function App() {
  // Main Products state (25 Sleeveless Kurtis)
  const [products, setProducts] = useState<Product[]>(PRODUCTS_DATA);

  // Cart state strictly matching Cart schema
  const [cart, setCart] = useState<Cart>(INITIAL_CART);

  // Orders state strictly matching Order schema
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  // Customer User profile
  const [user, setUser] = useState<CustomerUser>(INITIAL_USER);

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(['kurti-1', 'kurti-5', 'kurti-25']);

  // Navigation & Filtering
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Recalculate Cart totals based on rules:
  // - Subtotal at sale price
  // - Free shipping threshold: ₹499 (otherwise ₹50 shipping)
  // - Discounts
  const recalculateCart = (items: CartItem[], appliedCoupon?: string): Cart => {
    const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);
    const regularMRP = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const saleSubtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);

    let discount = 0;
    if (appliedCoupon === 'SATHI20') {
      discount = Math.round(saleSubtotal * 0.20);
    } else if (appliedCoupon === 'SATHI30') {
      discount = Math.round(saleSubtotal * 0.30);
    } else if (appliedCoupon === 'SATHI100') {
      discount = Math.min(100, saleSubtotal);
    }

    const shipping = (saleSubtotal - discount) >= 499 || items.length === 0 ? 0 : 50;
    const finalTotal = Math.max(0, saleSubtotal - discount + shipping);

    return {
      cartId: cart.cartId || `cart-${Date.now()}`,
      customerId: user.id,
      items,
      quantity: totalQty,
      price: regularMRP,
      subtotal: saleSubtotal,
      discount,
      shipping,
      total: finalTotal,
      appliedCoupon,
    };
  };

  // Add product to Cart
  const handleAddToCart = (product: Product, variant: ProductVariant, quantity: number = 1) => {
    const lineTotal = product.salePrice * quantity;
    const existingIndex = cart.items.findIndex(
      (item) => item.productId === product.productId && item.variantId === variant.id
    );

    let updatedItems: CartItem[];
    if (existingIndex > -1) {
      updatedItems = [...cart.items];
      const existing = updatedItems[existingIndex];
      const newQty = existing.quantity + quantity;
      updatedItems[existingIndex] = {
        ...existing,
        quantity: newQty,
        lineTotal: product.salePrice * newQty,
      };
    } else {
      const newItem: CartItem = {
        id: `cart-item-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        productId: product.productId,
        name: product.name,
        image: product.images[0],
        SKU: product.SKU,
        variantId: variant.id,
        size: variant.size,
        color: variant.color,
        quantity,
        price: product.salePrice,
        lineTotal,
      };
      updatedItems = [...cart.items, newItem];
    }

    const updatedCart = recalculateCart(updatedItems, cart.appliedCoupon);
    setCart(updatedCart);
    showToast(`Added ${quantity}x ${product.name} (${variant.size}) to cart!`);
  };

  // Buy Now immediate flow
  const handleBuyNow = (product: Product, variant: ProductVariant, quantity: number = 1) => {
    handleAddToCart(product, variant, quantity);
    setQuickViewProduct(null);
    setIsCheckoutOpen(true);
  };

  // Update item quantity in Cart
  const handleUpdateCartQuantity = (cartItemId: string, delta: number) => {
    const updatedItems = cart.items
      .map((item) => {
        if (item.id === cartItemId) {
          const newQty = item.quantity + delta;
          if (newQty <= 0) return null;
          return {
            ...item,
            quantity: newQty,
            lineTotal: item.price * newQty,
          };
        }
        return item;
      })
      .filter(Boolean) as CartItem[];

    const updatedCart = recalculateCart(updatedItems, cart.appliedCoupon);
    setCart(updatedCart);
  };

  // Remove item from Cart
  const handleRemoveCartItem = (cartItemId: string) => {
    const updatedItems = cart.items.filter((item) => item.id !== cartItemId);
    const updatedCart = recalculateCart(updatedItems, cart.appliedCoupon);
    setCart(updatedCart);
    showToast('Item removed from cart');
  };

  // Apply Coupon code
  const handleApplyCoupon = (code: string): boolean => {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'SATHI20' || normalized === 'SATHI30' || normalized === 'SATHI100') {
      const updated = recalculateCart(cart.items, normalized);
      setCart(updated);
      showToast(`Coupon ${normalized} applied! You saved extra ₹${updated.discount}`);
      return true;
    }
    return false;
  };

  // Toggle Wishlist
  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        const prod = products.find((p) => p.productId === productId);
        showToast(`Saved ${prod?.name || 'item'} to your wishlist! ♡`);
        return [...prev, productId];
      }
    });
  };

  // Add Product Review
  const handleAddReview = (productId: string, review: Review) => {
    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.productId === productId) {
          const newReviews = [review, ...prod.reviews];
          const newAvgRating =
            newReviews.reduce((sum, r) => sum + r.rating, 0) / newReviews.length;
          return {
            ...prod,
            reviews: newReviews,
            reviewsCount: (prod.reviewsCount || 0) + 1,
            rating: Math.round(newAvgRating * 10) / 10,
          };
        }
        return prod;
      })
    );
    showToast('Thank you! Your verified review has been published.');
  };

  // Place Order from Checkout Modal
  const handlePlaceOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    // Clear cart
    const emptyCart = recalculateCart([]);
    setCart(emptyCart);
    showToast(`Order ${newOrder.orderId} placed successfully!`);
  };

  // Admin Order Status Update
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, orderStatus: newStatus } : o))
    );
    showToast(`Order ${orderId} updated to ${newStatus}`);
  };

  // Search filtered products
  const displayedProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const query = searchQuery.toLowerCase().trim();
    return products.filter(
      (prod) =>
        prod.name.toLowerCase().includes(query) ||
        prod.category.toLowerCase().includes(query) ||
        prod.fabric.toLowerCase().includes(query) ||
        prod.pattern.toLowerCase().includes(query) ||
        prod.description.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AudioPlayerProvider>
      <div className="min-h-screen flex flex-col bg-[#faf9f6] text-stone-800 antialiased selection:bg-rose-200 selection:text-rose-900 pb-16 md:pb-0">
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-xs font-semibold py-2.5 px-4 rounded-xl shadow-2xl border border-stone-700 flex items-center gap-2 transform transition-all animate-bounce">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Header */}
        <Header
          cart={cart}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenOrders={() => setIsOrdersOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onOpenAccount={() => setIsAccountOpen(true)}
          wishlistCount={wishlist.length}
          onSelectCategory={handleSelectCategory}
          selectedCategory={selectedCategory}
          onSearchChange={setSearchQuery}
          searchQuery={searchQuery}
        />

        <main className="flex-1">
          {/* Search Results Notice if actively searching */}
          {searchQuery.trim() && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center justify-between">
                <span>
                  Search results for &ldquo;<strong>{searchQuery}</strong>&rdquo; ({displayedProducts.length} kurtis found)
                </span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="font-bold text-amber-950 underline hover:text-rose-700"
                >
                  Clear Search
                </button>
              </div>
            </div>
          )}

          {/* 1. Hero Section: Headline “Elegant Kurtis for Every Occasion” + Buttons [SHOP NOW] [NEW ARRIVALS] */}
          <Hero
            onShopNow={() => {
              setSelectedCategory('All');
              const catalogEl = document.getElementById('catalog');
              if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* Animated Trending Deals Ticker Bar (Exact match to uploaded image) */}
          <TrendingTickerBar
            onQuickViewProduct={(prodId) => {
              const found = products.find((p) => p.productId === prodId);
              if (found) setQuickViewProduct(found);
            }}
            products={products}
          />

          {/* Value Highlights */}
          <ValueHighlights />

          {/* 2. Category Section: Cotton, Printed, Office Wear, Festive, Designer */}
          <CategoryGrid
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
          />

          {/* 3. Best Sellers Section (6 products with rating & review count) */}
          <BestSellers
            products={products}
            onAddToCart={handleAddToCart}
            onQuickView={(prod) => setQuickViewProduct(prod)}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onViewAll={() => handleSelectCategory('All')}
          />

          {/* 4. Special Offer Banner: “FLAT 20% OFF ON SELECTED STYLES” [ SHOP SALE ] */}
          <PromoBanner
            onApplyCoupon={handleApplyCoupon}
            onShopDeals={() => handleSelectCategory('Sale')}
          />

          {/* 5. Shop Page / Full E-Commerce Kurti Catalog with Left Filters & 4-Column Grid */}
          <NewArrivals
            products={displayedProducts}
            onAddToCart={handleAddToCart}
            onQuickView={(prod) => setQuickViewProduct(prod)}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Bottom Trust & Perks */}
          <TrustPerks />
        </main>

        {/* Footer */}
        <Footer
          onSelectCategory={handleSelectCategory}
          onOpenOrders={() => setIsOrdersOpen(true)}
        />

        {/* Cart Drawer Component */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveCartItem}
          onApplyCoupon={handleApplyCoupon}
          onProceedToCheckout={() => {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
          }}
        />

        {/* Checkout Modal Component */}
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          cart={cart}
          onPlaceOrder={handlePlaceOrder}
        />

        {/* Product Detail Modal (PDP) with [ ADD TO CART ], [ BUY NOW ], [ ♡ ADD TO WISHLIST ] */}
        <ProductDetailModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          isWishlisted={quickViewProduct ? wishlist.includes(quickViewProduct.productId) : false}
          onToggleWishlist={handleToggleWishlist}
          onAddReview={handleAddReview}
        />

        {/* Customer Account & Admin Commerce Modal */}
        <AccountModal
          isOpen={isAccountOpen}
          onClose={() => setIsAccountOpen(false)}
          user={user}
          orders={orders}
          products={products}
          wishlistCount={wishlist.length}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onUpdateProducts={(updated) => {
            setProducts(updated);
            showToast('Catalog updated successfully!');
          }}
          onUpdateOrderStatus={handleUpdateOrderStatus}
        />

        {/* Orders Tracking Modal */}
        <OrdersModal
          isOpen={isOrdersOpen}
          onClose={() => setIsOrdersOpen(false)}
          orders={orders}
        />

        {/* Wishlist Drawer */}
        <WishlistDrawer
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          wishlistIds={wishlist}
          products={products}
          onRemoveFromWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onQuickView={(prod) => setQuickViewProduct(prod)}
        />

        {/* Persistent Background Music Player with Sound ON/OFF */}
        <BackgroundMusicPlayer variant="floating" />

      </div>
    </AudioPlayerProvider>
  );
}
