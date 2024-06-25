import React from 'react'
import Lottie from 'lottie-react'
import LottieRainBow from './../../lottie/rainbow.json'
import './style.css'

const SunShine = () => {
  return (
    <div className='sunCon'>
      <Lottie style={{ opacity: 0.3, zIndex: 1000 }} animationData={LottieRainBow} loop={true} />
    </div >
  )
}

export default SunShine