'use client'
import React, { useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import loading from '../../lottie/logo.json'

const WithLoading = (props: any) => {
  const { isLoading, setIsLoading } = props

  useEffect(() => {
    setIsLoading(true)

    const timer = setTimeout(
      () => {
        setIsLoading(false)
      }
      , 1700)

    return () => clearTimeout(timer);
  }, [])

  return (
    <div>
      {
        isLoading && <Lottie animationData={loading} style={{ height: "100vh" }} />
      }
    </div>
  )
}

export default WithLoading