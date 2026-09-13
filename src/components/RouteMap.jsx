import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Users, Landmark, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function RouteMap() {
  const { t } = useLanguage();
  const [activeStop, setActiveStop] = useState(0);

  const stops = [
    {
      id: 0,
      name: 'Plaça de la Fira',
      title: 'Plantada de Gegants i Inici de Festa',
      time: '11:00 h',
      figures: 'Totes les figures de Cardona i colles convidades',
      description: 'Punt neuràlgic on s\'apleguen els gegants de tots els barris per a la tradicional plantada. Els més petits poden veure de prop els vestits, les corones i saludar els nans.',
      image: './images/romeu.jpg',
      coords: { x: '25%', y: '65%' }
    },
    {
      id: 1,
      name: 'Carrer Major',
      title: 'Cercavila Medieval i Pasdoble',
      time: '12:00 h',
      figures: 'Borrell II, Letgarda i Nans trapelles',
      description: 'L\'estretor dels carrers medievals fa ressonar les gralles com en cap altre lloc. Els gegants giren amb precisió arran dels balcons engalanats amb senyeres.',
      image: './images/borrell.jpg',
      coords: { x: '42%', y: '50%' }
    },
    {
      id: 2,
      name: 'Plaça del Mercat',
      title: 'Ball Solemne dels Gegants Centenaris',
      time: '13:00 h',
      figures: 'Borrell II i Letgarda (Barri Major)',
      description: 'L\'escenari més emblemàtic per al Ball Pla. Sota els porxos gòtics, les figures centenàries de 1834 ofereixen la seva dansa protocol·lària davant les autoritats i el poble.',
      image: './images/nans-mercat.jpg',
      coords: { x: '58%', y: '40%' }
    },
    {
      id: 3,
      name: 'Plaça de Bous / Correbous',
      title: 'La Gran Ballada Col·lectiva',
      time: '18:00 h',
      figures: 'Tots els Gegants, Grallers i Colles convidades',
      description: 'Durant la Festa Major, la plaça es transforma per acollir la festa major cardonina. Els gegants fan una rotllana espectacular on ballen alhora amb tota la plaça plena de gom a gom.',
      image: './images/batallador.jpg',
      coords: { x: '72%', y: '60%' }
    },
    {
      id: 4,
      name: 'Castell de Cardona & Torre de la Minyona',
      title: 'Dansa Llegentària sota els Estels',
      time: '21:30 h (Actes especials)',
      figures: 'Abdal·là i Adalés (Barri Nou)',
      description: 'Pujada històrica a la fortalesa inexpugnable. Als peus de la Torre de la Minyona, es recrea l\'amor medieval immortalitzat per les figures del Barri Nou amb focs i música.',
      image: './images/adales.jpg',
      coords: { x: '88%', y: '25%' }
    }
  ];

  const current = stops[activeStop];

  return (
    <section id="recorregut" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-cardona-burgundy inline-block mb-2">
            {t('map', 'tag')}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-cardona-burgundyDark mb-4">
            {t('map', 'title')}
          </h2>
          <div className="w-20 h-1 bg-cardona-gold mx-auto mb-6 rounded-full" />
          <p className="text-gray-600 text-base sm:text-lg">
            {t('map', 'subtitle')}
          </p>
        </div>

        {/* Interactive Layout: Map representation on left / details on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Visual Route Canvas */}
          <div className="lg:col-span-7 bg-cardona-sand rounded-3xl p-6 sm:p-8 border-2 border-cardona-stone relative shadow-inner overflow-hidden min-h-[420px]">
            {/* Castle silhouette watermark */}
            <div className="absolute right-4 top-4 text-cardona-gold/15 pointer-events-none">
              <Landmark className="w-48 h-48" />
            </div>

            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-6 flex items-center gap-2">
              <Navigation className="w-4 h-4 text-cardona-burgundy" />
              <span>Itinerari oficial de la Vila Comtal</span>
            </div>

            {/* Path visualization */}
            <div className="relative h-72 sm:h-80 w-full rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/50 border border-amber-200/60 p-4">
              {/* Route connecting line SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path
                  d="M 25 65 Q 35 55 42 50 T 58 40 T 72 60 T 88 25"
                  fill="none"
                  stroke="#d4af37"
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                />
              </svg>

              {/* Stop Markers */}
              {stops.map((stop, idx) => {
                const isActive = activeStop === idx;
                return (
                  <button
                    key={stop.id}
                    onClick={() => setActiveStop(idx)}
                    style={{ left: stop.coords.x, top: stop.coords.y }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group transition-all duration-300 z-10`}
                  >
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs shadow-lg transition-transform ${
                      isActive
                        ? 'bg-cardona-burgundy text-cardona-goldLight ring-4 ring-cardona-gold scale-125'
                        : 'bg-white text-cardona-burgundyDark border-2 border-cardona-gold hover:scale-110'
                    }`}>
                      {idx + 1}
                    </div>
                    <span className={`mt-1.5 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-md shadow-sm whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-cardona-burgundy text-white'
                        : 'bg-white/90 text-gray-700 group-hover:bg-cardona-burgundy group-hover:text-white'
                    }`}>
                      {stop.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick switcher buttons below */}
            <div className="flex items-center justify-between gap-2 mt-4 pt-4 border-t border-cardona-stone overflow-x-auto">
              {stops.map((st, i) => (
                <button
                  key={st.id}
                  onClick={() => setActiveStop(i)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    activeStop === i
                      ? 'bg-cardona-burgundy text-cardona-goldLight'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {i + 1}. {st.name}
                </button>
              ))}
            </div>
          </div>

          {/* Active Stop Card */}
          <div className="lg:col-span-5 bg-cardona-burgundyDark text-white rounded-3xl overflow-hidden shadow-2xl border border-cardona-gold/30">
            <div className="relative h-48 overflow-hidden">
              <img
                src={current.image}
                alt={current.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cardona-burgundyDark via-black/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cardona-gold text-cardona-burgundyDark shadow">
                  {t('map', 'stop')} {activeStop + 1} de {stops.length}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-cardona-goldLight mb-1">
                  {current.name}
                </h3>
                <p className="text-xs font-medium text-amber-200/80">
                  {current.title}
                </p>
              </div>

              <div className="flex items-center gap-4 py-2.5 px-3.5 rounded-xl bg-white/10 border border-white/10 text-xs">
                <div className="flex items-center gap-1.5 text-cardona-gold">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>{current.time}</span>
                </div>
                <div className="h-3 w-px bg-white/20" />
                <div className="flex items-center gap-1.5 text-amber-100/90 truncate">
                  <Users className="w-4 h-4 text-cardona-gold shrink-0" />
                  <span className="truncate">{current.figures}</span>
                </div>
              </div>

              <p className="text-sm text-amber-100/90 leading-relaxed font-light">
                {current.description}
              </p>

              <div className="pt-2 flex justify-between items-center">
                <button
                  onClick={() => setActiveStop((activeStop + 1) % stops.length)}
                  className="w-full py-3 rounded-xl bg-cardona-gold hover:bg-cardona-goldLight text-cardona-burgundyDark font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow"
                >
                  <span>Següent Parada</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
