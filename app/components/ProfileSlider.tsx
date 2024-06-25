'use client'
import React, { useEffect, useRef, useState } from 'react'
import CountUp from 'react-countup/';
import millify from "millify";
//@ts-ignore
import { TbArrowDownRight, TbArrowUpRight } from 'react-icons/tb'
//@ts-ignore
import Fade from 'react-reveal/Fade'
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import Slider, { Settings } from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from 'framer-motion';
import axios from 'axios';
interface TokenData {
    name: string;
    img: string;
    worth: string;
    percenntage: number;
    graph: string;
}
const data = [
    {
        name: '$MAGAA',
        img: '/assets/images/slider/p1.png',
        worth: 23.45,
        percenntage: +3.95,
        graph: '/assets/images/slider/stat1.png'
    },
    {
        name: '$TREMP',
        img: '/assets/images/slider/p2.png',
        worth: 171.88,
        percenntage: +2.33,
        graph: '/assets/images/slider/stat2.png'
    },
    {
        name: '$MAGAA',
        img: '/assets/images/slider/p1.png',
        worth: 23.45,
        percenntage: -0.23,
        graph: '/assets/images/slider/stat3.png'
    },
    {
        name: '$MAGAA',
        img: '/assets/images/slider/p3.png',
        worth: 23.45,
        percenntage: +3.95,
        graph: '/assets/images/slider/stat1.png'
    },
    {
        name: '$MAGAA',
        img: '/assets/images/slider/p3.png',
        worth: 23.45,
        percenntage: +3.95,
        graph: '/assets/images/slider/stat1.png'
    },
    {
        name: '$MAGAA',
        img: '/assets/images/slider/p3.png',
        worth: 23.45,
        percenntage: +3.95,
        graph: '/assets/images/slider/stat1.png'
    },
    {
        name: '$MAGAA',
        img: '/assets/images/slider/p3.png',
        worth: 23.45,
        percenntage: +3.95,
        graph: '/assets/images/slider/stat1.png'
    },
    {
        name: '$MAGAA',
        img: '/assets/images/slider/p3.png',
        worth: 23.45,
        percenntage: +3.95,
        graph: '/assets/images/slider/stat1.png'
    },

]



const ProfileSlider = () => {
    const [isLoading, setLoading] = useState(false)
    const sliderRef = useRef<Slider>(null);
    // const [canGoNext, setCanGoNext] = useState<boolean>(true);
    // const [canGoPrev, setCanGoPrev] = useState<boolean>(false);
    const [tradingTokens, setTradingTokens] = useState<TokenData[]>([]);
    const handleNextSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    const handlePrevSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };
    const getTokens = async () => {
        try {

            setLoading(true)
            // const pairs = await axios.get("https://dex.mecaw.ai/tokens").then(res => res.data).catch(() => [])
            const _data = ["FU1q8vJpZNUrmqsciSjp8bAKKidGsLmouB8CBdf8TKQv", "3psH1Mj1f7yUfaD5gh6Zj7epE8hhrMkMETgv5TshQA4o", "HaP8r3ksG76PhQLTqR8FYBeNiQpejcFbQmiHbg787Ut1"]
            let tData = []
            for (let i = 0; i < _data.length; i++) {
                const _tData = await axios.get(`https://api.dexscreener.com/latest/dex/tokens/${_data[i]}`).then(res => res.data.pairs[0]).catch(() => { })
                if (Object.keys(_tData).length)
                    tData.push({
                        name: _tData.baseToken.name,
                        img: _tData.info.imageUrl,
                        worth: millify(_tData?.volume?.h6 || 0),
                        percenntage: _tData.priceChange.h6,
                        graph: '/assets/images/slider/stat1.png'
                    })
            }
            setTradingTokens(tData)
            setLoading(false)
        } catch (error) {
            console.log("error", error)
        }

    }
    useEffect(() => {
        // const timer = setInterval(getTokens, 5000)
        getTokens()
        // return () => clearInterval(timer);
    }, [])
    // const handleSliderUpdate = (currentSlide: number) => {
    //     const slideCount = data.length;

    //     let slidesToScroll;
    //     slidesToScroll = 1;
    //     const lastVisibleSlideIndex = currentSlide + slidesToScroll;
    //     setCanGoNext(lastVisibleSlideIndex < slideCount);
    //     setCanGoPrev(currentSlide > 0);
    // };


    const settings: Settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        // afterChange: handleSliderUpdate,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    dots: false,
                    arrows: false,
                    infinite: true,
                    speed: 500,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    // afterChange: handleSliderUpdate,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    dots: false,
                    arrows: false,
                    infinite: true,
                    speed: 500,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    // afterChange: handleSliderUpdate,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    dots: false,
                    arrows: false,
                    infinite: true,
                    speed: 500,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    // afterChange: handleSliderUpdate,
                }
            },
        ]
    };

    return (
        <section className="relative p-5 pl-[294px] slider  pr-[70px]  sm:mt-[135px]">
            {
                !isLoading &&
                <Slider {...settings} className='pl-4 z-20 flex items-end justify-center' ref={sliderRef}>
                    {
                        tradingTokens.map((item, index) => {

                            return (
                                <Fade right duration={1000 + index * 500}>
                                    <div className={`2xl:h-[250px] w-[340px] parent-flex flex-col justify-end `} >
                                        <motion.div
                                            // initial={{ x: 0, y: 30, opacity: 0 }}
                                            // whileInView={{ x: 0, y: ['50px', '0px', '0px'], opacity: 100 }}
                                            // transition={{ duration: .3, delay: 0.2, }}
                                            className={`  w-[340px] h-[180px] flex  group transition-all
                              statistics rounded-[25px]  relative  flex-row items-center justify-between px-[24px] `} key={index}>

                                            <div className="flex flex-col ">
                                                <div className="flex flex-row gap-x-[11px]">
                                                    <div className="w-[27px] h-[27px] rounded-[10px] border border-[#666974] mb-[20px]">
                                                        <img src={item.img} width={12} height={12} style={{ borderRadius: '50%' }} alt="Profile-image" className=" scale-[4] relative top-2 object-fill" />
                                                    </div>
                                                    <span className="text-[#E2EBFB] font-[400] text-[14px] leading-[24px] tracking-tight font-american-x">
                                                        {item.name}
                                                    </span>
                                                </div>

                                                <span className="text-[#E2EBFB] font-[400] text-[30px] leading-[30px] tracking-tight mb-[13px] font-american-x">
                                                    $
                                                    <CountUp start={0.0} end={parseFloat(item.worth)} decimals={2} duration={2} />
                                                    M
                                                </span>
                                                {
                                                    item.percenntage < 0 ? <span className="text-[#E23F49] text-[14px] leading-[20px] font-[400] inline-flex items-center">
                                                        <TbArrowDownRight className="text-[16px] font-bold mr-1" />
                                                        <p>{item.percenntage}%</p>
                                                    </span> : <span className="text-[#5D99FF] text-[14px] leading-[20px] font-[400] inline-flex items-center">
                                                        <TbArrowUpRight className="text-[16px] font-bold mr-1" />
                                                        <p>{item.percenntage}%</p>
                                                    </span>
                                                }

                                            </div>

                                            <img src={item.graph} className="object-contain w-[103px] h-[59px] group" alt="" />

                                        </motion.div>
                                    </div>
                                </Fade>
                            )
                        })
                    }
                </Slider>
            }

            <Fade right duration={2000}>

                <img
                    className='absolute right-0 z-30  hidden lg:block object-cover -top-[429px]'
                    src="/assets/images/slider/B.png"
                    alt="" />
            </Fade>

            <img
                className='absolute right-[15%] z-10 hidden md:block  object-cover -top-[500px]'
                src="/assets/images/slider/bg-slider.png"
                alt="" />

            <div className='inline-flex text-[26px]  z-50 cursor-pointer gap-x-[50%] sm:gap-x-[52px] absolute w-[20%] sm:w-auto left-[40%] sm:left-auto -bottom-[40px] sm:bottom-auto sm:-top-[50px] sm:right-[440px]'>
                <button onClick={handlePrevSlide} className={`hover:text-[#E23F49] hover:opacity-100 transition-all duration-300   opacity-30 text-[#D1D0D1] `}>
                    <FaArrowLeftLong />
                </button>
                <button onClick={handleNextSlide} className={`hover:text-[#E23F49] hover:opacity-100 opacity-30  text-[#D1D0D1]`}>
                    <FaArrowRightLong />
                </button>

            </div>
        </section>
    )
}

export default ProfileSlider