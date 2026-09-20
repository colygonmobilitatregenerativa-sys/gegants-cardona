import React, { useState } from 'react';
import { ShoppingBag, Plus, Minus, Trash2, CheckCircle2, X, Sparkles, Heart, MessageCircle, Store, Truck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Telèfon de contacte directe per a comandes de marxandatge via WhatsApp (test actual: usuari)
const COLLA_WHATSAPP_PHONE = '34630037870';

export default function Shop() {
  const { t, loc } = useLanguage();
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [deliveryType, setDeliveryType] = useState('recollida');
  const [notes, setNotes] = useState('');

  const products = [
    {
      id: 1,
      name: {
        ca: 'Samarreta Oficial de la Colla',
        es: 'Camiseta Oficial de la Cuadrilla',
        en: 'Official T-Shirt of the Troupes'
      },
      price: 16.00,
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
      badge: {
        ca: '100% Cotó Orgànic',
        es: '100% Algodón Orgánico',
        en: '100% Organic Cotton'
      },
      description: {
        ca: 'Samarreta en color bordeus amb l\'emblema de Borrell II i Letgarda estampat al pit i la silueta del Castell a l\'esquena.',
        es: 'Camiseta en color burdeos con el emblema de Borrell II y Letgarda estampado en el pecho y la silueta del Castillo en la espalda.',
        en: 'Burgundy t-shirt featuring Borrell II and Letgarda crest on the chest and Cardona Castle silhouette on the back.'
      }
    },
    {
      id: 2,
      name: {
        ca: 'Figura de Goma: Borrell II (Centenari)',
        es: 'Figura de Goma: Borrell II (Centenario)',
        en: 'Rubber Figure: Borrell II (Centenary)'
      },
      price: 24.50,
      image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=600&q=80',
      badge: {
        ca: 'Col·leccionable',
        es: 'Coleccionable',
        en: 'Collectible'
      },
      description: {
        ca: 'Rèplica detallada en goma tova de 30 cm de la figura històrica del Barri Major. Ideal per a infants i col·leccionistes.',
        es: 'Réplica detallada en goma blanda de 30 cm de la figura histórica del Barrio Mayor. Ideal para niños y coleccionistas.',
        en: 'Detailed 30 cm soft rubber replica of the historic Barri Major figure. Perfect for children and collectors alike.'
      }
    },
    {
      id: 3,
      name: {
        ca: 'Figura de Goma: Adalés (Barri Nou)',
        es: 'Figura de Goma: Adalés (Barrio Nuevo)',
        en: 'Rubber Figure: Adalés (Barri Nou)'
      },
      price: 24.50,
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
      badge: {
        ca: 'Col·leccionable',
        es: 'Coleccionable',
        en: 'Collectible'
      },
      description: {
        ca: 'Reproducció oficial de la donzella de la Torre de la Minyona segons l\'escultura de Toni Mujal.',
        es: 'Reproducción oficial de la doncella de la Torre de la Minyona según la escultura de Toni Mujal.',
        en: 'Official miniature reproduction of the Minyona Tower maiden sculpted by Toni Mujal.'
      }
    },
    {
      id: 4,
      name: {
        ca: 'Mocador Tradicional de Festa Major',
        es: 'Pañuelo Tradicional de Fiesta Mayor',
        en: 'Traditional Major Festival Neckerchief'
      },
      price: 6.00,
      image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
      badge: {
        ca: 'Festa Popular',
        es: 'Fiesta Popular',
        en: 'Folk Festival'
      },
      description: {
        ca: 'Mocador triangular de quadres vermells i negres amb l\'escut brodat de la Colla de Geganters de Cardona.',
        es: 'Pañuelo triangular de cuadros rojos y negros con el escudo bordado de la Colla de Geganters de Cardona.',
        en: 'Triangular red-and-black checkered festival kerchief with embroidered Cardona Giants crest.'
      }
    },
    {
      id: 5,
      name: {
        ca: 'Llibre: "Història i Llegendes dels Gegants"',
        es: 'Libro: "Historia y Leyendas de los Gigantes"',
        en: 'Book: "History and Legends of the Giants"'
      },
      price: 18.00,
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      badge: {
        ca: 'Edició Il·lustrada',
        es: 'Edición Ilustrada',
        en: 'Illustrated Edition'
      },
      description: {
        ca: 'Monografia històrica sobre els 190 anys de tradició gegantera a Cardona, fotografies inèdites i partitures musicals.',
        es: 'Monografía histórica sobre los 190 años de tradición de gigantes en Cardona, fotografías inéditas y partituras musicales.',
        en: 'Historical monograph celebrating 190 years of giant folklore in Cardona, rare archive photos, and musical scores.'
      }
    },
    {
      id: 6,
      name: {
        ca: 'Pack 4 Pins Metàl·lics de les Figures',
        es: 'Pack 4 Pines Metálicos de las Figuras',
        en: '4-Pin Metal Collector Set'
      },
      price: 8.50,
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      badge: {
        ca: 'Pack 4 unitats',
        es: 'Pack 4 unidades',
        en: 'Pack of 4'
      },
      description: {
        ca: 'Pins esmaltats de Borrell II, Letgarda, Abdal·là i Adalés per lluir a la solapa o a la motxilla.',
        es: 'Pines esmaltados de Borrell II, Letgarda, Abdal·là y Adalés para lucir en la solapa o mochila.',
        en: 'Enamel pins of Borrell II, Letgarda, Abdal·là, and Adalés for your lapel or backpack.'
      }
    }
  ];

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const itemsList = cart.map(it => `• ${it.qty}x ${loc(it.name)} (${(it.price * it.qty).toFixed(2)} €)`).join('\n');
    const deliveryLabel = deliveryType === 'recollida'
      ? t('shop', 'deliveryPickup')
      : t('shop', 'deliveryShipping');

    let text = `👋 Hola! Vull fer una comanda de la botiga dels Gegants de Cardona:\n\n` +
      `📦 *Productes:*\n${itemsList}\n\n` +
      `💰 *Total:* ${totalAmount.toFixed(2)} €\n` +
      `👤 *Nom:* ${customerName.trim() || 'Client web'}\n` +
      `🚚 *Modalitat d'entrega:* ${deliveryLabel}`;

    if (notes.trim()) {
      text += `\n📝 *Notes/Talles:* ${notes.trim()}`;
    }

    text += `\n\nCom podem fer el pagament per Bizum i coordinar l'entrega? Moltes gràcies!`;

    const url = `https://wa.me/${COLLA_WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setOrderComplete(true);
    setTimeout(() => {
      setCart([]);
      setOrderComplete(false);
      setIsCartOpen(false);
      setCustomerName('');
      setNotes('');
    }, 3500);
  };

  return (
    <section id="botiga" className="py-24 bg-cardona-sand relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-14">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-cardona-burgundy inline-block mb-2">
              {t('shop', 'tag')}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-cardona-burgundyDark mb-2">
              {t('shop', 'title')}
            </h2>
            <div className="w-20 h-1 bg-cardona-gold mb-3 rounded-full" />
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl">
              {t('shop', 'subtitle')}
            </p>
          </div>

          {/* Cart trigger button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative px-6 py-3 rounded-full bg-cardona-burgundy hover:bg-cardona-burgundyDark text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-3 shrink-0"
          >
            <ShoppingBag className="w-5 h-5 text-cardona-gold" />
            <span>{t('shop', 'cartTitle')}</span>
            {totalItemsCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-cardona-gold text-cardona-burgundyDark font-extrabold text-xs">
                {totalItemsCount}
              </span>
            )}
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-60 overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={loc(item.name)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cardona-burgundy text-white shadow">
                      {loc(item.badge)}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-serif text-lg font-bold text-cardona-burgundyDark">
                      {loc(item.name)}
                    </h3>
                    <span className="font-serif text-xl font-black text-cardona-burgundy">
                      {item.price.toFixed(2)} €
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {loc(item.description)}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => addToCart(item)}
                  className="w-full py-3 rounded-xl bg-cardona-sand hover:bg-cardona-burgundy text-cardona-burgundy hover:text-white font-bold text-xs uppercase tracking-wider transition-colors duration-200 border border-cardona-stone flex items-center justify-center gap-2 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t('shop', 'addToCart')}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Drawer Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-fadeIn">
          <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between p-6 sm:p-8 animate-slideLeft">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-cardona-burgundy" />
                <h3 className="font-serif text-2xl font-bold text-cardona-burgundyDark">
                  {t('shop', 'cartTitle')}
                </h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center py-16 text-gray-400">
                <ShoppingBag className="w-16 h-16 mx-auto mb-3 opacity-30 text-cardona-burgundy" />
                <p className="text-base font-semibold text-gray-500">{t('shop', 'emptyCart')}</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto pr-1 my-4 space-y-5">
                {/* Items List */}
                <div className="space-y-3">
                  {cart.map((it) => (
                    <div key={it.id} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-cardona-sand border border-cardona-stone">
                      <img src={it.image} alt={loc(it.name)} className="w-14 h-14 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-gray-800 truncate">{loc(it.name)}</h4>
                        <p className="text-xs text-cardona-burgundy font-semibold">{(it.price * it.qty).toFixed(2)} €</p>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() => updateQuantity(it.id, -1)}
                            className="w-5 h-5 rounded bg-white border border-gray-200 flex items-center justify-center text-xs hover:border-cardona-burgundy"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-gray-700">{it.qty}</span>
                          <button
                            onClick={() => updateQuantity(it.id, 1)}
                            className="w-5 h-5 rounded bg-white border border-gray-200 flex items-center justify-center text-xs hover:border-cardona-burgundy"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(it.id)}
                        className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Delivery Option */}
                <div className="pt-2 border-t border-gray-100">
                  <label className="block text-xs font-bold text-gray-700 mb-2">
                    {t('shop', 'deliveryLabel')}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryType('recollida')}
                      className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all text-xs ${
                        deliveryType === 'recollida'
                          ? 'border-cardona-burgundy bg-cardona-burgundy/5 text-cardona-burgundy font-bold shadow-sm'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <Store className="w-4 h-4 shrink-0 text-cardona-gold mt-0.5" />
                      <span className="leading-tight">{t('shop', 'deliveryPickup')}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryType('enviament')}
                      className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all text-xs ${
                        deliveryType === 'enviament'
                          ? 'border-cardona-burgundy bg-cardona-burgundy/5 text-cardona-burgundy font-bold shadow-sm'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <Truck className="w-4 h-4 shrink-0 text-cardona-gold mt-0.5" />
                      <span className="leading-tight">{t('shop', 'deliveryShipping')}</span>
                    </button>
                  </div>
                </div>

                {/* Customer Details Form */}
                <div className="space-y-3 pt-2 border-t border-gray-100">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {t('shop', 'nameLabel')}
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder={t('shop', 'namePlaceholder')}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-cardona-burgundy transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {t('shop', 'notesLabel')}
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={t('shop', 'notesPlaceholder')}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-cardona-burgundy transition-all"
                    />
                  </div>
                </div>

                {/* Direct info badge */}
                <div className="p-3.5 bg-cardona-sand/70 rounded-xl border border-cardona-stone text-[11px] text-gray-700 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-cardona-gold shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    {t('shop', 'directHelp')}
                  </p>
                </div>
              </div>
            )}

            {/* Footer / Total & WhatsApp Button */}
            {cart.length > 0 && (
              <div className="pt-4 border-t border-gray-100 shrink-0">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-gray-600">{t('shop', 'total')}</span>
                  <span className="font-serif text-2xl font-black text-cardona-burgundyDark">
                    {totalAmount.toFixed(2)} €
                  </span>
                </div>

                {orderComplete ? (
                  <div className="p-3.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2 animate-fadeIn">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{t('shop', 'orderSuccess')}</span>
                  </div>
                ) : (
                  <button
                    onClick={handleCheckout}
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-emerald-600/30 flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>{t('shop', 'checkout')}</span>
                  </button>
                )}
              </div>
            )}

          </div>
        </div>
      )}
    </section>
  );
}
