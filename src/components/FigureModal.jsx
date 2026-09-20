import React, { useEffect, useState } from 'react';
import { X, Ruler, Scale, Calendar, User, Music, MapPin, Sparkles, Maximize2, Minimize2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function FigureModal({ figure, onClose }) {
  const { t, loc } = useLanguage();
  const [isFullView, setIsFullView] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!figure) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border border-cardona-gold/40 flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 p-2.5 rounded-full bg-black/60 hover:bg-black text-white hover:text-cardona-gold transition-all shadow-xl"
          aria-label={t('catalog', 'close') || 'Tancar'}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image side - Bounded height on mobile with smart framing and full-figure toggle */}
        <div className="relative w-full h-64 sm:h-80 md:h-auto md:w-5/12 shrink-0 bg-cardona-burgundyDark overflow-hidden flex items-center justify-center">
          <img
            src={figure.image}
            alt={figure.name}
            style={!isFullView ? { objectPosition: figure.imagePosition || 'center center' } : undefined}
            className={`w-full h-full transition-all duration-300 ${
              isFullView ? 'object-contain p-3' : 'object-cover'
            }`}
          />
          {!isFullView && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 md:bg-gradient-to-r md:from-transparent md:to-black/30 pointer-events-none" />
          )}
          
          {/* Badge */}
          <div className="absolute top-3.5 left-3.5 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cardona-gold text-cardona-burgundyDark shadow-md backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              {loc(figure.badge)}
            </span>
          </div>

          {/* Toggle full figure button */}
          <button
            onClick={() => setIsFullView(!isFullView)}
            className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-black/60 hover:bg-black text-white hover:text-cardona-gold text-[11px] font-medium backdrop-blur-sm shadow-md transition-all border border-white/20"
            title={isFullView ? 'Primer pla' : 'Veure figura sencera'}
          >
            {isFullView ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Zoom</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Figura sencera</span>
              </>
            )}
          </button>
        </div>

        {/* Details side - Scrollable and clearly readable */}
        <div className="flex-1 flex flex-col justify-between overflow-y-auto max-h-[calc(92vh-16rem)] md:max-h-[92vh] min-h-0 p-5 sm:p-7 md:p-8 bg-white">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-cardona-burgundy block mb-1">
              {loc(figure.categoryLabel)}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-cardona-burgundyDark mb-1">
              {figure.name}
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-amber-800 mb-5">
              {loc(figure.subtitle)}
            </p>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-2.5 mb-5 p-3.5 rounded-2xl bg-cardona-sand border border-cardona-stone text-xs text-gray-700">
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-cardona-goldDark shrink-0" />
                <span><strong>{t('catalog', 'height')}:</strong> {figure.height}</span>
              </div>
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-cardona-goldDark shrink-0" />
                <span><strong>{t('catalog', 'weight')}:</strong> {figure.weight}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cardona-goldDark shrink-0" />
                <span><strong>{t('catalog', 'year')}:</strong> {loc(figure.year)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cardona-goldDark shrink-0" />
                <span><strong>{t('catalog', 'location')}:</strong> {loc(figure.location)}</span>
              </div>
            </div>

            {/* Description & Details */}
            <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed mb-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-cardona-burgundyDark mb-1">
                  {t('catalog', 'historyTitle')}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {loc(figure.description)}
                </p>
              </div>
              
              <div className="pt-3 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cardona-burgundyDark mb-1">
                  {t('catalog', 'attireTitle')}
                </h4>
                <p className="text-gray-600 italic leading-relaxed">
                  {loc(figure.vestimenta)}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cardona-burgundyDark mb-1 flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5 text-cardona-goldDark shrink-0" />
                  <span>{t('catalog', 'musicTitle')}</span>
                </h4>
                <p className="text-gray-700 font-medium">
                  {loc(figure.ball)}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cardona-burgundyDark mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-cardona-goldDark shrink-0" />
                  <span>{t('catalog', 'sculptorTitle')}</span>
                </h4>
                <p className="text-gray-700">
                  {loc(figure.sculptor)}
                </p>
              </div>
            </div>
          </div>

          {/* Close button in footer */}
          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-cardona-burgundy hover:bg-cardona-burgundyDark text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
            >
              {t('catalog', 'close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
