import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Calendar, Users, History, Image as ImageIcon, HeartHandshake, Music, Navigation, ShoppingBag, HelpCircle, Film, Globe, Drum } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav', 'inici'), href: '#inici', icon: Shield },
    { name: t('nav', 'figures'), href: '#figures', icon: Users },
    { name: t('nav', 'videos'), href: '#videos', icon: Film },
    { name: t('nav', 'botiga'), href: '#botiga', icon: ShoppingBag },
    { name: t('nav', 'calendari'), href: '#calendari', icon: Calendar },
    { name: t('nav', 'musica'), href: '#musica', icon: Music },
    { name: t('nav', 'grallers'), href: '#grallers', icon: Drum },
    { name: t('nav', 'historia'), href: '#historia', icon: History },
    { name: t('nav', 'recorregut'), href: '#recorregut', icon: Navigation },
    { name: t('nav', 'quiz'), href: '#quiz', icon: HelpCircle },
    { name: t('nav', 'galeria'), href: '#galeria', icon: ImageIcon },
  ];

  const languages = [
    { code: 'ca', label: 'CA' },
    { code: 'es', label: 'ES' },
    { code: 'en', label: 'EN' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-cardona-burgundy/95 backdrop-blur-md shadow-lg py-2.5 text-white' 
        : 'bg-gradient-to-b from-cardona-burgundyDark/95 to-transparent py-4 text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#inici" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="w-8 h-10 sm:w-9 sm:h-12 flex items-center justify-center transform group-hover:scale-110 transition-transform shrink-0 drop-shadow-md">
              <img
                src="./images/escut-cardona.png"
                alt="Escut de Cardona"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-serif font-bold text-base sm:text-lg tracking-wider text-cardona-goldLight block leading-tight">
                GEGANTS DE CARDONA
              </span>
              <span className="text-[10px] sm:text-xs text-amber-200/80 tracking-widest uppercase block font-sans">
                Vila Comtal · 1834
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden xl:flex items-center gap-4 text-xs font-medium text-amber-100">
            {navLinks.slice(0, 8).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-cardona-gold transition-colors py-1 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cardona-gold transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Right Controls: Language Selector + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-black/25 p-1 rounded-full border border-cardona-gold/30">
              <Globe className="w-3.5 h-3.5 text-cardona-gold ml-1.5 mr-0.5" />
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                    lang === l.code
                      ? 'bg-cardona-gold text-cardona-burgundyDark shadow-sm'
                      : 'text-amber-100 hover:text-white'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <a
              href="#contacte"
              className="px-4 py-2 rounded-full text-xs uppercase font-bold tracking-wider bg-cardona-gold hover:bg-cardona-goldDark text-cardona-burgundyDark hover:text-white transition-all shadow-md transform hover:-translate-y-0.5"
            >
              {t('nav', 'joinBtn')}
            </a>
          </div>

          {/* Mobile menu and lang toggle */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Mobile Lang switcher */}
            <div className="flex items-center bg-black/30 px-2 py-1 rounded-full border border-cardona-gold/30 text-[10px]">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`px-1.5 py-0.5 rounded font-bold ${
                    lang === l.code ? 'bg-cardona-gold text-cardona-burgundyDark' : 'text-white'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-amber-100 hover:text-white hover:bg-cardona-burgundyLight/50 focus:outline-none"
              aria-label="Menú principal"
            >
              {isOpen ? <X className="w-6 h-6 text-cardona-gold" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-cardona-burgundyDark/95 border-b border-cardona-burgundyLight shadow-2xl px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto animate-fadeIn">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-amber-100 hover:bg-cardona-burgundy hover:text-cardona-gold transition-colors"
                >
                  <Icon className="w-4 h-4 text-cardona-gold" />
                  {link.name}
                </a>
              );
            })}
            <a
              href="#contacte"
              onClick={() => setIsOpen(false)}
              className="mt-3 block text-center px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-cardona-gold text-cardona-burgundyDark hover:bg-white transition-all shadow-lg"
            >
              {t('nav', 'joinBtn')}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
