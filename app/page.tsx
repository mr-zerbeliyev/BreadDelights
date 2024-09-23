import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <>
     <div className="relative h-screen">
      <Image
        src="/images/croissant.jpg"
        alt="logo"
        fill 
        className="object-cover"
      />
      <div className="absolute flex justify-center w-full items-center h-full">
        <h3 className="text-white text-[70px] font-semibold shadow-md">bread</h3>
      </div>
    </div>
    </>
  );
}
