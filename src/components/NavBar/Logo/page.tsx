import React from 'react'

const Logo = () => {
  return (
        <div className='h-8 z-[50] flex items-center justify-center hover:cursor-default gap-1 bg-secondary px-1 rounded-sm'>
            <div className='text-primary-foreground'>Blaze</div>
            <div className='bg-muted text-muted-foreground font-semibold rounded-md px-1'>Dev</div>
        </div>
  )
}

export default Logo