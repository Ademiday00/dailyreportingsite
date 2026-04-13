"use client";

import Image from "next/image";
import { faFacebookF, faLinkedinIn, faInstagram, faXTwitter } 
  from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function About() {
  return (
    <div className="bg-gray-800 font-sans text-white px-4 md:px-10 lg:px-20 py-10">
      
     
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/VipLift.jpeg"
              alt="Logo"
              width={70}
              height={20}
              className="object-contain"
            /> 
            <p className="font-bold text-lg md:text-sm lg:text-2xl mt-1">
              Daily Reporting System
            </p>
          </div>

          <p className="text-xs mb-6 leading-relaxed">
            <span className="font-bold text-sm">VIP Lift</span> daily reporting system is a secure, web-based reporting platform designed to simplify how lift (elevator) technicians document and manage their daily work. The platform enables technicians to submit detailed daily reports with written notes, photos, and videos, while automatically organizing all records in a structured system for easy access and review.
          </p>

          
          <div className="flex gap-3 mt-2">
            {[faFacebookF, faLinkedinIn, faXTwitter, faInstagram].map((icon, idx) => (
              <Link key={idx} href="/" target="_blank">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <FontAwesomeIcon icon={icon} className="text-black text-sm md:text-base" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        
        <div className="flex-1 flex flex-col sm:flex-row gap-10 lg:gap-20 mt-8 lg:mt-0">
          
          
          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-lg md:text-xl">Quick Links</h2>
            <Link href="/"><p className="hover:text-teal-400 cursor-pointer text-sm">Home</p></Link>
            <Link href="/about"><p className="hover:text-teal-400 cursor-pointer text-sm">About</p></Link>
            <Link href="/how-it-works"><p className="hover:text-teal-400 cursor-pointer text-sm">How it works</p></Link>
            <Link href="/reports"><p className="hover:text-teal-400 cursor-pointer text-sm">Reports</p></Link>
          </div>

         
          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-lg md:text-xl">Platform</h2>
            <Link href="/dashboard"><p className="hover:text-teal-400 cursor-pointer text-sm sm:text-xs md:text-xs">Dashboard</p></Link>
            <Link href="/reports"><p className="hover:text-teal-400 cursor-pointer text-sm sm:text-xs md:text-xs">View Reports</p></Link>
            <Link href="/login"><p className="hover:text-teal-400 cursor-pointer text-sm sm:text-xs md:text-xs">Get Started</p></Link>
          </div>

          
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-lg md:text-xl">Contact</h2>
            <p className="text-xs sm:text-xs md:text-xs">Address: 26, grace anjous drive lekki phase 1</p>
            <p className="text-xs sm:text-xs md:text-xs ">Email: info@viplift.com</p>
            <p className="text-xs sm:text-xs md:text-xs">Phone: +234 902 196 0409</p>
          </div>

        </div>
      </div>

     
      <div className="mt-10 border-t border-white/30 pt-4 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="flex items-center gap-2 text-sm md:text-base">
          <FontAwesomeIcon icon={faCopyright} /> 2026 VIP Lift
        </p>
        <p className="text-sm md:text-base">All rights reserved.</p>
      </div>

    </div>
  );
}