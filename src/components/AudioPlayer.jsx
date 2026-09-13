import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, Volume2, VolumeX, Music, Disc, ExternalLink, Radio } from 'lucide-react';
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
      
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(note.f, ctx.currentTime);

      osc2.type = 'triangle';
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
    <section id="musica" className="py-20 bg-gradient-to-r from-cardona-burgundyDark via-cardona-burgundy to-cardona-burgundyDark text-white relative overflow-hidden border-y-2 border-cardona-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Top: Web Audio Interactive Player */}
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
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 bg-black/35 backdrop-blur-md px-6 py-3.5 rounded-full border border-cardona-gold/30 shadow-xl">
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

        {/* Bottom: Official Spotify Section - Banda de Música de Cardona */}
        <div className="p-6 sm:p-8 rounded-3xl bg-black/40 backdrop-blur-md border border-cardona-gold/30 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1DB954] flex items-center justify-center text-black shrink-0 shadow-lg">
                <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.498 17.305a.75.75 0 0 1-1.03.248c-2.82-1.724-6.37-2.114-10.55-1.16a.75.75 0 1 1-.336-1.462c4.57-1.042 8.498-.598 11.668 1.344a.75.75 0 0 1 .248 1.03zm1.468-3.264a.937.937 0 0 1-1.288.31c-3.228-1.984-8.15-2.559-11.97-1.399a.938.938 0 0 1-.548-1.794c4.364-1.325 9.79-.684 13.496 1.595a.938.938 0 0 1 .31 1.288zm.126-3.41c-3.87-2.298-10.257-2.51-13.978-1.381a1.125 1.125 0 0 1-.652-2.155c4.27-1.296 11.31-1.049 15.772 1.6a1.125 1.125 0 0 1-1.142 1.936z"/>
                </svg>
              </div>
              <div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#1DB954] block">
                  Gravacions Oficials a Spotify
                </span>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Banda de Música de Cardona
                </h4>
                <p className="text-xs text-amber-200/80">
                  Àlbum oficial: «Músiques de Cardona: Gegants, Balls de Bastons, Àliga i més»
                </p>
              </div>
            </div>

            {/* Direct Spotify Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href="https://open.spotify.com/intl-es/album/6W9HqagD6qrbTnailiDLJw"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg flex items-center gap-2 transform hover:scale-105"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Obrir Àlbum a Spotify</span>
              </a>
              <a
                href="https://open.spotify.com/intl-es/artist/0ZomSlU5AxYhO7TyGQA6Ql"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs uppercase tracking-wider border border-white/20 transition-all flex items-center gap-2"
              >
                <Radio className="w-4 h-4 text-cardona-gold" />
                <span>Perfil de la Banda</span>
              </a>
            </div>
          </div>

          {/* Embedded Spotify Player */}
          <div className="rounded-2xl overflow-hidden shadow-inner border border-white/10 bg-black">
            <iframe
              style={{ borderRadius: '16px' }}
              src="https://open.spotify.com/embed/album/6W9HqagD6qrbTnailiDLJw?utm_source=generator&theme=0"
              width="100%"
              height="152"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify - Músiques de Cardona"
            />
          </div>

          {/* Direct Track Links Pills */}
          <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="font-semibold text-amber-200/90 flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-cardona-gold" />
              Peces destacades de la vila:
            </span>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://open.spotify.com/track/0h5hNiZIoyBsgAbCImgBsq"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-lg bg-white/5 hover:bg-[#1DB954]/20 hover:text-[#1DB954] text-amber-100/80 border border-white/10 transition-colors"
              >
                Americana dels Gegants de la Fira ↗
              </a>
              <a
                href="https://open.spotify.com/track/5ZuKM4G5vSLqTtIVGjeWYX"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-lg bg-white/5 hover:bg-[#1DB954]/20 hover:text-[#1DB954] text-amber-100/80 border border-white/10 transition-colors"
              >
                Ball de l'Àliga ↗
              </a>
              <a
                href="https://open.spotify.com/track/4cqyFaXUnAd3A9hu8R8Mmx"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-lg bg-white/5 hover:bg-[#1DB954]/20 hover:text-[#1DB954] text-amber-100/80 border border-white/10 transition-colors"
              >
                Canonets (Ball de Bastons) ↗
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
