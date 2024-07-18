'use client';
// import { Spotlight } from "@/components/ui/SpotLight";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { FaLinkedinIn, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Contact = () => {
  return (
    <div id="Contact" className="relative flex flex-col items-center justify-center px-[5vw] pt-10">
      {/* <Spotlight
        className="-top-60 left-20 md:left-60 md:-top-20"
        fill="white"
      /> */}
      <div
        className="h-[80vh] my-[5vh] w-full bg-primary border-2 shadow-md rounded-md portrait:min-h-[80vh] portrait:flex-col portrait:h-auto flex items-center justify-around text-white"
      >
        <div
          className="w-1/2 h-[90%] mx-[1vw] flex flex-col items-center justify-around portrait:w-full portrait:h-auto"
        >
          <h1 className="text-[5vh] font-semibold portrait:text-[4vh] portrait:underline portrait:underline-offset-[1vh]">
            CONTACT
          </h1>
          <p className="text-center md:px-[5vw] portrait:px-[5vh] portrait:hidden sm:hidden md:inline-block">
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
            <div className="flex flex-col items-center justify-center">
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
          whileHover={{ scale: 1.02 }}
          className="w-1/2 h-[90%] mx-[1vw] shadow-md shadow-background flex flex-col items-center justify-around py-[2vw] portrait:w-[90%] portrait:h-[40vh]"
          action={"/"}
        >
          <input
            type="text"
            placeholder="Your Name"
            required={true}
            className="w-[80%] text-white border-b-2 outline-none bg-transparent placeholder:text-white"
          ></input>
          <input
            type="text"
            placeholder="Your Mail"
            required={true}
            className="w-[80%] text-white border-b-2 outline-none bg-transparent placeholder:text-white"
          ></input>
          <textarea
            rows={5}
            placeholder="Your Message"
            required={true}
            className="w-[80%] text-white border-b-2 outline-none bg-transparent placeholder:text-white"
          ></textarea>
          <button
            type="submit"
            className="w-[40%] portrait:w-[60%] h-[5vh] text-white border-none bg-primary hover:bg-secondary rounded-md shadow-md shadow-background"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default Contact;
