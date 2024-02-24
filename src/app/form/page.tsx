"use client";

import { useState } from "react";
import VigenereCipher from "../../utils/VigenereCipher";
import PlayFair, { generateMatrix } from "../../utils/PlayFair";
import ProductCipher from "../../utils/ProductCipher";

const Form = () => {
  //   console.log(
  //     PlayFair.encrypt("temui ibu nanti malam", "ALNGESHPUBCDFIKMOQRTVWXYZ")
  //   );
  //   console.log(
  //     PlayFair.decrypt("ZB RSFYKUPGL GRKVSNLQV", "ALNGESHPUBCDFIKMOQRTVWXYZ")
  //   );

  // console.log(
  //   "Encrypt : ",
  //   ProductCipher.encyrpt("temui ibu nanti malam", "cipher")
  // );
  // console.log(
  //   "Decrypt : ",
  //   ProductCipher.decrypt("vdkmrebhsmcubcpzkd", "cipher")
  // );

  const [input, setInput] = useState("");
  const [key, setKey] = useState("");
  const [output, setOutput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKey(e.target.value);
  };

  const encode = () => {
    console.log("clicked");
    const result = VigenereCipher.encrypt(input, key);
    setOutput(result);
  };

  const decode = () => {
    const result = VigenereCipher.decrypt(input, key);
    setOutput(result);
  };
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="w-1/2 flex flex-col justify-center gap-y-4">
        <label htmlFor="input" className="text-2xl">
          Input
        </label>
        <input
          id="input"
          className="text-black"
          onChange={handleInputChange}
        ></input>
        <label htmlFor="key" className="text-2xl">
          Key
        </label>
        <input
          id="key"
          className="text-black"
          onChange={handleKeyChange}
        ></input>

        <p className="text-white text-lg">Output : {output}</p>
        <div className="flex w-full gap-x-4">
          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-800"
            onClick={encode}
          >
            Encode
          </button>
          <button
            className="px-4 py-2 bg-red-600 hover:bg-red-800"
            onClick={decode}
          >
            Decode
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
