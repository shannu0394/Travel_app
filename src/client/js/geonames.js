
// Async GET
const getServerData = async (url) => {
  const res = await fetch('http://localhost:3000/data');
  const cityData = await res.json();
  console.log(cityData)
  return cityData;
};

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
  postData('http://localhost:3000/cityName', {
      cityname: city,
      firstDay: startDate,
      lastDay: endDate
    }).then(getServerData('http://localhost:3000/data'))
};

export {
  postGeonames,
  button
}
