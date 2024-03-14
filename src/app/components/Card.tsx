import React from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

interface CardProps {
  title: string;
  description: string;
  link: string;
}

const Card: React.FC<CardProps> = ({ title, description, link }) => {
  return (
    <div className="w-4/5 flex flex-col items-center bg-[#e18679] rounded-xl mt-8 px-4 py-8 z-10 sm:px-2 sm:py-4 lg:px-4 lg:py-6 2xl:py-8 h-96">
      <h1 className="w-4/5 font-bold sm:text-lg text-2xl md:text-[1.3rem] lg:text-[1.5rem] min-[1130px]:text-[1.75rem] sm:text-start">
        {title}
      </h1>
      <p className="h-80 w-4/5 mt-4 text-sm text-justify sm:text-start sm:text-xs md:text-base lg:text-xs">
        {description}
      </p>
      <Link href={link} className="w-4/5 mt-8 text-lg sm:mt-4 2xl:mt-6">
        <button className="flex justify-center items-center bg-[#FCF6E0] w-full py-3 text-black font-bold rounded-3xl hover:bg-[#EBE5D0]">
          <p className="sm:text-sm md:text-base xl:text-lg">Try it</p>
          <FaArrowRight className="ml-2 text-black sm:text-sm" />
        </button>
      </Link>
    </div>
  );
};

export default Card;
