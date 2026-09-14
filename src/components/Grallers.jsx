import React from 'react';
import { Drum, Music, Sparkles, BookOpen, ChevronRight, Volume2, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Grallers() {
  const { t } = useLanguage();

  const handleJoinMusicians = () => {
    window.dispatchEvent(new CustomEvent('setContactRole', { detail: { role: 'music' } }));
  };

  return (
    <section id="grallers" className="py-24 bg-white relative overflow-hidden">
      {/* Background ornamentation */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cardona-gold/5 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cardona-burgundy/5 rounded-full blur-3xl pointer-events-none -ml-32 -mb-32" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-cardona-burgundy inline-block mb-2">
            {t('grallers', 'tag')}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-cardona-burgundyDark mb-4">
            {t('grallers', 'title')}
          </h2>
          <div className="w-20 h-1 bg-cardona-gold mx-auto mb-6 rounded-full" />
          <p className="text-gray-600 text-base sm:text-lg">
            {t('grallers', 'subtitle')}
          </p>
        </div>

        {/* Featured History Intro Card */}
        <div className="mb-16 p-8 sm:p-10 rounded-3xl bg-cardona-sand border-2 border-cardona-stone shadow-md relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-cardona-burgundy text-cardona-gold flex items-center justify-center shrink-0 shadow-xl transform hover:rotate-3 transition-transform">
              <Drum className="w-10 h-10 sm:w-12 sm:h-12" />
            </div>

            <div className="flex-1 space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cardona-gold text-cardona-burgundyDark shadow-sm mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('grallers', 'badgeHistory')}</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-cardona-burgundyDark">
                {t('grallers', 'historyTitle')}
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-light">
                {t('grallers', 'historyDesc')}
              </p>
            </div>
          </div>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* Card 1: Instruments */}
          <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cardona-burgundy/10 text-cardona-burgundy flex items-center justify-center group-hover:bg-cardona-burgundy group-hover:text-cardona-gold transition-colors">
                <Volume2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold text-cardona-burgundy uppercase tracking-wider block mb-1">
                  {t('grallers', 'cardInstrumentsSubtitle')}
                </span>
                <h4 className="font-serif text-xl font-bold text-cardona-burgundyDark">
                  {t('grallers', 'cardInstrumentsTitle')}
                </h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                {t('grallers', 'cardInstrumentsDesc')}
              </p>
            </div>
          </div>

          {/* Card 2: Repertori */}
          <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cardona-gold/20 text-cardona-burgundyDark flex items-center justify-center group-hover:bg-cardona-gold group-hover:text-cardona-burgundyDark transition-colors">
                <Music className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider block mb-1">
                  {t('grallers', 'cardRepertoireSubtitle')}
                </span>
                <h4 className="font-serif text-xl font-bold text-cardona-burgundyDark">
                  {t('grallers', 'cardRepertoireTitle')}
                </h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                {t('grallers', 'cardRepertoireDesc')}
              </p>
            </div>
          </div>

          {/* Card 3: Escola i Assajos */}
          <div className="p-8 rounded-2xl bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cardona-burgundy/10 text-cardona-burgundy flex items-center justify-center group-hover:bg-cardona-burgundy group-hover:text-cardona-gold transition-colors">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold text-cardona-burgundy uppercase tracking-wider block mb-1">
                  {t('grallers', 'cardSchoolSubtitle')}
                </span>
                <h4 className="font-serif text-xl font-bold text-cardona-burgundyDark">
                  {t('grallers', 'cardSchoolTitle')}
                </h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed font-light">
                {t('grallers', 'cardSchoolDesc')}
              </p>
            </div>
          </div>

        </div>

        {/* Join as Musician CTA Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-cardona-burgundyDark via-cardona-burgundy to-cardona-burgundyDark text-white shadow-xl border border-cardona-gold/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h4 className="font-serif text-2xl sm:text-3xl font-extrabold text-cardona-goldLight">
              {t('grallers', 'ctaTitle')}
            </h4>
            <p className="text-sm text-amber-100/90 max-w-xl font-light">
              {t('grallers', 'ctaDesc')}
            </p>
          </div>

          <a
            href="#contacte"
            onClick={handleJoinMusicians}
            className="px-8 py-4 rounded-full bg-cardona-gold hover:bg-cardona-goldLight text-cardona-burgundyDark font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-xl hover:shadow-cardona-gold/30 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group shrink-0"
          >
            <Drum className="w-4 h-4" />
            <span>{t('grallers', 'ctaBtn')}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}
