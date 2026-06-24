/**
 * ชุดไอคอน SVG (stroke, currentColor) ใช้แทนอิโมจิทั้งเว็บ
 * เรียกใช้ใน Handlebars ผ่าน helper: {{{icon "name"}}}
 */
const wrap = (inner: string, fill = false) =>
  `<svg viewBox="0 0 24 24" fill="${fill ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;

export const ICONS: Record<string, string> = {
  island: wrap('<path d="M12 3c-2.5 0-4 1.6-4 1.6S10 4 12 5c2-1 4-.4 4-.4S14.5 3 12 3z"/><path d="M12 5v6"/><path d="M5 21c2-2 4-2 7-2s5 0 7 2"/><path d="M4 21c2.5-4 5.5-6 8-6s5.5 2 8 6"/>'),
  dashboard: wrap('<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>'),
  approvals: wrap('<path d="M22 11.1V12a10 10 0 1 1-5.9-9.1"/><path d="M22 4 12 14.01l-3-3"/>'),
  places: wrap('<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>'),
  news: wrap('<path d="M4 22h13a2 2 0 0 0 2-2V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v16a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-9h3"/><path d="M9 7h6M9 11h6M9 15h4"/>'),
  home: wrap('<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>'),
  add: wrap('<path d="M12 5v14M5 12h14"/>'),
  logout: wrap('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>'),
  hotel: wrap('<path d="M3 21V7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v14"/><path d="M16 11h4a1 1 0 0 1 1 1v9"/><path d="M2 21h20"/><path d="M7 9h2M7 13h2M7 17h2"/>'),
  restaurant: wrap('<path d="M4 3v6a2 2 0 0 0 2 2v10M8 3v6a2 2 0 0 1-2 2M6 3v5"/><path d="M17 3c-1.5 0-2.5 2-2.5 5s1 4 2.5 4v9"/>'),
  place: wrap('<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>'),
  pin: wrap('<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>'),
  info: wrap('<circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/>'),
  check: wrap('<path d="M20 6 9 17l-5-5"/>'),
  party: wrap('<path d="M12 3a4.5 4.5 0 0 1 4.5 4.5c0 .9-.3 1.7-.8 2.4"/><circle cx="12" cy="12" r="9"/><path d="M9 10h.01M15 10h.01M8.5 15a4 4 0 0 0 7 0"/>'),
  mail: wrap('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
  lock: wrap('<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'),
  user: wrap('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>'),
  phone: wrap('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>'),
};

export const icon = (name: string): string => ICONS[name] || '';
