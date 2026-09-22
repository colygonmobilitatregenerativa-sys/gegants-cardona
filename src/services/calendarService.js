import { CALENDAR_CONFIG } from '../config/calendarConfig';
import { eventsData } from '../data/events';

/**
 * Neteja i desempaqueta cadenes de text iCalendar (RFC 5545)
 */
function cleanIcsText(str) {
  if (!str) return '';
  return str
    .replace(/\\n/g, '\n')
    .replace(/\\,/g, ',')
    .replace(/\\;/g, ';')
    .replace(/\\\\/g, '\\')
    .trim();
}

/**
 * Analitza una data iCalendar (YYYYMMDD o YYYYMMDDTHHMMSSZ o YYYYMMDDTHHMMSS)
 */
function parseIcsDate(dateStr) {
  if (!dateStr) return null;
  // Extreure només la part de la data/hora ignorant paràmetres com TZID=...:20260912T100000
  const cleanStr = dateStr.includes(':') ? dateStr.split(':').pop() : dateStr;
  
  if (cleanStr.length === 8) {
    // Data completa: YYYYMMDD
    const y = parseInt(cleanStr.substring(0, 4), 10);
    const m = parseInt(cleanStr.substring(4, 6), 10) - 1;
    const d = parseInt(cleanStr.substring(6, 8), 10);
    return new Date(y, m, d);
  }

  // Format YYYYMMDDTHHMMSS o amb Z
  const match = cleanStr.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z?$/);
  if (match) {
    const [, y, m, d, hh, mm, ss] = match;
    return new Date(Date.UTC(y, m - 1, d, hh, mm, ss));
  }

  const parsed = new Date(cleanStr);
  return isNaN(parsed.getTime()) ? null : parsed;
}

/**
 * Infereix la categoria i l'etiqueta de la sortida segons el títol
 */
function inferCategory(title, description = '') {
  const text = `${title} ${description}`.toLowerCase();

  if (text.includes('festa major') || text.includes('correbous') || text.includes('gala')) {
    return {
      category: 'festa-major',
      type: { ca: 'Festa Major', es: 'Fiesta Mayor', en: 'Town Festival' },
      highlight: true
    };
  }
  if (text.includes('trobada') || text.includes('comarcal') || text.includes('intercanvi')) {
    return {
      category: 'trobades',
      type: { ca: 'Trobada', es: 'Encuentro', en: 'Gathering' },
      highlight: false
    };
  }
  if (text.includes('nocturn') || text.includes('minyona') || text.includes('especial')) {
    return {
      category: 'especial',
      type: { ca: 'Especial', es: 'Especial', en: 'Special' },
      highlight: true
    };
  }

  return {
    category: 'sortides',
    type: { ca: 'Sortida', es: 'Salida', en: 'Outing' },
    highlight: false
  };
}

/**
 * Converteix una data a formats multilingües llegibles
 */
function formatEventDateTime(startDate, endDate) {
  if (!startDate) {
    return {
      date: { ca: 'Properament', es: 'Próximamente', en: 'Coming soon' },
      time: { ca: 'Horari a confirmar', es: 'Horario a confirmar', en: 'Time TBC' }
    };
  }

  const hasTime = startDate.getHours() !== 0 || startDate.getMinutes() !== 0;

  // Format de la data en els 3 idiomes
  const dateCa = startDate.toLocaleDateString('ca-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  const dateEs = startDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  const dateEn = startDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  // Format de l'hora
  let timeCa = 'Tot el dia';
  let timeEs = 'Todo el día';
  let timeEn = 'All day';

  if (hasTime) {
    const timeStr = startDate.toLocaleTimeString('ca-ES', { hour: '2-digit', minute: '2-digit' });
    timeCa = `${timeStr} h`;
    timeEs = `${timeStr} h`;
    timeEn = startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  }

  return {
    date: { ca: dateCa, es: dateEs, en: dateEn },
    time: { ca: timeCa, es: timeEs, en: timeEn }
  };
}

/**
 * Parser lleuger de fitxers iCalendar .ics natius de Google Calendar
 */
function parseIcsFeed(icsText) {
  if (!icsText || !icsText.includes('BEGIN:VEVENT')) {
    return [];
  }

  // 1. Unfold lines (RFC 5545: línies que comencen amb espai continuen l'anterior)
  const unfolded = icsText.replace(/\r?\n[ \t]/g, '');
  const lines = unfolded.split(/\r?\n/);

  const events = [];
  let currentEvent = null;

  for (const line of lines) {
    if (line.startsWith('BEGIN:VEVENT')) {
      currentEvent = {};
    } else if (line.startsWith('END:VEVENT') && currentEvent) {
      if (currentEvent.summary) {
        events.push(currentEvent);
      }
      currentEvent = null;
    } else if (currentEvent) {
      const colonIdx = line.indexOf(':');
      if (colonIdx > 0) {
        const fullKey = line.substring(0, colonIdx);
        const val = line.substring(colonIdx + 1);
        const key = fullKey.split(';')[0].toUpperCase();

        if (key === 'SUMMARY') currentEvent.summary = cleanIcsText(val);
        else if (key === 'DESCRIPTION') currentEvent.description = cleanIcsText(val);
        else if (key === 'LOCATION') currentEvent.location = cleanIcsText(val);
        else if (key === 'DTSTART') currentEvent.dtstart = line;
        else if (key === 'DTEND') currentEvent.dtend = line;
        else if (key === 'UID') currentEvent.uid = val;
      }
    }
  }

  // Processar i transformar a estructura Cardona
  return events.map((raw, index) => {
    const startDate = parseIcsDate(raw.dtstart);
    const endDate = parseIcsDate(raw.dtend);
    const { date, time } = formatEventDateTime(startDate, endDate);
    const { category, type, highlight } = inferCategory(raw.summary, raw.description);

    const titleStr = raw.summary || 'Sortida Gegantera';
    const locStr = raw.location || 'Cardona (Bages, Catalunya)';
    const descStr = raw.description || 'Sortida oficial de la Colla de Geganters de Cardona.';

    return {
      id: raw.uid || `gcal-${index}-${Date.now()}`,
      title: { ca: titleStr, es: titleStr, en: titleStr },
      date,
      time,
      location: { ca: locStr, es: locStr, en: locStr },
      type,
      highlight,
      description: { ca: descStr, es: descStr, en: descStr },
      category,
      startDate: startDate ? startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z' : '',
      endDate: endDate ? endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z' : '',
      isFromGoogle: true
    };
  });
}

/**
 * Consulta els esdeveniments de Google Calendar mitjançant API v3
 */
async function fetchViaGoogleApi(calendarId, apiKey) {
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
    calendarId
  )}/events?key=${apiKey}&singleEvents=true&orderBy=startTime&timeMin=${new Date(
    Date.now() - 7 * 86400000
  ).toISOString()}`;

  const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
  if (!res.ok) throw new Error(`Google API returned ${res.status}`);
  const data = await res.json();

  if (!data.items || !Array.isArray(data.items)) {
    return [];
  }

  return data.items.map((item, index) => {
    const startStr = item.start?.dateTime || item.start?.date;
    const endStr = item.end?.dateTime || item.end?.date;
    const startDate = startStr ? new Date(startStr) : null;
    const endDate = endStr ? new Date(endStr) : null;

    const { date, time } = formatEventDateTime(startDate, endDate);
    const titleStr = item.summary || 'Sortida Gegantera';
    const { category, type, highlight } = inferCategory(titleStr, item.description);

    const locStr = item.location || 'Cardona (Bages, Catalunya)';
    const descStr = item.description || 'Sortida oficial dels Gegants de Cardona.';

    return {
      id: item.id || `gcal-${index}`,
      title: { ca: titleStr, es: titleStr, en: titleStr },
      date,
      time,
      location: { ca: locStr, es: locStr, en: locStr },
      type,
      highlight,
      description: { ca: descStr, es: descStr, en: descStr },
      category,
      startDate: startDate ? startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z' : '',
      endDate: endDate ? endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z' : '',
      isFromGoogle: true
    };
  });
}

/**
 * Consulta els esdeveniments de Google Calendar mitjançant el canal públic .ics
 */
async function fetchViaPublicIcs(calendarId) {
  const icalUrl = `https://calendar.google.com/calendar/ical/${encodeURIComponent(calendarId)}/public/basic.ics`;
  // Proxy CORS públic segur per llegir el fitxer .ics des del navegador
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(icalUrl)}`;

  const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(6000) });
  if (!res.ok) throw new Error(`iCal proxy returned ${res.status}`);
  const icsText = await res.text();

  return parseIcsFeed(icsText);
}

/**
 * Funció principal exportada: Carrega el calendari en temps real o aplica fallback
 */
export async function loadCalendarEvents() {
  if (!CALENDAR_CONFIG.syncEnabled || !CALENDAR_CONFIG.calendarId) {
    return {
      events: eventsData,
      isLive: false,
      source: 'local'
    };
  }

  try {
    let liveEvents = [];

    // 1. Provar amb Google API si hi ha clau configurada
    if (CALENDAR_CONFIG.apiKey) {
      liveEvents = await fetchViaGoogleApi(CALENDAR_CONFIG.calendarId, CALENDAR_CONFIG.apiKey);
    } else {
      // 2. Provar amb canal iCal públic
      liveEvents = await fetchViaPublicIcs(CALENDAR_CONFIG.calendarId);
    }

    // Si ha retornat esdeveniments vàlids, els fem servir
    if (liveEvents && liveEvents.length > 0) {
      return {
        events: liveEvents,
        isLive: true,
        source: 'google',
        calendarId: CALENDAR_CONFIG.calendarId
      };
    }

    // Si el calendari és buit o encara no té sortides creades, fem servir les de reserva
    return {
      events: eventsData,
      isLive: false,
      source: 'fallback_empty',
      calendarId: CALENDAR_CONFIG.calendarId
    };
  } catch (error) {
    // Si no és públic encara o no hi ha connexió, retornem amb seguretat les dades locals
    return {
      events: eventsData,
      isLive: false,
      source: 'fallback_error',
      calendarId: CALENDAR_CONFIG.calendarId,
      errorMessage: error.message
    };
  }
}
