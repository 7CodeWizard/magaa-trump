'use client'
import React, { useState, useEffect } from 'react'
import { Fade } from 'react-reveal';
import WithLoading from './components/Loading'
import Header from './components/Header'
import Footer from './components/Footer'

const Provider = (
  {
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>
) => {
  const [isLoading, setIsLoading] = useState(true)
  return (
    <>
      {
        isLoading ? <WithLoading isLoading={isLoading} setIsLoading={setIsLoading} /> :
          <div>
            <Fade bottom>
              <Header />
            </Fade>
            {children}
            <Footer />
          </div>
      }
    </>
  )
}

export default Provider