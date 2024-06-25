'use client'
import { useEffect, useRef, useState, memo } from "react";
import Lottie from 'lottie-react'
import CountUp from 'react-countup';
//@ts-ignore
import { Fade } from 'react-reveal';
import Heading from "./components/Heading";
import { TbArrowDownRight, TbArrowUpRight } from "react-icons/tb";
import { FaCircle } from "react-icons/fa";
import axios from "axios";
import ProfileSlider from "./components/ProfileSlider";
import TradingViewWidget from "./components/TradingViewWidget";
import CustomChart from './components/Chart'
import SunShine from "./components/SunShine/SunShine";
import PriceCountUp from './components/PriceCountUp'
import LottieChart from './lottie/charts.json'
//@ts-ignore
function Home() {
  const [graphToggler, setGraphToggler] = useState("10")
  const [timeToggler, setTimeToggler] = useState('D');
  const [price, setPrice] = useState<string>("0")
  const [flag, setFlag] = useState<boolean>(false)
  const priceRef = useRef<HTMLDivElement>(null);
  const priceChangeRef = useRef<HTMLDivElement>(null);
  const [priceLoadingState, setPriceLoading] = useState(true);

  const getSOLPriceChange = async () => {
    const _tData = await axios.get(`https://api.dexscreener.com/latest/dex/tokens/So11111111111111111111111111111111111111112`).then(res => res.data.pairs[0]).catch(() => { })
    if (Object.keys(_tData).length)
      if (priceChangeRef.current) {
        priceChangeRef.current.innerHTML = _tData.priceChange.h6;
        if (_tData.priceChange.h6 < 0)
          setPriceLoading(false)
        else setPriceLoading(true)
      }
  }
  useEffect(() => {
    const timer = setInterval(getSOLPriceChange, 5000)
    return () => clearInterval(timer);
  }, [])

  useEffect(() => {

    const socket = new WebSocket("wss://wspri.okx.com:8443/ws/v5/ipublic");

    socket.onopen = () => {
      socket.send(`{"op":"subscribe","args":[{"channel":"tickers","instId":"SOL-USDC"},{"channel":"cup-tickers-3s","ccy":"USDC"},{"channel":"mark-price","instId":"SOL-USDC"},{"channel":"index-tickers","instId":"SOL-USD"}]}`);
    };

    socket.onmessage = (event) => {

      const data = JSON.parse(event.data);

      if (data?.data?.length == 0 || data?.data === undefined) {
        return;
      }

      const { markPx } = data.data[0];

      if (markPx === undefined) {
        return;
      }

      // if (priceRef.current) {
      //   priceRef.current.innerHTML = markPx;
      // }

      if (!flag) {
        setPrice(markPx)
        setFlag(true)
      }
    }

    return () => {
      socket.close()
    }
  }, [flag])

  return (
    <div className="font-bold min-h-screen pb-[50px] sm:pb-[240px]">

      {/* HOME SECTION */}
      <Fade bottom>
        <section className="bg-main relative" style={{ position: 'relative' }}>
          <SunShine />
          <Fade bottom>
            {/* <div> */}
            <img className="troImg" src={"/assets/images/1.png"} />
            {/* </div> */}
          </Fade>
          <Fade right>
            <div className="magaa flex flex-col items-center justify-center gap-y-[36px] absolute right-[5%] sm:right-[15%] md:right-2 lg:right-[100px] 2xl:right-[280px] bottom-[40px] md:top-[170px] w-[70%]  xl:w-[500px] 2xl:w-[740px]">
              <img src="/assets/images/about-text.png" />
              <div className="flex flex-row justify-between gap-x-[10px] sm:gap-x-[20px] lg:gap-x-[28px] z-50 ">

                <button className="bg-gradient-to-r from-[#DC2750] to-[#EE703A] flex flex-row justify-center gap-x-[16px] items-center h-[54px] px-[32px] min-[1700px]:px-[76px] rounded-2xl hover:opacity-[80%]">
                  <img src="/assets/images/eth.png" className="hidden sm:block" />
                  <span className="font-[700] text-[14px] tracking-tight leading-[12px] text-[#EEEEEE]">
                    <span className="hidden min-[1700px]:inline-block">Buy with</span> Ethereum
                  </span>
                </button>

                <button className="bg-gradient-to-r from-[#E2EBFB] to-[#B7C0D0] rounded-2xl px-[18px] h-[54px] cursor-pointer hover:opacity-[80%]">
                  <img src="/assets/images/exhange-arrows.png" />
                </button>

                <button className="bg-gradient-to-r from-[#6CA3FF] to-[#155FDC] flex flex-row justify-center gap-x-[16px] items-center h-[54px] px-[32px] min-[1700px]:px-[76px] rounded-2xl hover:opacity-[80%]">
                  <img src="/assets/images/sol.png" className="hidden sm:block" />
                  <span className="font-[700] text-[15px] tracking-tight leading-[12px] text-[#EEEEEE]">
                    <span className="hidden min-[1700px]:inline-block">Buy with</span>  Solana
                  </span>
                </button>

              </div>
            </div>
          </Fade>
        </section>
      </Fade>
      <ProfileSlider />

      {/* ABOUT SECTION */}

      <section id="about" className="about relative min-h-[923px] flex items-start mt-[106px] sm:mt-[144px] pl-[20px] md:pl-[100px] xl:pl-[240px] overflow-hidden">
        <Fade right>
          <img src="/assets/images/bg-about.png" className="absolute hidden sm:block -right-[70%] md:-right-[40%] lg:right-0 top-[111px] max-w-[1440px] max-h-[785px] object-contain bg-no-repeat -z-10" alt="" />
          <img src="/assets/images/bg-about-sm.png" className="absolute block sm:hidden right-0 top-[111px] w-[100% ] max-h-[785px] object-cover bg-no-repeat -z-10" alt="" />
        </Fade>
        <Fade bottom>
          <div className="pr-[20px] pt-2 sm:pt-0">
            <Heading headingTop="MAGAA" headingBottom="About" />

            <div className="max-w-[482px] mt-[30px] sm:mt-[41px]">
              <h1 className="text-[34px] leading-[44px] font-[700] tracking-tighter text-[#E23F49] pr-3">MAKE AMERICA GREAT AGAIN, AGAIN!</h1>

              <div className="font-[500] text-[#C2C2C4] gap-y-[30px] flex flex-col text-[15px] leading-[30px] tracking-tighter mt-[59px]">
                <p>Tired of delusional narcissists trying to take away your guns and freedom of speech?</p>
                <p>Want to keep drag queens out of your local library?</p>
                <p>Find it odd that selling nudes online is the new feminism? </p>
                <p>Do you miss the days where there were only 2 genders?  </p>
                <p>Then say it with your chest and don't mix words; help us <span className="font-[700]">Make America Great Again, Again.</span>
                  A percentage of trading volume is pooled to fund meaningful political advertisements and support conservative non-profits.</p>
              </div>

            </div>
          </div>
        </Fade>
      </section>



      {/* GRAPH SECTION */}

      <section id="tockenomics" className="min-height-[900px]">
        <Fade bottom>
          <div className="pr-[50px] 2xl:pr-[258px] pl-[20px]">
            <Heading headingBottom="Tokenomics" headingTop="MAGAA" />
          </div>
        </Fade>

        <div className="flex token flex-row items-end justify-between">
          <div className="flex flex-col items-start  sm:items-end xl:w-[50%] min-[1700px]:max-w-[845px] ">
            <Fade left>
              <img src="/assets/images/token-img-1.png" alt="" />
            </Fade>
            <Fade top>
              <div className="text-[24px] leading-[30px] pl-[24px] sm:pl-0 mt-[44px] font-[700] flex gap-y-[21px] flex-col tracking-tighter text-[#EEEEEE]">
                <div className="inline-flex items-center gap-x-[10px]" >
                  <FaCircle className="text-[10px] text-[#E23F49]" />
                  <p><span className="text-[#E23F49]">1 billion </span>$MAGAA</p>
                </div>

                <div className="flex flex-col">
                  <div className="inline-flex items-center gap-x-[10px]" >
                    <FaCircle className="text-[10px] text-[#E23F49]" />
                    <p><span className="text-[#E23F49]">7% </span>Sell tax:</p>
                  </div>
                  <div className="flex flex-col sm:flex-row mt-[14px] ml-[20px] gap-x-[6px] gap-y-[14px]">
                    <div className="w-[188px] h-[48px] token-info text-center pt-[9px]">
                      <p className="text-[20px] leading-[30px] font-[500]"><span className="text-[#E23F49] mr-1">3.5% </span>Donations</p>
                    </div>
                    <div className="w-[188px] h-[48px] token-info text-center pt-[9px]">
                      <p className="text-[20px] leading-[30px] font-[500]"><span className="text-[#E23F49] mr-1">3%  </span>Marketing</p>
                    </div>
                    <div className="w-[188px] h-[48px] token-info text-center pt-[9px]">
                      <p className="text-[20px] leading-[30px] font-[500]"><span className="text-[#E23F49] mr-1">0.5% </span>Liquidity</p>
                    </div>
                  </div>
                </div>

                <div className="inline-flex items-center gap-x-[10px]" >
                  <FaCircle className="text-[10px] text-[#E23F49]" />
                  <p><span className="text-[#E23F49]">0% </span>Buy Tax</p>
                </div>
              </div>
            </Fade>
          </div>
          {/* <Fade right>
            <img
              src="/assets/images/token-img-chart.png"
              className="xl:w-[50%] token-img hidden sm:block mt-[50px] 2xl:mt-0"
            />

            <img
              src="/assets/images/token-chart-sm.png"
              className="w-[95%] sm:hidden block mt-[52px]"
            />
          </Fade> */}
          {/* <Roll >
            <CustomChart />
          </Roll> */}
          <Lottie animationData={LottieChart} loop={true} />

        </div>
      </section>

      {/* CHART SECTION BOTTOM */}
      <section id="faq" className="pl-[20px] sm:pl-[100px] xl:pl-[236px] flex flex-col items-start mt-[100px] sm:mt-[195px] pr-[20px] 2xl:pr-0">
        <Fade bottom>
          <div>
            <Heading headingTop="DEXT" headingBottom="DEXtools" />
          </div>
        </Fade>
        <Fade bottom>
          <div className="flex flex-col 2xl:flex-row 2xl:items-end min-h-[117px] mb-[59px] mt-[24px] 2xl:mt-0">
            <h1 style={{ maxWidth: "300px", width: "300px" }} className="gradient-text text-[54px] font-american-x sm:text-[100px] leading-[86px] sm:leading-[116px] font-[400]">
              <span className="text-[50px] font-american-x leading-[58px]">$</span>
              {/* <span ref={priceRef}></span> */}
              {
                flag && <PriceCountUp price={price} />
              }
            </h1>
            {/* <Fade bottom> */}
            <Fade bottom duration={1000}>
              <div className="pb-[18px] ml-[11px]">
                {
                  !priceLoadingState ? <span className="text-[#E23F49] text-[14px] leading-[20px] font-[400] inline-flex items-center">
                    <TbArrowDownRight className="text-[16px] font-bold mr-1" />
                    <p><span ref={priceChangeRef}></span>%</p>
                  </span> : <span className="text-[#5D99FF] text-[14px] leading-[20px] font-[400] inline-flex items-center">
                    <TbArrowUpRight className="text-[16px] font-bold mr-1" />
                    <p><span ref={priceChangeRef}></span>%</p>
                  </span>
                }
                <h2 className="text-[#EEEEEE] text-[20px] leading-[30px] tracking-tighter font-[500]">SOL/USDC</h2>
              </div>
            </Fade>

            <div className="flex sm:flex-row items-end gap-x-[10px] 2xl:ml-[68px] pb-[18px]">
              <Fade bottom duration={1300}>
                <button
                  onClick={() => setGraphToggler("10")}
                  className={` border-[1.5px] ${graphToggler == "10" ? 'radial-button-bg border-[#EE703A]' : 'bg-transparent border-[#75849D]'} rounded-[24px] h-[40px] px-[12px] sm:px-[15px]`}>
                  <img src="/assets/images/button1.png" />
                </button>
              </Fade>
              <Fade bottom duration={1700}>
                <button
                  onClick={() => setGraphToggler("1")}
                  className={` border-[1.5px] ${graphToggler == "1" ? 'radial-button-bg border-[#EE703A]' : 'bg-transparent border-[#75849D]'} rounded-[24px] h-[40px] px-[12px] sm:px-[15px] mr-[17px] sm:mr-[76px]`}>
                  <img src="/assets/images/button2.png" />
                </button>
              </Fade>
              <Fade bottom duration={2100}>
                <button
                  onClick={() => setTimeToggler('D')}
                  className={`  ${timeToggler == 'D' ? 'radial-button-bg-time border-[#6CA3FF] text-[#EEEEEE]' : 'bg-transparent border-[#75849D] text-[#75849D]'}
                rounded-[24px] h-[40px] px-[13px] sm:px-[24px] font-[600] text-[12px] border-[1.5px]`
                  }>
                  24h
                </button>
              </Fade>

              <Fade bottom duration={2500}>

                <button
                  onClick={() => setTimeToggler('3D')}
                  className={`  ${timeToggler == '3D' ? 'radial-button-bg-time border-[#6CA3FF] text-[#EEEEEE]' : 'bg-transparent border-[#75849D] text-[#75849D]'}
                rounded-[24px] h-[40px] px-[15px] sm:px-[24px] font-[600] text-[12px] border-[1.5px]`
                  }>
                  3d
                </button>
              </Fade>
              <Fade bottom duration={2900}>
                <button
                  onClick={() => setTimeToggler('W')}
                  className={`  ${timeToggler == 'W' ? 'radial-button-bg-time border-[#6CA3FF] text-[#EEEEEE]' : 'bg-transparent border-[#75849D] text-[#75849D]'}
                rounded-[24px] h-[40px] px-[15px] sm:px-[24px] font-[600] text-[12px] border-[1.5px]`
                  }>
                  1w
                </button>
              </Fade>
              <Fade bottom duration={3200}>
                <button
                  onClick={() => setTimeToggler('M')}
                  className={`  ${timeToggler == 'M' ? 'radial-button-bg-time border-[#6CA3FF] text-[#EEEEEE]' : 'bg-transparent border-[#75849D] text-[#75849D]'}
                rounded-[24px] h-[40px] px-[15px] sm:px-[24px] font-[600] text-[12px] border-[1.5px]`
                  }>
                  1m
                </button>
              </Fade>

            </div>
            {/* </Fade> */}
          </div>
        </Fade>

        {/* {
          graphToggler==="10"?<img src="/assets/images/chart-line.png" className="hidden sm:block"/>
          : <img src="/assets/images/chart-candle.png" className="hidden sm:block"/>
        } */}

        {/* <img src="/assets/images/chart-candle-sm.png" alt=""className="sm:hidden block w-[100%]" /> */}
        {/* <Fade left delay={500} collapse> */}
        <div className="w-[100%] md:w-[70%] 2xl:w-[1140px]">
          <div className="cus-smoothly">
            <TradingViewWidget timeToggler={timeToggler} graphToggler={graphToggler} />
          </div>
        </div>
        {/* </Fade> */}

        {/* <img src="/assets/images/chart-candle-sm.png" alt="" className="sm:hidden block" /> */}
      </section>

    </div>
  );
}

export default memo(Home)

