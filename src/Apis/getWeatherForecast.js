import { asyncHandler } from "../Utils/AsyncHandler";
import getCurrentWeather from "./getCurrentWeather";
import getDailyForecast from "./getDailyForecast";
import getHourlyForecast from "./getHourlyWeather";
import getLatitudeLongitude from "./getLatitudeLongitude"


//function that makes four api calls getLatitudeLongitude, getCurrentWeather, getHourlyForecast, getDailyForecast. It takes city name as input and returns status, img, temp, feels_like, humidity, speed,hourlyForecastData, threeDayForecastData.
export const getWeatherForecast = asyncHandler(async (cityName) => {

    //api call for latitude and longitude
    const [latLonError, latLonresult] = await getLatitudeLongitude(cityName);

    //throw error if any
    if(latLonError){
        throw latLonError;
    }
    //obtaining the lat and lot from the result
    const {lat, lon, city_name} = latLonresult;

    //parallel api calls for current weather, hourly data, and daily data.
    const [currentResult, hourlyResult, dailyResult] = await Promise.all([getCurrentWeather(lat, lon), getHourlyForecast(lat, lon), getDailyForecast(lat, lon)]);


    //destructuring responses
    const [currentWeatherError, currentWeatherResult] = currentResult;
    const [hourlyForecastError, hourlyForecastData] = hourlyResult;
    const [dailyForecastError, threeDayForecastData] = dailyResult;


    //checking if any api call resulted error
    if(currentWeatherError || hourlyForecastError || dailyForecastError){
        throw currentWeatherError || hourlyForecastError || dailyForecastError;
    }

    //destructuring the fields from current weather data
    const {status, img, temp, feels_like, humidity, speed} = currentWeatherResult;

    //returns the data
    return {city_name, status, img, temp, feels_like, humidity, speed,hourlyForecastData,threeDayForecastData}
});

