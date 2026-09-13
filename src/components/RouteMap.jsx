import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Users, Landmark, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function RouteMap() {
  const { t, loc } = useLanguage();
  const [activeStop, setActiveStop] = useState(0);

  const stops = [
    {
      id: 0,
      name: {
        ca: 'Plaça de la Fira',
        es: 'Plaza de la Fira',
        en: 'Fira Square'
      },
      title: {
        ca: 'Plantada de Gegants i Inici de Festa',
        es: 'Plantada de Gigantes e Inicio de Fiesta',
        en: 'Gathering of Giants & Festival Opening'
      },
      time: {
        ca: '11:00 h',
        es: '11:00 h',
        en: '11:00 AM'
      },
      figures: {
        ca: 'Totes les figures de Cardona i colles convidades',
        es: 'Todas las figuras de Cardona y cuadrillas invitadas',
        en: 'All Cardona figures and visiting troupes'
      },
      description: {
        ca: 'Punt neuràlgic on s\'apleguen els gegants de tots els barris per a la tradicional plantada. Els més petits poden veure de prop els vestits, les corones i saludar els nans.',
        es: 'Punto neurálgico donde se reúnen los gigantes de todos los barrios para la tradicional plantada. Los más pequeños pueden admirar de cerca los trajes, las coronas y saludar a los cabezudos.',
        en: 'The bustling hub where giants from all neighborhoods gather for the traditional exhibition. Children can marvel up close at the costumes, crowns, and greet the dwarf heads.'
      },
      image: './images/romeu.jpg',
      coords: { x: '25%', y: '65%' }
    },
    {
      id: 1,
      name: {
        ca: 'Carrer Major',
        es: 'Calle Mayor',
        en: 'Carrer Major (Main St)'
      },
      title: {
        ca: 'Cercavila Medieval i Pasdoble',
        es: 'Pasacalles Medieval y Pasodoble',
        en: 'Medieval Parade and Traditional Pasodoble'
      },
      time: {
        ca: '12:00 h',
        es: '12:00 h',
        en: '12:00 PM'
      },
      figures: {
        ca: 'Borrell II, Letgarda i Nans trapelles',
        es: 'Borrell II, Letgarda y Cabezudos traviesos',
        en: 'Borrell II, Letgarda and playful Dwarfs'
      },
      description: {
        ca: 'L\'estretor dels carrers medievals fa ressonar les gralles com en cap altre lloc. Els gegants giren amb precisió arran dels balcons engalanats amb senyeres.',
        es: 'La estrechez de las calles medievales hace resonar las dulzainas como en ningún otro lugar. Los gigantes giran con precisión al ras de los balcones engalanados con banderas.',
        en: 'The narrow medieval streets amplify the traditional woodwinds like nowhere else. The giant figures twirl with precision beneath balconies draped in festive flags.'
      },
      image: './images/borrell.jpg',
      coords: { x: '42%', y: '50%' }
    },
    {
      id: 2,
      name: {
        ca: 'Plaça del Mercat',
        es: 'Plaza del Mercado',
        en: 'Market Square'
      },
      title: {
        ca: 'Ball Solemne dels Gegants Centenaris',
        es: 'Baile Solemne de los Gigantes Centenarios',
        en: 'Solemn Dance of the Centenary Giants'
      },
      time: {
        ca: '13:00 h',
        es: '13:00 h',
        en: '1:00 PM'
      },
      figures: {
        ca: 'Borrell II i Letgarda (Barri Major)',
        es: 'Borrell II y Letgarda (Barrio Mayor)',
        en: 'Borrell II & Letgarda (Barri Major)'
      },
      description: {
        ca: 'L\'escenari més emblemàtic per al Ball Pla. Sota els porxos gòtics, les figures centenàries de 1834 ofereixen la seva dansa protocol·lària davant les autoritats i el poble.',
        es: 'El escenario más emblemático para el Ball Pla. Bajo los pórticos góticos, las figuras centenarias de 1834 ofrecen su danza protocolaria ante las autoridades y el pueblo.',
        en: 'The most iconic venue for the historic Ball Pla. Beneath Gothic arcades, the 1834 centenary figures perform their ceremonial courtly dance before town authorities and crowds.'
      },
      image: './images/nans-mercat.jpg',
      coords: { x: '58%', y: '40%' }
    },
    {
      id: 3,
      name: {
        ca: 'Plaça de Bous / Correbous',
        es: 'Plaza de Toros / Correbous',
        en: 'Bullring Square'
      },
      title: {
        ca: 'La Gran Ballada Col·lectiva',
        es: 'El Gran Baile Colectivo',
        en: 'The Grand Collective Dance'
      },
      time: {
        ca: '18:00 h',
        es: '18:00 h',
        en: '6:00 PM'
      },
      figures: {
        ca: 'Tots els Gegants, Grallers i Colles convidades',
        es: 'Todos los Gigantes, Músicos y Cuadrillas invitadas',
        en: 'All Giants, Traditional Musicians, and Guest Troupes'
      },
      description: {
        ca: 'Durant la Festa Major, la plaça es transforma per acollir la festa major cardonina. Els gegants fan una rotllana espectacular on ballen alhora amb tota la plaça plena de gom a gom.',
        es: 'Durante la Fiesta Mayor, la plaza se transforma para acoger la fiesta cardonina. Los gigantes forman un corro espectacular donde bailan al unísono con toda la plaza abarrotada.',
        en: 'During the Major Festival, the square transforms into the festival arena. The giant figures dance together in a massive circular formation amidst packed cheers.'
      },
      image: './images/correbous.jpg',
      coords: { x: '72%', y: '60%' }
    },
    {
      id: 4,
      name: {
        ca: 'Castell de Cardona & Torre de la Minyona',
        es: 'Castillo de Cardona y Torre de la Minyona',
        en: 'Cardona Castle & Minyona Tower'
      },
      title: {
        ca: 'Dansa Llegentària sota els Estels',
        es: 'Danza Legendaria bajo las Estrellas',
        en: 'Legendary Dance Beneath the Stars'
      },
      time: {
        ca: '21:30 h (Actes especials)',
        es: '21:30 h (Actos especiales)',
        en: '9:30 PM (Special Events)'
      },
      figures: {
        ca: 'Abdal·là i Adalés (Barri Nou)',
        es: 'Abdal·là y Adalés (Barrio Nuevo)',
        en: 'Abdal·là & Adalés (Barri Nou)'
      },
      description: {
        ca: 'Pujada històrica a la fortalesa inexpugnable. Als peus de la Torre de la Minyona, es recrea l\'amor medieval immortalitzat per les figures del Barri Nou amb focs i música.',
        es: 'Subida histórica a la fortaleza inexpugnable. A los pies de la Torre de la Minyona, se recrea el amor medieval inmortalizado por las figuras del Barrio Nuevo con fuegos y música.',
        en: 'Historic ascent to the impregnable citadel. At the foot of the Minyona Tower, the medieval romance immortalized by the Barri Nou giants is celebrated with fireworks and music.'
      },
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
              <span>{t('map', 'itineraryBadge')}</span>
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
                      {loc(stop.name)}
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
                  {i + 1}. {loc(st.name)}
                </button>
              ))}
            </div>
          </div>

          {/* Active Stop Card */}
          <div className="lg:col-span-5 bg-cardona-burgundyDark text-white rounded-3xl overflow-hidden shadow-2xl border border-cardona-gold/30">
            <div className="relative h-48 overflow-hidden">
              <img
                src={current.image}
                alt={loc(current.name)}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cardona-burgundyDark via-black/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cardona-gold text-cardona-burgundyDark shadow">
                  {t('map', 'stop')} {activeStop + 1} {t('quiz', 'of')} {stops.length}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-cardona-goldLight mb-1">
                  {loc(current.name)}
                </h3>
                <p className="text-xs font-medium text-amber-200/80">
                  {loc(current.title)}
                </p>
              </div>

              <div className="flex items-center gap-4 py-2.5 px-3.5 rounded-xl bg-white/10 border border-white/10 text-xs">
                <div className="flex items-center gap-1.5 text-cardona-gold">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>{loc(current.time)}</span>
                </div>
                <div className="h-3 w-px bg-white/20" />
                <div className="flex items-center gap-1.5 text-amber-100/90 truncate">
                  <Users className="w-4 h-4 text-cardona-gold shrink-0" />
                  <span className="truncate">{loc(current.figures)}</span>
                </div>
              </div>

              <p className="text-sm text-amber-100/90 leading-relaxed font-light">
                {loc(current.description)}
              </p>

              <div className="pt-2 flex justify-between items-center">
                <button
                  onClick={() => setActiveStop((activeStop + 1) % stops.length)}
                  className="w-full py-3 rounded-xl bg-cardona-gold hover:bg-cardona-goldLight text-cardona-burgundyDark font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow"
                >
                  <span>{t('map', 'nextStop')}</span>
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
