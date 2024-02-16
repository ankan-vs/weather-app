import { asyncHandler } from "../Utils/AsyncHandler";
import { ERROR_CODES, DEFAULT_ERROR } from "../Constants/errorConstants";
const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
 

//function to fetch current api weather. It takes latitude and longitude of a city as input and returns an object containing status, image(url), temp, feels_like, humidity, speed.
const getCurrentWeather = asyncHandler(async (latitude, longitude) => {

    //api call
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);

    //throw error if fialed to make api call
    if (!response.ok) {
        // Use the status code to generate a more specific error message if available
        const errorMsg = ERROR_CODES[response.status] || DEFAULT_ERROR;
        throw new Error(errorMsg);
    }

    //parse response
    const data = await response.json();

    //fetching the requried details from the response object
    const {main:status, icon} = data.weather[0];
    const {temp, feels_like, humidity} = data.main;
    const {speed} = data.wind;

    //generating the image url using the icon id.
    const image=await fetch(`http://openweathermap.org/img/w/${icon}.png`)
    const img=image.url;


    //returns the data
    return {status, img, temp, feels_like, humidity, speed};

});

export default getCurrentWeather;