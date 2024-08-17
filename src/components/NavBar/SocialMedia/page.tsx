import { motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'
import { FaGithub, FaLinkedin } from'react-icons/fa'

const SocialMedia = () => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className='flex gap-4 bg-white rounded-md px-2 py-1'>
        <motion.button whileHover={{ scale: 1.05 }}><Link href="https://github.com/Ravikumarchavva" target="_blank"><FaGithub className='size-6' color="#000000" /></Link>
        </motion.button>
        <motion.button whileHover={{ scale: 1.05 }}><Link href="https://www.linkedin.com/in/ravikumar-chavva" target="_blank"><FaLinkedin className='size-6' color='#0B66C2' /></Link></motion.button>
    </motion.div>
  )
}

export default SocialMedia