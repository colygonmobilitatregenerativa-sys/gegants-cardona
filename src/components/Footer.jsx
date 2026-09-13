import React from 'react';
import { Shield, Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-cardona-burgundyDark text-white pt-16 pb-12 border-t-2 border-cardona-gold/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Slogan */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cardona-gold flex items-center justify-center text-cardona-burgundyDark font-serif font-black text-xl">
                GC
              </div>
              <span className="font-serif font-bold text-xl text-cardona-goldLight tracking-wider">
                GEGANTS DE CARDONA
              </span>
            </div>
            <p className="text-amber-100/80 text-sm max-w-md leading-relaxed">
              Associació i colla gegantera dedicada a la conservació, dansa i difusió de les figures històriques i centenàries de la Vila de Cardona (Bages, Catalunya).
            </p>
            <div className="pt-2 text-xs text-cardona-gold">
              «Que no pari el ball a la plaça!»
            </div>
          </div>

          {/* Col 2: Enllaços ràpids */}
          <div>
            <h4 className="font-serif font-bold text-cardona-goldLight text-sm uppercase tracking-wider mb-4">
              Navegació
            </h4>
            <ul className="space-y-2 text-sm text-amber-100/80">
              <li><a href="#inici" className="hover:text-cardona-gold transition-colors">Inici</a></li>
              <li><a href="#figures" className="hover:text-cardona-gold transition-colors">Catàleg de Figures</a></li>
              <li><a href="#historia" className="hover:text-cardona-gold transition-colors">Història i Torre de la Minyona</a></li>
              <li><a href="#calendari" className="hover:text-cardona-gold transition-colors">Festa Major i Calendari</a></li>
              <li><a href="#galeria" className="hover:text-cardona-gold transition-colors">Galeria Fotogràfica</a></li>
              <li><a href="#contacte" className="hover:text-cardona-gold transition-colors">Fes-te Geganer</a></li>
            </ul>
          </div>

          {/* Col 3: Enllaços d'interès */}
          <div>
            <h4 className="font-serif font-bold text-cardona-goldLight text-sm uppercase tracking-wider mb-4">
              Patrimoni i Vila
            </h4>
            <ul className="space-y-2 text-sm text-amber-100/80">
              <li>
                <a href="https://www.cardona.cat" target="_blank" rel="noopener noreferrer" className="hover:text-cardona-gold transition-colors">
                  Ajuntament de Cardona
                </a>
              </li>
              <li>
                <a href="https://gegants.cat" target="_blank" rel="noopener noreferrer" className="hover:text-cardona-gold transition-colors">
                  Agrupació de Colles Geganteres
                </a>
              </li>
              <li>
                <a href="https://cardonaturisme.com" target="_blank" rel="noopener noreferrer" className="hover:text-cardona-gold transition-colors">
                  Castell i Muntanya de Sal
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-cardona-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-amber-200/60">
          <div className="flex items-center gap-1">
            <span>Fet amb orgull per a la cultura popular de Cardona</span>
            <Heart className="w-3.5 h-3.5 text-cardona-gold fill-cardona-gold inline" />
          </div>

          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} Colla de Geganters de Cardona</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/10 hover:bg-cardona-gold hover:text-cardona-burgundyDark text-white transition-colors"
              title="Tornar a dalt"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
