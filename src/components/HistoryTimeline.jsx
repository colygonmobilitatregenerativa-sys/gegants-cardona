import React from 'react';
import { timelineData, minyonaLegend } from '../data/history';
import { Landmark, Crown, Heart, ScrollText, Sparkles, BookOpen, Quote } from 'lucide-react';

const iconMap = {
  castle: Landmark,
  crown: Crown,
  heart: Heart,
  scroll: ScrollText,
  sparkles: Sparkles
};

export default function HistoryTimeline() {
  return (
    <section id="historia" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-cardona-burgundy inline-block mb-2">
            Memòria Viva
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-cardona-burgundyDark mb-4">
            Història i Tradició
          </h2>
          <div className="w-20 h-1 bg-cardona-gold mx-auto mb-6 rounded-full" />
          <p className="text-gray-600 text-base sm:text-lg">
            La història dels gegants de Cardona està estretament lligada a la identitat comtal, al castell inexpugnable i a les llegendes que han passat de generació en generació.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mb-24 max-w-4xl mx-auto">
          {/* Center line */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -ml-px w-0.5 bg-cardona-gold/40" />

          <div className="space-y-12">
            {timelineData.map((item, index) => {
              const Icon = iconMap[item.icon] || Sparkles;
              const isEven = index % 2 === 0;

              return (
                <div 
                  key={item.year}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Badge in Center */}
                  <div className="md:absolute md:left-1/2 md:-ml-6 flex items-center justify-center w-12 h-12 rounded-full bg-cardona-burgundy border-4 border-cardona-goldLight text-cardona-gold z-10 shadow-lg mb-4 md:mb-0">
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Content Box */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                    <div className="bg-cardona-sand p-6 rounded-2xl border border-cardona-stone shadow-md hover:shadow-xl transition-shadow duration-300">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-black tracking-wider bg-cardona-gold text-cardona-burgundyDark mb-2">
                        Any {item.year}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-cardona-burgundyDark mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-3">
                        {item.subtitle}
                      </p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Featured Story Box: La Torre de la Minyona */}
        <div className="relative rounded-3xl overflow-hidden bg-cardona-burgundyDark text-white shadow-2xl border-2 border-cardona-gold/30">
          {/* Atmospheric background */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-luminosity"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=80')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cardona-burgundyDark via-cardona-burgundyDark/95 to-cardona-burgundyDark" />

          <div className="relative p-8 sm:p-12 lg:p-16 z-10 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 text-cardona-gold mb-4">
              <BookOpen className="w-6 h-6 text-cardona-gold animate-bounce" />
              <span className="text-xs font-bold uppercase tracking-widest text-cardona-goldLight">
                Llegenda Cardonina
              </span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-cardona-goldLight mb-2">
              {minyonaLegend.title}
            </h3>
            <p className="text-amber-200/90 text-sm font-medium mb-8 italic">
              {minyonaLegend.subtitle}
            </p>

            <div className="space-y-4 text-amber-100/90 text-sm sm:text-base leading-relaxed font-light">
              {minyonaLegend.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-cardona-gold/20 flex items-center gap-4">
              <Quote className="w-8 h-8 text-cardona-gold shrink-0 opacity-60" />
              <p className="text-xs sm:text-sm text-cardona-goldLight italic font-serif">
                «A cada ballada a la plaça, Abdal·là i Adalés retroben la llibertat que la torre els va negar.»
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
