"use client";
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import Document from '../DocumentViewer/page';


const Resume = () => {
  const [showDocument,setShowDocument] = useState(false);

  const openDocument = () => setShowDocument(true);
  const closeDocument = () => setShowDocument(false);
    
  return (<div>
    <Document show={showDocument} onClose={closeDocument}>
        <iframe src="/plaineresume.pdf" className="w-full h-[80vh]" />
      </Document>
        <motion.button whileHover={{ scale: 1.05 }} onClick={openDocument} className='h-8 font-semibold bg-secondary hover:bg-secondary-foreground hover:text-black px-2 text-white text-lg rounded-md'>Resume</motion.button>
  </div>
  )
}

export default Resume