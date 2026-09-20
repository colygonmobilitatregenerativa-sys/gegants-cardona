import React from 'react';
import { ArrowRight, Sparkles, Calendar, Users, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="inici" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-cardona-burgundyDark text-white">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1920&q=80')`
        }}
      />
      {/* Decorative gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-cardona-burgundyDark via-cardona-burgundyDark/70 to-cardona-burgundyDark/85" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0,transparent_70%)]" />

      {/* Hero Content */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Escut Oficial de Cardona */}
        <div className="flex justify-center mb-6">
          <div className="relative group">
            {/* Ambient gold glow */}
            <div className="absolute -inset-3 bg-gradient-to-r from-cardona-gold/30 via-amber-400/40 to-cardona-gold/30 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Medalló heràldic */}
            <div 
              className="relative p-3 sm:p-3.5 rounded-3xl bg-cardona-burgundyDark/85 backdrop-blur-md border border-cardona-gold/40 shadow-[0_12px_36px_rgba(0,0,0,0.6)] transition-all duration-300 group-hover:scale-105 group-hover:border-cardona-gold flex items-center justify-center"
              title="Escut de Cardona: De gules, un card de tres flors d'or"
            >
              <img
                src="./escut-cardona.svg"
                alt="Escut Oficial de Cardona"
                className="w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
              />
            </div>
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cardona-gold/15 border border-cardona-gold/40 text-cardona-goldLight text-xs sm:text-sm font-medium mb-6 backdrop-blur-sm shadow-inner">
          <Sparkles className="w-4 h-4 text-cardona-gold animate-pulse" />
          <span>{t('hero', 'badge')}</span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          {t('hero', 'titlePrefix')} <br className="hidden sm:block" />
          <span className="gold-gradient-text drop-shadow-md">{t('hero', 'titleCity')}</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-amber-100/90 font-light mb-10 leading-relaxed">
          {t('hero', 'subtitle')}
        </p>

        {/* Call to actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#figures"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-cardona-gold hover:bg-cardona-goldLight text-cardona-burgundyDark font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl hover:shadow-cardona-gold/20 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
          >
            <span>{t('hero', 'btnFigures')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#calendari"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm uppercase tracking-wider border border-white/20 backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4 text-cardona-gold" />
            <span>{t('hero', 'btnCalendar')}</span>
          </a>
        </div>

        {/* Key Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-cardona-gold/20">
          <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5">
            <span className="block font-serif text-2xl sm:text-3xl font-bold text-cardona-gold">{t('hero', 'stat1Year')}</span>
            <span className="text-xs text-amber-200/80 uppercase tracking-wider">{t('hero', 'stat1Label')}</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5">
            <span className="block font-serif text-2xl sm:text-3xl font-bold text-cardona-gold">{t('hero', 'stat2Count')}</span>
            <span className="text-xs text-amber-200/80 uppercase tracking-wider">{t('hero', 'stat2Label')}</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5">
            <span className="block font-serif text-2xl sm:text-3xl font-bold text-cardona-gold">{t('hero', 'stat3Count')}</span>
            <span className="text-xs text-amber-200/80 uppercase tracking-wider">{t('hero', 'stat3Label')}</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5">
            <span className="block font-serif text-2xl sm:text-3xl font-bold text-cardona-gold">{t('hero', 'stat4Time')}</span>
            <span className="text-xs text-amber-200/80 uppercase tracking-wider">{t('hero', 'stat4Label')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
