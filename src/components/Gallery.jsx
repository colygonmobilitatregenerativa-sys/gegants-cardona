import React, { useState } from 'react';
import { X, ZoomIn, Camera } from 'lucide-react';

const galleryPhotos = [
  {
    id: 1,
    title: 'El Comte Borrell II davant el Castell de Cardona',
    category: 'Centenaris',
    image: './images/borrell.jpg',
    description: 'La imponent figura comtal del Barri Major amb la medalla de Cardona al pit.'
  },
  {
    id: 2,
    title: 'El Gegant Batallador al peu de la fortalesa',
    category: 'Sant Miquel',
    image: './images/batallador.jpg',
    description: 'El guerrer de Sant Miquel sostenint la destral cerimonial amb el Castell al fons.'
  },
  {
    id: 3,
    title: 'Els Nans del Mercat: Minga i Agneta',
    category: 'Barri del Mercat',
    image: './images/nans-mercat.jpg',
    description: 'Els nans bicentenaris més antics de Cardona conservats com a patrimoni històric.'
  },
  {
    id: 4,
    title: 'La Geganta Esperança a la Festa Major',
    category: 'Sant Miquel',
    image: './images/esperanca.jpg',
    description: 'La senyora de Sant Miquel amb el ram de flors i els domassos del Patrocini de fons.'
  },
  {
    id: 5,
    title: 'El Gegant Romeu pel centre històric',
    category: 'La Fira (1908)',
    image: './images/romeu.jpg',
    description: 'La segona figura més antiga de Cardona lluint l\'escut del card al pit pels carrers de la vila.'
  },
  {
    id: 6,
    title: 'La Comtessa Letgarda davant la Fortalesa',
    category: 'Centenaris',
    image: './images/letgarda.jpg',
    description: 'Elegància i sobirania medieval de la geganta del Barri Major de Cardona.'
  },
  {
    id: 7,
    title: 'El Príncep Abdal·là davant el Castell',
    category: 'Barri Nou',
    image: './images/abdalla.jpg',
    description: 'El noble guerrer sarraí de la llegenda de la Minyona amb la simitarra i l\'escut de la mitja lluna.'
  },
  {
    id: 8,
    title: 'La Geganta Adalés davant el Portal de Sant Miquel',
    category: 'Barri Nou',
    image: './images/adales.jpg',
    description: 'La noble dama del Barri Nou i Minyona de Cardona amb el vestit medieval verd maragda i el llibre a la mà.'
  }
];

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section id="galeria" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest uppercase text-cardona-burgundy inline-block mb-2">
            Moments Inoblidables
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-cardona-burgundyDark mb-4">
            Galeria d'Imatges
          </h2>
          <div className="w-20 h-1 bg-cardona-gold mx-auto mb-6 rounded-full" />
          <p className="text-gray-600 text-base sm:text-lg">
            Recull fotogràfic de les sortides, balls solemnes i la màgia dels gegants als carrers de Cardona.
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
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn className="w-5 h-5" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs font-semibold text-cardona-gold uppercase tracking-wider block mb-1">
                  {photo.category}
                </span>
                <h4 className="font-serif text-lg font-bold">
                  {photo.title}
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

            <img
              src={selectedPhoto.image}
              alt={selectedPhoto.title}
              className="w-full max-h-[70vh] object-cover"
            />

            <div className="p-6 text-white bg-cardona-burgundyDark">
              <span className="text-xs font-bold text-cardona-gold uppercase tracking-widest block mb-1">
                {selectedPhoto.category}
              </span>
              <h3 className="font-serif text-2xl font-bold mb-2">
                {selectedPhoto.title}
              </h3>
              <p className="text-sm text-amber-100/80">
                {selectedPhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
