/**
 * Configuració del Google Calendar de la Colla de Geganters de Cardona
 * 
 * COM CANVIAR EL CORREU O CALENDARI:
 * -----------------------------------
 * 1. Modifiqueu 'calendarId' amb el nou correu (actualment: 'demarco169@gmail.com').
 * 2. Assegureu-vos que a Google Calendar el calendari és públic:
 *    - Aneu a calendar.google.com -> Roda dentada (Configuració).
 *    - Al menú esquerre, seleccioneu el calendari.
 *    - A "Permisos d'accés als esdeveniments", marqueu "Compartir amb el públic" (Veure tots els detalls).
 */

export const CALENDAR_CONFIG = {
  // Correu o ID del Google Calendar públic
  calendarId: '1dee0b200a711fdff96cf021892fceb3ba29ccd8c80fa18f2716c5c5851de623@group.calendar.google.com',

  // Clau d'API de Google Cloud (opcional, per a connexió directa v3 sense servidors proxy)
  apiKey: import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY || '',

  // Activar o desactivar la sincronització en temps real
  syncEnabled: true,

  // Nom oficial del calendari
  calendarName: 'Sortides Gegants Cardona',

  // Enllaç directe per subscriure's o afegir-lo a Google Calendar personal
  get subscribeUrl() {
    return `https://calendar.google.com/calendar/render?cid=${encodeURIComponent(this.calendarId)}`;
  },

  // Enllaç de subscripció iCal per a mòbils (Apple Calendar / Android / Outlook)
  get icalUrl() {
    return `https://calendar.google.com/calendar/ical/${encodeURIComponent(this.calendarId)}/public/basic.ics`;
  }
};
