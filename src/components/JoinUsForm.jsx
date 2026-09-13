import React, { useState } from 'react';
import { Send, CheckCircle, HeartHandshake, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function JoinUsForm() {
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'portador',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <section id="contacte" className="py-24 bg-cardona-sand relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-cardona-burgundy inline-block mb-2">
                {t('contact', 'tag')}
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-cardona-burgundyDark mb-4">
                {t('contact', 'title')}
              </h2>
              <div className="w-16 h-1 bg-cardona-gold mb-6 rounded-full" />
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                {t('contact', 'leadText')}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
                <div className="p-3 rounded-xl bg-cardona-burgundy text-cardona-gold">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-cardona-burgundyDark text-sm">
                    {t('contact', 'rehearsalTitle')}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {t('contact', 'rehearsalDesc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
                <div className="p-3 rounded-xl bg-cardona-burgundy text-cardona-gold">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-cardona-burgundyDark text-sm">
                    {t('contact', 'locationTitle')}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {t('contact', 'locationDesc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
                <div className="p-3 rounded-xl bg-cardona-burgundy text-cardona-gold">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-cardona-burgundyDark text-sm">
                    {lang === 'es' ? 'Correo de Contacto' : lang === 'en' ? 'Contact Email' : 'Correu de Contacte'}
                  </h4>
                  <p className="text-xs text-gray-500">gegantscardona@culturapopular.cat</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-100 relative">
            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-fadeIn">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-900">
                  {t('contact', 'success')}
                </h3>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', role: 'portador', message: '' });
                  }}
                  className="mt-4 px-6 py-2.5 rounded-full bg-cardona-burgundy text-white text-xs font-bold uppercase tracking-wider hover:bg-cardona-burgundyDark transition-all"
                >
                  {lang === 'es' ? 'Volver a enviar' : lang === 'en' ? 'Send another response' : 'Tornar a enviar'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-cardona-burgundyDark mb-1">
                    {t('contact', 'formTitle')}
                  </h3>
                  <p className="text-xs text-gray-500 mb-6">
                    {lang === 'es' 
                      ? 'Rellena este formulario y nos pondremos en contacto contigo.' 
                      : lang === 'en' 
                      ? 'Fill in this form and we will get back to you shortly.' 
                      : 'Emplena aquest formulari i ens posarem en contacte amb tu.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                      {t('contact', 'name')} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={lang === 'en' ? 'e.g. John Smith' : lang === 'es' ? 'Ej. Juan Soler' : 'Ex. Jordi Soler'}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cardona-burgundy focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                      {t('contact', 'email')} *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="info@exemple.cat"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cardona-burgundy focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                      {t('contact', 'phone')}
                    </label>
                    <input
                      type="tel"
                      placeholder="600 00 00 00"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cardona-burgundy focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                      {t('contact', 'role')}
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cardona-burgundy focus:border-transparent text-sm bg-white"
                    >
                      <option value="portador">{t('contact', 'roleCarrier')}</option>
                      <option value="capgrossos">{t('contact', 'roleNans')}</option>
                      <option value="music">{t('contact', 'roleMusician')}</option>
                      <option value="acompanyament">{t('contact', 'roleSupport')}</option>
                      <option value="contractacio">{t('contact', 'roleBooking')}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    {t('contact', 'message')}
                  </label>
                  <textarea
                    rows={4}
                    placeholder={
                      lang === 'es'
                        ? 'Cuéntanos si tienes experiencia previa, disponibilidad o cualquier duda...'
                        : lang === 'en'
                        ? 'Tell us about your experience, availability or any questions...'
                        : 'Explica\'ns si tens experiència prèvia, disponibilitat o qualsevol dubte...'
                    }
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cardona-burgundy focus:border-transparent text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-full bg-cardona-burgundy hover:bg-cardona-burgundyDark text-white font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                >
                  <Send className="w-4 h-4 text-cardona-gold" />
                  <span>{t('contact', 'send')}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
