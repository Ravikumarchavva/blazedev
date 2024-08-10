'use client';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { FaLinkedinIn, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const mailtoLink = `mailto:ravikumarchavva@outlook.com?subject=Message from ${formData.name}&body=Name: ${formData.name}%0AEmail: ${formData.email}%0AMessage: ${formData.message}`;
    window.location.href = mailtoLink;
  };

  return (
    <div
      id="Contact"
      className="relative min-h-[90vh] flex flex-col items-center justify-center px-[5vw] pt-[10vh] 
    dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background to-primary rounded-t-2xl"
    >
      <div
        className="min-h-[80vh] my-[5vh] w-full bg-primary dark:bg-transparent rounded-md flex flex-col lg:flex-row 
      items-center justify-around text-white overflow-auto"
      >
        <div
          className="w-full lg:w-1/2 h-full mx-[1vw] flex flex-col items-center justify-around p-5 
        lg:portrait:w-full lg:portrait:h-auto gap-5"
        >
          <h1 className="text-5xl font-semibold portrait:text-3xl portrait:underline portrait:underline-offset-[1vh]">
            Contact Me
          </h1>
          <p className="text-center md:px-[5vw] portrait:px-[5vh] portrait:hidden sm:hidden lg:inline-block">
            Whether you&apos;re a fellow enthusiast, a potential collaborator, or someone intrigued by the endless
            possibilities of data science, I&apos;m excited to connect with you.
            <span className="sm:hidden lg:inline">
              Let&apos;s embark on this thrilling journey together and unlock the potential of data-driven insights!
            </span>
          </p>
          <p className="md:hidden portrait:inline-block sm:inline-block">Wanna collaborate or contact me?</p>

          {/* Contact Methods */}
          <div className="flex flex-col gap-5 mt-5">
            <div className="flex items-center gap-4 pb-2">
              <FaLinkedinIn className="text-2xl" />
              <div>
                <h2 className="text-lg font-medium">LinkedIn</h2>
                <Link
                  href="https://www.linkedin.com/in/ravikumar-chavva"
                  target="_blank"
                  className="text-[#dadada] underline underline-offset-4"
                >
                  ravikumar-chavva
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4 pb-2 portrait:hidden sm:flex">
              <FaPhoneAlt className="text-2xl" />
              <div>
                <h2 className="text-lg font-medium">Phone</h2>
                <a href="tel:+916304424091" className="text-[#dadada] underline underline-offset-4">
                  +91 630 442 4091
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4 pb-2">
              <MdEmail className="text-2xl" />
              <div>
                <h2 className="text-lg font-medium">E-mail</h2>
                <a href="mailto:ravikumarchavva@outlook.com" className="text-[#dadada] underline underline-offset-4">
                  ravikumarchavva@outlook.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <motion.form
          whileHover={{ scale: 1.02 }}
          onSubmit={handleSubmit}
          className="w-full lg:w-1/2 min-h-full mx-[1vw] bg-primary shadow-xl flex flex-col items-center py-10 rounded-md 
          portrait:w-[95%] portrait:h-auto portrait:mt-5 p-5"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required={true}
            value={formData.name}
            onChange={handleChange}
            className="w-[80%] p-3 my-2 text-black bg-white border border-gray-300 rounded-md shadow-sm 
            focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required={true}
            value={formData.email}
            onChange={handleChange}
            className="w-[80%] p-3 my-2 text-black bg-white border border-gray-300 rounded-md shadow-sm 
            focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          />
          <textarea
            rows={7}
            name="message"
            placeholder="Your Message"
            required={true}
            value={formData.message}
            onChange={handleChange}
            className="w-[80%] p-3 my-2 text-black bg-white border border-gray-300 rounded-md shadow-sm 
            focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          />
          <Button className="w-[80%] mt-5 bg-secondary py-3 rounded-md shadow hover:bg-accent-foreground hover:text-black">
            Send Message
          </Button>
        </motion.form>
      </div>
    </div>
  );
};

export default Contact;
