"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow font-sans">
        
        <nav className="flex justify-between items-center px-4 md:px-8 lg:px-16 py-3">
          
          
          <div className="flex items-center">
            <Image
              src="/VipLift.jpeg"
              alt="Logo"
              width={60}
              height={45}
              className="object-contain"
            />
          </div>

          
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6 text-black">
            
            <Link
              href="/"
              className="font-sans sm:text-xs md:text-xs lg:text-sm font-bold px-3 py-2 rounded-lg bg-radial-[at_25%_25%] from-white to-zinc-900 to-75%"
            >
              Home
            </Link>

            <Link href="/about" className="font-sans sm:text-xs md:text-xs lg:text-sm font-bold px-3 py-2 rounded-lg border">
              About
            </Link>

            <Link href="/features" className="font-sans sm:text-xs md:text-xs lg:text-sm font-bold px-3 py-2 rounded-lg border">
              Features
            </Link>

            <Link href="/how-it-works" className="font-sans sm:text-xs md:text-xs lg:text-sm font-bold px-3 py-2 rounded-lg border">
              How it works
            </Link>

            <Link href="/login" className="font-sans sm:text-xs md:text-xs lg:text-sm font-bold px-3 py-2 rounded-lg border">
              Login
            </Link>

            <Link href="/signup" className="font-sans sm:text-xs md:text-xs lg:text-sm font-bold px-3 py-2 rounded-lg border">
              Signup
            </Link>
          </div>

          
          <button
            className="md:hidden text-2xl font-bold text-black"
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
          className={`fixed top-0 right-0 h-screen w-64 bg-white z-50 transform transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="p-6 flex flex-col gap-5 font-sans text-sm font-bold text-black">
            
            <button
              className="self-end text-xl"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>

            <Link href="/" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/about" onClick={() => setOpen(false)}>About</Link>
            <Link href="/features" onClick={() => setOpen(false)}>Features</Link>
            <Link href="/how-it-works" onClick={() => setOpen(false)}>How it works</Link>
            <Link href="/login" onClick={() => setOpen(false)}>Login</Link>
            <Link href="/signup" onClick={() => setOpen(false)}>Signup</Link>
          </div>
        </div>

      </div>
    </>
  );
}