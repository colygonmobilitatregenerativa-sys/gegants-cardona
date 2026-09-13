import React, { useState } from 'react';
import { Play, X, ExternalLink, Youtube } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function VideoGallery() {
  const { t, lang } = useLanguage();
  const [activeVideo, setActiveVideo] = useState(null);

  const videos = [
    {
      id: 'SzMW8_UkgRs',
      title: 'Increïble Cercavila dels Gegants de Cardona a la Festa Major 2025',
      channel: 'Ball de Gegants',
      duration: 'Festa Major 2025',
      tag: 'Cercavila de Gala',
      description: 'Viu des de dins el pas vibrant dels Gegants Centenaris, els Gegants Nous, el Batallador i els Nans pels carrers i places de Cardona.',
      thumbnail: 'https://i.ytimg.com/vi/SzMW8_UkgRs/maxresdefault.jpg',
      url: 'https://youtu.be/SzMW8_UkgRs?is=x6tWxgmr9-ujcV84',
      embedUrl: 'https://www.youtube-nocookie.com/embed/SzMW8_UkgRs?autoplay=1&rel=0'
    },
    {
      id: 'UfCLtvSi-LM',
      title: 'La Casa dels Gegants de Cardona - Descobreix els Gegants més Grans de la Festa!',
      channel: 'Ball de Gegants',
      duration: 'Reportatge Patrimonial',
      tag: 'Casa dels Gegants',
      description: 'Un recorregut màgic per la història viva, la construcció artesana i els secrets de les figures més estimades del patrimoni cardoní.',
      thumbnail: 'https://i.ytimg.com/vi/UfCLtvSi-LM/maxresdefault.jpg',
      url: 'https://youtu.be/UfCLtvSi-LM?is=9SGOqMQYtbbSzsXK',
      embedUrl: 'https://www.youtube-nocookie.com/embed/UfCLtvSi-LM?autoplay=1&rel=0'
    }
  ];

  return (
    <section id="videos" className="py-24 bg-cardona-sand relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest uppercase text-cardona-burgundy inline-block mb-2">
            {t('videos', 'tag')}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-cardona-burgundyDark mb-4">
            {t('videos', 'title')}
          </h2>
          <div className="w-20 h-1 bg-cardona-gold mx-auto mb-6 rounded-full" />
          <p className="text-gray-600 text-base sm:text-lg">
            {t('videos', 'subtitle')}
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {videos.map((vid) => (
            <div
              key={vid.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-amber-100/60 flex flex-col"
            >
              {/* Thumbnail Container */}
              <div 
                onClick={() => setActiveVideo(vid)}
                className="relative h-64 sm:h-72 overflow-hidden bg-black cursor-pointer"
              >
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:via-black/10 transition-colors" />

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all">
                    <Play className="w-7 h-7 fill-current ml-1" />
                  </div>
                </div>

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cardona-burgundy text-white shadow-md">
                    {vid.tag}
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-md bg-black/80 text-cardona-gold text-xs font-bold flex items-center space-x-1">
                  <Youtube className="w-3.5 h-3.5 text-red-500" />
                  <span>YouTube</span>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-cardona-burgundy font-semibold uppercase tracking-wider block mb-1">
                    Canal {vid.channel}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-cardona-burgundyDark leading-snug group-hover:text-cardona-burgundyLight transition-colors mb-2">
                    {vid.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {vid.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <button
                    onClick={() => setActiveVideo(vid)}
                    className="inline-flex items-center space-x-2 text-sm font-bold text-cardona-burgundy hover:text-cardona-burgundyDark transition-colors"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>{lang === 'ca' ? 'Reproduir Vídeo' : lang === 'es' ? 'Reproducir Vídeo' : 'Play Video'}</span>
                  </button>

                  <a
                    href={vid.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-gray-500 hover:text-red-600 transition-colors"
                  >
                    <span>{lang === 'ca' ? 'Obrir a YouTube' : lang === 'es' ? 'Abrir en YouTube' : 'Open in YouTube'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Channel Link Footer */}
        <div className="mt-12 text-center">
          <a
            href="https://www.youtube.com/@BalldeGegants"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white hover:bg-gray-50 text-gray-700 hover:text-red-600 border border-gray-200 shadow-sm hover:shadow-md transition-all text-sm font-semibold"
          >
            <Youtube className="w-5 h-5 text-red-600" />
            <span>
              {lang === 'ca' ? 'Més vídeos a YouTube (Ball de Gegants)' : lang === 'es' ? 'Más vídeos en YouTube (Ball de Gegants)' : 'More videos on YouTube (Ball de Gegants)'}
            </span>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </a>
        </div>

      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-cardona-burgundyDark rounded-2xl overflow-hidden shadow-2xl border border-cardona-gold/40"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 hover:bg-black text-white hover:text-cardona-gold transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative pt-[56.25%] bg-black">
              <iframe
                src={activeVideo.embedUrl}
                title={activeVideo.title}
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-5 bg-cardona-burgundyDark text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-cardona-gold uppercase tracking-widest block mb-1">
                  {activeVideo.tag} · {activeVideo.channel}
                </span>
                <h4 className="font-serif text-lg sm:text-xl font-bold">
                  {activeVideo.title}
                </h4>
              </div>

              <a
                href={activeVideo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors shrink-0"
              >
                <Youtube className="w-4 h-4" />
                <span>YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
