"use client";

import { ChangeEvent, useState } from "react";
import VigenereCipher from "../../utils/VigenereCipher";
import PlayFair, { generateMatrix } from "../../utils/PlayFair";
import Navbar from "../components/Navbar";

interface formDataTypes {
  inputType: number;
  cipher: number;
  inputText: string;
  inputFile: File | undefined;
  key: string;
}

const Form = () => {
  //   console.log(
  //     PlayFair.encrypt("temui ibu nanti malam", "ALNGESHPUBCDFIKMOQRTVWXYZ")
  //   );
  //   console.log(
  //     PlayFair.decrypt("ZB RSFYKUPGL GRKVSNLQV", "ALNGESHPUBCDFIKMOQRTVWXYZ")
  //   );

  const [input, setInput] = useState("");
  const [key, setKey] = useState("");
  const [output, setOutput] = useState("");

  const handleFormChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const [formData, setFormData] = useState<formDataTypes>({
    inputType: 0,
    cipher: 0,
    inputText: "",
    inputFile: undefined,
    key: ""
  })

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
    <div>
      <Navbar />
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#fcf6e0] pt-24">
        <div className="w-full bg-[#b7e8cb] my-8">
          <div className="mx-auto w-60">
            <h1 className="bg-[#fcf6e0] text-center">Enkripsi dan Dekripsi<br/>Ragam Cipher Klasik</h1>
          </div>
        </div>
        <div className="w-1/2 justify-center gap-y-4">
          <form>
            <div>
              <div className="flex m-3">
                <label htmlFor="inputType" className="block mb-2 text-sm md:text-base font-medium text-[#393432] w-36">Input Type</label>
                <select id="inputType"
                  name="inputType"
                  className="bg-[#fcf6e0] border-2 border-[#cabc7d] text-[#393432] text-sm rounded-lg focus:ring-[#E18679] focus:border-[#E18679] block w-full p-2.5" required
                  onChange={handleFormChange}
                >
                  <option key={0} >Text</option>
                  <option key={1} >File</option>
                </select>
              </div>

              <div className="flex m-3">
                <label htmlFor="cipher" className="block mb-2 text-sm md:text-base font-medium text-[#393432] w-36">Cipher</label>
                <select id="cipher"
                  name="cipher"
                  className="bg-[#fcf6e0] border-2 border-[#cabc7d] text-[#393432] text-sm rounded-lg focus:ring-[#E18679] focus:border-[#E18679] block w-full p-2.5"
                  required
                  onChange={handleFormChange}
                >
                  <option key={0} >Vigenere Cipher</option>
                  <option key={1} >Extended Vigenere Cipher</option>
                  <option key={2} >Playfair Cipher</option>
                  <option key={3} >Product Cipher</option>
                  <option key={4} >Affine Cipher</option>
                  <option key={5} >Autokey Vigenere Cipher</option>
                </select>
              </div>

              <div className="flex m-3">
                <label htmlFor="input" className="block mb-2 text-sm md:text-base font-medium text-[#393432] w-36">
                  Input
                </label>
                <input
                  type={formData.inputType == 0 ? "text" : "file"}
                  id="input"
                  className="bg-[#fcf6e0] border-2 border-[#cabc7d] text-[#393432] text-sm rounded-lg focus:ring-[#E18679] focus:border-[#E18679] block w-full p-2.5"
                  onChange={handleFormChange}
                ></input>
              </div>

              <div className="flex m-3">
                <label htmlFor="key" className="block mb-2 text-sm md:text-base font-medium text-[#393432] w-36">
                  Key
                </label>
                <input
                  id="key"
                  className="bg-[#fcf6e0] border-2 border-[#cabc7d] text-[#393432] text-sm rounded-lg focus:ring-[#E18679] focus:border-[#E18679] block w-full p-2.5"
                  onChange={handleFormChange}
                ></input>
              </div>

              <div className="flex w-full gap-x-12 justify-center pt-4 font-bold">
                <button
                  className="bg-[#b7e8cb] border-2 border-[#fcf6e0] text-[#393432] text-md rounded-lg block w-60 p-2.5"
                  onClick={encode}
                >
                  Encode
                </button>
                <button
                  className="bg-[#fcf6e0] border-2 border-[#b7e8cb] text-[#393432] text-md rounded-lg block w-60 p-2.5"
                  onClick={decode}
                >
                  Decode
                </button>
              </div>

            </div>
          </form>
        </div>
        <div className="w-full bg-[#b7e8cb] my-8 h-12">
            <div className="mx-auto w-60 align-middle">
              <h1 className="bg-[#fcf6e0] text-center">Hasil<br/>Dekripsi</h1>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Form;
