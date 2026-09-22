import React, { useState, useEffect } from 'react';
import { eventsData } from '../data/events';
import { Calendar, Clock, MapPin, Sparkles, Filter, ChevronRight, Users2, Mail, CalendarPlus, CheckCircle2, RefreshCw, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { downloadIcsFile, openGoogleCalendar } from '../utils/calendar';
import { loadCalendarEvents } from '../services/calendarService';
import { CALENDAR_CONFIG } from '../config/calendarConfig';

export default function EventsCalendar() {
  const { t, loc, lang } = useLanguage();
  const [events, setEvents] = useState(eventsData);
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('cards');
  const [isLive, setIsLive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    loadCalendarEvents()
      .then((res) => {
        if (isMounted) {
          setEvents(res.events);
          setIsLive(res.isLive);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filters = [
    { id: 'all', label: t('calendar', 'filterAll') },
    { id: 'festa-major', label: t('calendar', 'filterMajor') },
    { id: 'trobades', label: t('calendar', 'filterTrobades') },
    { id: 'sortides', label: t('calendar', 'filterSortides') },
  ];

  const filteredEvents = activeFilter === 'all'
    ? events
    : events.filter(e => e.category === activeFilter);

  return (
    <section id="calendari" className="py-24 bg-cardona-sand relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
            <span className="text-xs font-bold tracking-widest uppercase text-cardona-burgundy inline-block">
              {t('calendar', 'tag')}
            </span>
            {isLive ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {t('calendar', 'liveSyncBadge')}
              </span>
            ) : null}
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-cardona-burgundyDark mb-4">
            {t('calendar', 'title')}
          </h2>
          <div className="w-20 h-1 bg-cardona-gold mx-auto mb-6 rounded-full" />
          <p className="text-gray-600 text-base sm:text-lg mb-6">
            {t('calendar', 'subtitle')}
          </p>

          {/* Subscribe to Google Calendar button */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3">
            <a
              href={CALENDAR_CONFIG.subscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-cardona-gold/15 text-cardona-burgundy border border-cardona-gold/40 text-xs font-bold shadow-xs hover:shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer"
              title={t('calendar', 'collaCalendarDesc')}
            >
              <Calendar className="w-4 h-4 text-cardona-gold" />
              <span>{t('calendar', 'subscribeCollaCal')}</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>
        </div>

        {/* Big Festa Major Banner */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-cardona-burgundy to-cardona-burgundyDark text-white shadow-xl border border-cardona-gold/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3">
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
            {/* Quick Calendar Export Buttons */}
            <div className="pt-2 flex flex-wrap gap-2.5">
              <button
                onClick={() => downloadIcsFile({
                  title: loc({ ca: 'Festa Major de Cardona 2026', es: 'Fiesta Mayor de Cardona 2026', en: 'Cardona Major Festival 2026' }),
                  description: loc({ ca: 'Ball de Gegants a la plaça, cercavila i tradició festiva.', es: 'Baile de Gigantes en la plaza, pasacalles y tradición festiva.', en: 'Giant dances in the town square and festive parade.' }),
                  location: 'Cardona (Bages, Catalunya)',
                  startDate: '20260912T100000Z',
                  endDate: '20260915T220000Z'
                })}
                className="px-4 py-2 rounded-xl bg-cardona-gold hover:bg-cardona-goldLight text-cardona-burgundyDark font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <CalendarPlus className="w-3.5 h-3.5" />
                <span>{t('calendar', 'bannerCalBtn')} (.ics)</span>
              </button>
              <button
                onClick={() => openGoogleCalendar({
                  title: loc({ ca: 'Festa Major de Cardona 2026', es: 'Fiesta Mayor de Cardona 2026', en: 'Cardona Major Festival 2026' }),
                  description: loc({ ca: 'Ball de Gegants a la plaça, cercavila i tradició festiva.', es: 'Baile de Gigantes en la plaza, pasacalles y tradición festiva.', en: 'Giant dances in the town square and festive parade.' }),
                  location: 'Cardona (Bages, Catalunya)',
                  startDate: '20260912T100000Z',
                  endDate: '20260915T220000Z'
                })}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-cardona-gold" />
                <span>{t('calendar', 'googleCal')} ↗</span>
              </button>
            </div>
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

        {/* View Mode Switcher: Targetes vs Google Calendar en Viu */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 px-2">
          <button
            onClick={() => setViewMode('cards')}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
              viewMode === 'cards'
                ? 'bg-cardona-burgundy text-cardona-goldLight shadow-md scale-105 ring-2 ring-cardona-gold/40'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {t('calendar', 'viewCards') || 'Targetes d\'Actuacions'}
          </button>
          <button
            onClick={() => setViewMode('googleCalendar')}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
              viewMode === 'googleCalendar'
                ? 'bg-cardona-burgundy text-cardona-goldLight shadow-md scale-105 ring-2 ring-cardona-gold/40'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Calendar className="w-4 h-4 text-cardona-gold" />
            <span>{t('calendar', 'viewGoogleCal') || 'Google Calendar en Viu'}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </button>
        </div>

        {viewMode === 'googleCalendar' ? (
          /* Official Google Calendar Live Embed */
          <div className="max-w-5xl mx-auto mb-16 animate-fadeIn w-full max-w-full">
            <div className="p-4 sm:p-5 bg-gradient-to-r from-cardona-burgundy to-cardona-burgundyDark text-white rounded-t-2xl sm:rounded-t-3xl border border-cardona-gold/30 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2.5 rounded-xl bg-cardona-gold/20 text-cardona-goldLight shrink-0">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-cardona-gold" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-serif font-bold text-sm sm:text-lg text-cardona-goldLight truncate">
                      {CALENDAR_CONFIG.calendarName}
                    </h4>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      LIVE
                    </span>
                  </div>
                  <p className="text-xs text-amber-200/80 truncate">
                    {t('calendar', 'collaCalendarDesc')}
                  </p>
                </div>
              </div>

              <a
                href={CALENDAR_CONFIG.subscribeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 sm:px-5 py-2 rounded-full bg-cardona-gold hover:bg-cardona-goldLight text-cardona-burgundyDark font-bold text-xs transition-all shadow-md active:scale-95 flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <span>{t('calendar', 'subscribeCollaCal')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="relative w-full rounded-b-2xl sm:rounded-b-3xl overflow-hidden bg-white shadow-2xl border-x border-b border-cardona-gold/30 h-[500px] sm:h-[640px]">
              <iframe
                src={`https://calendar.google.com/calendar/embed?src=${encodeURIComponent(CALENDAR_CONFIG.calendarId)}&ctz=Europe%2FMadrid&hl=${lang === 'en' ? 'en' : lang === 'es' ? 'es' : 'ca'}&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=0`}
                style={{ border: 0 }}
                className="w-full h-full"
                frameBorder="0"
                scrolling="no"
                title="Google Calendar - Sortides Gegants Cardona"
              />
            </div>
          </div>
        ) : (
          /* Cards View */
          <>
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

                  {/* Event Calendar Export Action */}
                  <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between gap-2">
                    <button
                      onClick={() => downloadIcsFile({
                        title: loc(evt.title),
                        description: loc(evt.description),
                        location: loc(evt.location),
                        startDate: evt.startDate || '20260912T100000Z',
                        endDate: evt.endDate || '20260912T200000Z'
                      })}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-cardona-burgundy hover:text-cardona-burgundyDark transition-colors active:scale-95 cursor-pointer"
                      title={t('calendar', 'appleCal')}
                    >
                      <CalendarPlus className="w-3.5 h-3.5 text-cardona-gold" />
                      <span>{t('calendar', 'addToCalendar')}</span>
                    </button>
                    <button
                      onClick={() => openGoogleCalendar({
                        title: loc(evt.title),
                        description: loc(evt.description),
                        location: loc(evt.location),
                        startDate: evt.startDate || '20260912T100000Z',
                        endDate: evt.endDate || '20260912T200000Z'
                      })}
                      className="text-[11px] text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                    >
                      Google Cal ↗
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Google Calendar sync status footer */}
            <div className="mt-2 mb-14 text-center px-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/80 border border-cardona-gold/30 text-xs text-gray-600 shadow-2xs max-w-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span className="truncate">{t('calendar', 'adminNotice')}:</span>
                <span className="font-semibold text-cardona-burgundy truncate">
                  {CALENDAR_CONFIG.calendarName}
                </span>
              </div>
            </div>
          </>
        )}

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
