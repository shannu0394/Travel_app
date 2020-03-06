
// Async GET

const getServerData = async (url) => {
  const res = await fetch('/data');
  const storedData = await res.json();
  return storedData;
};

// Async POST
const postData = async (url = "", dataToPost = {}) => {
  let res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(dataToPost)
  });
  try {
    const postedData = await res.json();
    return postedData;
  }
  catch (error) {
    console.log("Error", error);
  }
};

// Find the date
/* let date = new Date();
let today = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
let newDate = new Intl.DateTimeFormat('en-UK', options).format(date); */

// Update User Interface
/* const button = document.getElementById('generate');

const updateUI = storedData => {

}; */

// Gather data
const postGeonames = async () => {
  const city = document.getElementById('city').value;
  await postData('http://localhost:3000/geoNames', {
    cityname: city
  })
  //créer la route /add
  await postData('http://localhost:3000/add', {
    longitude: data[0][lng],
    latitude: data[0][lat],
    country: data[0][countryName]
  });
  /* getServerData('http://localhost:3000/data')
    .then(storedData => updateUI(storedData)); */
};

/**
* Event click button
**/



export {
  postGeonames,
  button
}
