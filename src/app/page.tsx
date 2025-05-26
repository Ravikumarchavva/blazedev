// "use client";
import About from "./(mainPage)/about/page";
import Portfolio from "./(mainPage)/projects/page";
import Contact from "./(mainPage)/contact/page";
import Blogs from "./(mainPage)/blogs/page";
import InfoContainer from "@/components/InfoContainer/page";

export default function Home() {
  return (
    <div>
      <div
        id="Home"
        className="h-[100vh] w-full bg-[url('/tileps1.jpg')] bg-center bg-cover flex flex-col px-[5vw]
            md:bg-[url('/tileps5.jpg')] md:bg-right-bottom 
            landscape:bg-[url('/tileps5.jpg')] landscape:bg-right-bottom relative"
      >
        <InfoContainer />
      </div>
      <Portfolio />
      <About />
      <Blogs />
      <Contact />
    </div>
  );
}
