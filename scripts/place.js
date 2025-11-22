// Criterion 9: Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Criterion 9: Set last modified date in footer
document.getElementById('lastModified').textContent = document.lastModified;

// Static weather values (must match the values displayed in HTML)
const temperature = 8; // °C
const windSpeed = 12; // km/h

// Criterion 8: Wind Chill Calculation Function
// Function contains ONE LINE of code that returns the wind chill factor
// Uses the metric formula for wind chill calculation
function calculateWindChill(temp, wind) {
  return (13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16)).toFixed(1);
}

// Criterion 8: Only call calculateWindChill if conditions are met
// Metric conditions: temperature <= 10°C AND wind speed > 4.8 km/h
const windchillElement = document.getElementById('windchill');

if (temperature <= 10 && windSpeed > 4.8) {
  // Conditions met - calculate and display wind chill
  windchillElement.textContent = calculateWindChill(temperature, windSpeed) + ' °C';
} else {
  // Conditions not met - display N/A
  windchillElement.textContent = 'N/A';
}