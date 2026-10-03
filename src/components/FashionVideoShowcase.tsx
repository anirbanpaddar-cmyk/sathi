/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw, Sparkles, Film, AlertCircle } from 'lucide-react';

interface FashionVideoShowcaseProps {
  onShopCollection?: () => void;
}

export const FashionVideoShowcase: React.FC<FashionVideoShowcaseProps> = ({
  onShopCollection,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(0.8);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [hasError, setHasError] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState<number>(0);

  // Reliable high-speed fashion atelier & runway sample streams
  const videoReels = [
    {
      title: 'Runway Lookbook · 2026 Collection',
      tagline: 'Sleeveless Elegance & Festive Drape',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      poster: '/src/assets/images/hero_sathi_boutique_1791016528092.jpg',
    },
    {
      title: 'Artisan Atelier & Zari Craftsmanship',
      tagline: 'Hand-Finished Piping, Latkans & Raw Silk',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      poster: '/src/assets/images/blouse_back_design_1791016577426.jpg',
    },
  ];

  const currentReel = videoReels[activeVideoIndex];

  // Play / Pause toggle
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasError(false);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  };

  // Mute / Unmute
  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted && volume === 0) {
      setVolume(0.7);
      videoRef.current.volume = 0.7;
    }
  };

  // Volume slider
  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      if (newVol > 0 && isMuted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  // Seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
  };

  // Fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section id="runway-video" className="py-14 sm:py-20 bg-stone-950 text-white relative overflow-hidden select-none border-t border-b border-rose-950/60">
      
      {/* Background glow ambiance */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-rose-900/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Film className="w-4 h-4 text-[#e60070] animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-amber-300 font-bold">
                Cinematic Runway Reel · 2026
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white tracking-tight">
              Boutique Runway &amp; Craftsmanship Showcase
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-xl">
              Experience the fluid drape, raw silk sheen, and handcrafted back designs in movement. High-definition lookbook video.
            </p>
          </div>

          {/* Reel Switcher Buttons */}
          <div className="flex items-center gap-2">
            {videoReels.map((reel, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveVideoIndex(idx);
                  setIsPlaying(false);
                  setHasError(false);
                  if (videoRef.current) {
                    videoRef.current.currentTime = 0;
                  }
                }}
                className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all border ${
                  activeVideoIndex === idx
                    ? 'bg-[#e60070] text-white border-[#e60070] shadow-md shadow-rose-900/40'
                    : 'bg-stone-900/80 text-stone-400 border-stone-800 hover:text-white hover:border-stone-700'
                }`}
              >
                Reel 0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Video Player Container (16:9 responsive frame) */}
        <div
          ref={containerRef}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
          className="relative w-full aspect-video max-h-[560px] rounded-2xl sm:rounded-3xl overflow-hidden bg-black border border-amber-400/30 shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_30px_rgba(230,0,112,0.18)] group"
        >
          {/* Main Video Element */}
          {!hasError ? (
            <video
              ref={videoRef}
              src={currentReel.src}
              poster={currentReel.poster}
              playsInline
              muted={isMuted}
              preload="metadata"
              onTimeUpdate={() => {
                if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
              }}
              onLoadedMetadata={() => {
                if (videoRef.current) setDuration(videoRef.current.duration);
              }}
              onEnded={() => setIsPlaying(false)}
              onError={() => {
                setHasError(true);
                setIsPlaying(false);
              }}
              onClick={togglePlay}
              className="w-full h-full object-cover object-center cursor-pointer"
            />
          ) : (
            /* Clean Fallback screen when network / video stream is blocked */
            <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center bg-stone-900">
              <img
                src={currentReel.poster}
                alt="Runway Preview Poster"
                className="absolute inset-0 w-full h-full object-cover opacity-35 filter blur-xs"
              />
              <div className="relative z-10 max-w-md p-6 rounded-2xl bg-black/80 backdrop-blur-md border border-stone-700 space-y-3">
                <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
                <h4 className="font-bold text-white text-base">Video Reel Offline</h4>
                <p className="text-xs text-stone-300">
                  Your network or privacy blocker restricted the video stream. You can still explore all 25 high-resolution looks in our lookbook!
                </p>
                <div className="pt-2 flex items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setHasError(false);
                      if (videoRef.current) videoRef.current.load();
                    }}
                    className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-xs font-bold text-white rounded-xl flex items-center gap-1.5 border border-stone-600"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retry Video</span>
                  </button>
                  {onShopCollection && (
                    <button
                      onClick={onShopCollection}
                      className="px-4 py-2 bg-[#e60070] hover:bg-[#c2005e] text-xs font-bold text-white rounded-xl shadow-md"
                    >
                      Browse Lookbook
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Big Center Play/Pause Overlay Button */}
          {!hasError && (
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause runway video' : 'Play runway video'}
              className={`absolute inset-0 flex items-center justify-center transition-all duration-300 z-20 ${
                isPlaying && !showControls ? 'opacity-0 pointer-events-none' : 'opacity-100 bg-black/25'
              }`}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#e60070]/90 hover:bg-[#e60070] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all backdrop-blur-sm border-2 border-white/60">
                {isPlaying ? (
                  <Pause className="w-8 h-8 fill-white" />
                ) : (
                  <Play className="w-8 h-8 fill-white ml-1" />
                )}
              </div>
            </button>
          )}

          {/* Video Title Header Overlay */}
          <div className="absolute top-4 left-4 z-20 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-amber-300 border border-amber-300/40 text-[10px] sm:text-xs font-bold">
              <Sparkles className="w-3 h-3 text-[#e60070]" />
              <span>{currentReel.title}</span>
            </span>
          </div>

          {/* Bottom Video Controls Bar */}
          {!hasError && (
            <div
              className={`absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/70 to-transparent z-20 transition-opacity duration-300 flex flex-col gap-2 ${
                showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Progress Seek Bar */}
              <div className="w-full flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  step="0.1"
                  value={currentTime}
                  onChange={handleSeek}
                  aria-label="Seek video position"
                  className="w-full h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-[#e60070]"
                />
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  {/* Play / Pause mini */}
                  <button
                    onClick={togglePlay}
                    className="p-1 text-white hover:text-[#e60070] transition-colors"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  {/* Volume Toggle & Slider */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={toggleMute}
                      className="p-1 text-white hover:text-[#e60070] transition-colors"
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-4 h-4 text-stone-400" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-white" />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                      aria-label="Video volume"
                      className="w-16 h-1 bg-stone-700 rounded appearance-none cursor-pointer accent-[#e60070] hidden sm:block"
                    />
                  </div>

                  {/* Timestamp */}
                  <span className="text-[11px] font-mono text-stone-400">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                {/* Right: Fullscreen Button */}
                <button
                  onClick={toggleFullscreen}
                  className="p-1 text-stone-300 hover:text-white transition-colors"
                  aria-label="Toggle Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
