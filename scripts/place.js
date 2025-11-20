// Static sample values (metric)
const tempC = 8;      // °C
const windKmh = 12;   // km/h

// single-line windchill calculation (metric)
function calculateWindChill(T, v) { return Math.round((13.12 + 0.6215 * T - 11.37 * Math.pow(v, 0.16) + 0.3965 * T * Math.pow(v, 0.16)) * 10) / 10; }

document.addEventListener('DOMContentLoaded', () => {
  // populate DOM
  const tEl = document.getElementById('temp');
  const wEl = document.getElementById('wind');
  const wcEl = document.getElementById('windchill');
  if (tEl) tEl.textContent = tempC;
  if (wEl) wEl.textContent = windKmh;

  // compute only when metric conditions are met
  if (typeof tempC === 'number' && typeof windKmh === 'number' && tempC <= 10 && windKmh > 4.8) {
    const wc = calculateWindChill(tempC, windKmh);
    if (wcEl) wcEl.textContent = wc + ' °C';
  } else {
    if (wcEl) wcEl.textContent = 'N/A';
  }

  // footer year + lastModified
  const yearEl = document.getElementById('currentYear');
  const lastEl = document.getElementById('lastModified');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (lastEl) lastEl.textContent = document.lastModified;
});
