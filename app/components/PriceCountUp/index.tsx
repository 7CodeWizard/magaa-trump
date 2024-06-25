'use client'
import React, { memo } from 'react'
import CountUp from 'react-countup'

interface Props{
  price: string
}

const PriceCountUp = (props: Props) => {

  const {price} = props
  return(
    <CountUp start={0.0} end={parseFloat(price)} decimals={1} duration={2} />
  )
}

export default memo(PriceCountUp)