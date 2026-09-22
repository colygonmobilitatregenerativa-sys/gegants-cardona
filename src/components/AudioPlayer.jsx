import React from 'react';
import { ExternalLink, Radio, Music } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AudioPlayer() {
  const { t, loc } = useLanguage();

  return (
    <section id="musica" className="py-20 bg-gradient-to-r from-cardona-burgundyDark via-cardona-burgundy to-cardona-burgundyDark text-white relative overflow-hidden border-y-2 border-cardona-gold/30">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(29,185,84,0.08)_0,transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Official Spotify Card */}
        <div className="p-6 sm:p-10 rounded-3xl bg-black/45 backdrop-blur-md border border-cardona-gold/30 shadow-2xl space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#1DB954] flex items-center justify-center text-black shrink-0 shadow-lg transform hover:scale-105 transition-transform">
                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.498 17.305a.75.75 0 0 1-1.03.248c-2.82-1.724-6.37-2.114-10.55-1.16a.75.75 0 1 1-.336-1.462c4.57-1.042 8.498-.598 11.668 1.344a.75.75 0 0 1 .248 1.03zm1.468-3.264a.937.937 0 0 1-1.288.31c-3.228-1.984-8.15-2.559-11.97-1.399a.938.938 0 0 1-.548-1.794c4.364-1.325 9.79-.684 13.496 1.595a.938.938 0 0 1 .31 1.288zm.126-3.41c-3.87-2.298-10.257-2.51-13.978-1.381a1.125 1.125 0 0 1-.652-2.155c4.27-1.296 11.31-1.049 15.772 1.6a1.125 1.125 0 0 1-1.142 1.936z"/>
                </svg>
              </div>
              <div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#1DB954] block mb-0.5">
                  {t('audio', 'tag')}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
                  {t('audio', 'title')}
                </h3>
                <p className="text-xs sm:text-sm text-amber-200/80">
                  {t('audio', 'subtitle')}
                </p>
              </div>
            </div>

            {/* Direct Spotify Action Buttons */}
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <a
                href="https://open.spotify.com/intl-es/album/6W9HqagD6qrbTnailiDLJw"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-initial px-6 py-3 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-xl flex items-center justify-center gap-2 transform hover:scale-105"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{t('audio', 'albumBtn')}</span>
              </a>
              <a
                href="https://open.spotify.com/intl-es/artist/0ZomSlU5AxYhO7TyGQA6Ql"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-initial px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs uppercase tracking-wider border border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <Radio className="w-4 h-4 text-cardona-gold" />
                <span>{t('audio', 'bandBtn')}</span>
              </a>
            </div>
          </div>

          {/* Embedded Spotify Player - Shows the actual album and tracklist */}
          <div className="rounded-2xl overflow-hidden shadow-inner border border-white/10 bg-black">
            <iframe
              style={{ borderRadius: '16px' }}
              src="https://open.spotify.com/embed/album/6W9HqagD6qrbTnailiDLJw?utm_source=generator&theme=0"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title={loc({
                ca: 'Spotify - Músiques de Cardona',
                es: 'Spotify - Músicas de Cardona',
                en: 'Spotify - Cardona Traditional Music'
              })}
            />
          </div>

          {/* Direct Track Links Pills */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <span className="font-semibold text-amber-200/90 flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-cardona-gold shrink-0" />
              {t('audio', 'tracksPrompt')}
            </span>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://open.spotify.com/track/0h5hNiZIoyBsgAbCImgBsq"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#1DB954]/20 hover:text-[#1DB954] text-amber-100/90 border border-white/10 transition-colors"
              >
                Gegants de la Fira ↗
              </a>
              <a
                href="https://open.spotify.com/track/5ZuKM4G5vSLqTtIVGjeWYX"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#1DB954]/20 hover:text-[#1DB954] text-amber-100/90 border border-white/10 transition-colors"
              >
                Ball de l'Àliga ↗
              </a>
              <a
                href="https://open.spotify.com/track/4cqyFaXUnAd3A9hu8R8Mmx"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#1DB954]/20 hover:text-[#1DB954] text-amber-100/90 border border-white/10 transition-colors"
              >
                Ball de Bastons ↗
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
