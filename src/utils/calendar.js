/**
 * Utilitats per exportar esdeveniments al calendari (.ics per a Apple/Android i Google Calendar)
 */

export function downloadIcsFile({ title, description, location, startDate, endDate }) {
  // Format dates: YYYYMMDDTHHMMSSZ or YYYYMMDD
  const formatIsoForIcs = (dateStr) => {
    return dateStr ? dateStr.replace(/[-:]/g, '') : '';
  };

  const start = formatIsoForIcs(startDate) || '20260912T100000Z';
  const end = formatIsoForIcs(endDate) || '20260915T220000Z';

  const cleanText = (str) => (str || '').replace(/\n/g, '\\n').replace(/,/g, '\\,');

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Gegants de Cardona//NONSGML Esdeveniments v1.0//CA',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@gegantsdecardona.cat`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${cleanText(title)}`,
    `DESCRIPTION:${cleanText(description)}`,
    `LOCATION:${cleanText(location)}`,
    'URL:https://colygonmobilitatregenerativa-sys.github.io/gegants-cardona/',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const fileName = (title || 'esdeveniment')
    .toLowerCase()
    .replace(/[^a-z0-9]/gi, '_')
    .substring(0, 30);
  link.setAttribute('download', `${fileName}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

export function openGoogleCalendar({ title, description, location, startDate, endDate }) {
  const start = startDate ? startDate.replace(/[-:]/g, '') : '20260912T100000Z';
  const end = endDate ? endDate.replace(/[-:]/g, '') : '20260915T220000Z';

  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(
    location
  )}&dates=${start}/${end}`;

  window.open(url, '_blank');
}
