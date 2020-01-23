/* API key */
const key = '&units=metric&APPID=7888326b26769e661345dc10ca117453';

/* API URL */
const baseUrl = '//api.openweathermap.org/data/2.5/weather?zip=';

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
        return postedData;
    }
    catch (error) {
        console.log("Error", error);
    }
};

// Find the date
let date = new Date();
let today = date.getDate()+'.'+ date.getMonth()+'.'+ date.getFullYear();
let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
let newDate = new Intl.DateTimeFormat('en-UK', options).format(date);

// Update User Interface
const tempDiv = document.getElementById('temp');
const button = document.getElementById('generate');

const updateUI = postedData => {
    const city = postedData.city;
    const temp = postedData.temp;
    const feelings = postedData.feelings;
    tempDiv.innerHTML = `On ${newDate} in ${city} the temperature is ${temp}°C, and I feel ${feelings}!`; 
};

// Gather data
const postGet = () => {
    let city = document.getElementById('city').value;
    const feelings = document.getElementById('feelings').value;
    getData(baseUrl, city, key)
    .then(data => {
        if(!data.main){
            tempDiv.innerHTML = 'Please enter a valid zip code.'
        }else{
            postData('/add', {
                city: data.name,
                temp: data.main.temp,
                feelings: feelings
                }
            ).then(postback => {
                updateUI(postback)});
        }
    });
};

/**
* Event click button
**/
button.addEventListener('click', postGet);