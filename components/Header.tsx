import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <header className="header_container">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center">
            <div className="text-white text-xl font-bold mr-4 bg-white px-2 py-2 rounded-3xl">
              <Link href="/">
                <Image src="/logo.svg" alt="logo" width={35} height={35} />
              </Link>
            </div>
            <div className="title">
              <Link href="/">
                <h1 className="text-white text-2xl font-bold hover:text-green-200">
                  Image Conversion Tool
                </h1>
              </Link>
            </div>
          </div>
          <div className="flex items-center mt-4 sm:mt-0">
            <Link href="/report">
              <span className="text-white hover:text-green-200 mr-4">
                Report
              </span>
            </Link>
            <Link href="/about">
              <span className="text-white hover:text-green-200">About</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
