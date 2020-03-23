const fetchWrapper = require('fetchWrapper');
const FetchOptions = require('fetchWrapper/FetchOptions');

/**
 * Function to fetch weather data from Dark Sky API
 * 
 * @param {String} lat The latitude
 * @param {String} lng The longitude
 * @returns {Object} The API response
 */
const darkSkyAPI = async (lat, lng) => {
  const response = await fetchWrapper(
    `https://api.darksky.net/forecast/${process.env.skyKey}/${lat},${lng}`,
    new FetchOptions({units: 'si'})
  );
  return {
    temperature: Math.round(response.currently.temperature),
    icon: response.currently.icon,
  };
};

module.exports = darkSkyAPI;