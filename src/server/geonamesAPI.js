const fetchWrapper = require('fetchWrapper');
const FetchOptions = require('fetchWrapper/FetchOptions');

/**
 * Function to fetch geographic data from Geonames API
 * 
 * @param {String} city The city
 * @returns {Object} The API response
 */
const geonamesAPI = async (city) => {
  const geoData = await fetchWrapper('http://api.geonames.org/searchJSON', new FetchOptions({
    'q' : city,
    'maxRows': 10,
    'username': process.env.geoUsername
    }));
  
  return {
    longitude: geoData.geonames[0]['lng'],
    latitude: geoData.geonames[0]['lat'],
    country: geoData.geonames[0]['countryName'],
    city: city === geoData.geonames[0]['countryName'] ? null : city
  };
}; 

module.exports = geonamesAPI;