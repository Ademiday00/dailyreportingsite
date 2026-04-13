
import Image from "next/image";
import Link from "next/link";
import Flex from "../app/flex/page"
import Benefit from "../app/benefit/page"
import ViewRepoort from "../app/viewreport/page"
import Lift from "../app/liftimg/page"
import About from "../app/about/page"
import Navbar from "../app/navbar/page"


export default function Home() {
  
  return (
    < div className="font-sans ">
    
       <Navbar/>
       <div className="mb-10 relative w-full  min-h-screen bg-[url('/images/Elevator.jpeg')] bg-contain bg-no-repeat bg-center" style={{ backgroundSize: "100% 100%" }}>
 
  <div className=""></div>

  <div className="inset-0 flex flex-col items-center justify-center text-center px-4 mt-16 md:mt-24">
   
  <p className="bg-white/30 backdrop-blur-none text-white font-bold rounded-lg border border-white px-3 py-3 text-2xl md:text-4xl drop-shadow-lg mt-50 sm:text-xl md:text-xl">
    Daily Reporting System
  </p>

  <p className="mt-8 text-white  font-bold text-2xl md:text-3xl drop-shadow-lg max-w-4xl">
    Easy daily reporting, Real-time record access and Smarter work operations.
  </p>

</div>

  
  <ViewRepoort/>
  
</div>

       
       
<Flex/> 
<Lift/>
   <About/>
    </div>
  );
}
