import { auth } from '@/auth'
import React from 'react'

const test = async () => {
    const session = await auth();
  return (
    <div className='pt-20'>{JSON.stringify(session)}</div>
  )
}

export default test