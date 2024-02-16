import React,{useState, useEffect} from 'react'
import './Header.css'
import { IoSearch } from "react-icons/io5";

export default function Header({data,city,setCity}) {

  const [cityName,setCityName]=useState();

  const [currentDateTime, setCurrentDateTime] = useState(getDateTime());

  let {status, img, temp, feels_like, humidity, speed}=data;

  temp = Math.round((temp-273.15)*10)/10;
  feels_like = Math.round((feels_like-273.15)*10)/10;


  function getDateTime() {
    let date = new Date();
    return date.toLocaleDateString()+" "+date.getHours()+":"+date.getMinutes();
  }

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentDateTime(getDateTime());
    }, 60000); // Update time every 60 seconds

    return () => clearInterval(timerId); // Cleanup on component unmount
  });

  const setInput=(e)=>{
    setCityName(e.target.value);
  }
  const setCityValue=()=>{
      setCity(cityName);      
      setCityName(cityName);
  }


  // useEffect(()=>{
  //   if(cityName===''){
  //     setCityName("Invalid");
  //   }
  // },[cityName])



  return (
  
    <div className='header'>
      <div className='title'>
        <h4>{currentDateTime}</h4>
        <div className='search'>
            <input type="text" onChange={setInput} placeholder='Enter City.....' />  
            <IoSearch onClick={setCityValue} className='icon'/>
        </div>
      </div> 
      <div className="dataBox">
        <div className="box">
          <div><b>{status}</b></div>
          <div><img src={img} alt="" /></div>
        </div>
        <div className="box">
          <div><b>{city}</b></div>
          <div>{temp}</div>
        </div>
        <div className="box">
          <div><b>Felt : </b>{feels_like}</div>
          <div><b>Humidity :</b> {humidity}</div>
          <div><b>Speed :</b> {speed}</div>
        </div>
      </div>

    </div>
  )
}
