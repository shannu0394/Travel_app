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
const newTrip = async () => {
  let city = document.getElementById('city').value;
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  const data = await postData('http://localhost:3000/add', {
    cityname: city,
    firstDay: startDate,
    lastDay: endDate,
  });
    console.log("data", data);
};

export {
  newTrip,
  button
}
