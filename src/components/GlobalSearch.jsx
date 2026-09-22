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
        title: {
          ca: 'Ball de Gegants de Cardona',
          es: 'Baile de Gigantes de Cardona',
          en: 'Cardona Giants Dance'
        },
        subtitle: {
          ca: 'Dansa de gala solemne a la plaça · Banda de Música de Cardona',
          es: 'Danza de gala solemne en la plaza · Banda de Música de Cardona',
          en: 'Solemn gala dance in the town square · Cardona Music Band'
        },
        badge: 'Spotify',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200',
        terms: ['ball de gegants', 'baile de gigantes', 'banda', 'spotify', 'ballada', 'solemne', 'musica', 'music']
      },
      {
        title: {
          ca: 'Ball Pla de Cardona',
          es: 'Ball Pla de Cardona',
          en: 'Ball Pla of Cardona'
        },
        subtitle: {
          ca: 'Dansa tradicional històrica del seguici geganter',
          es: 'Danza tradicional histórica del cortejo de gigantes',
          en: 'Historic traditional dance of the giant cortege'
        },
        badge: 'Spotify',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200',
        terms: ['ball pla', 'dansa', 'danza', 'compassos', 'coreografia', 'tradicio', 'musica', 'dance']
      },
      {
        title: {
          ca: 'Pasdoble dels Gegants de la Fira',
          es: 'Pasodoble de los Gigantes de la Fira',
          en: 'Fira Giants Pasodoble'
        },
        subtitle: {
          ca: 'Melodia alegre de Romeu i Julieta pels carrers',
          es: 'Melodía alegre de Romeu y Julieta por las calles',
          en: 'Joyous melody of Romeu & Julieta through town streets'
        },
        badge: 'Spotify',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200',
        terms: ['pasdoble', 'pasodoble', 'fira', 'romeu', 'julieta', 'cercavila', 'pasacalles']
      },
      {
        title: {
          ca: 'Ball de l\'Àliga de Cardona',
          es: 'Baile del Águila de Cardona',
          en: 'Cardona Eagle Dance'
        },
        subtitle: {
          ca: 'Dansa senyorial del bestiari històric al davant de les autoritats',
          es: 'Danza señorial del bestiario histórico ante las autoridades',
          en: 'Stately dance of the historic bestiary before civic authorities'
        },
        badge: 'Spotify',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200',
        terms: ['aliga', 'aguila', 'eagle', 'bestiari', 'bestiario', 'dansa senyorial', 'autoritats']
      },
      {
        title: {
          ca: 'Grallers i Tabalers de Cardona',
          es: 'Grallers y Tamborileros de Cardona',
          en: 'Cardona Traditional Pipers and Drummers'
        },
        subtitle: {
          ca: 'El so viu que acompanya els gegants a totes les places',
          es: 'El sonido vivo que acompaña a los gigantes en todas las plazas',
          en: 'The vibrant sound accompanying the giants across all town squares'
        },
        badge: t('nav', 'descGrallers') || 'Músics',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200',
        terms: ['grallers', 'gralla', 'tabal', 'tambor', 'drum', 'piper', 'percussio', 'musics', 'musicos', 'toc']
      }
    ];

    musicTracks.forEach((track, i) => {
      const titleStr = loc(track.title);
      const subStr = loc(track.subtitle);
      items.push({
        id: `music-${i}`,
        category: 'music',
        title: titleStr,
        subtitle: subStr,
        badge: track.badge,
        badgeColor: track.badgeColor,
        icon: Music,
        searchTerms: [titleStr, subStr, ...track.terms],
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
        title: {
          ca: 'Increïble Cercavila dels Gegants de Cardona (Festa Major 2025)',
          es: 'Increíble Pasacalles de los Gigantes de Cardona (Fiesta Mayor 2025)',
          en: 'Incredible Cardona Giants Parade (Major Festival 2025)'
        },
        subtitle: {
          ca: 'Vídeo en acció de tots els gegants, nans i el seguici popular',
          es: 'Vídeo en acción de todos los gigantes, cabezudos y el cortejo popular',
          en: 'Action video of all giants, dwarfs, and the festive procession'
        },
        terms: ['video', 'cercavila', 'pasacalles', 'parade', '2025', 'festa major', 'fiesta mayor', 'youtube']
      },
      {
        title: {
          ca: 'La Casa dels Gegants de Cardona - Secrets i construcció',
          es: 'La Casa de los Gigantes de Cardona - Secretos y construcción',
          en: 'The House of Cardona Giants - Secrets & Craftsmanship'
        },
        subtitle: {
          ca: 'Reportatge sobre com es van fer i es conserven les figures',
          es: 'Reportaje sobre cómo se hicieron y se conservan las figuras',
          en: 'Feature on how the giants were sculpted and preserved'
        },
        terms: ['casa dels gegants', 'reportatge', 'reportaje', 'taller', 'patrimoni', 'patrimonio', 'heritage', 'video']
      }
    ];

    videoItems.forEach((v, i) => {
      const titleStr = loc(v.title);
      const subStr = loc(v.subtitle);
      items.push({
        id: `video-${i}`,
        category: 'videos',
        title: titleStr,
        subtitle: subStr,
        badge: 'YouTube',
        badgeColor: 'bg-red-100 text-red-900 border-red-200',
        icon: Film,
        searchTerms: [titleStr, subStr, ...v.terms],
        action: () => scrollTo('#videos')
      });
    });

    // 7. Sections & Quick Navigation
    const sectionLinks = [
      { href: '#inici', title: t('nav', 'inici'), subtitle: { ca: 'Portada i presentació de la colla', es: 'Portada y presentación de la colla', en: 'Home and troupe presentation' } },
      { href: '#figures', title: t('nav', 'figures'), subtitle: { ca: 'Catàleg complet dels 8 barris', es: 'Catálogo completo de los 8 barrios', en: 'Complete catalog of the 8 quarters' } },
      { href: '#videos', title: t('nav', 'videos'), subtitle: { ca: 'Vídeos dels cercaviles i la festa', es: 'Vídeos de los pasacalles y la fiesta', en: 'Videos of parades and festivities' } },
      { href: '#botiga', title: t('nav', 'botiga'), subtitle: { ca: 'Samarretes, figures de goma, llibres i pins', es: 'Camisetas, figuras de goma, libros y pines', en: 'T-shirts, rubber figures, books and pins' } },
      { href: '#calendari', title: t('nav', 'calendari'), subtitle: { ca: 'Festa Major, dates i exportació a calendari', es: 'Fiesta Mayor, fechas y exportación a calendario', en: 'Major Festival, dates and calendar export' } },
      { href: '#musica', title: t('nav', 'musica'), subtitle: { ca: 'Àlbum oficial a Spotify i balls', es: 'Álbum oficial en Spotify y bailes', en: 'Official Spotify album and dances' } },
      { href: '#grallers', title: t('nav', 'grallers'), subtitle: { ca: 'La formació musical tradicional', es: 'La formación musical tradicional', en: 'The traditional music ensemble' } },
      { href: '#historia', title: t('nav', 'historia'), subtitle: { ca: 'Línia de temps des de 986 fins avui', es: 'Línea de tiempo desde 986 hasta hoy', en: 'Timeline from 986 to the present' } },
      { href: '#recorregut', title: t('nav', 'recorregut'), subtitle: { ca: 'Mapa interactiu del cercavila pel nucli antic', es: 'Mapa interactivo del pasacalles por el casco antiguo', en: 'Interactive parade route map through historic center' } },
      { href: '#quiz', title: t('nav', 'quiz'), subtitle: { ca: 'Test cultural de coneixements geganters', es: 'Test cultural de conocimientos giganteros', en: 'Cultural trivia quiz about Cardona giants' } },
      { href: '#galeria', title: t('nav', 'galeria'), subtitle: { ca: 'Recull fotogràfic històric', es: 'Colección fotográfica histórica', en: 'Historical photo gallery' } },
      { href: '#contacte', title: t('nav', 'contacte'), subtitle: { ca: 'Formulari per formar part de la colla', es: 'Formulario para unirse a la colla', en: 'Application form to join the troupe' } },
    ];

    sectionLinks.forEach((sec, i) => {
      const subStr = loc(sec.subtitle);
      items.push({
        id: `sec-${i}`,
        category: 'sections',
        title: sec.title,
        subtitle: subStr,
        badge: t('search', 'badgeSection') || 'Secció',
        badgeColor: 'bg-gray-100 text-gray-800 border-gray-200',
        icon: Navigation,
        searchTerms: [sec.title, subStr, 'seccio', 'seccion', 'section', 'menu'],
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

  const quickPills = useMemo(() => {
    if (lang === 'es') {
      return ['Borrell II', 'Adalés', 'Camiseta', 'Goma', 'Pines', 'Ball Pla', 'Fiesta Mayor', 'Toni Mujal', '1834'];
    }
    if (lang === 'en') {
      return ['Borrell II', 'Adalés', 'T-Shirt', 'Rubber Figures', 'Pins', 'Ball Pla', 'Major Festival', 'Toni Mujal', '1834'];
    }
    return ['Borrell II', 'Adalés', 'Samarreta', 'Goma', 'Pins', 'Ball Pla', 'Festa Major', 'Toni Mujal', '1834'];
  }, [lang]);

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
                title={t('search', 'clearText') || 'Esborrar text'}
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors ml-1"
              title={t('search', 'closeModal') || 'Tancar (Esc)'}
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
            {filteredResults.length} {filteredResults.length === 1 ? (t('search', 'singleItem') || 'element') : (t('search', 'multipleItems') || 'elements')}
          </span>
        </div>
      </div>
    </div>
  );
}
