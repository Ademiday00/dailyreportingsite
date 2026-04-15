"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function WelcomeNavbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter()

  return (
    <>
      <nav className="flex justify-between items-center font-sans  md:my-9">
        

        <div className="text-black hidden md:flex 
                space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-6 xl:space-x-8">
  

  <Link 
    href="" 
    className=" text-xs  font-bold p-1.5 sm:p-2 md:p-2 lg:p-3 rounded-lg border "
  >
    Reports
  </Link>



  <Link 
    href="/attendance" 
    className=" text-xs  font-bold p-1.5 sm:p-2 md:p-2 lg:p-3 rounded-lg border "
  >
    Attendance
  </Link>

  <Link 
    href="/" 
    className="text-xs  font-bold p-1.5 sm:p-2 md:p-2 lg:p-3 rounded-lg border "
  >
    Logout
  </Link>

  <Link 
    href="" 
    className=" text-xs  font-bold p-1.5 sm:p-2 md:p-2 lg:p-3 rounded-lg border"
  >
    Profile
  </Link>
</div>


      
        <button
          className="md:hidden text-3xl font-bold text-black"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>
      </nav>

      
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}


     
      <div
        className={`fixed top-0 right-0 h-screen w-64 bg-white z-50
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 flex flex-col gap-4 font-serif text-sm font-bold">
          <button className="self-end text-xl" onClick={() => setOpen(false)}>
            ✕
          </button>

          <div className="flex items-center">
                    <Image
                      src="/VipLift.jpeg"
                      alt="Logo"
                      width={70}
                      height={50}
                      className="mb-1"
                    /> 
                  </div>
          <Link href="" onClick={() => setOpen(false)} className="text-xs font-sans">Reports</Link>
          <Link href="/attendance" onClick={() => setOpen(false)}  className="text-xs font-sans">Attendance</Link>
          <Link href="/" onClick={() => setOpen(false)}  className="text-xs font-sans">Logout</Link>
          <Link href="" onClick={() => setOpen(false)}  className="text-xs font-sans">Profile</Link>
        </div>
      </div>
    </>
  );
}
