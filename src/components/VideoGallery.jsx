import React, { useState } from 'react';
import { Play, X, Film, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function VideoGallery() {
  const { t } = useLanguage();
  const [activeVideo, setActiveVideo] = useState(null);

  const videos = [
    {
      id: 1,
      title: 'Ballada Solemne de Gegants a la Plaça del Mercat',
      duration: '4:20',
      tag: 'Ball de Gala',
      thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1' // standard embed fallback
    },
    {
      id: 2,
      title: 'Cercavila de Festa Major pels carrers medievals',
      duration: '5:15',
      tag: 'Festa Major',
      thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
    },
    {
      id: 3,
      title: 'Dansa a la Torre de la Minyona del Castell',
      duration: '3:45',
      tag: 'Llegenda Viva',
      thumbnail: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videos.map((vid) => (
            <div
              key={vid.id}
              onClick={() => setActiveVideo(vid)}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-gray-100 flex flex-col"
            >
              <div className="relative h-60 overflow-hidden bg-black">
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-cardona-gold text-cardona-burgundyDark flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                </div>

                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cardona-burgundy text-white shadow">
                    {vid.tag}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/70 text-white text-xs font-bold">
                  {vid.duration}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <h3 className="font-serif text-lg font-bold text-cardona-burgundyDark leading-snug group-hover:text-cardona-burgundyLight transition-colors">
                  {vid.title}
                </h3>
                <span className="text-xs text-cardona-goldDark font-semibold uppercase tracking-wider mt-3 block">
                  Veure actuació en vídeo →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-cardona-gold/40"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 hover:bg-black text-white hover:text-cardona-gold transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative pt-[56.25%]">
              <iframe
                src={activeVideo.embedUrl}
                title={activeVideo.title}
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-5 bg-cardona-burgundyDark text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-cardona-gold uppercase tracking-widest block">
                  {activeVideo.tag}
                </span>
                <h4 className="font-serif text-xl font-bold">
                  {activeVideo.title}
                </h4>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
