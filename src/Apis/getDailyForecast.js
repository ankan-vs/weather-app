import { asyncHandler } from "../Utils/AsyncHandler";
import { ERROR_CODES, DEFAULT_ERROR } from "../Constants/errorConstants";
const apiKey = process.env.REACT_APP_WEATHERBIT_API_KEY;


//function to fetch daily weather forecast. It takes latitude and longitude of a city as input and returns an array containing three object of the weather forecast of next three days.Each object has datetime,temp,icon.
const getDailyForecast = asyncHandler(async (latitude, longitude) => {
    //api call
    const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${latitude}&lon=${longitude}&key=${apiKey}`);

    //throw error if api call fails
    if (!response.ok) {
        // Use the status code to generate a more specific error message if available
        const errorMsg = ERROR_CODES[response.status] || DEFAULT_ERROR;
        throw new Error(errorMsg);
    }

    //parse the response data
    const parsedData = await response.json();

    //slice the array of forecast containing forecast of next 3 days starting from the next day of call.
    const data = parsedData.data.slice(1, 4);

    //obtaining the required fields from the data.
    const threeDayForecastData = data.reduce((accumulator, current) => {
        const { datetime, temp } = current;
        const { icon } = current.weather;

        accumulator.push({
            datetime,
            temp,
            icon
        });

        return accumulator;
    }, []);

    //returns the array
    return threeDayForecastData;
});

export default getDailyForecast;