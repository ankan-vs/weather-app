import React from 'react'
import ForecastTemplate from './ForecastTemplate'

export default function Main({data}) {

  const {hourlyForecastData}=data;


 if(hourlyForecastData!==undefined){
  return (
    <div className='header'>
      <div className="hoursBox" style={{width:"100%",height:"100%",display:"flex",justifyContent:"space-evenly",alignItems:"center"}}>
        {hourlyForecastData.map((detail)=>{
          return <ForecastTemplate key={detail.time} temp={detail.temp} image={detail.icon} time={detail.time}/> 
        })}
      </div>
    </div>
  )
 }
}
