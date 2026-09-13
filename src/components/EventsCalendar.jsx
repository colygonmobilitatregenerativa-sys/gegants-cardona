import React, { useState } from 'react';
import { eventsData } from '../data/events';
import { Calendar, Clock, MapPin, Sparkles, Filter, ChevronRight, Users2, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function EventsCalendar() {
  const { t, loc } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: t('calendar', 'filterAll') },
    { id: 'festa-major', label: t('calendar', 'filterMajor') },
    { id: 'trobades', label: t('calendar', 'filterTrobades') },
    { id: 'sortides', label: t('calendar', 'filterSortides') },
  ];

  const filteredEvents = activeFilter === 'all'
    ? eventsData
    : eventsData.filter(e => e.category === activeFilter);

  return (
    <section id="calendari" className="py-24 bg-cardona-sand relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest uppercase text-cardona-burgundy inline-block mb-2">
            {t('calendar', 'tag')}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-cardona-burgundyDark mb-4">
            {t('calendar', 'title')}
          </h2>
          <div className="w-20 h-1 bg-cardona-gold mx-auto mb-6 rounded-full" />
          <p className="text-gray-600 text-base sm:text-lg">
            {t('calendar', 'subtitle')}
          </p>
        </div>

        {/* Big Festa Major Banner */}
        <div className="mb-14 p-8 rounded-3xl bg-gradient-to-br from-cardona-burgundy to-cardona-burgundyDark text-white shadow-xl border border-cardona-gold/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cardona-gold text-cardona-burgundyDark shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              {t('calendar', 'bannerTag')}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-cardona-goldLight">
              {t('calendar', 'bannerTitle')}
            </h3>
            <p className="text-sm text-amber-100/90 max-w-xl">
              {t('calendar', 'bannerText')}
            </p>
          </div>
          <div className="shrink-0 text-center bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20">
            <span className="text-xs text-amber-200 uppercase tracking-widest block font-medium">
              {t('calendar', 'centralDays')}
            </span>
            <span className="font-serif text-3xl font-black text-cardona-gold block">12-15</span>
            <span className="text-xs text-white font-medium">
              {t('calendar', 'monthYear')}
            </span>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeFilter === f.id
                  ? 'bg-cardona-burgundy text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Events List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className={`p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border flex flex-col justify-between ${
                evt.highlight ? 'border-cardona-gold ring-1 ring-cardona-gold/50' : 'border-gray-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    evt.highlight 
                      ? 'bg-cardona-gold/20 text-cardona-goldDark'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {loc(evt.type)}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-cardona-burgundy">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{loc(evt.date)}</span>
                  </div>
                </div>

                <h4 className="font-serif text-xl font-bold text-cardona-burgundyDark mb-2">
                  {loc(evt.title)}
                </h4>

                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {loc(evt.description)}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cardona-goldDark" />
                  <span>{loc(evt.time)}</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium text-gray-700">
                  <MapPin className="w-3.5 h-3.5 text-cardona-burgundy" />
                  <span>{loc(evt.location)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Colla Exchange Callout Banner */}
        <div className="max-w-5xl mx-auto p-8 sm:p-10 rounded-3xl bg-white border-2 border-cardona-gold/50 shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-72 h-72 bg-cardona-gold/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="space-y-3 max-w-2xl relative z-10 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cardona-burgundy/10 text-cardona-burgundy border border-cardona-burgundy/20">
              <Users2 className="w-3.5 h-3.5 text-cardona-burgundy" />
              {t('calendar', 'collaBannerTag')}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-cardona-burgundyDark">
              {t('calendar', 'collaBannerTitle')}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-light">
              {t('calendar', 'collaBannerText')}
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <a
              href="#contacte"
              onClick={() => {
                window.dispatchEvent(new CustomEvent('setContactRole', { detail: { role: 'intercanvi' } }));
              }}
              className="px-7 py-4 rounded-full bg-cardona-burgundy hover:bg-cardona-burgundyDark text-cardona-goldLight font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
            >
              <Mail className="w-4 h-4 text-cardona-gold" />
              <span>{t('calendar', 'collaBannerBtn')}</span>
              <ChevronRight className="w-4 h-4 text-cardona-gold group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
