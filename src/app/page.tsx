// "use client";
import About from "./about/page";
import Portfolio from "./portfolio/page";
import Contact from "./contact/page";
import Blogs from "./blogs/page";
import InfoContainer from "@/components/InfoContainer/page";


export default function Home() {
  return (
    <div>
      <div id="Home" className="h-[100vh] bg-[url('/tileps1.jpg')] bg-center bg-cover flex flex-col px-[5vw]
            md:bg-[url('/tileps5.jpg')] md:bg-right-bottom 
            landscape:bg-[url('/tileps5.jpg')] landscape:bg-right-bottom relative">
        <InfoContainer /> 
      </div>
        <About />
        <Portfolio />
        <Blogs />
        <Contact />
    </div>
  );
}
