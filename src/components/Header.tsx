/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, User, ShoppingBag, Heart, Menu, X, Sparkles } from 'lucide-react';
import { Cart } from '../types';

interface HeaderProps {
  cart: Cart;
  onOpenCart: () => void;
  onOpenOrders: () => void;
  onOpenWishlist: () => void;
  onOpenAccount: () => void;
  wishlistCount: number;
  onSelectCategory: (cat: string) => void;
  selectedCategory: string;
  onSearchChange: (query: string) => void;
  searchQuery: string;
}

export const Header: React.FC<HeaderProps> = ({
  cart,
  onOpenCart,
  onOpenOrders,
  onOpenWishlist,
  onOpenAccount,
  wishlistCount,
  onSelectCategory,
  selectedCategory,
  onSearchChange,
  searchQuery,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'HOME', category: 'All' },
    { label: 'SHOP', category: 'All' },
    { label: 'CATEGORIES', category: 'Categories' },
    { label: 'NEW ARRIVALS', category: 'New' },
    { label: 'SALE', category: 'Sale' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#e60070] text-white shadow-md select-none border-b border-[#c2005e]">
        
        {/* Top Promotional Ribbon */}
        <div className="bg-[#b30057] text-white text-[11px] sm:text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 border-b border-[#99004a]">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse shrink-0" />
          <span>
            Festive Kurti Collection: <strong className="text-amber-300">FLAT 20% OFF</strong> on Selected Styles · Free Nationwide Delivery Over ₹499
          </span>
        </div>

        {/* Selected div:nth-of-type(2) matching user CSS selector in #e60070 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#e60070]">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* 1. LOGO */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 text-white hover:bg-white/15 rounded-lg focus-visible:outline-none transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectCategory('All');
                }}
                className="group flex flex-col items-start focus-visible:outline-none"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl sm:text-3xl font-script font-bold text-white tracking-wide drop-shadow-sm group-hover:text-amber-200 transition-colors">
                    Sathi
                  </span>
                  <span className="font-cinzel text-lg sm:text-xl font-extrabold tracking-widest text-amber-300 drop-shadow-sm">
                    KURTIS
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-300 inline-block mb-1 shadow-xs" />
                </div>
                <span className="text-[9px] uppercase tracking-[0.24em] text-pink-100 font-bold -mt-0.5 font-sans">
                  Sleeveless Boutique · 2026
                </span>
              </a>
            </div>

            {/* 2. NAVIGATION: HOME | SHOP | CATEGORIES | NEW ARRIVALS | SALE */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs font-bold tracking-wider text-white">
              {navLinks.map((link) => {
                const isActive =
                  selectedCategory === link.category ||
                  (link.label === 'SHOP' && selectedCategory === 'All');
                return (
                  <button
                    key={link.label}
                    onClick={() => {
                      if (link.category === 'Categories') {
                        const catEl = document.getElementById('categories');
                        if (catEl) catEl.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        onSelectCategory(link.category);
                        const catalogEl = document.getElementById('catalog');
                        if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className={`transition-colors py-1 relative whitespace-nowrap focus-visible:outline-none ${
                      isActive
                        ? 'text-amber-300 font-extrabold drop-shadow-xs'
                        : 'text-white/95 hover:text-amber-200'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-300 rounded-full shadow-xs" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* 3. PROMINENT SEARCH BAR */}
            <div className="flex-1 max-w-xs xl:max-w-sm hidden md:block">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#e60070]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search 25 sleeveless kurtis, cotton, prints..."
                  className="w-full pl-10 pr-4 py-2 bg-white text-stone-900 text-xs border border-white/60 focus:border-amber-300 rounded-full focus:outline-none transition-all placeholder:text-stone-400 shadow-md focus:ring-2 focus:ring-amber-300"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* 4. ACTIONS: ❤️ WISHLIST | 🛒 CART | ACCOUNT */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              
              {/* Wishlist Button */}
              <button
                onClick={onOpenWishlist}
                className="p-2 sm:px-3 sm:py-2 text-white hover:text-amber-200 rounded-full hover:bg-white/15 transition-all flex items-center gap-1.5 text-xs font-semibold relative"
                aria-label={`Wishlist (${wishlistCount} items)`}
              >
                <Heart className="w-5 h-5 text-amber-200" />
                <span className="hidden xl:inline">WISHLIST</span>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 sm:top-1 sm:right-1 bg-amber-400 text-stone-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Button with contrast white pill */}
              <button
                onClick={onOpenCart}
                className="px-3.5 py-2 bg-white hover:bg-amber-100 text-[#e60070] rounded-full transition-all flex items-center gap-2 text-xs font-extrabold shadow-md active:scale-95"
                aria-label={`Shopping Cart (${cart.quantity} items)`}
              >
                <ShoppingBag className="w-4 h-4 text-[#e60070]" />
                <span className="hidden sm:inline">CART</span>
                <span className="bg-[#e60070] text-white text-[11px] font-mono px-2 py-0.5 rounded-full font-bold">
                  {cart.quantity}
                </span>
              </button>

              {/* Account Button */}
              <button
                onClick={onOpenAccount}
                className="p-2 sm:px-3 sm:py-2 text-white hover:text-amber-200 rounded-full hover:bg-white/15 transition-colors flex items-center gap-1.5 text-xs font-semibold"
                aria-label="Customer Account & Admin"
                title="Account & Admin Portal"
              >
                <User className="w-5 h-5" />
                <span className="hidden xl:inline">ACCOUNT</span>
              </button>

            </div>

          </div>

          {/* Mobile Search Bar below header */}
          <div className="pb-3 md:hidden">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#e60070]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search kurtis, cotton, prints, sizes..."
                className="w-full pl-10 pr-4 py-2 bg-white text-stone-900 text-xs border border-white/40 rounded-full focus:outline-none shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Mobile Flyout Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#c2005e] bg-[#e60070] text-white px-4 py-4 space-y-2 shadow-2xl animate-in slide-in-from-top-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  if (link.category === 'Categories') {
                    const catEl = document.getElementById('categories');
                    if (catEl) catEl.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    onSelectCategory(link.category);
                    const catalogEl = document.getElementById('catalog');
                    if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
                  }
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-colors ${
                  selectedCategory === link.category
                    ? 'bg-white text-[#e60070]'
                    : 'text-white hover:bg-white/15'
                }`}
              >
                <span>{link.label}</span>
                <span className={selectedCategory === link.category ? 'text-[#e60070]' : 'text-amber-200'}>→</span>
              </button>
            ))}

            <div className="pt-2 border-t border-white/20 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAccount();
                }}
                className="flex-1 py-2 px-3 bg-white text-[#e60070] hover:bg-amber-100 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
              >
                <User className="w-4 h-4 text-[#e60070]" />
                <span>My Account</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOrders();
                }}
                className="flex-1 py-2 px-3 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <span>Track Orders</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ================= STICKY MOBILE NAVIGATION BAR =================
          HOME | SHOP | ♡ | 🛒 | ACCOUNT
      */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-rose-100 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] py-2 px-3 flex items-center justify-around">
        <button
          onClick={() => {
            onSelectCategory('All');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            selectedCategory === 'All' ? 'text-[#e60070]' : 'text-stone-500'
          }`}
        >
          <span>🏠</span>
          <span>HOME</span>
        </button>

        <button
          onClick={() => {
            onSelectCategory('All');
            const catalogEl = document.getElementById('catalog');
            if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-0.5 text-[10px] font-bold text-stone-500 hover:text-[#e60070]"
        >
          <span>👗</span>
          <span>SHOP</span>
        </button>

        <button
          onClick={onOpenWishlist}
          className="flex flex-col items-center gap-0.5 text-[10px] font-bold text-stone-500 hover:text-[#e60070] relative"
        >
          <Heart className="w-4 h-4 text-[#e60070]" />
          <span>♡ ({wishlistCount})</span>
        </button>

        <button
          onClick={onOpenCart}
          className="flex flex-col items-center gap-0.5 text-[10px] font-bold text-stone-500 hover:text-[#e60070] relative"
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4 text-[#e60070]" />
            {cart.quantity > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#e60070] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {cart.quantity}
              </span>
            )}
          </div>
          <span>🛒 CART</span>
        </button>

        <button
          onClick={onOpenAccount}
          className="flex flex-col items-center gap-0.5 text-[10px] font-bold text-stone-500 hover:text-[#e60070]"
        >
          <User className="w-4 h-4 text-stone-700" />
          <span>ACCOUNT</span>
        </button>
      </div>
    </>
  );
};
