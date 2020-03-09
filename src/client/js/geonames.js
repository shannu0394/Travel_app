
// Async GET

/* const getServerData = async (url) => {
  const res = await fetch('http://localhost:3000/geoNames');
  const geoData = await res.json();
  return geoData;
}; */

// Async POST
const postData = async (url = "", dataToPost = {}) => {
  let res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
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

const button = document.getElementById('generate');


// Gather data
const postGeonames = async () => {
  const city = document.getElementById('city').value;
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  await postData('http://localhost:3000/cityName', {
    cityname: city,
    firstDay: startDate,
    lastDay: endDate
  });
};

export {
  postGeonames,
  button
}


