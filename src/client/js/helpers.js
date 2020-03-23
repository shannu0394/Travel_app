import defaultImage from '../styles/location.png';

/**
 * Set a default image if null
 * 
 * @param {String} img The image URL sent from server
 */
const imageCheck = (img) => {
  return img ?? defaultImage;
};

/**
 * Set city to "Roadtrip" if null
 * 
 * @param {String} city The city
 */
const cityCheck = (city) => {
  return city ?? "Roadtrip";
};

export {
  imageCheck,
  cityCheck
}