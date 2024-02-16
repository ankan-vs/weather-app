import React from 'react'

export default function ForecastTemplate({temp,time,image}) {

    const getImage=(icon)=>{
        return `https://www.weatherbit.io/static/img/icons/${icon}.png`
    }

  return (
    <div>
        <div><b>{time}</b></div>
        <div><img style={{width:"50px"}} src={getImage(image)} alt="" /></div>
        <div><b>{temp}</b></div>
    </div>
  )
}
