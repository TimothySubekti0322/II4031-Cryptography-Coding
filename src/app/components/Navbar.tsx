import React from "react";

const Navbar = () => {
  return (
    <div className="fixed w-full bg-gradient-to-b from-[#BEAD62] via-[#BEAD62] to-[#DADA95] h-[4.5rem] p-4 flex items-center gap-x-4">
      <button onClick={() => (window.location.href = "/")}>
        <img src="img/sundial.png" alt="logo" className="w-10"></img>
      </button>
      <button className="ml-12 bg-[#277C5E] text-white py-2 px-10 rounded-lg">Task 1</button>
      <button className="py-2 px-10 rounded-lg hover:bg-[#277C5E]">Task 2</button>
      <button className="py-2 px-10 rounded-lg hover:bg-[#277C5E]">Task 3</button>
    </div>
  );
};

export default Navbar;
