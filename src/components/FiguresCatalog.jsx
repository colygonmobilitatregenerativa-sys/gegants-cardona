import React, { useState } from 'react';
import { figuresData } from '../data/figures';
import FigureModal from './FigureModal';
import { Ruler, Scale, Eye, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function FiguresCatalog() {
  const { t, loc } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeFigure, setActiveFigure] = useState(null);

  const categories = [
    { id: 'all', label: t('catalog', 'filterAll') },
    { id: 'barri-major', label: t('catalog', 'filterMajor') },
    { id: 'barri-fira', label: t('catalog', 'filterFira') },
    { id: 'sant-miquel', label: t('catalog', 'filterSantMiquel') },
    { id: 'barri-nou', label: t('catalog', 'filterNou') },
    { id: 'barri-raval', label: t('catalog', 'filterRaval') },
    { id: 'barri-coromina', label: t('catalog', 'filterCoromina') },
    { id: 'capgrossos', label: t('catalog', 'filterCapgrossos') },
  ];

  const filteredFigures = selectedCategory === 'all'
    ? figuresData
    : figuresData.filter(fig => fig.category === selectedCategory);

  return (
    <section id="figures" className="py-24 bg-cardona-sand relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest uppercase text-cardona-burgundy inline-block mb-2">
            {t('catalog', 'tag')}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-cardona-burgundyDark mb-4">
            {t('catalog', 'title')}
          </h2>
          <div className="w-20 h-1 bg-cardona-gold mx-auto mb-6 rounded-full" />
          <p className="text-gray-600 text-base sm:text-lg">
            {t('catalog', 'subtitle')}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                selectedCategory === cat.id
                  ? 'bg-cardona-burgundy text-cardona-goldLight shadow-md scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 shadow-sm'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Figures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFigures.map((fig) => (
            <div
              key={fig.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 flex flex-col group"
            >
              {/* Image with overlay badge */}
              <div className="relative h-80 sm:h-84 overflow-hidden bg-cardona-burgundyDark">
                <img
                  src={fig.image}
                  alt={fig.name}
                  style={{ objectPosition: fig.imagePosition || 'center center' }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />
                
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cardona-gold text-cardona-burgundyDark backdrop-blur-sm shadow-md">
                    <Sparkles className="w-3 h-3" />
                    {loc(fig.badge)}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                  <span className="text-xs font-semibold tracking-wider text-cardona-gold uppercase block">
                    {loc(fig.categoryLabel)}
                  </span>
                  <h3 className="font-serif text-2xl font-bold leading-snug drop-shadow-sm">
                    {fig.name}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-medium text-amber-800 mb-3">
                    {loc(fig.subtitle)}
                  </p>
                  
                  {/* Quick specs pills */}
                  <div className="flex items-center gap-4 py-2 px-3 rounded-lg bg-gray-50 border border-gray-100 text-xs text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Ruler className="w-3.5 h-3.5 text-cardona-goldDark" />
                      <span>{fig.height}</span>
                    </div>
                    <div className="h-3 w-px bg-gray-300" />
                    <div className="flex items-center gap-1">
                      <Scale className="w-3.5 h-3.5 text-cardona-goldDark" />
                      <span>{fig.weight}</span>
                    </div>
                    <div className="h-3 w-px bg-gray-300" />
                    <div className="truncate">
                      <span>{loc(fig.year).split(' ')[0]}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-6">
                    {loc(fig.description)}
                  </p>
                </div>

                <button
                  onClick={() => setActiveFigure(fig)}
                  className="w-full py-3 px-4 rounded-xl bg-cardona-burgundy/10 hover:bg-cardona-burgundy text-cardona-burgundy hover:text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 group-hover:bg-cardona-burgundy group-hover:text-white shadow-sm"
                >
                  <Eye className="w-4 h-4" />
                  <span>{t('catalog', 'viewDetails')}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Figure Details */}
      {activeFigure && (
        <FigureModal
          figure={activeFigure}
          onClose={() => setActiveFigure(null)}
        />
      )}
    </section>
  );
}
