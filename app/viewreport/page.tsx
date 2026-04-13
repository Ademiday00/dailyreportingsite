import Link from "next/link";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Getstarted() {
  return (
    <div className="mt-20 flex flex-col sm:flex-row gap-6 sm:gap-20 justify-center items-center px-4 font-sans">
      
     
      <div className="flex gap-3 font-serif w-full sm:w-50 justify-center text-center bg-gradient-to-r from-indigo-500 to-teal-400 p-5 rounded-lg shadow-lg hover:shadow-indigo-500/50 font-bold">
        <Link href="/login">
          <button className="cursor-pointer">
            Get Started
          </button>
        </Link>
        <FontAwesomeIcon icon={faArrowRight} />
      </div>

     
      <div className=" w-full sm:w-50 text-center bg-white/30 backdrop-blur-none p-5 rounded-lg shadow-lg hover:shadow-indigo-500/50 font-bold">
        <Link href="/login">
          <button className="cursor-pointer">
            View Report
          </button>
        </Link>
      </div>

    </div>
  );
}
