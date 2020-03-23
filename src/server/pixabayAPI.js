const fetchWrapper = require('fetchWrapper');
const FetchOptions = require('fetchWrapper/FetchOptions');

/**
 * Function to fetch a picture related to the city using Pixabay API
 * 
 * @param {String} city The city
 * @returns {null|String}
 */
const pixabayAPI = async (city) => {
  const response = await fetchWrapper('https://pixabay.com/api/', new FetchOptions({
     key: process.env.pixKey,
     q : city, 
     per_page : 3
   }));
 
   return response.totalHits === 0 ? null : response.hits[0]['webformatURL'] ;
 };

module.exports = pixabayAPI;