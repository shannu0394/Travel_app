/* API key */
const key = '&units=metric&APPID=7888326b26769e661345dc10ca117453';

/* API URL */
const baseUrl = '//api.openweathermap.org/data/2.5/weather?q=';

// Async GET
const getData = async (url, city, key) => {
    const result = await fetch(url+city+key);
    const data = await result.json();
    return data;
};

// Async POST
const postData = async (url = "", dataToPost = {}) => {
    let res = await fetch (url, {
        method : 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(dataToPost)
    });
    try {
        const postedData = await res.json();
        console.log(postedData);
        return postedData;
    }
    catch (error) {
        console.log("Error", error);
    }
};


// Update User Interface
//const date = document.getElementById('date');
const tempDiv = document.getElementById('temp');
const button = document.getElementById('submit');

const updateUI = postedData => {
    const city = postedData.city;
    const temp = postedData.temp;
    tempDiv.innerHTML = `Today ${city} is ${temp}°C.`; 
};

// Gather data
const postGet = () => {
    let city = document.getElementById('city').value;
    getData(baseUrl, city, key)
    .then(data => {
        console.log(data.main.temp);
        console.log(data.name);
        postData('/add', {
            city: city,
            temp: data.main.temp
            }
        ).then(postback => {
            console.log("postback", postback);
            updateUI(postback)})
    })
};

/**
* Event click button
**/
button.addEventListener('click', postGet);