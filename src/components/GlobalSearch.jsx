import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Search, 
  X, 
  Users, 
  ShoppingBag, 
  Music, 
  History, 
  Calendar, 
  Film, 
  Navigation, 
  Sparkles, 
  ArrowRight, 
  CornerDownLeft, 
  Ruler, 
  Scale, 
  ExternalLink 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { figuresData } from '../data/figures';
import { shopProducts } from '../data/shopProducts';
import { timelineData } from '../data/history';
import { eventsData } from '../data/events';

// Normalize string for accent-insensitive search
const normalize = (str) => {
  if (!str) return '';
  return str
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
};

export default function GlobalSearch() {
  const { t, loc, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K / '/' key)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modifier = isMac ? e.metaKey : e.ctrlKey;

      // Ctrl+K or Cmd+K
      if (modifier && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }

      // '/' shortcut when not focused on an input or textarea
      if (e.key === '/' && !isOpen) {
        const target = e.target;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          setIsOpen(true);
        }
      }

      // Escape to close
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-global-search', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-global-search', handleCustomOpen);
    };
  }, [isOpen]);

  // Focus input and lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = 'auto';
      setQuery('');
      setSelectedIndex(0);
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Smooth scroll helper
  const scrollTo = (selector) => {
    setIsOpen(false);
    setTimeout(() => {
      const target = document.querySelector(selector);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 120);
  };

  // Build the searchable dataset
  const allItems = useMemo(() => {
    const items = [];

    // 1. Figures
    figuresData.forEach((fig) => {
      items.push({
        id: `figure-${fig.id}`,
        category: 'figures',
        title: fig.name,
        subtitle: `${loc(fig.subtitle)} · ${loc(fig.categoryLabel)}`,
        badge: loc(fig.badge) || 'Figura',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-200',
        icon: Users,
        image: fig.image,
        searchTerms: [
          fig.name,
          loc(fig.subtitle),
          loc(fig.categoryLabel),
          loc(fig.year),
          loc(fig.sculptor),
          fig.height,
          fig.weight,
          loc(fig.ball),
          loc(fig.description),
          loc(fig.vestimenta)
        ],
        action: () => {
          setIsOpen(false);
          window.dispatchEvent(new CustomEvent('open-figure-modal', { detail: fig.id }));
        }
      });
    });

    // 2. Shop Products
    shopProducts.forEach((prod) => {
      items.push({
        id: `shop-${prod.id}`,
        category: 'shop',
        title: loc(prod.name),
        subtitle: `${prod.price.toFixed(2)} € · ${loc(prod.badge)}`,
        badge: `${prod.price.toFixed(2)} €`,
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-200',
        icon: ShoppingBag,
        image: prod.image,
        searchTerms: [
          loc(prod.name),
          loc(prod.description),
          loc(prod.badge),
          `${prod.price}€`,
          'botiga',
          'comprar',
          'samarreta',
          'pins',
          'goma'
        ],
        action: () => scrollTo('#botiga')
      });
    });

    // 3. Music & Spotify Tracks
    const musicTracks = [
      {
        title: 'Ball de Gegants de Cardona',
        subtitle: 'Dansa de gala solemne a la plaça · Banda de Música de Cardona',
        badge: 'Spotify',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200',
        terms: ['ball de gegants', 'banda', 'spotify', 'ballada', 'solemne', 'musica']
      },
      {
        title: 'Ball Pla de Cardona',
        subtitle: 'Dansa tradicional històrica del seguici geganter',
        badge: 'Spotify',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200',
        terms: ['ball pla', 'dansa', 'compassos', 'coreografia', 'tradicio', 'musica']
      },
      {
        title: 'Pasdoble dels Gegants de la Fira',
        subtitle: 'Melodia alegre de Romeu i Julieta pels carrers',
        badge: 'Spotify',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200',
        terms: ['pasdoble', 'fira', 'romeu', 'julieta', 'cercavila']
      },
      {
        title: 'Ball de l\'Àliga de Cardona',
        subtitle: 'Dansa senyorial del bestiari històric al davant de les autoritats',
        badge: 'Spotify',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200',
        terms: ['aliga', 'bestiari', 'dansa senyorial', 'autoritats']
      },
      {
        title: 'Grallers i Tabalers de Cardona',
        subtitle: 'El so viu que acompanya els gegants a totes les places',
        badge: 'Músics',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200',
        terms: ['grallers', 'gralla', 'tabal', 'percussio', 'musics', 'toc']
      }
    ];

    musicTracks.forEach((track, i) => {
      items.push({
        id: `music-${i}`,
        category: 'music',
        title: track.title,
        subtitle: track.subtitle,
        badge: track.badge,
        badgeColor: track.badgeColor,
        icon: Music,
        searchTerms: [track.title, track.subtitle, ...track.terms],
        action: () => scrollTo('#musica')
      });
    });

    // 4. History Milestones
    timelineData.forEach((h, i) => {
      items.push({
        id: `history-${i}`,
        category: 'history',
        title: `${h.year} · ${loc(h.title)}`,
        subtitle: `${loc(h.subtitle)} - ${loc(h.description)}`,
        badge: h.year,
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-200',
        icon: History,
        searchTerms: [
          h.year,
          loc(h.title),
          loc(h.subtitle),
          loc(h.description),
          'historia',
          'segle',
          'castell',
          'deogracies valls',
          'toni mujal',
          'llegenda'
        ],
        action: () => scrollTo('#historia')
      });
    });

    // 5. Events / Agenda
    eventsData.forEach((evt) => {
      items.push({
        id: `event-${evt.id}`,
        category: 'events',
        title: loc(evt.title),
        subtitle: `${loc(evt.date)} · ${loc(evt.location)}`,
        badge: loc(evt.type),
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-200',
        icon: Calendar,
        searchTerms: [
          loc(evt.title),
          loc(evt.date),
          loc(evt.location),
          loc(evt.description),
          loc(evt.type),
          'agenda',
          'calendari',
          'sortida',
          'festa major',
          'trobada'
        ],
        action: () => scrollTo('#calendari')
      });
    });

    // 6. Videos
    const videoItems = [
      {
        title: 'Increïble Cercavila dels Gegants de Cardona (Festa Major 2025)',
        subtitle: 'Vídeo en acció de tots els gegants, nans i el seguici popular',
        terms: ['video', 'cercavila', '2025', 'festa major', 'youtube']
      },
      {
        title: 'La Casa dels Gegants de Cardona - Secrets i construcció',
        subtitle: 'Reportatge sobre com es van fer i es conserven les figures',
        terms: ['casa dels gegants', 'reportatge', 'taller', 'patrimoni', 'video']
      }
    ];

    videoItems.forEach((v, i) => {
      items.push({
        id: `video-${i}`,
        category: 'videos',
        title: v.title,
        subtitle: v.subtitle,
        badge: 'YouTube',
        badgeColor: 'bg-red-100 text-red-900 border-red-200',
        icon: Film,
        searchTerms: [v.title, v.subtitle, ...v.terms],
        action: () => scrollTo('#videos')
      });
    });

    // 7. Sections & Quick Navigation
    const sectionLinks = [
      { href: '#inici', title: t('nav', 'inici'), subtitle: 'Portada i presentació de la colla' },
      { href: '#figures', title: t('nav', 'figures'), subtitle: 'Catàleg complet dels 8 barris' },
      { href: '#videos', title: t('nav', 'videos'), subtitle: 'Vídeos dels cercaviles i la festa' },
      { href: '#botiga', title: t('nav', 'botiga'), subtitle: 'Samarretes, figures de goma, llibres i pins' },
      { href: '#calendari', title: t('nav', 'calendari'), subtitle: 'Festa Major, dates i exportació a calendari' },
      { href: '#musica', title: t('nav', 'musica'), subtitle: 'Àlbum oficial a Spotify i balls' },
      { href: '#grallers', title: t('nav', 'grallers'), subtitle: 'La formació musical tradicional' },
      { href: '#historia', title: t('nav', 'historia'), subtitle: 'Línia de temps des de 986 fins avui' },
      { href: '#recorregut', title: t('nav', 'recorregut'), subtitle: 'Mapa interactiu del cercavila pel nucli antic' },
      { href: '#quiz', title: t('nav', 'quiz'), subtitle: 'Test cultural de coneixements geganters' },
      { href: '#galeria', title: t('nav', 'galeria'), subtitle: 'Recull fotogràfic històric' },
      { href: '#contacte', title: t('nav', 'contacte'), subtitle: 'Formulari per formar part de la colla' },
    ];

    sectionLinks.forEach((sec, i) => {
      items.push({
        id: `sec-${i}`,
        category: 'sections',
        title: sec.title,
        subtitle: sec.subtitle,
        badge: t('search', 'badgeSection') || 'Secció',
        badgeColor: 'bg-gray-100 text-gray-800 border-gray-200',
        icon: Navigation,
        searchTerms: [sec.title, sec.subtitle, 'seccio', 'anar a', 'menu'],
        action: () => scrollTo(sec.href)
      });
    });

    return items;
  }, [loc, lang, t]);

  // Filtering & Ranking Logic
  const filteredResults = useMemo(() => {
    const q = normalize(query);

    let candidates = allItems;
    if (activeFilter !== 'all') {
      candidates = candidates.filter((item) => item.category === activeFilter);
    }

    if (!q) {
      // Return top highlights / recommended if no search query
      return candidates.slice(0, 8);
    }

    const words = q.split(/\s+/).filter(Boolean);

    const scored = [];
    for (const item of candidates) {
      const normalizedTitle = normalize(item.title);
      const normalizedTerms = item.searchTerms.map(normalize).join(' ');

      let matchAll = true;
      let score = 0;

      for (const word of words) {
        if (normalizedTitle.includes(word)) {
          score += 10;
          if (normalizedTitle.startsWith(word)) score += 15;
        } else if (normalizedTerms.includes(word)) {
          score += 3;
        } else {
          matchAll = false;
          break;
        }
      }

      if (matchAll) {
        scored.push({ item, score });
      }
    }

    scored.sort((a, b) => b.score - a.score);
    return scored.map((s) => s.item).slice(0, 16);
  }, [allItems, query, activeFilter]);

  // Reset selected index on results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredResults]);

  // Keyboard navigation inside modal (ArrowDown / ArrowUp / Enter)
  const handleModalKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredResults.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        filteredResults[selectedIndex].action();
      }
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (resultsRef.current) {
      const activeEl = resultsRef.current.children[selectedIndex];
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  const filterTabs = [
    { id: 'all', label: t('search', 'filterAll') || 'Tot' },
    { id: 'figures', label: t('search', 'filterFigures') || 'Figures' },
    { id: 'shop', label: t('search', 'filterShop') || 'Botiga' },
    { id: 'music', label: t('search', 'filterMusic') || 'Música' },
    { id: 'history', label: t('search', 'filterHistory') || 'Història' },
    { id: 'events', label: t('search', 'filterEvents') || 'Agenda' },
    { id: 'videos', label: t('search', 'filterVideos') || 'Vídeos' },
    { id: 'sections', label: t('search', 'filterSections') || 'Seccions' }
  ];

  const quickPills = [
    'Borrell II',
    'Adalés',
    'Samarreta',
    'Goma',
    'Pins',
    'Ball Pla',
    'Festa Major',
    'Toni Mujal',
    '1834'
  ];

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 md:pt-20 bg-black/75 backdrop-blur-md animate-fadeIn"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-cardona-gold/30 overflow-hidden flex flex-col max-h-[88vh] transform transition-all duration-200"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleModalKeyDown}
      >
        {/* Header with Search Input */}
        <div className="p-4 sm:p-5 border-b border-gray-100 bg-gradient-to-r from-cardona-burgundy to-cardona-burgundyDark text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cardona-gold/20 text-cardona-goldLight shrink-0">
              <Search className="w-5 h-5" />
            </div>

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('search', 'placeholder') || 'Cerca figures, botiga, músiques, història, agenda...'}
              className="flex-1 bg-transparent text-white placeholder-amber-200/60 font-sans text-base sm:text-lg focus:outline-none"
            />

            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1.5 rounded-full hover:bg-white/15 text-amber-200 hover:text-white transition-colors"
                title="Esborrar text"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors ml-1"
              title="Tancar (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Category Pills */}
          <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-white/10 overflow-x-auto pb-1 no-scrollbar text-xs">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3 py-1 rounded-full whitespace-nowrap font-medium transition-all ${
                  activeFilter === tab.id
                    ? 'bg-cardona-gold text-cardona-burgundyDark font-bold shadow-sm'
                    : 'bg-white/10 hover:bg-white/20 text-amber-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Suggestion Pills when query is empty */}
        {!query && (
          <div className="px-4 py-2.5 bg-cardona-sand/60 border-b border-gray-100 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
            <span className="text-gray-500 font-medium whitespace-nowrap flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-cardona-goldDark" />
              {t('search', 'quickSuggestions') || 'Suggerits:'}
            </span>
            {quickPills.map((pill) => (
              <button
                key={pill}
                onClick={() => setQuery(pill)}
                className="px-2.5 py-0.5 rounded-full bg-white hover:bg-cardona-gold/20 text-gray-700 hover:text-cardona-burgundy border border-gray-200 transition-colors whitespace-nowrap text-[11px]"
              >
                {pill}
              </button>
            ))}
          </div>
        )}

        {/* Search Results List */}
        <div 
          ref={resultsRef}
          className="flex-1 overflow-y-auto p-2 sm:p-3 divide-y divide-gray-50"
        >
          {filteredResults.length > 0 ? (
            filteredResults.map((item, index) => {
              const isSelected = index === selectedIndex;
              const Icon = item.icon || Sparkles;

              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center gap-3.5 p-3 rounded-xl cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? 'bg-cardona-burgundy/10 border-l-4 border-cardona-burgundy pl-3 shadow-sm'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {/* Thumbnail or Icon */}
                  {item.image ? (
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0 shadow-sm">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  ) : (
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                      isSelected 
                        ? 'bg-cardona-burgundy text-cardona-gold' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4 className="font-serif font-bold text-gray-900 text-sm sm:text-base truncate">
                        {item.title}
                      </h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Action Arrow */}
                  <div className={`shrink-0 transition-transform ${isSelected ? 'translate-x-0.5 text-cardona-burgundy' : 'text-gray-300'}`}>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-gray-500">
              <Search className="w-10 h-10 mx-auto text-gray-300 mb-3" />
              <p className="font-semibold text-gray-700 mb-1">
                {t('search', 'noResults') || 'No s\'han trobat resultats per a'} «{query}»
              </p>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                {t('search', 'noResultsTip') || 'Prova amb altres paraules com «Borrell», «Samarreta», «Ball Pla» o «1834».'}
              </p>
            </div>
          )}
        </div>

        {/* Footer with shortcut hints */}
        <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100 text-[11px] text-gray-500 flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-gray-200 font-mono shadow-2xs">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-gray-200 font-mono shadow-2xs">↓</kbd>
              <span>{t('search', 'navigateHint') || 'Navegar'}</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-gray-200 font-mono shadow-2xs">↵</kbd>
              <span>{t('search', 'selectHint') || 'Seleccionar'}</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-gray-200 font-mono shadow-2xs">esc</kbd>
              <span>{t('search', 'closeHint') || 'Tancar'}</span>
            </span>
          </div>

          <span className="text-amber-800/80 font-medium">
            {filteredResults.length} {filteredResults.length === 1 ? 'element' : 'elements'}
          </span>
        </div>
      </div>
    </div>
  );
}
