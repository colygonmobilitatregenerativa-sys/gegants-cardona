import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Users, 
  ShoppingBag, 
  Calendar, 
  Grid, 
  X, 
  Music, 
  Drum, 
  History, 
  Navigation, 
  HelpCircle, 
  Image as ImageIcon, 
  Film, 
  HeartHandshake, 
  Instagram, 
  Globe,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

export default function MobileBottomNav() {
  const { lang, setLang, t } = useLanguage();
  const { totalItemsCount, setIsCartOpen } = useCart();
  const [activeSection, setActiveSection] = useState('inici');
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Monitor scroll to highlight active tab
  useEffect(() => {
    const sectionIds = ['inici', 'figures', 'botiga', 'calendari'];
    const handleScroll = () => {
      const scrollY = window.scrollY + 300;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when sheet is open
  useEffect(() => {
    if (isSheetOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isSheetOpen]);

  const languages = [
    { code: 'ca', label: 'Català' },
    { code: 'es', label: 'Castellano' },
    { code: 'en', label: 'English' },
  ];

  const moreSections = [
    { id: '#videos', label: t('nav', 'videos'), icon: Film, desc: 'En acció' },
    { id: '#musica', label: t('nav', 'musica'), icon: Music, desc: 'Spotify' },
    { id: '#grallers', label: t('nav', 'grallers'), icon: Drum, desc: 'Músics' },
    { id: '#historia', label: t('nav', 'historia'), icon: History, desc: 'Tradició' },
    { id: '#recorregut', label: t('nav', 'recorregut'), icon: Navigation, desc: 'Mapa' },
    { id: '#quiz', label: t('nav', 'quiz'), icon: HelpCircle, desc: 'Joc' },
    { id: '#galeria', label: t('nav', 'galeria'), icon: ImageIcon, desc: 'Fotos' },
    { id: '#contacte', label: t('nav', 'contacte'), icon: HeartHandshake, desc: 'Uneix-te' },
  ];

  const handleNavClick = (id) => {
    setIsSheetOpen(false);
    setActiveSection(id.replace('#', ''));
  };

  return (
    <>
      {/* Fixed Bottom Navigation Bar (Mobile & Tablet: visible up to lg breakpoint) */}
      <nav 
        className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-cardona-burgundyDark/95 backdrop-blur-xl border-t border-cardona-gold/30 shadow-[0_-8px_30px_rgba(0,0,0,0.6)] px-2 sm:px-6 py-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
        aria-label="Navegació inferior mòbil"
      >
        <div className="max-w-md mx-auto grid grid-cols-5 items-center justify-items-center">
          
          {/* 1. Inici */}
          <a
            href="#inici"
            onClick={() => handleNavClick('inici')}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all duration-200 active:scale-95 ${
              activeSection === 'inici'
                ? 'text-cardona-gold font-bold'
                : 'text-amber-100/70 hover:text-white'
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">{t('nav', 'inici')}</span>
            {activeSection === 'inici' && (
              <span className="w-1 h-1 rounded-full bg-cardona-gold mt-0.5 animate-pulse" />
            )}
          </a>

          {/* 2. Figures */}
          <a
            href="#figures"
            onClick={() => handleNavClick('figures')}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all duration-200 active:scale-95 ${
              activeSection === 'figures'
                ? 'text-cardona-gold font-bold'
                : 'text-amber-100/70 hover:text-white'
            }`}
          >
            <Users className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">{t('nav', 'figures')}</span>
            {activeSection === 'figures' && (
              <span className="w-1 h-1 rounded-full bg-cardona-gold mt-0.5 animate-pulse" />
            )}
          </a>

          {/* 3. Botiga (Featured Center Pill - Puntal bàsic) */}
          <a
            href="#botiga"
            onClick={() => {
              handleNavClick('botiga');
              if (totalItemsCount > 0) {
                setIsCartOpen(true);
              }
            }}
            className="flex flex-col items-center -top-3.5 relative group active:scale-95 transition-transform"
          >
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-cardona-burgundy via-cardona-burgundyDark to-amber-700 border-2 border-cardona-gold shadow-[0_6px_20px_rgba(0,0,0,0.6)] flex items-center justify-center text-cardona-gold group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5 drop-shadow" />
              {/* Subtle gold ring pulse */}
              <span className="absolute -inset-0.5 rounded-full border border-cardona-gold/40 animate-ping opacity-30" />
              {/* Live cart items counter badge */}
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-cardona-gold text-cardona-burgundyDark font-black text-[10px] shadow-md border border-cardona-burgundy animate-bounce leading-none">
                  {totalItemsCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-extrabold text-cardona-gold tracking-tight mt-0.5 drop-shadow">
              {t('nav', 'botiga')}
            </span>
          </a>

          {/* 4. Agenda / Calendari */}
          <a
            href="#calendari"
            onClick={() => handleNavClick('calendari')}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all duration-200 active:scale-95 ${
              activeSection === 'calendari'
                ? 'text-cardona-gold font-bold'
                : 'text-amber-100/70 hover:text-white'
            }`}
          >
            <Calendar className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">{t('nav', 'calendari')}</span>
            {activeSection === 'calendari' && (
              <span className="w-1 h-1 rounded-full bg-cardona-gold mt-0.5 animate-pulse" />
            )}
          </a>

          {/* 5. Més (Open Bottom Sheet Drawer) */}
          <button
            onClick={() => setIsSheetOpen(true)}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all duration-200 active:scale-95 ${
              isSheetOpen
                ? 'text-cardona-gold font-bold'
                : 'text-amber-100/70 hover:text-white'
            }`}
            aria-label={t('nav', 'mes')}
          >
            <Grid className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">{t('nav', 'mes')}</span>
          </button>

        </div>
      </nav>

      {/* Full "Més" App-like Bottom Sheet */}
      {isSheetOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fadeIn transition-opacity"
            onClick={() => setIsSheetOpen(false)}
          />

          {/* Bottom Sheet Drawer */}
          <div className="relative w-full bg-cardona-burgundyDark border-t-2 border-cardona-gold/40 rounded-t-[32px] shadow-[0_-15px_40px_rgba(0,0,0,0.8)] p-6 pb-10 max-h-[85vh] overflow-y-auto animate-slideUp z-10 text-white">
            
            {/* Drag handle */}
            <div className="w-12 h-1.5 bg-white/25 rounded-full mx-auto mb-5" />

            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <img
                  src="./images/escut-cardona.png"
                  alt="Escut de Cardona"
                  className="w-7 h-9 object-contain drop-shadow"
                />
                <div>
                  <h3 className="font-serif font-bold text-lg text-cardona-goldLight leading-tight">
                    {t('nav', 'menuTitle')}
                  </h3>
                  <p className="text-[11px] text-amber-200/70">
                    Gegants de Cardona · Vila Comtal
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsSheetOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Tancar menú"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Grid of Sections */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {moreSections.map((sec) => {
                const Icon = sec.icon;
                return (
                  <a
                    key={sec.id}
                    href={sec.id}
                    onClick={() => handleNavClick(sec.id)}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 hover:bg-cardona-burgundy/80 border border-white/10 hover:border-cardona-gold/40 transition-all active:scale-95 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-cardona-gold/15 border border-cardona-gold/30 flex items-center justify-center text-cardona-gold group-hover:scale-110 transition-transform shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white group-hover:text-cardona-gold transition-colors truncate">
                        {sec.label}
                      </div>
                      <div className="text-[10px] text-amber-200/60 uppercase tracking-wider truncate">
                        {sec.desc}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Language Switcher & Social */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              {/* Language Selector */}
              <div className="flex items-center justify-between bg-black/30 p-2 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2 pl-2">
                  <Globe className="w-4 h-4 text-cardona-gold" />
                  <span className="text-xs font-semibold text-amber-100">Idioma</span>
                </div>
                <div className="flex items-center gap-1">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => setLang(l.code)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                        lang === l.code
                          ? 'bg-cardona-gold text-cardona-burgundyDark shadow-sm'
                          : 'text-amber-100/70 hover:text-white'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Instagram direct shortcut */}
              <a
                href="https://www.instagram.com/gegantscardona"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsSheetOpen(false)}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#833ab4]/30 via-[#fd1d1d]/30 to-[#fcb045]/30 hover:from-[#833ab4]/50 hover:via-[#fd1d1d]/50 hover:to-[#fcb045]/50 border border-pink-500/30 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all"
              >
                <Instagram className="w-4 h-4 text-[#fd1d1d]" />
                <span>Instagram Oficial @gegantscardona</span>
              </a>

              {/* Join CTA */}
              <a
                href="#contacte"
                onClick={() => handleNavClick('#contacte')}
                className="w-full py-3.5 px-4 rounded-2xl bg-cardona-gold hover:bg-cardona-goldLight text-cardona-burgundyDark font-bold text-xs uppercase tracking-wider text-center block shadow-lg transition-all"
              >
                {t('nav', 'joinBtn')}
              </a>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
