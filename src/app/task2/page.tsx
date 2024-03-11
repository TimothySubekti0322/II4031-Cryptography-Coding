"use client";

import RC4 from "@/utils/RC4";
import React, { useState } from "react";

const Page = () => {
  const [inputText, setInputText] = useState("");
  const [key, setKey] = useState("");
  const [output, setOutput] = useState("");

  const handleClick = (type: string) => {
    if (type === "encode") {
      setOutput(RC4.encrypt(inputText, key));
    } else {
      setOutput(RC4.decrypt(inputText, key));
    }
  };
  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center gap-y-8">
      <div className="flex flex-col">
        <label>Input Text</label>
        <input
          name="inputText"
          type="text"
          className="text-black"
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label>Key</label>
        <input
          name="inputKey"
          type="text"
          className="text-black"
          onChange={(e) => setKey(e.target.value)}
        />
      </div>
      <div className="flex gap-x-4">
        <button
          className="px-4 py-2 bg-blue-500 rounded-xl"
          onClick={() => handleClick("encode")}
        >
          Encode
        </button>
        <button
          className="px-4 py-2 bg-blue-500 rounded-xl"
          onClick={() => handleClick("decode")}
        >
          Decode
        </button>
      </div>

      <p className="">Output : {output}</p>
    </div>
  );
};

export default Page;
