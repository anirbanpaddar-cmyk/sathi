/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Play, Pause, Volume2, VolumeX, Sparkles, ChevronLeft, ChevronRight, Film, ExternalLink } from 'lucide-react';
import { FloatingPetal } from './HeroVisualAssets';
import { useAudioPlayer } from './BackgroundMusicPlayer';

export interface ReelOutfit {
  id: string;
  scene: 'blouse' | 'kurti';
  title: string;
  craftDetail: string;
  image: string;
  highlightTag: string;
  price?: number;
}

export const REEL_OUTFITS: ReelOutfit[] = [
  // ================= SCENE 1: SLEEVELESS BLOUSE COLLECTION (Back & Neckline Focus) =================
  {
    id: 'blouse-1',
    scene: 'blouse',
    title: 'Onyx Silk Dori Latkan Blouse',
    craftDetail: 'Teardrop Back Cutout · Antique Gold Zari Border · Handcrafted Jhumka Latkans',
    image: '/src/assets/images/blouse_back_design_1791016577426.jpg',
    highlightTag: 'Scene 1 · Blouse 01/09',
    price: 749,
  },
  {
    id: 'blouse-2',
    scene: 'blouse',
    title: 'Artisan Dori & Pearl Latkan Macro',
    craftDetail: 'Hand-Strung Pearl Beads · Gold Filigree Caps · Criss-Cross Dori Tie-Up',
    image: '/src/assets/images/dori_latkan_detail_1791018699380.jpg',
    highlightTag: 'Scene 1 · Blouse 02/09',
    price: 699,
  },
  {
    id: 'blouse-3',
    scene: 'blouse',
    title: 'Deep U-Neck Maroon Velvet Blouse',
    craftDetail: 'Opulent Silk Velvet · Deep Plunge U-Back · Glistening Zari Piping',
    image: '/src/assets/images/blouse_velvet_maroon_1791019460377.jpg',
    highlightTag: 'Scene 1 · Blouse 03/09',
    price: 849,
  },
  {
    id: 'blouse-4',
    scene: 'blouse',
    title: 'Emerald Designer Halter & Back Cutout',
    craftDetail: 'Pure Raw Silk · Royal Emerald Sheen · Fine Zari Cord Stitching',
    image: '/src/assets/images/blouse_emerald_designer_1791016564875.jpg',
    highlightTag: 'Scene 1 · Blouse 04/09',
    price: 599,
  },
  {
    id: 'blouse-5',
    scene: 'blouse',
    title: 'Festive Banarasi Gold Bridal Blouse',
    craftDetail: 'Kolkata Atelier Weave · Heavy Zardozi Handwork · Structured Princess Seams',
    image: '/src/assets/images/hero_sathi_boutique_1791016528092.jpg',
    highlightTag: 'Scene 1 · Blouse 05/09',
    price: 999,
  },
  {
    id: 'blouse-6',
    scene: 'blouse',
    title: 'Satin Rose Pink Sleeveless Blouse',
    craftDetail: 'Lustrous Duchess Satin · Clean Square-Back · Bow Dori Tie Finish',
    image: '/src/assets/images/blouse_satin_pink_1791016542672.jpg',
    highlightTag: 'Scene 1 · Blouse 06/09',
    price: 499,
  },
  {
    id: 'blouse-7',
    scene: 'blouse',
    title: 'Lotus Embroidered Raw Silk Blouse',
    craftDetail: 'Tonal Pink Resham Threads · Mirror-Work Floral Accents · Padded Fit',
    image: '/src/assets/images/bengali_model_pink_blouse_1791017129648.jpg',
    highlightTag: 'Scene 1 · Blouse 07/09',
    price: 649,
  },
  {
    id: 'blouse-8',
    scene: 'blouse',
    title: 'Elbow Sleeve Zari Cuff & Leaf Butti',
    craftDetail: 'Macro Artisan Craft · Hand-Embroidered Zari Sprigs · Reinforced Seams',
    image: '/src/assets/images/sleeve_zari_detail_1791018712270.jpg',
    highlightTag: 'Scene 1 · Blouse 08/09',
    price: 549,
  },
  {
    id: 'blouse-9',
    scene: 'blouse',
    title: 'Sculpted Silhouette Black Dori Tailor Fit',
    craftDetail: 'Tailored Boutique Mannequin · Low Back Teardrop Cut · Festive Drape',
    image: '/src/assets/images/black_dori_mannequin_1791017597462.jpg',
    highlightTag: 'Scene 1 · Blouse 09/09',
    price: 749,
  },

  // ================= SCENE 2: SHORT KURTI COLLECTION (Silhouettes & Prints) =================
  {
    id: 'kurti-1',
    scene: 'kurti',
    title: 'Black & Gold Designer Short Kurti',
    craftDetail: 'Indo-Western Cut · Intricate Golden Zari Hemline · Mandarin Slit Neck',
    image: '/src/assets/images/kurti_black_gold_1791019437688.jpg',
    highlightTag: 'Scene 2 · Kurti 01/08',
    price: 649,
  },
  {
    id: 'kurti-2',
    scene: 'kurti',
    title: 'Cotton Printed Floral Short Kurti',
    craftDetail: 'Pure Breathable Mulmul Cotton · Artisan Floral Motifs · Lightweight Summer Feel',
    image: '/src/assets/images/kurti_printed_floral_1791016554938.jpg',
    highlightTag: 'Scene 2 · Kurti 02/08',
    price: 499,
  },
  {
    id: 'kurti-3',
    scene: 'kurti',
    title: 'Straight-Cut Sunny Mustard Short Kurti',
    craftDetail: 'Contemporary Straight Hem · Gold Foil Motif · Round Neck Keyhole Tie',
    image: '/src/assets/images/kurti_straight_yellow_1791019422124.jpg',
    highlightTag: 'Scene 2 · Kurti 03/08',
    price: 549,
  },
  {
    id: 'kurti-4',
    scene: 'kurti',
    title: 'Pastel Blush Pink Floral Cotton Kurti',
    craftDetail: 'Handblock Botanical Print · Delicate Thread Embroidery · Soft Flowing Silhouette',
    image: '/src/assets/images/kurti_pink_floral_1791019474564.jpg',
    highlightTag: 'Scene 2 · Kurti 04/08',
    price: 529,
  },
  {
    id: 'kurti-5',
    scene: 'kurti',
    title: 'Emerald Green Festive Short Kurti',
    craftDetail: 'Modern Sleeveless Tunic · Golden Neck Piping · Rich Jewel-Tone Luster',
    image: '/src/assets/images/emerald_mannequin_1791017582801.jpg',
    highlightTag: 'Scene 2 · Kurti 05/08',
    price: 599,
  },
  {
    id: 'kurti-6',
    scene: 'kurti',
    title: 'Royal Blue Peplum Festive Flare Kurti',
    craftDetail: 'Vibrant Peacock Blue Silk Blend · Flared Peplum Hem · Shisha Mirror Sparkle',
    image: '/src/assets/images/hero_sathi_boutique_1791016528092.jpg',
    highlightTag: 'Scene 2 · Kurti 06/08',
    price: 699,
  },
  {
    id: 'kurti-7',
    scene: 'kurti',
    title: 'Blush Pink Silk-Cotton Tunic Kurti',
    craftDetail: 'Clean Minimalist Silhouette · Satin Collar Piping · Subtle Side Slits',
    image: '/src/assets/images/pink_blouse_mannequin_1791017140834.jpg',
    highlightTag: 'Scene 2 · Kurti 07/08',
    price: 459,
  },
  {
    id: 'kurti-8',
    scene: 'kurti',
    title: 'Maroon Zari Embroidered Festive Kurti',
    craftDetail: 'Traditional Festive Ruby Shade · Gold Zari Neck Yoke · Regal Bengal Craft',
    image: '/src/assets/images/blouse_velvet_maroon_1791019460377.jpg',
    highlightTag: 'Scene 2 · Kurti 08/08',
    price: 649,
  },
];

interface HeroProps {
  onShopNow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopNow }) => {
  const [filterScene, setFilterScene] = useState<'all' | 'blouse' | 'kurti'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Audio hook for sound control
  const { isPlaying: isAudioPlaying, toggleSound } = useAudioPlayer();

  const filteredOutfits = React.useMemo(() => {
    if (filterScene === 'blouse') return REEL_OUTFITS.filter((o) => o.scene === 'blouse');
    if (filterScene === 'kurti') return REEL_OUTFITS.filter((o) => o.scene === 'kurti');
    return REEL_OUTFITS;
  }, [filterScene]);

  // Total duration: ~34-36 seconds across all outfits (~2.0s per outfit)
  const currentOutfit = filteredOutfits[currentIndex] || filteredOutfits[0];
  const slideDurationMs = 2100;

  // Auto-play cinematic reel timer
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredOutfits.length);
    }, slideDurationMs);

    return () => clearInterval(interval);
  }, [isPlaying, isHovered, filteredOutfits.length]);

  // Reset index when changing scene filter
  const handleSelectScene = (scene: 'all' | 'blouse' | 'kurti') => {
    setFilterScene(scene);
    setCurrentIndex(0);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredOutfits.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredOutfits.length - 1 : prev - 1));
  };

  // Mobile swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    setTouchStartX(null);
  };

  // Formatted seconds
  const totalReelSecs = Math.round((filteredOutfits.length * slideDurationMs) / 1000);
  const currentSecs = Math.round(((currentIndex + 1) * slideDurationMs) / 1000);
  const progressPercent = ((currentIndex + 1) / filteredOutfits.length) * 100;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#18030B] via-[#0E0207] to-[#16020A] border-b border-rose-950/80 text-white select-none">
      
      {/* Background Ambience: Cinematic Golden & Burgundy Lights */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-rose-900/18 rounded-full blur-3xl pointer-events-none -mt-32" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-amber-500/12 rounded-full blur-3xl pointer-events-none -mb-32" />

      {/* Floating Animated Pink Flower Petals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20 opacity-70">
        <div className="animate-float-petal-1 absolute top-[12%] left-[4%]">
          <FloatingPetal size={24} rotation={-25} />
        </div>
        <div className="animate-float-petal-2 absolute top-[22%] left-[38%]">
          <FloatingPetal size={18} rotation={35} />
        </div>
        <div className="animate-float-petal-3 absolute bottom-[18%] left-[20%]">
          <FloatingPetal size={28} rotation={-45} />
        </div>
        <div className="animate-float-petal-1 absolute top-[10%] right-[32%]">
          <FloatingPetal size={20} rotation={15} />
        </div>
        <div className="animate-float-petal-2 absolute bottom-[25%] right-[10%]">
          <FloatingPetal size={26} rotation={55} />
        </div>
      </div>

      {/* =====================================================================
          MAIN HERO CONTAINER: 16:9 Landscape Cinematic Boutique Fashion Video Reel
          ===================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 relative z-10">
        
        {/* Master 16:9 Landscape Video Frame */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden bg-black border border-amber-500/40 shadow-[0_24px_60px_rgba(0,0,0,0.85),0_0_40px_rgba(190,24,93,0.22)] group"
          style={{ aspectRatio: '16 / 9', minHeight: '480px' }}
        >
          
          {/* ================= BACKGROUND CINEMATIC VIDEO REEL (KEN BURNS) ================= */}
          <div className="absolute inset-0 z-0 overflow-hidden bg-black">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentOutfit.id}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1.0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={currentOutfit.image}
                  alt={currentOutfit.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top filter brightness-[0.98] contrast-[1.05]"
                />
              </motion.div>
            </AnimatePresence>

            {/* Cinematic Gradient Vignettes for Perfect Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/55 to-black/35 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/60 pointer-events-none" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-amber-400/10 via-rose-600/10 to-transparent blur-2xl pointer-events-none" />
          </div>

          {/* ================= TOP BAR OVERLAY: SCENE SELECTOR & SOUND CONTROLS ================= */}
          <div className="absolute top-3 sm:top-5 left-3 sm:left-6 right-3 sm:right-6 z-30 flex items-center justify-between gap-2 flex-wrap">
            
            {/* Top Left: Scene Filter Tabs */}
            <div className="flex items-center gap-1.5 sm:gap-2 bg-black/65 backdrop-blur-md px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-amber-300/40 shadow-lg">
              <button
                onClick={() => handleSelectScene('all')}
                className={`text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full transition-all duration-200 ${
                  filterScene === 'all'
                    ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-xs'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                All Reel ({REEL_OUTFITS.length})
              </button>

              <button
                onClick={() => handleSelectScene('blouse')}
                className={`text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full transition-all duration-200 ${
                  filterScene === 'blouse'
                    ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-xs'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                Scene 1: Blouses (9)
              </button>

              <button
                onClick={() => handleSelectScene('kurti')}
                className={`text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full transition-all duration-200 ${
                  filterScene === 'kurti'
                    ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-xs'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                Scene 2: Kurtis (8)
              </button>
            </div>

            {/* Top Right: Sound ON/OFF Toggle linked to YouTube Music track */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleSound}
                className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold backdrop-blur-md border transition-all duration-300 ${
                  isAudioPlaying
                    ? 'bg-rose-600 text-white border-rose-400 shadow-[0_0_15px_rgba(225,29,72,0.6)]'
                    : 'bg-black/70 text-stone-300 border-stone-700 hover:border-rose-400 hover:text-white'
                }`}
                title={isAudioPlaying ? 'Mute Background Music' : 'Play Background Music'}
                aria-label={isAudioPlaying ? 'Turn Sound OFF' : 'Turn Sound ON'}
              >
                {isAudioPlaying ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                    <span className="hidden sm:inline">Sound ON</span>
                    <span className="flex items-center gap-0.5 h-2.5">
                      <span className="w-0.5 bg-white h-2 rounded-full animate-bounce" />
                      <span className="w-0.5 bg-amber-300 h-3 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-0.5 bg-pink-300 h-2 rounded-full animate-bounce" style={{ animationDelay: '75ms' }} />
                    </span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-stone-400" />
                    <span className="hidden sm:inline">Sound OFF</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* ================= LEFT HERO EDITORIAL OVERLAY ================= */}
          <div className="absolute left-4 sm:left-8 lg:left-12 top-1/2 -translate-y-1/2 z-20 max-w-lg lg:max-w-xl flex flex-col justify-center space-y-2.5 sm:space-y-4">
            
            {/* Small Label: "NEW COLLECTION" */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-stone-900/90 to-rose-950/80 backdrop-blur-md border border-amber-300/80 shadow-md text-[10px] sm:text-[11px] font-bold tracking-[0.24em] text-amber-300 uppercase font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                <span>NEW COLLECTION</span>
                <span className="text-amber-500">·</span>
                <span className="text-white font-mono text-[10px]">35s FASHION REEL</span>
              </span>
            </motion.div>

            {/* Main Heading: "Elegant Kurtis for Every Occasion" */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-1"
            >
              <span className="text-[11px] sm:text-xs font-cinzel font-bold tracking-[0.3em] text-amber-300 uppercase block">
                SATHI BOUTIQUE · 25 EXCLUSIVE STYLES
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold tracking-tight leading-[1.12] text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-rose-100 to-amber-200 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
                Elegant Kurtis and Blouse for Every Occasion
              </h1>
              
              {/* Subheading */}
              <p className="font-sans text-xs sm:text-sm lg:text-base text-rose-100/90 tracking-normal leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] max-w-lg">
                Discover stylish sleeveless kurtis and designer blouses handcrafted for everyday comfort, workwear and special festive occasions.
              </p>
            </motion.div>

            {/* Subtitle: "Traditional • Modern • Contemporary" */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p className="text-[10px] sm:text-xs font-sans font-bold tracking-[0.24em] text-amber-300 uppercase drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                Traditional • Modern • Contemporary
              </p>
            </motion.div>

            {/* Current Active Look Preview Pill */}
            <motion.div
              key={currentOutfit.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-black/65 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-amber-300/40 shadow-lg max-w-md"
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-white truncate pr-2">
                  {currentOutfit.title}
                </span>
                <span className="text-[10px] font-mono text-amber-300 font-semibold shrink-0">
                  {currentOutfit.highlightTag}
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-stone-300/90 truncate pt-0.5 font-sans">
                {currentOutfit.craftDetail}
              </p>
            </motion.div>

            {/* Buttons: [ SHOP NOW ] [ NEW ARRIVALS ] */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="pt-1 sm:pt-2 flex items-center gap-3 sm:gap-4 flex-wrap"
            >
              <button
                onClick={onShopNow}
                className="px-6 sm:px-8 py-3 bg-gradient-to-r from-pink-600 via-rose-600 to-pink-700 hover:from-pink-500 hover:to-rose-600 text-white font-bold text-xs sm:text-sm tracking-wider uppercase rounded-full shadow-[0_8px_25px_rgba(219,39,119,0.55)] hover:shadow-[0_12px_32px_rgba(219,39,119,0.75)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2 group focus-visible:outline-none"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  const arrivalsEl = document.getElementById('new-arrivals');
                  if (arrivalsEl) arrivalsEl.scrollIntoView({ behavior: 'smooth' });
                  else onShopNow();
                }}
                className="px-5 sm:px-7 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-xs sm:text-sm tracking-wider uppercase rounded-full border border-white/30 transition-all active:scale-95"
              >
                <span>NEW ARRIVALS</span>
              </button>

              <button
                onClick={() => setIsPlaying((prev) => !prev)}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white flex items-center justify-center transition-all duration-200 active:scale-95"
                title={isPlaying ? 'Pause Fashion Reel' : 'Play Fashion Reel'}
                aria-label={isPlaying ? 'Pause Fashion Reel' : 'Play Fashion Reel'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
              </button>
            </motion.div>

          </div>

          {/* ================= RIGHT PREVIEW THUMBNAIL INSET ================= */}
          <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-2">
            <div className="w-36 h-48 rounded-2xl overflow-hidden border-2 border-amber-300/80 shadow-[0_12px_30px_rgba(0,0,0,0.7)] bg-black relative group/preview">
              <img
                src={currentOutfit.image}
                alt={currentOutfit.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top transform group-hover/preview:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 inset-x-2 text-center">
                <span className="text-[10px] font-bold text-amber-300 block truncate">
                  {currentOutfit.title}
                </span>
                <span className="text-[9px] text-pink-300 font-mono">
                  ₹{currentOutfit.price}
                </span>
              </div>
            </div>
            <span className="text-[10px] tracking-widest uppercase font-mono text-stone-400">
              {currentIndex + 1} / {filteredOutfits.length} LOOKS
            </span>
          </div>

          {/* ================= NAVIGATION ARROWS (Hover or Mobile) ================= */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-rose-600 text-white border border-white/20 backdrop-blur-md flex items-center justify-center opacity-70 hover:opacity-100 transition-all duration-200"
            aria-label="Previous outfit design"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-rose-600 text-white border border-white/20 backdrop-blur-md flex items-center justify-center opacity-70 hover:opacity-100 transition-all duration-200"
            aria-label="Next outfit design"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* ================= BOTTOM TIMELINE SCRUBBER & VIDEO CONTROLS ================= */}
          <div className="absolute bottom-0 inset-x-0 z-30 bg-gradient-to-t from-black/95 via-black/80 to-transparent pt-4 pb-2.5 px-3 sm:px-6">
            
            {/* Timeline Progress Bar */}
            <div className="relative w-full h-1.5 bg-white/20 rounded-full overflow-hidden mb-2 cursor-pointer">
              <motion.div
                className="h-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400"
                style={{ width: `${progressPercent}%` }}
                transition={{ ease: 'linear', duration: 0.2 }}
              />
            </div>

            {/* Bottom Meta Bar: Time, Scene Indicator & Loop Status */}
            <div className="flex items-center justify-between text-[10px] sm:text-xs text-stone-300">
              
              <div className="flex items-center gap-2 font-mono">
                <span className="text-white font-bold">
                  00:{currentSecs.toString().padStart(2, '0')}
                </span>
                <span className="text-stone-500">/</span>
                <span className="text-stone-400">
                  00:{totalReelSecs.toString().padStart(2, '0')}
                </span>
                <span className="hidden sm:inline-block text-amber-400 pl-2">
                  ● {currentOutfit.scene === 'blouse' ? 'Scene 1: Sleeveless Blouses' : 'Scene 2: Short Kurtis'}
                </span>
              </div>

              {/* Outfit thumbnails dots */}
              <div className="hidden sm:flex items-center gap-1">
                {filteredOutfits.map((outfit, idx) => (
                  <button
                    key={outfit.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentIndex
                        ? 'w-6 bg-pink-500'
                        : 'w-1.5 bg-white/30 hover:bg-white/60'
                    }`}
                    title={outfit.title}
                    aria-label={`Jump to look ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-sans uppercase tracking-wider text-rose-300/80 font-bold hidden sm:inline">
                  Seamless Loop
                </span>
                <span className="text-[10px] bg-rose-950/80 border border-rose-500/50 text-rose-300 px-2 py-0.5 rounded-full font-mono">
                  16:9 4K
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
