import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Scale, FileText, Cookie, HeartHandshake } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function LegalModal() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleHash = () => {
      if (window.location.hash === '#avis-legal') {
        setIsOpen(true);
      }
    };

    window.addEventListener('open-legal-modal', handleOpen);
    window.addEventListener('hashchange', handleHash);

    // Check hash on initial load
    if (window.location.hash === '#avis-legal') {
      setIsOpen(true);
    }

    return () => {
      window.removeEventListener('open-legal-modal', handleOpen);
      window.removeEventListener('hashchange', handleHash);
    };
  }, []);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setIsOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'auto';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
    if (window.location.hash === '#avis-legal') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fadeIn"
      onClick={closeModal}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-cardona-gold/30 flex flex-col overflow-hidden animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-cardona-burgundy to-cardona-burgundyDark text-white flex items-center justify-between border-b border-cardona-gold/30 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2.5 rounded-xl bg-cardona-gold/20 text-cardona-goldLight shrink-0">
              <ShieldCheck className="w-6 h-6 text-cardona-gold" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-cardona-gold block mb-0.5 truncate">
                {t('legal', 'tag')}
              </span>
              <h3 className="font-serif text-lg sm:text-2xl font-extrabold text-white truncate">
                {t('legal', 'title')}
              </h3>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors shrink-0 ml-2"
            title="Tancar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-gray-700 text-sm leading-relaxed">
          <p className="text-xs sm:text-sm text-gray-500 italic pb-2 border-b border-gray-100">
            {t('legal', 'subtitle')}
          </p>

          {/* Section 1 */}
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-cardona-burgundyDark text-base sm:text-lg flex items-center gap-2">
              <Scale className="w-4 h-4 text-cardona-gold shrink-0" />
              <span>{t('legal', 'section1Title')}</span>
            </h4>
            <p className="text-gray-600 pl-6">
              {t('legal', 'section1Text')}
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-cardona-burgundyDark text-base sm:text-lg flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-cardona-gold shrink-0" />
              <span>{t('legal', 'section2Title')}</span>
            </h4>
            <p className="text-gray-600 pl-6">
              {t('legal', 'section2Text')}
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-cardona-burgundyDark text-base sm:text-lg flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cardona-gold shrink-0" />
              <span>{t('legal', 'section3Title')}</span>
            </h4>
            <p className="text-gray-600 pl-6">
              {t('legal', 'section3Text')}
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-cardona-burgundyDark text-base sm:text-lg flex items-center gap-2">
              <Cookie className="w-4 h-4 text-cardona-gold shrink-0" />
              <span>{t('legal', 'section4Title')}</span>
            </h4>
            <p className="text-gray-600 pl-6">
              {t('legal', 'section4Text')}
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-cardona-burgundyDark text-base sm:text-lg flex items-center gap-2">
              <FileText className="w-4 h-4 text-cardona-gold shrink-0" />
              <span>{t('legal', 'section5Title')}</span>
            </h4>
            <p className="text-gray-600 pl-6">
              {t('legal', 'section5Text')}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-4 shrink-0 text-xs text-gray-500">
          <span>© {new Date().getFullYear()} Colla de Geganters de Cardona</span>
          <button
            onClick={closeModal}
            className="px-6 py-2 rounded-full bg-cardona-burgundy hover:bg-cardona-burgundyDark text-white font-bold transition-all shadow-sm active:scale-95"
          >
            {t('legal', 'closeBtn')}
          </button>
        </div>
      </div>
    </div>
  );
}
