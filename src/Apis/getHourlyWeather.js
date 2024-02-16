import { asyncHandler } from "../Utils/AsyncHandler";
import { ERROR_CODES, DEFAULT_ERROR } from "../Constants/errorConstants";
const apiKey = process.env.REACT_APP_WEATHERBIT_API_KEY;

//function to fetch hourly weather forecast. It takes latitude and longitude of a city as input and returns an array containing four objects of the weather forecast of next four hours.Each object has time,temp,icon.
const getHourlyForecast =asyncHandler( async (latitude, longitude) => {
    const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/hourly?&lat=${latitude}&lon=${longitude}&hours=4&key=${apiKey}`);

    //throw if api fails to call
    if (!response.ok) {
        // Use the status code to generate a more specific error message if available
        const errorMsg = ERROR_CODES[response.status] || DEFAULT_ERROR;
        throw new Error(errorMsg);
    }

    //parse the response data
    const parsedData = await response.json(); 

    //obtaining the data array from the api response containing the details of hourly forecast
    let data = parsedData.data;


    //obtaining the required fields
    const hourlyData = data.reduce((accumulator, current) => {
        const {temp} = current;
        const time = new Date(current.timestamp_local).getHours()+":00";
        const {icon} = current.weather;

        accumulator.push({
            temp,
            time,
            icon
        });

        return accumulator;
    },[]);

    //return the array
    return hourlyData;  
});

export default getHourlyForecast;