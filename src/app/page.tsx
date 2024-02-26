import Image from "next/image";
import Card from "./components/Card";

const temporaryDescriptionCard =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

export default function Home() {
  return (
    <main className="bg-[#cabc7d]  min-h-screen w-full overflow-x-hidden sm:h-screen sm:max-h-screen">
      {/* Hero Section */}
      <div className="flex flex-col items-center py-10 w-full sm:h-full sm:relative sm:flex-row sm:overflow-y-hidden">
        <div className="w-full flex flex-col items-center sm:absolute sm:items-end sm:px-8 sm:pt-24 z-20 sm:top-0 xl:pt-16">
          <p className="text-[#FCF6E0] w-full text-center text-[1.6rem] font-bold sm:text-end sm:text-3xl md:text-[2rem] min-[920px]:text-4xl lg:text-[2.5rem] xl:text-5xl">
            Welcome to Our Project
          </p>
          <p className="text-[#597E52] w-4/5 text-center text-xl font-semibold sm:text-end sm:mt-2 sm:text-xl md:text-2xl min-[920px]:text-[1.75rem] lg:text-[2rem] xl:text-4xl">
            Cryptography and Coding
          </p>
        </div>

        <div className="w-4/5 flex flex-col items-center justify-centers mt-8">
          <Image
            src="/img/sundial.png"
            alt="sundial"
            width={300}
            height={300}
            className="sm:h-[110%] sm:w-fit sm:absolute sm:-left-[50%] sm:-top-[5%] md:-left-[45%] min-[920px]:-left-[40%] lg:-left-[25%] min-[1150px]:-left-[15%] xl:h-[140%] xl:-left-[10%] xl:-top-[20%] min-[1440px]:-left-[5%]"
          />
        </div>
        <div className="w-full flex flex-col items-center sm:flex-row sm:absolute sm:bottom-24 lg:pl-[30%] sm:gap-x-4 sm:pr-12 sm:pl-12 xl:bottom-12  2xl:pl-[35%] ">
          <Card
            title="Task 1"
            description={temporaryDescriptionCard}
            link="/task1"
          />
          <Card
            title="Task 2"
            description={temporaryDescriptionCard}
            link="/task2"
          />
          <Card
            title="Task 3"
            description={temporaryDescriptionCard}
            link="/task3"
          />
        </div>
      </div>
      {/* Author Section */}
      <div className="w-full bg-white py-10 flex flex-col items-center text-black">
        <p className="text-[1.6rem] font-bold">Author</p>
        <div className="w-3/5 border-2 border-black mt-2 sm:w-4/5"></div>

        <div className="flex flex-col w-full sm:flex-row items-center sm:mt-8 lg:mt-16">
          <div className="flex flex-col items-center w-full">
            {/* Timothy */}
            <p className="font-semibold mt-12 text-lg sm:mt-0">18221063</p>
            <div className="relative w-full items-center justify-center flex">
              <Image
                src="/img/timothy.jpg"
                alt="timothy"
                width={200}
                height={200}
                className="mt-2 z-10 w-1/2"
              />
              <Image
                src="/img/author-asset-1.png"
                alt="author-asset-1"
                width={150}
                height={100}
                className="mt-2 absolute top-[25%] -left-1 z-0 w-[40%]"
              />
            </div>
            <p className="mt-4 font-bold">Timothy Subekti</p>
            <p className="">Software Engineer</p>
          </div>
          {/* Divider */}
          <Image
            src="/img/author-asset-3.png"
            alt="divider"
            width={300}
            height={20}
            className="-mt-16 sm:hidden"
          />
          <div className="flex flex-col items-center w-full">
            {/* Nadira */}
            <p className="font-semibold text-lg -mt-16 sm:mt-0">18221059</p>
            <div className="relative w-full items-center justify-center flex">
              <Image
                src="/img/nadira.png"
                alt="timothy"
                width={200}
                height={200}
                className="mt-2 z-10 w-1/2"
              />
              <Image
                src="/img/author-asset-2.png"
                alt="author-asset-2"
                width={150}
                height={100}
                className="mt-2 absolute top-[25%] -right-3 z-0 w-[45%]"
              />
            </div>
            <p className="mt-4 font-bold">Nadira Rahmananda Arifandi</p>
            <p className="">Software Engineer</p>
          </div>
        </div>
      </div>
    </main>
  );
}

// Back Up Codes
// <div className="green1 w-full font-mono text-sm lg:flex">
//   <div className="fixed z-0">
//     <img
//       className="w-[800px] mt-[-40px] ml-[-40px]"
//       src="img/sundial.png"
//       alt="sundial"
//     ></img>
//   </div>
//   <div className="block mt-24 z-10 text-[#fcf6e0] w-full ">
//     <div className="text-end text-2xl mr-24">
//       <p>Welcome to Our Project</p>
//       <p className="">Cryptography & Coding</p>
//       {/* <p>Authors:<br/>Timothy Subekti 18221063<br/>Nadira R. A. 18221059</p> */}
//     </div>
//     <div className="flex pt-24 place-content-end mr-20">
//       <Card />
//       <Card />
//       <Card />
//     </div>
//   </div>
// </div>;
