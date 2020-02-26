/* API key */
const key = '&units=metric&APPID=7888326b26769e661345dc10ca117453';

/* API URL */
const baseUrl = '//api.openweathermap.org/data/2.5/weather?zip=';

// Async GET
const getAPIData = async (url, city, key) => {
    const result = await fetch(url + city + key);
    const data = await result.json();
    return data;
};

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
let date = new Date();
let today = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
let newDate = new Intl.DateTimeFormat('en-UK', options).format(date);

// Update User Interface
const tempDiv = document.getElementById('temp');
const dateDiv = document.getElementById('date');
const contentDiv = document.getElementById('content');
const button = document.getElementById('generate');

const updateUI = storedData => {
    const city = storedData.city;
    const temp = storedData.temp;
    const feelings = storedData.feelings;
    dateDiv.innerHTML = newDate;
    tempDiv.innerHTML = `In ${city} the temperature is ${temp}°C.`;
    contentDiv.innerHTML = `I feel ${feelings}!`;
};

// Gather data
const postGet = () => {
    const city = document.getElementById('city').value;
    const feelings = document.getElementById('feelings').value;
    getAPIData(baseUrl, city, key)
        .then(data => {
            if (!data.main) {
                tempDiv.innerHTML = 'Please enter a valid zip code.'
            } else {
                postData('http://localhost:3000/add', {
                    city: data.name,
                    temp: data.main.temp,
                    feelings: feelings
                });
                getServerData('http://localhost:3000/data')
                    .then(storedData => updateUI(storedData));
            }
        });
};

/**
* Event click button
**/
export const clickEvent = () => {
    button.addEventListener('click', postGet);
};
