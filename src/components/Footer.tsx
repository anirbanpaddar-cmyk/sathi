/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, Mail, MapPin, Heart, ShieldCheck, Sparkles, MessageCircle } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  onOpenOrders: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenOrders }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-14 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-stone-800">
          
          {/* Brand Info & Follow Us (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="text-2xl font-serif-luxury font-bold text-white tracking-tight">
                Sathi <span className="text-[#e60070] font-cinzel text-xl font-bold">BOUTIQUE</span>
              </span>
              <p className="text-xs uppercase tracking-widest text-rose-400 font-bold mt-0.5">
                Fashion Atelier · Kolkata
              </p>
            </div>

            <p className="font-bengali text-rose-300 text-base font-semibold">
              তোমার স্টাইল, তোমার আত্মবিশ্বাস ♡
            </p>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Dedicated to curating modern women’s ethnic silhouettes. From pure raw silk sleeveless blouses with custom alterations to vibrant designer pieces, we handcraft garments for everyday elegance and grand wedding festivities.
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs text-stone-400">
              <MapPin className="w-4 h-4 text-[#e60070] shrink-0" />
              <span>Studio &amp; Workshop: Gariahat Road, South Kolkata, WB 700029</span>
            </div>

            {/* Follow Us Row (Official Social Media Icons) */}
            <div className="pt-3 space-y-2.5">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span>Follow Us</span>
                <span className="h-px bg-stone-700 w-12" />
              </h4>

              <div className="flex items-center gap-3">
                {/* 1. Facebook */}
                <a
                  href="https://facebook.com/sathiboutique"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Facebook"
                  title="Facebook · Sathi Boutique"
                  className="w-10 h-10 rounded-full bg-stone-800 hover:bg-[#1877F2] text-stone-300 hover:text-white border border-stone-700 hover:border-[#1877F2] flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-[#1877F2]/30 active:scale-95 group"
                >
                  <svg
                    className="w-5 h-5 fill-current transition-transform group-hover:scale-105"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* 2. YouTube */}
                <a
                  href="https://youtube.com/@sathiboutique"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Subscribe on YouTube"
                  title="YouTube · Sathi Boutique"
                  className="w-10 h-10 rounded-full bg-stone-800 hover:bg-[#FF0000] text-stone-300 hover:text-white border border-stone-700 hover:border-[#FF0000] flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-[#FF0000]/30 active:scale-95 group"
                >
                  <svg
                    className="w-5 h-5 fill-current transition-transform group-hover:scale-105"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                {/* 3. WhatsApp */}
                <a
                  href="https://wa.me/919830123456?text=Hello%20Sathi%20Boutique,%20I%20would%20like%20to%20inquire%20about%20your%20sleeveless%20blouse%20collection!"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                  title="WhatsApp · +91 98301 23456"
                  className="w-10 h-10 rounded-full bg-stone-800 hover:bg-[#25D366] text-stone-300 hover:text-white border border-stone-700 hover:border-[#25D366] flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-[#25D366]/30 active:scale-95 group"
                >
                  <svg
                    className="w-5 h-5 fill-current transition-transform group-hover:scale-105"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12.031 0C5.397 0 0 5.397 0 12.031c0 2.12.553 4.184 1.603 6.007L.069 24l6.147-1.613a11.98 11.98 0 0 0 5.815 1.49h.005c6.633 0 12.031-5.398 12.031-12.032 0-3.214-1.251-6.236-3.523-8.51A11.954 11.954 0 0 0 12.031 0zm0 22.016h-.004a9.98 9.98 0 0 1-5.086-1.39l-.365-.216-3.778.991 1.008-3.682-.237-.377a9.972 9.972 0 0 1-1.534-5.311c0-5.514 4.486-10 10-10 2.671 0 5.182 1.041 7.07 2.93a9.932 9.932 0 0 1 2.93 7.07c0 5.514-4.486 10-10 10zm5.48-7.483c-.3-.15-1.776-.877-2.052-.977-.275-.1-.476-.15-.676.15-.2.301-.776.977-.951 1.178-.175.2-.35.226-.65.075-.3-.15-1.267-.467-2.414-1.489-.893-.796-1.496-1.78-1.671-2.08-.175-.301-.019-.464.132-.614.136-.135.301-.35.451-.526.15-.175.2-.301.3-.501.1-.2.05-.376-.025-.526-.075-.15-.676-1.63-.926-2.233-.244-.588-.492-.508-.676-.517l-.576-.01c-.2 0-.526.075-.801.376-.276.301-1.052 1.027-1.052 2.506 0 1.479 1.077 2.907 1.228 3.108.15.2 2.119 3.236 5.134 4.539.717.31 1.277.495 1.713.634.72.229 1.376.197 1.895.12.578-.087 1.776-.727 2.027-1.429.25-.702.25-1.303.175-1.429-.075-.126-.275-.201-.575-.351z" />
                  </svg>
                </a>

                {/* 4. Instagram */}
                <a
                  href="https://instagram.com/sathiboutique"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                  title="Instagram · @sathiboutique"
                  className="w-10 h-10 rounded-full bg-stone-800 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] text-stone-300 hover:text-white border border-stone-700 hover:border-transparent flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-[#e1306c]/30 active:scale-95 group"
                >
                  <svg
                    className="w-5 h-5 fill-current transition-transform group-hover:scale-105"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>

          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Boutique Categories
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onSelectCategory('Classic Silk & Satin')}
                  className="hover:text-rose-400 transition-colors"
                >
                  Classic Silk &amp; Satin Blouses
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Festive & Bridal')}
                  className="hover:text-rose-400 transition-colors"
                >
                  Festive &amp; Bridal Blouses
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Dori & Back Designs')}
                  className="hover:text-rose-400 transition-colors"
                >
                  Back Neck &amp; Dori Latkans
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Contemporary & Velvet')}
                  className="hover:text-rose-400 transition-colors"
                >
                  Velvet &amp; Contemporary Cuts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Breathable Cotton & Floral')}
                  className="hover:text-rose-400 transition-colors"
                >
                  Breathable Cotton &amp; Floral
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care & Orders */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Customer Services
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={onOpenOrders} className="hover:text-rose-400 transition-colors font-medium text-white">
                  Track Your Order
                </button>
              </li>
              <li>
                <span className="text-stone-400">Size Chart &amp; Fit Guide</span>
              </li>
              <li>
                <span className="text-stone-400">Free Shipping &amp; Returns</span>
              </li>
              <li>
                <span className="text-stone-400">Custom Blouse Alterations</span>
              </li>
              <li>
                <span className="text-stone-400">Fabric Care Guidelines</span>
              </li>
            </ul>
          </div>

          {/* Contact Helpline & Official WhatsApp Chat */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Contact &amp; Support
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#e60070] shrink-0" />
                <span>+91 98301 23456 (10 AM - 8 PM)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#e60070] shrink-0" />
                <span>support@sathiboutique.com</span>
              </div>
              
              {/* Official WhatsApp Instant Inquire Card */}
              <div className="pt-1.5">
                <a
                  href="https://wa.me/919830123456?text=Hello%20Sathi%20Boutique,%20I%20need%20size%20and%20styling%20advice%20for%20a%20sleeveless%20blouse."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-gradient-to-r from-emerald-950/80 to-stone-800 border border-emerald-600/40 text-xs text-stone-200 flex items-center justify-between group hover:border-[#25D366] transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm shadow-[#25D366]/40">
                      <svg
                        className="w-4 h-4 fill-white"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M12.031 0C5.397 0 0 5.397 0 12.031c0 2.12.553 4.184 1.603 6.007L.069 24l6.147-1.613a11.98 11.98 0 0 0 5.815 1.49h.005c6.633 0 12.031-5.398 12.031-12.032 0-3.214-1.251-6.236-3.523-8.51A11.954 11.954 0 0 0 12.031 0zm0 22.016h-.004a9.98 9.98 0 0 1-5.086-1.39l-.365-.216-3.778.991 1.008-3.682-.237-.377a9.972 9.972 0 0 1-1.534-5.311c0-5.514 4.486-10 10-10 2.671 0 5.182 1.041 7.07 2.93a9.932 9.932 0 0 1 2.93 7.07c0 5.514-4.486 10-10 10zm5.48-7.483c-.3-.15-1.776-.877-2.052-.977-.275-.1-.476-.15-.676.15-.2.301-.776.977-.951 1.178-.175.2-.35.226-.65.075-.3-.15-1.267-.467-2.414-1.489-.893-.796-1.496-1.78-1.671-2.08-.175-.301-.019-.464.132-.614.136-.135.301-.35.451-.526.15-.175.2-.301.3-.501.1-.2.05-.376-.025-.526-.075-.15-.676-1.63-.926-2.233-.244-.588-.492-.508-.676-.517l-.576-.01c-.2 0-.526.075-.801.376-.276.301-1.052 1.027-1.052 2.506 0 1.479 1.077 2.907 1.228 3.108.15.2 2.119 3.236 5.134 4.539.717.31 1.277.495 1.713.634.72.229 1.376.197 1.895.12.578-.087 1.776-.727 2.027-1.429.25-.702.25-1.303.175-1.429-.075-.126-.275-.201-.575-.351z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-white text-[11px] group-hover:text-[#25D366] transition-colors">
                        WhatsApp Styling Helpline
                      </div>
                      <div className="text-[10px] text-emerald-400 font-mono">
                        Chat directly · +91 98301 23456
                      </div>
                    </div>
                  </div>
                  <span className="text-stone-400 group-hover:translate-x-1 group-hover:text-white transition-all text-xs font-bold">
                    →
                  </span>
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Dedicated Follow Us Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 Sathi Boutique Fashion Atelier. All rights reserved.</p>

          {/* Social Links Row on Bottom Bar */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Follow Us:</span>
            <div className="flex items-center gap-2">
              <a
                href="https://facebook.com/sathiboutique"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-[#1877F2] transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://youtube.com/@sathiboutique"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-[#FF0000] transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://wa.me/919830123456"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-[#25D366] transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 0C5.397 0 0 5.397 0 12.031c0 2.12.553 4.184 1.603 6.007L.069 24l6.147-1.613a11.98 11.98 0 0 0 5.815 1.49h.005c6.633 0 12.031-5.398 12.031-12.032 0-3.214-1.251-6.236-3.523-8.51A11.954 11.954 0 0 0 12.031 0zm0 22.016h-.004a9.98 9.98 0 0 1-5.086-1.39l-.365-.216-3.778.991 1.008-3.682-.237-.377a9.972 9.972 0 0 1-1.534-5.311c0-5.514 4.486-10 10-10 2.671 0 5.182 1.041 7.07 2.93a9.932 9.932 0 0 1 2.93 7.07c0 5.514-4.486 10-10 10zm5.48-7.483c-.3-.15-1.776-.877-2.052-.977-.275-.1-.476-.15-.676.15-.2.301-.776.977-.951 1.178-.175.2-.35.226-.65.075-.3-.15-1.267-.467-2.414-1.489-.893-.796-1.496-1.78-1.671-2.08-.175-.301-.019-.464.132-.614.136-.135.301-.35.451-.526.15-.175.2-.301.3-.501.1-.2.05-.376-.025-.526-.075-.15-.676-1.63-.926-2.233-.244-.588-.492-.508-.676-.517l-.576-.01c-.2 0-.526.075-.801.376-.276.301-1.052 1.027-1.052 2.506 0 1.479 1.077 2.907 1.228 3.108.15.2 2.119 3.236 5.134 4.539.717.31 1.277.495 1.713.634.72.229 1.376.197 1.895.12.578-.087 1.776-.727 2.027-1.429.25-.702.25-1.303.175-1.429-.075-.126-.275-.201-.575-.351z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/sathiboutique"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-[#E4405F] transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 text-stone-400">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Service</span>
            <span>·</span>
            <span>Security &amp; Compliance</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
