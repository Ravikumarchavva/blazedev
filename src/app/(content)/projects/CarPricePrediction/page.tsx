"use client";
import WarningNote from "@/components/UxWarning/page";
import Example from "./example.mdx";
import CarPriceForm from "@/components/ProjectForms/CarPriceForm";

const CarPricePredictionForm = () => {


  return (
    <div className="project w-full px-[5vw] portrait:px-0 flex flex-col pt-[10vh] portrait:pt-[5vh] items-center justify-center min-h-screen">
      <div className="w-full bg-primary px-[3vw]">
        <CarPriceForm />
      </div>
      <p className="bg-primary w-full text-center text-white">Prices are respect to 2015</p>
       <WarningNote />
      {/* Example MDX Component */}
      <div className="w-full mb-10 bg-primary shadow-2xl prose prose-lg max-w-none p-[5vw] text-white prose-headings:text-white prose-a:text-white prose-strong:text-white prose-code:text-white portrait:px-[5vw] portrait:mb-0">
        <Example />
      </div>
    </div>
  );
};

export default CarPricePredictionForm;
