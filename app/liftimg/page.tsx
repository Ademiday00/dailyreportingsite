"use client";
import Image from "next/image";

export default function Lift() {
  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 justify-between px-4 md:px-10 lg:px-20 my-16 ">
      
     
      <div className="text-black font-serif rounded-lg border border-white/10 p-6 shadow-lg  lg:w-1/2">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
          Key Benefits
        </h1>

        <p className="mb-4 text-sm">
          <span className="font-bold">Saves time:</span> It reduces the time
          spent on manual reporting by allowing technicians to submit daily
          reports quickly and efficiently.
        </p>

        <p className="mb-4 text-sm">
          <span className="font-bold">Eliminates manual file sorting:</span> All
          reports, images, and videos are automatically organized into a
          predefined folder structure.
        </p>

        <p className="mb-4 text-sm">
          <span className="font-bold">Organized records:</span> Helps to maintains
          a structured and consistent record system, making it easy to track
          lift activities by date, site, and technician.
        </p>

        <p className="mb-4 text-sm">
          <span className="font-bold">Secure & reliable:</span> The platform uses
          secure authentication and controlled access to protect sensitive data.
        </p>
      </div>

     
      <div className="w-full lg:w-1/2 flex justify-center">
        <Image
          src="/scendimg.jpg"
          alt="Lift illustration"
          width={400}
          height={180}
          className="w-full max-w-md  object-contain"
          priority
        />
      </div>
    </div>
  );
}
