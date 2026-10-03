/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import { Volume2, VolumeX, Music, Play, Pause, Sparkles } from 'lucide-react';

interface AudioContextType {
  isPlaying: boolean;
  volume: number;
  trackTitle: string;
  toggleSound: () => void;
  setVolume: (vol: number) => void;
}

const AudioPlayerContext = createContext<AudioContextType | null>(null);

export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(0.7);
  const trackTitle = 'Sathi Royal Boutique Tanpura & Flute Drone';

  // Web Audio API Synthesizer refs for 100% offline, fail-proof luxury ambient soundtrack
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const intervalRef = useRef<any>(null);

  // Initialize Web Audio Drone (Indian Tanpura Sa-Pa meditative drone)
  const startSynthDrone = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume * 0.15, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Tanpura frequencies: Pa (220Hz), Sa (146.8Hz), Sa' (293.66Hz)
      const freqs = [146.83, 220.0, 293.66, 440.0];
      const newOscs: OscillatorNode[] = [];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();

        // Warm harmonic wave
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Soft amplitude modulation for string pluck effect
        noteGain.gain.setValueAtTime(0.08, ctx.currentTime);

        osc.connect(noteGain);
        noteGain.connect(masterGain);
        osc.start();
        newOscs.push(osc);
      });

      oscillatorsRef.current = newOscs;

      // Gentle meditative pulse
      intervalRef.current = setInterval(() => {
        if (!masterGain || !ctx) return;
        const now = ctx.currentTime;
        masterGain.gain.cancelScheduledValues(now);
        masterGain.gain.setValueAtTime(masterGain.gain.value, now);
        masterGain.gain.exponentialRampToValueAtTime(Math.max(0.01, volume * 0.2), now + 1.2);
        masterGain.gain.exponentialRampToValueAtTime(Math.max(0.01, volume * 0.12), now + 2.5);
      }, 3000);
    } catch {
      // Graceful fallback
    }
  };

  const stopSynthDrone = () => {
    try {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      oscillatorsRef.current.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {}
      });
      oscillatorsRef.current = [];
    } catch {}
  };

  const setVolume = (newVol: number) => {
    setVolumeState(newVol);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(newVol * 0.15, audioCtxRef.current.currentTime);
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopSynthDrone();
      setIsPlaying(false);
    } else {
      startSynthDrone();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      stopSynthDrone();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <AudioPlayerContext.Provider
      value={{
        isPlaying,
        volume,
        trackTitle,
        toggleSound,
        setVolume,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    return {
      isPlaying: false,
      volume: 0.7,
      trackTitle: 'Sathi Boutique Music',
      toggleSound: () => {},
      setVolume: () => {},
    };
  }
  return context;
};

interface BackgroundMusicPlayerProps {
  variant?: 'floating' | 'hero-badge' | 'compact';
}

export const BackgroundMusicPlayer: React.FC<BackgroundMusicPlayerProps> = ({
  variant = 'floating',
}) => {
  const { isPlaying, volume, trackTitle, toggleSound, setVolume } = useAudioPlayer();
  const [showVolumeSlider, setShowVolumeSlider] = useState<boolean>(false);

  if (variant === 'hero-badge') {
    return (
      <div className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-full border border-amber-300/40 text-white select-none">
        <button
          onClick={toggleSound}
          className={`flex items-center gap-1.5 text-xs font-bold transition-all ${
            isPlaying ? 'text-amber-300' : 'text-stone-300 hover:text-white'
          }`}
          aria-label={isPlaying ? 'Pause Boutique Audio' : 'Play Boutique Audio'}
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>Music: ON</span>
              <span className="flex items-center gap-0.5 h-2">
                <span className="w-0.5 bg-amber-300 h-2 rounded-full animate-bounce" />
                <span className="w-0.5 bg-pink-300 h-3 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-0.5 bg-white h-1.5 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-stone-400" />
              <span>Music: OFF</span>
            </>
          )}
        </button>
      </div>
    );
  }

  // Floating Player in bottom corner with Play/Pause & Volume controls
  return (
    <aside
      aria-label="Background music controls"
      className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 select-none animate-in fade-in"
    >
      <div className="bg-stone-900/95 backdrop-blur-md border border-amber-400/40 rounded-2xl shadow-2xl p-2.5 sm:p-3 text-white flex items-center gap-2.5 transition-all">
        {/* Play / Pause Toggle Button */}
        <button
          onClick={toggleSound}
          aria-label={isPlaying ? 'Pause background soundtrack' : 'Play background soundtrack'}
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
            isPlaying
              ? 'bg-[#e60070] text-white shadow-md shadow-[#e60070]/30 hover:bg-[#c2005e]'
              : 'bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700'
          }`}
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
        </button>

        {/* Track Info */}
        <div className="hidden sm:block max-w-[140px]">
          <div className="text-[11px] font-bold text-white truncate flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-300 shrink-0" />
            <span>Atelier Ambience</span>
          </div>
          <div className="text-[9px] text-stone-400 font-mono">
            {isPlaying ? 'Playing Tanpura' : 'Click to Play'}
          </div>
        </div>

        {/* Volume Button & Slider */}
        <div
          className="relative flex items-center"
          onMouseEnter={() => setShowVolumeSlider(true)}
          onMouseLeave={() => setShowVolumeSlider(false)}
        >
          <button
            onClick={() => setVolume(volume > 0 ? 0 : 0.7)}
            aria-label="Toggle Volume"
            className="p-1.5 text-stone-400 hover:text-white transition-colors"
          >
            {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {showVolumeSlider && (
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-stone-900 p-2 rounded-xl border border-stone-700 shadow-xl flex flex-col items-center gap-1.5">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                aria-label="Volume slider"
                className="w-20 h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-[#e60070]"
              />
              <span className="text-[9px] font-mono text-stone-300">
                {Math.round(volume * 100)}%
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
