import React from 'react';
import { Shield, Heart, ArrowUp, Instagram } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-cardona-burgundyDark text-white pt-16 pb-28 lg:pb-12 border-t-2 border-cardona-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Slogan */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-12 flex items-center justify-center shrink-0 drop-shadow-md">
                <img
                  src="./images/escut-cardona.png"
                  alt="Escut de Cardona"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-serif font-bold text-xl text-cardona-goldLight tracking-wider">
                GEGANTS DE CARDONA
              </span>
            </div>
            <p className="text-amber-100/80 text-sm max-w-md leading-relaxed">
              {t('footer', 'description')}
            </p>
            <div className="pt-2 text-xs text-cardona-gold">
              {t('footer', 'slogan')}
            </div>
          </div>

          {/* Col 2: Enllaços ràpids */}
          <div>
            <h4 className="font-serif font-bold text-cardona-goldLight text-sm uppercase tracking-wider mb-4">
              {t('footer', 'navTitle')}
            </h4>
            <ul className="space-y-2 text-sm text-amber-100/80">
              <li><a href="#inici" className="hover:text-cardona-gold transition-colors">{t('nav', 'inici')}</a></li>
              <li><a href="#figures" className="hover:text-cardona-gold transition-colors">{t('nav', 'figures')}</a></li>
              <li><a href="#videos" className="hover:text-cardona-gold transition-colors">{t('nav', 'videos')}</a></li>
              <li><a href="#botiga" className="hover:text-cardona-gold transition-colors">{t('nav', 'botiga')}</a></li>
              <li><a href="#calendari" className="hover:text-cardona-gold transition-colors">{t('nav', 'calendari')}</a></li>
              <li><a href="#musica" className="hover:text-cardona-gold transition-colors">{t('nav', 'musica')}</a></li>
              <li><a href="#grallers" className="hover:text-cardona-gold transition-colors">{t('nav', 'grallers')}</a></li>
              <li><a href="#historia" className="hover:text-cardona-gold transition-colors">{t('nav', 'historia')}</a></li>
              <li><a href="#recorregut" className="hover:text-cardona-gold transition-colors">{t('nav', 'recorregut')}</a></li>
              <li><a href="#quiz" className="hover:text-cardona-gold transition-colors">{t('nav', 'quiz')}</a></li>
              <li><a href="#galeria" className="hover:text-cardona-gold transition-colors">{t('nav', 'galeria')}</a></li>
              <li><a href="#contacte" className="hover:text-cardona-gold transition-colors">{t('nav', 'contacte')}</a></li>
            </ul>
          </div>

          {/* Col 3: Enllaços d'interès */}
          <div>
            <h4 className="font-serif font-bold text-cardona-goldLight text-sm uppercase tracking-wider mb-4">
              {t('footer', 'linksTitle')}
            </h4>
            <ul className="space-y-2 text-sm text-amber-100/80">
              <li>
                <a href="https://www.cardona.cat" target="_blank" rel="noopener noreferrer" className="hover:text-cardona-gold transition-colors">
                  {t('footer', 'ajuntament')}
                </a>
              </li>
              <li>
                <a href="https://gegants.cat" target="_blank" rel="noopener noreferrer" className="hover:text-cardona-gold transition-colors">
                  {t('footer', 'agrupacio')}
                </a>
              </li>
              <li>
                <a href="https://cardonaturisme.cat/" target="_blank" rel="noopener noreferrer" className="hover:text-cardona-gold transition-colors">
                  {t('footer', 'turisme')}
                </a>
              </li>
              <li>
                <a href="https://open.spotify.com/intl-es/album/6W9HqagD6qrbTnailiDLJw" target="_blank" rel="noopener noreferrer" className="text-[#1ed760] hover:text-white flex items-center gap-1.5 transition-colors font-medium">
                  <span>{t('footer', 'spotifyLink')}</span>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/gegantscardona" target="_blank" rel="noopener noreferrer" className="text-[#e1306c] hover:text-white flex items-center gap-1.5 transition-colors font-medium">
                  <Instagram className="w-4 h-4 text-[#e1306c]" />
                  <span>{t('footer', 'instagramLink')}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-cardona-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-amber-200/60">
          <div className="flex items-center gap-1">
            <span>{t('footer', 'madeWith')}</span>
            <Heart className="w-3.5 h-3.5 text-cardona-gold fill-cardona-gold inline" />
          </div>

          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} {t('footer', 'rights')}</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/10 hover:bg-cardona-gold hover:text-cardona-burgundyDark text-white transition-colors"
              title={t('footer', 'backToTop')}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
