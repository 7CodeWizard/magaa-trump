import React from 'react'

interface Heading {
    headingTop: string,
    headingBottom: string
}

const Heading = ({ headingTop, headingBottom }: Heading) => {
    let content;
    if (headingBottom === 'Tokenomics') {
        content = (
            <span className='font-american-x'>
                Tokeno<br className='sm:hidden' />mics
            </span>
        );
    } else if (headingBottom === 'DEXtools') {
        content = (
            <span className='font-american-x'>
                DEX<br className='sm:hidden' />tools
            </span>
        );
    } else {
        content = headingBottom;
    }
    return (
        <div className="flex flex-col items-start sm:items-end justify-center ">
            <span className="relative font-[500] font-american-simple text-[20px] sm:text-[40px] text-[#E23F49] leading-[20px] sm:leading-[60px] tracking-wide ml-[20px] sm:ml-0 sm:-bottom-[30px]" >
                <img src="/assets/images/text-bar.png" className="absolute -left-[20px] -top-[5px] w-[29px] h-[24px]" />
                {headingTop}
            </span>

            <h1 className="gradient-text text-[86px] font-american-x sm:text-[100px] xl:text-[180px] leading-[100px] sm:leading[120px] xl:leading-[210px] font-[400]">
                {content}
            </h1>

        </div>
    )
}

export default Heading