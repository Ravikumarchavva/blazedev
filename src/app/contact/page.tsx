'use client';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { FaLinkedinIn, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Contact = () => {
  return (
    <div id="Contact" className="relative flex flex-col items-center justify-center px-[5vw] pt-10">
      <div
        className="h-[80vh] my-[5vh] w-full bg-primary border-2 shadow-md rounded-md 
        portrait:min-h-[80vh] portrait:flex-col portrait:h-auto flex items-center justify-around text-white"
      >
        <div
          className="w-1/2 h-[90%] mx-[1vw] flex flex-col items-center justify-around portrait:w-full portrait:h-auto"
        >
          <h1 className="text-[5vh] font-semibold portrait:text-[4vh] portrait:underline portrait:underline-offset-[1vh]">
            CONTACT
          </h1>
          <p className="text-center md:px-[5vw] portrait:px-[5vh] portrait:hidden sm:hidden lg:inline-block">
            Whether you&apos;re a fellow enthusiast, a potential collaborator, or
            someone intrigued by the endless possibilities of data science, I&apos;m
            excited to connect with you.<span className="sm:hidden lg:inline"> Let&apos;s embark on this thrilling journey
            together and unlock the potential of data-driven insights!</span>
          </p>
          <p className="md:hidden portrait:inline-block sm:inline-block">Wanna collaberate or contact me?</p>
          <div className="hidden portrait:flex portrait:items-center portrait:justify-between portrait:gap-[5vw] portrait:py-[2vw]">
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-center gap-2">
                <FaLinkedinIn className="size-5 rounded-sm" color="#fff" />
                <h2 className="text-[3vh] font-medium">LinkedIn</h2>
              </div>
              <Link
                href="https://www.linkedin.com/in/ravikumar-chavva"
                target="_blank"
                className="text-[#dadada] underline underline-offset-4"
              >
                ravikumar-chavva
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center portrait:hidden sm:hidden">
              <div className="flex items-center justify-center gap-2">
                <FaPhoneAlt className="size-5 rounded-sm" color="#fff" />
                <h2 className="text-[3vh] font-medium">Phone</h2>
              </div>
              <p>+91 630 442 4091</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center portrait:hidden">
            <div className="flex items-center justify-center gap-2">
              <FaLinkedinIn className="size-5 rounded-sm" color="#fff" />
              <h2 className="text-[3vh] font-medium">LinkedIn</h2>
            </div>
            <Link
              href="https://www.linkedin.com/in/ravikumar-chavva"
              target="_blank"
              className="text-[#dadada] underline hover:text-slate-400 underline-offset-4"
            >
              ravikumar-chavva
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center portrait:hidden">
            <div className="flex items-center justify-center gap-2">
              <FaPhoneAlt className="size-5 rounded-sm" color="#fff" />
              <h2 className="text-[3vh] font-medium">Phone</h2>
            </div>
            <a href="tel:+916304424091" className="text-[#dadada]">+91 630 442 4091</a>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center gap-2">
              <MdEmail className="size-6 rounded-sm" color="#fff" />
              <h2 className="text-[3vh] font-medium">E-mail</h2>
            </div>
            <a href="mailto:ravikumarchavva@outlook.com" className="text-[#dadada] underline underline-offset-4 hover:text-slate-400">ravikumarchavva@outlook.com</a>
          </div>
        </div>
        <motion.form
          whileHover={{ scale: 1 }}
          className="w-1/2 h-[90%] mx-[1vw] shadow-xl flex flex-col items-center pt-[1vw] portrait:w-[95%] portrait:h-[40vh]"
          action={"/"}
        >
          <input
            type="text"
            placeholder="Your Name"
            required={true}
            className="w-[80%] p-2 my-2 mt-10 portrait:mt-0 text-black bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          />
          <input
            type="email"
            placeholder="Your Email"
            required={true}
            className="w-[80%] p-2 my-2 text-black bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          />
          <textarea
            rows={7}
            placeholder="Your Message"
            required={true}
            className="w-[80%] p-2 my-2 text-black bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          />
          <Button className="w-[80%] mt-10 bg-secondary py-2 rounded-md shadow hover:bg-accent-foreground hover:text-black">
            Send Message
          </Button>
        </motion.form>
      </div>
    </div>
  );
};

export default Contact;
