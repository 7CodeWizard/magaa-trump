import React from 'react'
//@ts-ignore
import { BsTwitterX } from 'react-icons/bs'
//@ts-ignore
import { FaDiscord, FaTelegramPlane } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='relative  px-[100px] md:px-[150px] lg:px-[240px] h-[54px] flex mb-[30px] xl:mb-[100px] flex-row items-start   pt-[37px] justify-center sm:justify-between text-[#75849D] text-[14px] tracking-tighter leading-[20px] font-semibold'>
      <span>Copyright © 2024</span>
      <a href="#">
        <img src="/assets/images/nav-logo-mobile.png" className=' hidden sm:block relative bottom-[12px]' alt="Not THtere" />
      </a>
      <div className=' flex-row gap-x-[10px] hidden sm:flex '>
        <a href="#" className='hover-effect'>
          <BsTwitterX className='text-[18px]' />
        </a>
        <a href="#" className='hover-effect'>
          <FaTelegramPlane className='text-[18px]' />
        </a>
        <a href="#" className='hover-effect'>
          <FaDiscord className='text-[18px]' />
        </a>
      </div>
    </div>
  )
}

export default Footer