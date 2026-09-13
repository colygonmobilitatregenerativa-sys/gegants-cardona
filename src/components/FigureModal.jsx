import React, { useEffect } from 'react';
import { X, Ruler, Scale, Calendar, User, Music, MapPin, Sparkles } from 'lucide-react';

export default function FigureModal({ figure, onClose }) {
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-cardona-gold/30 flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 hover:text-cardona-burgundy transition-all shadow-md"
          aria-label="Tancar fitxa"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image side */}
        <div className="md:w-5/12 relative min-h-[260px] md:min-h-full bg-cardona-burgundyDark">
          <img
            src={figure.image}
            alt={figure.name}
            className="w-full h-full object-cover object-center opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cardona-burgundyDark via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-white/10" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cardona-gold text-cardona-burgundyDark shadow-md">
              <Sparkles className="w-3 h-3" />
              {figure.badge}
            </span>
          </div>
        </div>

        {/* Details side */}
        <div className="md:w-7/12 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-cardona-burgundy mb-1">
              {figure.categoryLabel}
            </div>
            <h2 className="font-serif text-3xl font-extrabold text-cardona-burgundyDark mb-1">
              {figure.name}
            </h2>
            <p className="text-sm font-medium text-amber-800 mb-5">
              {figure.subtitle}
            </p>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-xl bg-cardona-sand border border-cardona-stone">
              <div className="flex items-center gap-2 text-xs text-gray-700">
                <Ruler className="w-4 h-4 text-cardona-goldDark shrink-0" />
                <span><strong>Alçada:</strong> {figure.height}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-700">
                <Scale className="w-4 h-4 text-cardona-goldDark shrink-0" />
                <span><strong>Pes:</strong> {figure.weight}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-700">
                <Calendar className="w-4 h-4 text-cardona-goldDark shrink-0" />
                <span><strong>Any:</strong> {figure.year}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-700">
                <MapPin className="w-4 h-4 text-cardona-goldDark shrink-0" />
                <span><strong>Lloc:</strong> {figure.location}</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3 text-sm text-gray-600 leading-relaxed mb-6">
              <p>{figure.description}</p>
              
              <div className="pt-2 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cardona-burgundyDark mb-1">
                  Vestimenta i Atributs:
                </h4>
                <p className="text-xs text-gray-600 italic">
                  {figure.vestimenta}
                </p>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cardona-burgundyDark mb-1 flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5 text-cardona-goldDark" />
                  Música i Ball propi:
                </h4>
                <p className="text-xs text-gray-700 font-medium">
                  {figure.ball}
                </p>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cardona-burgundyDark mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-cardona-goldDark" />
                  Mestre Escultor:
                </h4>
                <p className="text-xs text-gray-700">
                  {figure.sculptor}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-cardona-burgundy hover:bg-cardona-burgundyDark text-white text-xs font-bold uppercase tracking-wider transition-colors shadow"
            >
              Tancar Fitxa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
