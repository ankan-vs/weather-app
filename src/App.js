import './App.css';
import { useState } from 'react';
import Header from './Components/Header';
import Main from './Components/Main';
import Footer from './Components/Footer';
import { getWeatherForecast } from './Apis/getWeatherForecast';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const [data, setData] = useState({});
  const [city, setCity] = useState("Delhi");

  const getData = async (cityName) => {
    try {
      const [error, data] = await getWeatherForecast(cityName);
      if (error) {
        throw new Error(error);
      } else {
        setData(data);
        setCity(cityName);
      }

    } catch (error) {
      toast.error(`${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

  }


  useEffect(() => {
    getData(city);
  }, [city])

  return (
    <>

      <div className="App">
        <ToastContainer />
        <Header data={data} city={city} setCity={setCity} />
        <Main data={data} />
        <Footer data={data} />

      </div>
    </>
  );
}

export default App;
