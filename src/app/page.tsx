import Image from "next/image";
import Card from "./components/Card";

export default function Home() {
  return (
    <main className="bg-[#cabc7d]  min-h-screen w-full">
      <div className=" green1 w-full font-mono text-sm lg:flex">
        <div className="fixed z-0">
          <img className="w-[800px] mt-[-40px] ml-[-40px]" src="img/sundial.png" alt="sundial"></img>
        </div>
          <div className ="block mt-24 z-10 text-[#fcf6e0] w-full ">
              <div className="text-end text-2xl mr-24">
                <p className="">Cryptography & Coding</p>
                <p>Authors:<br/>Timothy Subekti 18221063<br/>Nadira R. A. 18221059</p>
              </div>
            <div className="flex pt-24 place-content-end mr-20">
              <Card />
              <Card />
              <Card />
            </div>
          </div>
      </div>
    </main>
  );
}
