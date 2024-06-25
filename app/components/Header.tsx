'use client'
import React, { useState } from 'react'
import Lottie from "lottie-react";
import HeaderLogo from '../lottie/logo.json'
//@ts-ignore
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
//@ts-ignore
import { Link } from 'react-scroll';
import { BsTwitterX } from "react-icons/bs";
//@ts-ignore
import { FaDiscord, FaTelegramPlane } from "react-icons/fa";
//@ts-ignore
import { CgClose } from 'react-icons/cg';

const Header = () => {
    const [isSideBarOpened, setIsSideBarOpened] = useState(false)
    function handleSideBarClick() {
        setIsSideBarOpened(!isSideBarOpened)
    }
    return (
        <>
            <div className='relative px-[40px] lg:px-[90px] xl:px-[150px] 2xl:px-[240px] h-[218px] hidden md:flex gap-x-[30px] lg:gap-x-[40px]
              xl:gap-x-[80px] 2xl:gap-x-[90px] flex-row items-center justify-center text-[#75849D] text-[14px] lg:text-[16px] tracking-tighter
              leading-[20px] font-semibold'>
                <Link to="about" spy={true} smooth={true} className='hover-effect'>About</Link>
                <Link to="tockenomics" spy={true} smooth={true} className='hover-effect'>Tockenomics</Link>
                <Link to="faq" spy={true} smooth={true} className='hover-effect'>FAQ</Link>
                <a href="/" className="cursor-pointer">
                    <img src="/assets/images/avatar.png" style={{ marginTop: "15px", width: "150px", height: "150px", minWidth: "150px" }} className='relative bottom-[20px] w-[160px] lg:w-auto lg:h-auto' alt="Not THtere" />


                </a>
                <a href="https://coinmarketcap.com/" target='_blank' className='hover-effect'>CoinMarketCap</a>
                <a href="https://www.coingecko.com/" target='_blank' className='hover-effect'>CoinGecko</a>
                <a href="https://etherscan.io/" target='_blank' className='hover-effect' >Etherscan</a>

                <img className='absolute w-full lg:w-auto left-0  2xl:left-[14%] -top-[0px] -z-[1]' src="/assets/images/nav-logo-blur.png" alt="Not THtere" />
            </div>

            {/* NAVBAR MOBILE */}

            <div className='relative px-[20px] h-[98px] flex md:hidden  flex-row items-start pt-[37px] justify-between text-[#E2EBFB] text-[24px]
             tracking-tighter leading-[20px] font-semibold'>
                <HiMiniBars3CenterLeft className='text-[28px]' onClick={handleSideBarClick} />
                <a href="/">
                    <img src="/assets/images/nav-logo-mobile.png" className='relative bottom-[12px]' alt="Not THtere" />
                </a>
                <div className='flex flex-row gap-x-[10px]'>
                    <a href="#">
                        <BsTwitterX />
                    </a>
                    <a href="#">
                        <FaTelegramPlane />
                    </a>
                    <a href="#">
                        <FaDiscord />
                    </a>
                </div>
            </div>

            {/* SideBar */}
            <div
                className={`absolute z-10 top-0 ${isSideBarOpened ? 'left-0' : '-left-[100%]'} text-[#d0def7] text-[17px] bg-[#2e355f] w-full h-full
                 transition-all duration-500 flex flex-col items-center justify-start pt-[100px] gap-y-[20px]`}
            >
                <img src="/assets/images/nav-logo-mobile.png" alt="Not THtere" />

                <a href="#" className='mt-[50px]'>About</a>
                <a href="">Tockenomics</a>
                <a href="">FAQ</a>
                <a href="">CoimMarketCap</a>
                <a href="https://www.coingecko.com/" target='_blank'>CoinGecko</a>
                <a href="">Etherscan</a>

                <CgClose className={`absolute left-6 top-8 text-[25px]`} onClick={handleSideBarClick} />

            </div>
        </>
    )
}

export default Header