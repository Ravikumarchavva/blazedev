import React from 'react'
import { Slides } from './Slides'

const Portfolio = () => {
  return (
    <div id="Portfolio" className='flex flex-col items-center justify-center px-[5vw]'>
      <div className="mt-20 text-5xl text-primary font-semibold dark:text-secondary">
        Portfolio
      </div>
      <Slides />
    </div>
  )
}

export default Portfolio