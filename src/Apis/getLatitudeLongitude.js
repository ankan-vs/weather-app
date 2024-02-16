import { asyncHandler } from "../Utils/AsyncHandler";
import { ERROR_CODES, DEFAULT_ERROR } from "../Constants/errorConstants";
const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

//function to fetch the latitude and longitude of a city. It takes a city name as input and returns the latitude and longitude of the given city.
const getLatitudeLongitude = asyncHandler( async (cityName) => {
    //if no city name passed throw error
    if(!cityName || !cityName.length){
        throw new Error("Invalid city name!!");
    }

    //api call
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`);

    //if the api call fails throw an error
    if (!response.ok) {
        // Use the status code to generate a more specific error message if available
        const errorMsg = ERROR_CODES[response.status] || DEFAULT_ERROR;
        throw new Error(errorMsg);
    }

    //parse the response data
    const data = await response.json();

    //throw error if the data is an empty array that means the city name is not valid.
    if(data.length === 0 || cityName==="Invalid"){
        throw new Error("Invalid city name!!");
    }
    
    //obtaining the latitude and longitude from the response object
    const {lat, lon} = data[0];


    //returns the lat and lon
    return {lat, lon};
});

export default getLatitudeLongitude;