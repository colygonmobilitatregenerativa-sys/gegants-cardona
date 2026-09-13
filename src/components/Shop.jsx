import React, { useState } from 'react';
import { ShoppingBag, Plus, Minus, Trash2, CheckCircle2, X, Sparkles, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Shop() {
  const { t } = useLanguage();
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const products = [
    {
      id: 1,
      name: 'Samarreta Oficial de la Colla',
      price: 16.00,
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
      badge: '100% Cotó Orgànic',
      description: 'Samarreta en color bordeus amb l\'emblema de Borrell II i Letgarda estampat al pit i la silueta del Castell a l\'esquena.'
    },
    {
      id: 2,
      name: 'Figura de Goma: Borrell II (Centenari)',
      price: 24.50,
      image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=600&q=80',
      badge: 'Col·leccionable',
      description: 'Rèplica detallada en goma tova de 30 cm de la figura històrica del Barri Major. Ideal per a infants i col·leccionistes.'
    },
    {
      id: 3,
      name: 'Figura de Goma: Adalés (Barri Nou)',
      price: 24.50,
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
      badge: 'Col·leccionable',
      description: 'Reproducció oficial de la donzella de la Torre de la Minyona segons l\'escultura de Toni Mujal.'
    },
    {
      id: 4,
      name: 'Mocador Tradicional de Festa Major',
      price: 6.00,
      image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
      badge: 'Festa Popular',
      description: 'Mocador triangular de quadres vermells i negres amb l\'escut brodat de la Colla de Geganters de Cardona.'
    },
    {
      id: 5,
      name: 'Llibre: "Història i Llegendes dels Gegants"',
      price: 18.00,
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      badge: 'Edició Il·lustrada',
      description: 'Monografia històrica sobre els 190 anys de tradició gegantera a Cardona, fotografies inèdites i partitures musicals.'
    },
    {
      id: 6,
      name: 'Pack 4 Pins Metàl·lics de les Figures',
      price: 8.50,
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      badge: 'Pack 4 unitats',
      description: 'Pins esmaltats de Borrell II, Letgarda, Abdal·là i Adalés per lluir a la solapa o a la motxilla.'
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
    setOrderComplete(true);
    setTimeout(() => {
      setCart([]);
      setOrderComplete(false);
      setIsCartOpen(false);
    }, 3000);
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
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cardona-burgundy text-white shadow">
                      {item.badge}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-serif text-lg font-bold text-cardona-burgundyDark">
                      {item.name}
                    </h3>
                    <span className="font-serif text-xl font-black text-cardona-burgundy">
                      {item.price.toFixed(2)} €
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {item.description}
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
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between p-6 sm:p-8 animate-slideLeft">
            
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
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

              {/* Items List */}
              {cart.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <p className="text-sm font-medium">{t('shop', 'emptyCart')}</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-1">
                  {cart.map((it) => (
                    <div key={it.id} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-cardona-sand border border-cardona-stone">
                      <img src={it.image} alt={it.name} className="w-14 h-14 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-gray-800 truncate">{it.name}</h4>
                        <p className="text-xs text-cardona-burgundy font-semibold">{(it.price * it.qty).toFixed(2)} €</p>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() => updateQuantity(it.id, -1)}
                            className="w-5 h-5 rounded bg-white border border-gray-200 flex items-center justify-center text-xs"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-gray-700">{it.qty}</span>
                          <button
                            onClick={() => updateQuantity(it.id, 1)}
                            className="w-5 h-5 rounded bg-white border border-gray-200 flex items-center justify-center text-xs"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(it.id)}
                        className="text-gray-400 hover:text-red-500 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer / Total */}
            {cart.length > 0 && (
              <div className="pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-gray-600">{t('shop', 'total')}</span>
                  <span className="font-serif text-2xl font-black text-cardona-burgundyDark">
                    {totalAmount.toFixed(2)} €
                  </span>
                </div>

                {orderComplete ? (
                  <div className="p-3 bg-green-50 text-green-700 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t('shop', 'orderSuccess')}</span>
                  </div>
                ) : (
                  <button
                    onClick={handleCheckout}
                    className="w-full py-4 rounded-xl bg-cardona-burgundy hover:bg-cardona-burgundyDark text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
                  >
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
