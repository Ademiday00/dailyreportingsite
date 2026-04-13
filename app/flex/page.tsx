"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faShieldAlt,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";

export default function Flex() {
  return (
    <div className="px-4 md:px-8 font-sans">
      
      <h1 className="mt-20 text-center text-black text-3xl md:text-4xl font-bold ">
        Features for Daily Reporting System
      </h1>

      
      <p className=" font-bold text-center max-w-3xl mx-auto my-6 text-blue-800 dark:text-sky-800 text-base md:text-lg">
        Transform lift operations with real-time technician reporting, automated
        documentation, and complete operational visibility.
      </p>

      
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 justify-items-center text-black ">
        
        
        <div className="bg-white text-center  font-bold rounded-lg border border-white/10 p-5 drop-shadow-lg max-w-sm">
          <FontAwesomeIcon
            icon={faFileLines}
            className="text-3xl mb-4 transition-transform hover:scale-110"
          />
          <p className="mb-2">Access to Reports</p>
          <p className="font-light text-xs">
            All reports and media are automatically organized and stored in a
            structured folder system, eliminating manual filing and paperwork.
          </p>
        </div>

       
        <div className="bg-white text-center  font-bold rounded-lg border border-white/10 p-5 drop-shadow-lg max-w-sm">
          <FontAwesomeIcon
            icon={faCamera}
            className="text-3xl mb-4"
          />
          <p className="mb-2">Media-Based Evidence</p>
          <p className="font-light text-xs sm:text-xs md:text-xs">
            Supports image and video uploads to validate completed tasks,
            inspections, and fault resolutions, improving transparency and trust.
          </p>
        </div>

      
        <div className="bg-white text-center  font-bold rounded-lg border border-white/10 p-5 drop-shadow-lg max-w-sm">
          <FontAwesomeIcon
            icon={faShieldAlt}
            className="text-3xl mb-4 transition-transform hover:scale-110"
          />
          <p className="mb-2">Workflow Visibility</p>
          <p className="font-light text-xs sm:text-xs md:text-xs">
            Supervisors and management can easily review technician activities,
            job progress, and completed tasks without relying on phone calls or
            paper reports.
          </p>
        </div>

      </div>
    </div>
  );
}
