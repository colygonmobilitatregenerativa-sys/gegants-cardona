import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const galleryPhotos = [
  {
    id: 1,
    title: {
      ca: 'El Comte Borrell II davant el Castell de Cardona',
      es: 'El Conde Borrell II ante el Castillo de Cardona',
      en: 'Count Borrell II before Cardona Castle'
    },
    category: {
      ca: 'Centenaris',
      es: 'Centenarios',
      en: 'Centenary Giants'
    },
    image: './images/borrell.jpg',
    description: {
      ca: 'La imponent figura comtal del Barri Major amb la medalla de Cardona al pit.',
      es: 'La imponente figura condal del Barrio Mayor con la medalla de Cardona al pecho.',
      en: 'The imposing ducal figure of Barri Major bearing the Cardona medal on his chest.'
    }
  },
  {
    id: 2,
    title: {
      ca: 'El Gegant Batallador al peu de la fortalesa',
      es: 'El Gigante Batallador al pie de la fortaleza',
      en: 'The Batallador Giant at the foot of the fortress'
    },
    category: {
      ca: 'Sant Miquel',
      es: 'San Miguel',
      en: 'Sant Miquel'
    },
    image: './images/batallador.jpg',
    imagePosition: 'center 55%',
    description: {
      ca: 'El guerrer de Sant Miquel sostenint la destral cerimonial amb el Castell al fons.',
      es: 'El guerrero de Sant Miquel sosteniendo el hacha ceremonial con el Castillo al fondo.',
      en: 'The Sant Miquel warrior holding his ceremonial battleaxe with the Castle behind.'
    }
  },
  {
    id: 3,
    title: {
      ca: 'Els Nans del Mercat: Minga i Agneta',
      es: 'Los Cabezudos del Mercado: Minga y Agneta',
      en: 'Market Dwarfs: Minga & Agneta'
    },
    category: {
      ca: 'Barri del Mercat',
      es: 'Barrio del Mercado',
      en: 'Market Quarter'
    },
    image: './images/nans-mercat.jpg',
    description: {
      ca: 'Els nans bicentenaris més antics de Cardona conservats com a patrimoni històric.',
      es: 'Los cabezudos bicentenarios más antiguos de Cardona preservados como patrimonio histórico.',
      en: 'The oldest bicentennial dwarf figures in Cardona preserved as living cultural heritage.'
    }
  },
  {
    id: 4,
    title: {
      ca: 'La Geganta Esperança a la Festa Major',
      es: 'La Giganta Esperança en la Fiesta Mayor',
      en: 'The Esperança Giantess at the Major Festival'
    },
    category: {
      ca: 'Sant Miquel',
      es: 'San Miguel',
      en: 'Sant Miquel'
    },
    image: './images/esperanca.jpg',
    imagePosition: 'center 48%',
    description: {
      ca: 'La senyora de Sant Miquel amb el ram de flors i els domassos del Patrocini de fons.',
      es: 'La dama de Sant Miquel con el ramo de flores y los reposteros festivos de fondo.',
      en: 'The noble lady of Sant Miquel holding her bouquet against festive festival tapestries.'
    }
  },
  {
    id: 5,
    title: {
      ca: 'El Gegant Romeu pel centre històric',
      es: 'El Gigante Romeu por el casco antiguo',
      en: 'The Romeu Giant through the historic center'
    },
    category: {
      ca: 'La Fira (1908)',
      es: 'La Fira (1908)',
      en: 'La Fira (1908)'
    },
    image: './images/romeu.jpg',
    description: {
      ca: 'La segona figura més antiga de Cardona lluint l\'escut del card al pit pels carrers de la vila.',
      es: 'La segunda figura más antigua de Cardona luciendo el escudo del cardo en el pecho por las calles de la villa.',
      en: 'The second oldest figure of Cardona bearing the thistle crest through town streets.'
    }
  },
  {
    id: 6,
    title: {
      ca: 'La Geganta Julieta del Barri de la Fira',
      es: 'La Giganta Julieta del Barrio de la Fira',
      en: 'The Julieta Giantess of the Fira Quarter'
    },
    category: {
      ca: 'La Fira (1908)',
      es: 'La Fira (1908)',
      en: 'La Fira (1908)'
    },
    image: './images/julieta.jpg',
    imagePosition: 'center 12%',
    description: {
      ca: 'Figura centenària de 1908 amb el vestit senyorial de vellut carmesí, tela adamascada i el ram de flors silvestres.',
      es: 'Figura centenaria de 1908 con el vestido señorial de terciopelo carmesí, tela adamascada y el ramo de flores silvestres.',
      en: 'Centenary giantess from 1908 in crimson velvet gown, damask jacquard, holding her bouquet of wildflowers.'
    }
  },
  {
    id: 7,
    title: {
      ca: 'La Comtessa Letgarda davant la Fortalesa',
      es: 'La Condesa Letgarda ante la Fortaleza',
      en: 'Countess Letgarda before the Fortress'
    },
    category: {
      ca: 'Centenaris',
      es: 'Centenarios',
      en: 'Centenary Giants'
    },
    image: './images/letgarda.jpg',
    description: {
      ca: 'Elegància i sobirania medieval de la geganta del Barri Major de Cardona.',
      es: 'Elegancia y soberanía medieval de la giganta del Barrio Mayor de Cardona.',
      en: 'Medieval elegance and sovereignty of the Barri Major giantess of Cardona.'
    }
  },
  {
    id: 8,
    title: {
      ca: 'El Príncep Abdal·là (Gegants Nous del Barri Nou)',
      es: 'El Príncipe Abdal·là (Gigantes Nuevos del Barri Nou)',
      en: 'Prince Abdal·là (New Giants of Barri Nou)'
    },
    category: {
      ca: 'Barri Nou (2019)',
      es: 'Barrio Nuevo (2019)',
      en: 'Barri Nou (2019)'
    },
    image: './images/abdalla.jpg',
    imagePosition: 'center 8%',
    description: {
      ca: 'El noble guerrer sarraí de la llegenda de la Minyona en la figura nova creada el 2019 per Toni Mujal.',
      es: 'El noble guerrero sarraceno de la leyenda de la Minyona en la figura nueva creada en 2019 por Toni Mujal.',
      en: 'The noble Saracen knight of the Minyona legend depicted in the new 2019 figure by Toni Mujal.'
    }
  },
  {
    id: 9,
    title: {
      ca: 'La Geganta Adalés (Gegants Nous del Barri Nou)',
      es: 'La Giganta Adalés (Gigantes Nuevos del Barri Nou)',
      en: 'The Adalés Giantess (New Giants of Barri Nou)'
    },
    category: {
      ca: 'Barri Nou (2019)',
      es: 'Barrio Nuevo (2019)',
      en: 'Barri Nou (2019)'
    },
    image: './images/adales.jpg',
    imagePosition: 'center 8%',
    description: {
      ca: 'La donzella i Minyona de Cardona en la figura nova creada el 2019 per Toni Mujal amb trenes rosses i llibre.',
      es: 'La doncella y Minyona de Cardona en la figura nueva creada en 2019 por Toni Mujal con trenzas rubias y libro.',
      en: 'The maiden and Minyona of Cardona depicted in the new 2019 figure by Toni Mujal with blonde braids and book.'
    }
  },
  {
    id: 10,
    title: {
      ca: 'El Dimoni del Raval de Cardona',
      es: 'El Dimoni del Raval de Cardona',
      en: 'The Dimoni of the Raval of Cardona'
    },
    category: {
      ca: 'El Raval (2009)',
      es: 'El Raval (2009)',
      en: 'El Raval (2009)'
    },
    image: './images/dimoni-raval.jpg',
    imagePosition: 'center 10%',
    description: {
      ca: 'La singular figura del barri del Raval de Sant Joan amb el trident argentat, capa de vellut i ulleres característiques.',
      es: 'La singular figura del barrio del Raval de San Juan con el tridente plateado, capa de terciopelo y gafas características.',
      en: 'The distinctive figure of the Raval de Sant Joan quarter with silver trident, velvet cape, and spectacles.'
    }
  },
  {
    id: 11,
    title: {
      ca: 'La Plaça de Bous i el Correbous de Cardona',
      es: 'La Plaza de Toros y el Correbous de Cardona',
      en: 'Bullring Square & the Cardona Correbous'
    },
    category: {
      ca: 'Festa Major',
      es: 'Fiesta Mayor',
      en: 'Major Festival'
    },
    image: './images/correbous.jpg',
    description: {
      ca: 'La tradicional plaça amb les baranes de fusta i l\'ambient festiu de gom a gom durant la Festa Major.',
      es: 'La tradicional plaza con los tablados de madera y el vibrante ambiente festivo durante la Fiesta Mayor.',
      en: 'The historic square with wooden railings packed with spectators during Cardona’s Major Festival.'
    }
  },
  {
    id: 12,
    title: {
      ca: 'Els Gegants de la Coromina: Joan de Serrallonga i Margarida',
      es: 'Los Gigantes de la Coromina: Joan de Serrallonga y Margarida',
      en: 'The Giants of La Coromina: Joan de Serrallonga & Margarida'
    },
    category: {
      ca: 'La Coromina (1970)',
      es: 'La Coromina (1970)',
      en: 'La Coromina (1970)'
    },
    image: './images/gegants-coromina.jpg',
    imagePosition: 'center 10%',
    description: {
      ca: 'La parella de gegants del barri miner de la Coromina, creats per Manel Casserres l\'any 1969 i batejats amb els noms del cèlebre bandoler català i la seva muller.',
      es: 'La pareja de gigantes del barrio minero de la Coromina, creados por Manel Casserres en 1969 y bautizados con los nombres del célebre bandolero catalán y su esposa.',
      en: 'The giant couple of the mining quarter of La Coromina, created by Manel Casserres in 1969 depicting the celebrated Catalan bandit and his wife.'
    }
  },
  {
    id: 13,
    title: {
      ca: 'El Sabater Fraret (Miquel Serra i Mosella)',
      es: 'El Sabater Fraret (Miquel Serra i Mosella)',
      en: 'The Sabater Fraret (Miquel Serra i Mosella)'
    },
    category: {
      ca: 'La Fira (1996)',
      es: 'La Fira (1996)',
      en: 'La Fira (1996)'
    },
    image: './images/sabater-fraret.jpg',
    imagePosition: 'center 12%',
    description: {
      ca: 'La figura que homenatja el sabater artesà que el 1908 va crear amb les seves mans els centenaris Romeu i Julieta de la Fira.',
      es: 'La figura que homenajea al zapatero artesano que en 1908 creó con sus manos los centenarios Romeu y Julieta de la Fira.',
      en: 'The figure honoring the craftsman shoemaker who in 1908 created by hand the centenary Romeu and Julieta of La Fira.'
    }
  },
  {
    id: 14,
    title: {
      ca: 'L\'Àliga de Cardona',
      es: 'El Águila de Cardona',
      en: 'The Eagle of Cardona'
    },
    category: {
      ca: 'Bestiari Històric (2013)',
      es: 'Bestiario Histórico (2013)',
      en: 'Historic Bestiary (2013)'
    },
    image: './images/aliga-cardona.jpg',
    imagePosition: 'center 15%',
    description: {
      ca: 'La màxima figura del bestiari festiu coronada d\'or i amb l\'escut esculpit en fusta autèntica del pi tricentenari del Rèvol.',
      es: 'La máxima figura del bestiario festivo coronada de oro y con el escudo esculpido en madera auténtica del pino tricentenario del Rèvol.',
      en: 'The supreme festive bestiary figure crowned in gold and bearing the crest carved from the 300-year-old Rèvol Pine.'
    }
  },
  {
    id: 15,
    title: {
      ca: 'El Príncep Abdal·là (Gegants Vells del Barri Nou)',
      es: 'El Príncipe Abdal·là (Gigantes Viejos del Barri Nou)',
      en: 'Prince Abdal·là (Historic Giants of Barri Nou)'
    },
    category: {
      ca: 'Barri Nou (1980)',
      es: 'Barrio Nuevo (1980)',
      en: 'Barri Nou (1980)'
    },
    image: './images/abdalla-vell.jpg',
    imagePosition: 'center 8%',
    description: {
      ca: 'La figura original de 1980 creada per Joan Orrit i Salvador Clotet abillada com a príncep sarraí amb turbant blanc i simitarra.',
      es: 'La figura original de 1980 creada por Joan Orrit y Salvador Clotet ataviada como príncipe sarraceno con turbante blanco y cimitarra.',
      en: 'The original 1980 figure created by Joan Orrit and Salvador Clotet dressed as the Saracen prince with white turban and scimitar.'
    }
  },
  {
    id: 16,
    title: {
      ca: 'La Geganta Adalés (Gegants Vells del Barri Nou)',
      es: 'La Giganta Adalés (Gigantes Viejos del Barri Nou)',
      en: 'The Adalés Giantess (Historic Giants of Barri Nou)'
    },
    category: {
      ca: 'Barri Nou (1980)',
      es: 'Barrio Nuevo (1980)',
      en: 'Barri Nou (1980)'
    },
    image: './images/adales-vella.jpg',
    imagePosition: 'center 8%',
    description: {
      ca: 'La dama noble i Minyona de Cardona original de 1980 amb el vestit verd menta de ras setinat, trenes brunes i ram de flors.',
      es: 'La dama noble y Minyona de Cardona original de 1980 con el vestido verde menta de raso satinado, trenzas morenas y ramo de flores.',
      en: 'The original 1980 noble lady and Minyona of Cardona with mint-green satin gown, brunette braids, and flower bouquet.'
    }
  }
];

export default function Gallery() {
  const { t, loc } = useLanguage();
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section id="galeria" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest uppercase text-cardona-burgundy inline-block mb-2">
            {t('gallery', 'tag')}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-cardona-burgundyDark mb-4">
            {t('gallery', 'title')}
          </h2>
          <div className="w-20 h-1 bg-cardona-gold mx-auto mb-6 rounded-full" />
          <p className="text-gray-600 text-base sm:text-lg">
            {t('gallery', 'subtitle')}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={photo.image}
                alt={loc(photo.title)}
                style={{ objectPosition: photo.imagePosition || 'center center' }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn className="w-5 h-5" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs font-semibold text-cardona-gold uppercase tracking-wider block mb-1">
                  {loc(photo.category)}
                </span>
                <h4 className="font-serif text-lg font-bold">
                  {loc(photo.title)}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-cardona-burgundyDark rounded-2xl overflow-hidden shadow-2xl border border-cardona-gold/40"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black text-white hover:text-cardona-gold transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative w-full max-h-[72vh] flex items-center justify-center bg-black/60 overflow-hidden">
              <img
                src={selectedPhoto.image}
                alt={loc(selectedPhoto.title)}
                className="max-h-[72vh] w-auto max-w-full object-contain mx-auto"
              />
            </div>

            <div className="p-6 text-white bg-cardona-burgundyDark">
              <span className="text-xs font-bold text-cardona-gold uppercase tracking-widest block mb-1">
                {loc(selectedPhoto.category)}
              </span>
              <h3 className="font-serif text-2xl font-bold mb-2">
                {loc(selectedPhoto.title)}
              </h3>
              <p className="text-sm text-amber-100/80">
                {loc(selectedPhoto.description)}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
