import React from 'react'
import { DonutChart } from "./DonutChart";
import { data } from "./data";

const CustomChart = () =>{
  return(
    <>
    <DonutChart data={data} width={800} height={800} />
    </>
  )
}

export default CustomChart