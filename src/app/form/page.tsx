"use client";

import { ChangeEvent, useState } from "react";
import VigenereCipher from "../../utils/VigenereCipher";
import PlayFair, { generateMatrix } from "../../utils/PlayFair";
import ProductCipher from "../../utils/ProductCipher";
import Navbar from "../components/Navbar";
import encode from "../../utils/encode";
import decode from "../../utils/decode";
import { Toaster, toast } from "react-hot-toast";

interface formDataTypes {
  inputType: string;
  cipher: string;
  inputText: string;
  inputFile: File | null;
  key: string;
}

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

  // input
  const [input, setInput] = useState("");
  const [inputError, setInputError] = useState("");

  // key
  const [key, setKey] = useState("");
  const [keyError, setKeyError] = useState("");

  // output
  const [output, setOutput] = useState("");

  const handleFormChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    if (name === "inputType") {
      setFormData({
        ...formData,
        inputText: "",
        inputFile: null,
        [name]: value,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const [formData, setFormData] = useState<formDataTypes>({
    inputType: "text",
    cipher: "Vigenere Cipher",
    inputText: "",
    inputFile: null,
    key: "",
  });

  const handleFileRead = async (e: ProgressEvent<FileReader>) => {
    const content = e.target?.result;
    const text = (content as string)
      .split(/["\n"" "]/)
      .join("")
      .split(" ")
      .join("");
    setFormData({ ...formData, inputText: text });
    console.log(text);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      setFormData({ ...formData, inputFile: e.target.files[0] });
      const reader = new FileReader();
      reader.onloadend = handleFileRead;
      reader.readAsText(e.target.files[0]);
    }
  };

  const inputAndKeyInputed = () => {
    if (formData.inputText == "") {
      setInputError("Input cannot be empty");
      return false;
    } else if (formData.key == "") {
      setKeyError("Key cannot be empty");
      return false;
    } else {
      setInputError("");
      setKeyError("");
    }
    return true;
  };

  const downloadTxtFile = () => {
    if (output == "") {
      toast.error("There is no output to download!");
      return;
    } else {
      const element = document.createElement("a");
      const file = new Blob([output], {
        type: "text/plain",
      });
      element.href = URL.createObjectURL(file);
      element.download = "cipher.txt";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    }
  };

  return (
    <div>
      <Toaster />
      <Navbar />
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#fcf6e0] pt-24">
        <div className="flex w-full h-12 my-8">
          <div className="bg-[#289687] grow"></div>
          <div className="bg-[#fcf6e0] flex flex-col items-center justify-center w-60">
            <h1 className="text-black font-bold">Encrypt and Decrypt</h1>
            <h1 className="text-black font-bold">Classical Cipher</h1>
          </div>
          <div className="bg-[#289687] grow"></div>
        </div>
        <div className="w-1/2 justify-center gap-y-4">
          <div>
            <div className="flex items-center m-3">
              <label
                htmlFor="inputType"
                className="block mb-2 text-sm md:text-base font-medium text-[#393432] w-36"
              >
                Input Type
              </label>
              <select
                id="inputType"
                name="inputType"
                className="bg-[#fcf6e0] border-2 border-[#cabc7d] text-[#393432] text-sm rounded-lg focus:ring-[#E18679] focus:border-[#E18679] block w-full p-2.5"
                required
                onChange={handleFormChange}
              >
                <option value="text">Text</option>
                <option value="file">File</option>
              </select>
            </div>

            <div className="flex items-center m-3">
              <label
                htmlFor="cipher"
                className="block mb-2 text-sm md:text-base font-medium text-[#393432] w-36"
              >
                Cipher
              </label>
              <select
                id="cipher"
                name="cipher"
                className="bg-[#fcf6e0] border-2 border-[#cabc7d] text-[#393432] text-sm rounded-lg focus:ring-[#E18679] focus:border-[#E18679] block w-full p-2.5"
                required
                onChange={handleFormChange}
              >
                <option value={"Vigenere Cipher"}>Vigenere Cipher</option>
                <option value={"Extended Vigenere Cipher"}>
                  Extended Vigenere Cipher
                </option>
                <option value={"Playfair Cipher"}>Playfair Cipher</option>
                <option value={"Product Cipher"}>Product Cipher</option>
                <option value={"Affine Cipher"}>Affine Cipher</option>
                <option value={"Autokey Vigenere Cipher"}>
                  Autokey Vigenere Cipher
                </option>
              </select>
            </div>

            <div className="flex items-center m-3">
              {/* Text Input */}
              <label
                htmlFor="input"
                className="block mb-2 text-sm md:text-base font-medium text-[#393432] w-36"
              >
                Input
              </label>
              <div className="w-full">
                <input
                  type="text"
                  name="inputText"
                  id="input"
                  className={`${formData.inputType != "text" && "hidden"} ${
                    inputError == "" ? "border-[#cabc7d]" : "border-red-500"
                  } bg-[#fcf6e0] border-2  text-[#393432] text-sm rounded-lg focus:ring-[#E18679] focus:border-[#E18679] block w-full p-2.5`}
                  onChange={handleFormChange}
                  value={formData.inputText}
                ></input>
                {/* Form Input */}
                <input
                  type="file"
                  id="input"
                  accept=".txt"
                  className={`${formData.inputType != "file" && "hidden"} ${
                    inputError == "" ? "border-[#cabc7d]" : "border-red-500"
                  }  bg-[#fcf6e0] border-2  text-[#393432] text-sm rounded-lg focus:ring-[#E18679] focus:border-[#E18679] block w-full p-2.5`}
                  onChange={handleFileChange}
                ></input>
                <i className="text-red-500">{inputError}</i>
              </div>
            </div>

            <div className="flex items-center m-3">
              <label
                htmlFor="key"
                className="block mb-2 text-sm md:text-base text-[#393432] w-36 font-semibold"
              >
                Key
              </label>
              <div className="w-full">
                <input
                  id="key"
                  name="key"
                  className={`${
                    keyError == "" ? "border-[#cabc7d]" : "border-red-500"
                  } bg-[#fcf6e0] border-2  text-[#393432] text-sm rounded-lg focus:ring-[#E18679] focus:border-[#E18679] block w-full p-2.5`}
                  onChange={handleFormChange}
                ></input>
                <i className="text-red-500">{keyError}</i>
              </div>
            </div>

            <div className="flex w-full gap-x-12 justify-center pt-4 font-bold">
              <button
                className="bg-[#289687] border-2 border-[#289687] text-white text-md rounded-lg block w-60 p-2.5 hover:bg-[#067465] "
                onClick={() =>
                  encode(
                    inputAndKeyInputed,
                    formData.inputText,
                    formData.key,
                    formData.cipher,
                    setOutput
                  )
                }
              >
                Encode
              </button>
              <button
                className="bg-[#fcf6e0] border-2 border-[#289687] text-[#289687] text-md rounded-lg block w-60 p-2.5 hover:bg-[#289687] hover:text-white"
                onClick={() =>
                  decode(
                    inputAndKeyInputed,
                    formData.inputText,
                    formData.key,
                    formData.cipher,
                    setOutput
                  )
                }
              >
                Decode
              </button>
            </div>
          </div>
        </div>
        <div className="flex w-full h-12 my-12">
          <div className="bg-[#289687] grow"></div>
          <div className="bg-[#fcf6e0] flex flex-col items-center justify-center w-60">
            <h1 className="text-black font-bold">Result</h1>
          </div>
          <div className="bg-[#289687] grow"></div>
        </div>
        <div className="w-full sm:w-1/2 border-[#4B4737] border-2 min-h-32 rounded-xl p-4 text-[#4B4737]">
          {output}
        </div>
        <button
          className="my-8 bg-[#CABC7D] rounded-lg px-12 py-2 text-white hover:bg-[#A89A5B]"
          onClick={downloadTxtFile}
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default Form;

// const encode = () => {
//   if (inputAndKeyInputed()) {
//     console.log(formData.inputText, formData.key);
//     if (formData.cipher === "Vigenere Cipher") {
//       console.log(formData.cipher);
//       const result = VigenereCipher.encrypt(formData.inputText, formData.key);
//       console.log(result);
//       setOutput(result);
//     }
//     // Playfair Cipher - Text
//     else if (formData.cipher === "Playfair Cipher") {
//       console.log(formData.cipher);
//       const result = PlayFair.encrypt(formData.inputText, formData.key);
//       console.log(result);
//       setOutput(result);
//     }
//     // Product Cipher - Text
//     else if (formData.cipher === "Product Cipher") {
//       console.log(formData.cipher);
//       const result = ProductCipher.encyrpt(formData.inputText, formData.key);
//       console.log(result);
//       setOutput(result);
//     }
//   }
//   // Vigenere Cipher - Text
// };

// const decode = () => {
//   console.log(formData.inputText, formData.key);
//   // Vigenere Cipher - Text
//   if (
//     formData.cipher === "Vigenere Cipher" &&
//     formData.inputType === "text"
//   ) {
//     console.log(formData.cipher);
//     const result = VigenereCipher.decrypt(formData.inputText, formData.key);
//     console.log(result);
//     setOutput(result);
//   }
//   // Playfair Cipher - Text
//   else if (
//     formData.cipher === "Playfair Cipher" &&
//     formData.inputType === "text"
//   ) {
//     console.log(formData.cipher);
//     const result = PlayFair.decrypt(formData.inputText, formData.key);
//     console.log(result);
//     setOutput(result);
//   }
//   // Product Cipher - Text
//   else if (
//     formData.cipher === "Product Cipher" &&
//     formData.inputType === "text"
//   ) {
//     console.log(formData.cipher);
//     const result = ProductCipher.decrypt(formData.inputText, formData.key);
//     console.log(result);
//     setOutput(result);
//   }
//   if (formData.inputType == "file" && formData.cipher == "Vigenere Cipher") {
//     const result = VigenereCipher.encrypt(formData.inputText, formData.key);
//     console.log(result);
//     setOutput(result);
//   }
// };
