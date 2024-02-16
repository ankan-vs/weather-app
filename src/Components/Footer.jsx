import React from 'react'
import ForecastTemplate from './ForecastTemplate';

export default function Footer({data}) {

  const {threeDayForecastData}=data;


  if(threeDayForecastData!==undefined){
   return (
     <div className='header'>
       <div className="hoursBox" style={{width:"100%",height:"100%",display:"flex",justifyContent:"space-evenly",alignItems:"center"}}>
         {threeDayForecastData.map((detail)=>{
           return <ForecastTemplate key={detail.datetime} temp={detail.temp} image={detail.icon} time={detail.datetime}/> 
         })}
       </div>
     </div>
     )
    }
}
