import React from "react";

interface NavProps {
  currPage: string;
}

const Navbar: React.FC<NavProps> = ({currPage}) => {
  return (
    <div className= "fixed w-full bg-gradient-to-b from-[#BEAD62] via-[#BEAD62] to-[#DADA95] h-[4.5rem] p-4 flex items-center gap-x-4">
      <button onClick={() => (window.location.href = "/")}>
        <img src="img/sundial.png" alt="logo" className="w-10"></img>
      </button>
      <button onClick={() => (window.location.href = "/task1")} className= {(currPage ==="task 1" ? "bg-[#319B76] " : "hover:bg-[#319B76] ") + "ml-12  text-white py-2 px-10 rounded-lg"}>Task 1</button>
      <button onClick={() => (window.location.href = "/task2")} className= {(currPage ==="task 2" ? "bg-[#319B76] " : "hover:bg-[#319B76] ") + "text-white py-2 px-10 rounded-lg"}>Task 2</button>
      <button onClick={() => (window.location.href = "/task3")} className= {(currPage ==="task 3" ? "bg-[#319B76] " : "hover:bg-[#319B76] ") + "text-white py-2 px-10 rounded-lg"}>Task 3</button>
    </div>
  );
};

export default Navbar;
