"use client";
import { motion } from 'framer-motion'
import React from 'react'
import Resume from '@/components/Resume/page';
import SocialMedia from '@/components/NavBar/SocialMedia/page';
import { TextGenerateEffect } from '@/components/TextGenerateEffect/page';
import { Link } from 'react-scroll';

const InfoContainer = () => {
  return (
    <div className="h-[80vh] portrait:w-[60vw] md:w-[50vw] lg:w-[55vw] flex flex-col items-start justify-center portrait:mt-[12vh] sm:mt-[10vh] md:h-full md:pt-10 md:gap-[min(1vw,10px)] landscape:pt-16 landscape:pr-8 lg:pr-[min(1vw,10px)]">
      <div className="portrait:px-0 portrait:text-[8vw] portrait:min-h-[12vw] sm:px-0 sm:text-[8vw] sm:min-h-[10vh] landscape:text-[3.5vw] landscape:min-h-[6vw] landscape:min-w-[40vw] landscape:flex landscape:items-start landscape:justify-start landscape:gap-[1vw] md:last:hidden lg:last:inline-block overflow-y-hidden md:w-[50vw] flex items-start justify-between font-bold text-white ">
        <h1>
          <span className='portrait:hidden sm:hidden lg:inline-block'>This is </span>
          <span className='text-secondary portrait:mr-[2vw] sm:mr-[1vw] md:mr-0'> Ravi </span> 
          <span>Kumar </span>
          <span className='text-secondary portrait:hidden sm:hidden md:inline-block'> Chavva</span></h1>
      </div>
      <h3 className="portrait:hidden sm:block sm:text-xl md:text-2xl md:mb-[2vh] lg:block lg:text-2xl xl:text-3xl font-bold text-white">
        Aspiring Data Scientist
      </h3>
      <TextGenerateEffect words="Welcome to to my data science portfolio!
        Explore my journey into data analysis, machine learning, and data visualizations."
        className="portrait:hidden vs:hidden sm:hidden landscape:w-[50vw] landscape:pt-[5vh] landscape:text-xl lg:block md:text-[1.7vw] md:w-[min(40vw,70rem)] md:font-normal text-white lg:text-[2vh]"/>
      <div className="h-[20vh] flex justify-center items-center gap-[2vw] portrait:flex-col portrait:gap-10 portrait:mt-8 sm:flex-row landscape:pt-[5vh] font-semibold">
          <Link to={"Portfolio"} smooth={true} duration={1000}>
          <motion.button whileHover={{ scale: 1.15 }} className="font-semibold bg-secondary hover:bg-secondary-foreground hover:text-black px-2 text-white text-lg rounded-md sm:hidden portrait:hidden lg:inline-block lg:h-8">Portfolio</motion.button>
          </Link>
          <div className='lg:hidden'><Resume /></div>
          <div className='lg:hidden'><SocialMedia /></div>
          <Link to={"Contact"} smooth={true} duration={1000}>
          <motion.button whileHover={{ scale: 1.15 }} className="font-semibold bg-white hover:bg-secondary-foreground px-2 text-black text-lg rounded-md sm:hidden lg:inline-block lg:h-8">Contact</motion.button>
          </Link>
      </div>
    </div>
  )
}

export default InfoContainer