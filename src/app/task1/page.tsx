"use client";

import { ChangeEvent, useState } from "react";
import Navbar from "../components/Navbar";
import encode from "../../utils/encode";
import decode from "../../utils/decode";
import { Toaster, toast } from "react-hot-toast";
import ModInv from "@/utils/ModInv";
import { saveAs } from "file-saver";

interface formDataTypes {
  inputType: string;
  cipher: string;
  inputText: string;
  inputFile: File | null;
  key: string;
  multiplier: string;
}

const Form = () => {
  // console.log(
  //   PlayFair.encrypt("temu<!i ibu nanti malam", "ALNGESHPUBCDFIKMOQRTVWXYZ")
  // );
  //   console.log(
  //     PlayFair.decrypt("ZB RSFYKUPGL GRKVSNLQV", "ALNGESHPUBCDFIKMOQRTVWXYZ")
  //   );
  // console.log(
  //   "Encrypt : ",
  //   ProductCipher.encrypt("temui<! ibu nanti malam", "cipher")
  // );
  // console.log(
  //   "Decrypt : ",
  //   ProductCipher.decrypt("vdkmrebhsmcubcpzkd", "cipher")
  // );
  // console.log(
  //   "Encrypt: ",
  //   AutoKeyVigenere.encrypt("a,b c!defghi", "aza!!")
  // );
  // console.log(
  //   "Decrypt: ",
  //   AutoKeyVigenere.decrypt("aacdfhjln", "az!!a")
  // );
  // console.log(
  //   "Encrypt: ",
  //   Affine.encrypt("abcd, !efghi", 3, 4)
  // );
  // console.log(
  //   "Decrypt: ",
  //   Affine.decrypt("ehknqtwzc", 3, 4)
  // );
  // console.log(
  //   "Encrypt: ",
  //   ExtendedVigenere.encrypt("abcd, !efghi", "!abc")
  // );
  // console.log(
  //   "Decrypt: ",
  //   ExtendedVigenere.decrypt("ÃÅÇÉÎ", "!abc")
  // );

  // input
  const [input, setInput] = useState("");
  const [inputError, setInputError] = useState("");

  // key
  const [key, setKey] = useState("");
  const [keyError, setKeyError] = useState("");

  // multiplier affine
  const [multiplier, setMultiplier] = useState("");
  const [multiplierError, setMultiplierError] = useState("");

  // output
  const [output, setOutput] = useState("");
  const [output64, setOutput64] = useState("");

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
    multiplier: "",
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
    if (
      formData.cipher === "Extended Vigenere Cipher" &&
      formData.inputType === "file"
    ) {
      if (formData.key === "") {
        setKeyError("Key cannot be empty");
        return false;
      } else if (fileBaseString === undefined) {
        setInputError("Input cannot be empty");
        return false;
      }
    } else if (formData.inputText == "") {
      setInputError("Input cannot be empty");
      return false;
    } else if (formData.key == "") {
      setKeyError("Key cannot be empty");
      return false;
    } else {
      setInputError("");
      setKeyError("");
    }
    if (formData.cipher === "Affine Cipher") {
      const parsedKey = parseInt(formData.key);
      if (!isNaN(parsedKey)) {
        setKeyError("");

        const parsedMult = parseInt(formData.multiplier);
        if (!isNaN(parsedMult)) {
          if (ModInv.modInv(Number(formData.multiplier), 26) === -1) {
            setMultiplierError("Multiplier must be a number co-prime to 26");
          } else {
            setMultiplierError("");
          }
        } else {
          setMultiplierError("Multiplier must be a number co-prime to 26");
        }
      } else {
        setKeyError("Key must be a number");
      }
    }
    return true;
  };

  const downloadTxtFile = () => {
    console.log(output);
    if (output == "") {
      toast.error("There is no output to download!");
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

  const downloadTxt64File = () => {
    if (output64 == "") {
      toast.error("There is no output to download!");
    } else {
      const element = document.createElement("a");
      const file = new Blob([output64], {
        type: "text/plain",
      });
      element.href = URL.createObjectURL(file);
      element.download = "cipher.txt";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    }
  };

  //  ---------------- Extended Vigenere Cipher ---------------- //

  // fileName
  const [fileName, setFileName] = useState("");

  // fileBaseString
  const [fileType, setFileType] = useState<string>("");

  // file Array Buffer
  const [fileBaseString, setFileBaseString] = useState<ArrayBuffer>();

  const handleAnyFileRead = async (e: ProgressEvent<FileReader>) => {
    console.log(e.target);
    const content = e.target?.result;
    setFileBaseString(content as ArrayBuffer);
    console.log(content);
    console.log("content as string = ", content as string);
  };

  const handleAnyFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    if (e.target.files) {
      console.log(e.target.files[0]);
      setFileName(e.target.files[0].name);
      setFileType(e.target.files[0].type);
      const reader = new FileReader();
      reader.onloadend = handleAnyFileRead;
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  const downloadAnyFile = () => {
    console.log(fileBaseString);
    const file = new Blob([fileBaseString as ArrayBuffer], {
      type: fileType,
    });
    saveAs(file, fileName);
  };

  return (
    <div>
      <Toaster />
      <Navbar />
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#fcf6e0] pt-24">
        <div className="flex w-full h-12 my-8">
          <div className="bg-[#319B76] grow"></div>
          <div className="bg-[#fcf6e0] flex flex-col items-center justify-center w-60">
            <h1 className="text-black font-bold">Encrypt and Decrypt</h1>
            <h1 className="text-black font-bold">Classical Cipher</h1>
          </div>
          <div className="bg-[#319B76] grow"></div>
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
                className="bg-[#fcf6e0] border-2 border-[#BEAD62] text-[#393432] text-sm rounded-lg focus:ring-[#E18679] focus:border-[#E18679] block w-full p-2.5"
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
                className="bg-[#fcf6e0] border-2 border-[#BEAD62] text-[#393432] text-sm rounded-lg focus:ring-[#E18679] focus:border-[#E18679] block w-full p-2.5"
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
                    inputError == "" ? "border-[#BEAD62]" : "border-red-500"
                  } bg-[#fcf6e0] border-2  text-[#393432] text-sm rounded-lg focus:ring-[#E18679] focus:border-[#E18679] block w-full p-2.5`}
                  onChange={handleFormChange}
                  value={formData.inputText}
                ></input>
                {/* Form Input */}

                {formData.cipher === "Extended Vigenere Cipher" ? (
                  <input
                    type="file"
                    id="input"
                    // accept=".txt"
                    className={`${formData.inputType != "file" && "hidden"} ${
                      inputError == "" ? "border-[#cabc7d]" : "border-red-500"
                    }  bg-[#fcf6e0] border-2  text-[#393432] text-sm rounded-lg focus:ring-[#E18679] focus:border-[#E18679] block w-full p-2.5`}
                    onChange={handleAnyFileChange}
                  ></input>
                ) : (
                  <input
                    type="file"
                    id="input"
                    accept=".txt"
                    className={`${formData.inputType != "file" && "hidden"} ${
                      inputError == "" ? "border-[#cabc7d]" : "border-red-500"
                    }  bg-[#fcf6e0] border-2  text-[#393432] text-sm rounded-lg focus:ring-[#E18679] focus:border-[#E18679] block w-full p-2.5`}
                    onChange={handleFileChange}
                  ></input>
                )}

                <i className="text-red-500">{inputError}</i>
              </div>
            </div>

            {formData.cipher === "Affine Cipher" ? (
              <div className="flex items-center m-3">
                <label
                  htmlFor="multiplier"
                  className="block mb-2 text-sm md:text-base text-[#393432] w-36 font-medium"
                >
                  Multiplier
                </label>
                <div className="w-full">
                  <input
                    id="multiplier"
                    name="multiplier"
                    className={`${
                      multiplierError == ""
                        ? "border-[#BEAD62]"
                        : "border-red-500"
                    } bg-[#fcf6e0] border-2  text-[#393432] text-sm rounded-lg focus:ring-[#E18679] focus:border-[#E18679] block w-full p-2.5`}
                    onChange={handleFormChange}
                  ></input>
                  <i className="text-red-500">{multiplierError}</i>
                </div>
              </div>
            ) : (
              <div></div>
            )}

            <div className="flex items-center m-3">
              <label
                htmlFor="key"
                className="block mb-2 text-sm md:text-base text-[#393432] w-36 font-medium"
              >
                Key
              </label>
              <div className="w-full">
                <input
                  id="key"
                  name="key"
                  className={`${
                    keyError == "" ? "border-[#BEAD62]" : "border-red-500"
                  } bg-[#fcf6e0] border-2  text-[#393432] text-sm rounded-lg focus:ring-[#E18679] focus:border-[#E18679] block w-full p-2.5`}
                  onChange={handleFormChange}
                ></input>
                <i className="text-red-500">{keyError}</i>
              </div>
            </div>

            <div className="flex w-full gap-x-12 justify-center pt-4 font-bold">
              <button
                className="bg-[#319B76] border-2 border-[#319B76] text-white text-md rounded-lg block w-60 p-2.5 hover:bg-[#067465] "
                onClick={() =>
                  encode(
                    inputAndKeyInputed,
                    formData.inputText,
                    formData.inputType,
                    formData.key,
                    formData.cipher,
                    formData.multiplier,
                    fileBaseString,
                    setOutput,
                    setOutput64,
                    setFileBaseString
                  )
                }
              >
                Encode
              </button>
              <button
                className="bg-[#fcf6e0] border-2 border-[#319B76] text-[#319B76] text-md rounded-lg block w-60 p-2.5 hover:bg-[#319B76] hover:text-white"
                onClick={() =>
                  decode(
                    inputAndKeyInputed,
                    formData.inputText,
                    formData.inputType,
                    formData.key,
                    formData.cipher,
                    formData.multiplier,
                    fileBaseString,
                    setOutput,
                    setOutput64,
                    setFileBaseString
                  )
                }
              >
                Decode
              </button>
            </div>
          </div>
        </div>

        {formData.inputType === "file" &&
        formData.cipher !== "Extended Vigenere Cipher" ? (
          <>
            <div className="flex w-full h-12 my-12">
              <div className="bg-[#319B76] grow"></div>
              <div className="bg-[#fcf6e0] flex flex-col items-center justify-center w-60">
                <h1 className="text-black font-bold">Plaintext</h1>
              </div>
              <div className="bg-[#319B76] grow"></div>
            </div>
            <div className="w-full sm:w-1/2 border-[#4B4737] border-2 min-h-32 rounded-xl p-4 text-[#4B4737]">
              {formData.inputText}
            </div>
          </>
        ) : (
          <></>
        )}

        <div className="flex w-full h-12 my-12">
          <div className="bg-[#319B76] grow"></div>
          <div className="bg-[#fcf6e0] flex flex-col items-center justify-center w-60">
            <h1 className="text-black font-bold">Result</h1>
          </div>
          <div className="bg-[#319B76] grow"></div>
        </div>
        {formData.cipher === "Extended Vigenere Cipher" &&
        formData.inputType === "file" ? (
          <button
            className="my-8 bg-[#CABC7D] rounded-lg px-12 py-2 text-white hover:bg-[#A89A5B]"
            onClick={downloadAnyFile}
          >
            Download
          </button>
        ) : (
          <>
            <div
              className="w-fit sm:w-1/2 border-[#4B4737] border-2 min-h-32 rounded-xl p-4 text-[#4B4737]"
              style={{ overflowWrap: "break-word" }}
            >
              <p>{output}</p>
            </div>
            <button
              className="my-8 bg-[#CABC7D] rounded-lg px-12 py-2 text-white hover:bg-[#A89A5B]"
              onClick={downloadTxtFile}
            >
              Download
            </button>
          </>
        )}

        {formData.inputType === "file" &&
        formData.cipher === "Extended Vigenere Cipher" ? (
          <></>
        ) : (
          <>
            <div className="flex w-full h-12 my-12">
              <div className="bg-[#319B76] grow"></div>
              <div className="bg-[#fcf6e0] flex flex-col items-center justify-center w-60">
                <h1 className="text-black font-bold">Result in Base64</h1>
              </div>
              <div className="bg-[#319B76] grow"></div>
            </div>
            <div
              className="w-full sm:w-1/2 border-[#4B4737] border-2 min-h-32 rounded-xl p-4 text-[#4B4737]"
              style={{ overflowWrap: "break-word" }}
            >
              <p>{output64}</p>
            </div>

            <button
              className="my-8 bg-[#BEAD62] rounded-lg px-12 py-2 text-white hover:bg-[#A89A5B]"
              onClick={downloadTxt64File}
            >
              Download
            </button>
          </>
        )}
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

function ab2str(buf: ArrayBuffer) {
  return String.fromCharCode.apply(null, new Uint16Array(buf) as any);
}

function str2ab(str: string) {
  var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}
