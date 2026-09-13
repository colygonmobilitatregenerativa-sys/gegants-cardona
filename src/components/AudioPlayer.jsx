import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, Volume2, VolumeX, Music, Disc } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AudioPlayer() {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const audioContextRef = useRef(null);
  const isPlayingRef = useRef(false);
  const stopFunctionRef = useRef(null);

  const tracks = [
    {
      id: 0,
      title: t('audio', 'track1'),
      genre: 'Pasdoble Tradicional',
      duration: '0:48',
      melody: [
        // Pasdoble alegre de gegants (frequencies and durations in seconds)
        { f: 523.25, d: 0.3 }, { f: 659.25, d: 0.3 }, { f: 783.99, d: 0.4 }, { f: 659.25, d: 0.2 },
        { f: 783.99, d: 0.3 }, { f: 880.00, d: 0.3 }, { f: 783.99, d: 0.5 }, { f: 659.25, d: 0.3 },
        { f: 587.33, d: 0.3 }, { f: 659.25, d: 0.3 }, { f: 587.33, d: 0.3 }, { f: 523.25, d: 0.6 },
        { f: 659.25, d: 0.3 }, { f: 783.99, d: 0.3 }, { f: 1046.50, d: 0.5 }, { f: 880.00, d: 0.4 },
        { f: 783.99, d: 0.4 }, { f: 659.25, d: 0.4 }, { f: 523.25, d: 0.8 }
      ]
    },
    {
      id: 1,
      title: t('audio', 'track2'),
      genre: 'Llegenda Medieval & Vals',
      duration: '0:42',
      melody: [
        // Melodia noble de la Torre de la Minyona
        { f: 440.00, d: 0.4 }, { f: 493.88, d: 0.4 }, { f: 523.25, d: 0.6 }, { f: 659.25, d: 0.5 },
        { f: 587.33, d: 0.4 }, { f: 523.25, d: 0.4 }, { f: 493.88, d: 0.7 }, { f: 440.00, d: 0.5 },
        { f: 392.00, d: 0.4 }, { f: 440.00, d: 0.4 }, { f: 523.25, d: 0.6 }, { f: 493.88, d: 0.6 },
        { f: 440.00, d: 1.0 }
      ]
    },
    {
      id: 2,
      title: t('audio', 'track3'),
      genre: 'Fanfàrria de Gralles',
      duration: '0:36',
      melody: [
        // Toc matiner de festa
        { f: 587.33, d: 0.2 }, { f: 587.33, d: 0.2 }, { f: 783.99, d: 0.4 }, { f: 783.99, d: 0.2 },
        { f: 880.00, d: 0.3 }, { f: 987.77, d: 0.4 }, { f: 880.00, d: 0.3 }, { f: 783.99, d: 0.5 },
        { f: 659.25, d: 0.3 }, { f: 783.99, d: 0.5 }, { f: 587.33, d: 0.6 }
      ]
    },
    {
      id: 3,
      title: t('audio', 'track4'),
      genre: 'Ball de Bastons & Dansa',
      duration: '0:32',
      melody: [
        // Rítmica popular
        { f: 523.25, d: 0.2 }, { f: 587.33, d: 0.2 }, { f: 659.25, d: 0.2 }, { f: 523.25, d: 0.2 },
        { f: 659.25, d: 0.2 }, { f: 783.99, d: 0.3 }, { f: 659.25, d: 0.2 }, { f: 523.25, d: 0.4 },
        { f: 493.88, d: 0.3 }, { f: 587.33, d: 0.3 }, { f: 523.25, d: 0.6 }
      ]
    }
  ];

  const currentTrack = tracks[currentTrackIndex];

  // Synthesize traditional instrument sound
  const startMelodyPlayback = () => {
    if (!window.AudioContext && !window.webkitAudioContext) return;
    
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    isPlayingRef.current = true;
    let noteIndex = 0;
    let timerId = null;

    const playNextNote = () => {
      if (!isPlayingRef.current) return;
      
      const note = currentTrack.melody[noteIndex % currentTrack.melody.length];
      
      // Dual oscillator for rich folk timbre (like gralla & reed harmonic)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc1.type = 'sawtooth'; // bright reed/gralla harmonic
      osc1.frequency.setValueAtTime(note.f, ctx.currentTime);

      osc2.type = 'triangle'; // round body
      osc2.frequency.setValueAtTime(note.f * 0.5, ctx.currentTime);

      const effectiveVolume = isMuted ? 0 : volume * 0.18;
      gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(effectiveVolume, ctx.currentTime + 0.04);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + note.d - 0.03);

      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start(ctx.currentTime);
      osc2.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + note.d);
      osc2.stop(ctx.currentTime + note.d);

      noteIndex++;
      timerId = setTimeout(playNextNote, note.d * 1000);
    };

    playNextNote();

    stopFunctionRef.current = () => {
      isPlayingRef.current = false;
      if (timerId) clearTimeout(timerId);
    };
  };

  const stopMelodyPlayback = () => {
    isPlayingRef.current = false;
    if (stopFunctionRef.current) {
      stopFunctionRef.current();
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopMelodyPlayback();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      startMelodyPlayback();
    }
  };

  const handleNextTrack = () => {
    stopMelodyPlayback();
    const nextIdx = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(nextIdx);
    if (isPlaying) {
      setTimeout(() => {
        startMelodyPlayback();
      }, 100);
    }
  };

  useEffect(() => {
    return () => {
      stopMelodyPlayback();
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <section id="musica" className="py-16 bg-gradient-to-r from-cardona-burgundyDark via-cardona-burgundy to-cardona-burgundyDark text-white relative overflow-hidden border-y-2 border-cardona-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Track Info & Vinyl Icon */}
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-cardona-gold p-1 shadow-2xl flex items-center justify-center ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }}>
                <div className="w-full h-full rounded-full bg-stone-900 border-4 border-cardona-goldDark flex items-center justify-center">
                  <Disc className="w-8 h-8 text-cardona-gold" />
                </div>
              </div>
              {isPlaying && (
                <div className="absolute -top-1 -right-1 flex gap-0.5 items-end h-5 px-1 bg-cardona-gold rounded-full">
                  <span className="w-1 bg-cardona-burgundyDark h-3 animate-pulse"></span>
                  <span className="w-1 bg-cardona-burgundyDark h-5 animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-1 bg-cardona-burgundyDark h-2 animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-cardona-gold/20 border border-cardona-gold/40 text-cardona-goldLight">
                  {currentTrack.genre}
                </span>
                <span className="text-xs text-amber-200/70">
                  {t('audio', 'nowPlaying')}
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                {currentTrack.title}
              </h3>
              <p className="text-xs text-amber-100/70">
                Colla de Grallers i Tabalers de Cardona · {currentTrack.duration}
              </p>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 bg-black/25 backdrop-blur-md px-6 py-3.5 rounded-full border border-cardona-gold/30 shadow-xl">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="p-3.5 rounded-full bg-cardona-gold hover:bg-cardona-goldLight text-cardona-burgundyDark transition-all duration-200 transform hover:scale-110 shadow-md focus:outline-none"
              title={isPlaying ? t('audio', 'pause') : t('audio', 'play')}
            >
              {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
            </button>

            {/* Next Track Button */}
            <button
              onClick={handleNextTrack}
              className="p-2.5 rounded-full hover:bg-white/15 text-amber-100 transition-colors"
              title="Següent cançó"
            >
              <SkipForward className="w-5 h-5" />
            </button>

            {/* Volume control */}
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-white/20">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-amber-100 hover:text-cardona-gold transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  setIsMuted(false);
                }}
                className="w-20 accent-cardona-gold h-1.5 rounded-lg cursor-pointer bg-white/20"
              />
            </div>
          </div>

          {/* Quick Track Switcher Pills */}
          <div className="hidden xl:flex items-center gap-2">
            {tracks.map((tr, idx) => (
              <button
                key={tr.id}
                onClick={() => {
                  stopMelodyPlayback();
                  setCurrentTrackIndex(idx);
                  if (isPlaying) {
                    setTimeout(() => startMelodyPlayback(), 100);
                  }
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  currentTrackIndex === idx
                    ? 'bg-cardona-gold text-cardona-burgundyDark font-bold shadow'
                    : 'bg-white/10 hover:bg-white/20 text-amber-100 border border-white/10'
                }`}
              >
                {idx + 1}. {tr.title.split(' ')[0]} {tr.title.split(' ')[1] || ''}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
