"use client";

import RC4 from "@/utils/RC4";
import React, { ChangeEvent, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import formDataTypes from "@/app/components/formDataTypes";
import toast, { Toaster } from "react-hot-toast";
import saveAs from "file-saver";

const Page = () => {
  // input
  const [inputError, setInputError] = useState("");

  // key
  const [keyError, setKeyError] = useState("");


  // output
  const [output, setOutput] = useState("");
  const [output64, setOutput64] = useState("");
  // const [outputFile, setOutputFile] = useState<ArrayBuffer>();

  const [formData, setFormData] = useState<formDataTypes>({
    inputType: "text",
    cipher: "RC4",
    inputText: "",
    inputFile: null,
    key: "",
    multiplier: "",
  });

  // encode loading
  const [encodeLoading, setEncodeLoading] = useState<boolean | undefined>(
    undefined
  );

  // decode loading
  const [decodeLoading, setDecodeLoading] = useState<boolean | undefined>(
    undefined
  );

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

  // fileName
  const [fileName, setFileName] = useState("");

  // fileBaseString
  const [fileType, setFileType] = useState<string>("");

  // file Array Buffer
  const [fileBaseString, setFileBaseString] = useState<ArrayBuffer>();

  const handleClick = (type: string) => {
    if (formData.inputType === "text" && inputAndKeyInputed()) {
      if (type === "encode") {
        setOutput(RC4.encrypt(formData.inputText, formData.key));
        setOutput64(btoa(output));
      } else {
        setOutput(RC4.decrypt(formData.inputText, formData.key));
        setOutput64(btoa(output));
      }
    } else if (formData.inputType === "file" && inputAndKeyInputed()) {
      if (typeof fileBaseString !== "undefined"){
        const view = new Uint8Array(fileBaseString);
        if (type === "encode") {
          setFileBaseString(RC4.encryptFile(view, formData.key));
          // setOutput64(btoa(output));
        } else {
          setFileBaseString(RC4.decryptFile(view, formData.key));
          // setOutput64(btoa(output));
        }
      }
     
    }
  };

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
      formData.inputType === "file") {
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

  // Encode is finished
  useEffect(() => {
    if (!encodeLoading && encodeLoading !== undefined && inputAndKeyInputed()) {
      toast.success("Encoding is finished!");
    }
  }, [encodeLoading, inputAndKeyInputed]);

  // Decode is finished
  useEffect(() => {
    if (
      !decodeLoading &&
      decodeLoading !== undefined &&
      inputError == "" &&
      keyError == ""
    ) {
      toast.success("Decoding is finished!");
    }
  }, [decodeLoading, inputError, keyError]);

  return (
    <div>
      <Toaster />
      <Navbar currPage="task 2" />
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#fcf6e0] pt-24">
        <div className="flex w-full h-12 my-8">
          <div className="bg-[#319B76] grow"></div>
          <div className="bg-[#fcf6e0] flex flex-col items-center justify-center w-60">
            <h1 className="text-black font-bold">Encrypt and Decrypt</h1>
            <h1 className="text-black font-bold">Stream Cipher RC4</h1>
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
                  className={`${formData.inputType != "text" && "hidden"} ${inputError == "" ? "border-[#BEAD62]" : "border-red-500"
                    } bg-[#fcf6e0] border-2  text-[#393432] text-sm rounded-lg focus:ring-[#E18679] focus:border-[#E18679] block w-full p-2.5`}
                  onChange={handleFormChange}
                  value={formData.inputText}
                ></input>

                {/* Form Input */}

                <input
                  type="file"
                  id="input"
                  // accept=".txt"
                  className={`${formData.inputType != "file" && "hidden"} ${inputError == "" ? "border-[#cabc7d]" : "border-red-500"
                    }  bg-[#fcf6e0] border-2  text-[#393432] text-sm rounded-lg focus:ring-[#E18679] focus:border-[#E18679] block w-full p-2.5`}
                  onChange={handleAnyFileChange}
                // onChange={(e) => setInputText(e.target.value)}

                ></input>


                <i className="text-red-500">{inputError}</i>
              </div>
            </div>

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
                  className={`${keyError == "" ? "border-[#BEAD62]" : "border-red-500"
                    } bg-[#fcf6e0] border-2  text-[#393432] text-sm rounded-lg focus:ring-[#E18679] focus:border-[#E18679] block w-full p-2.5`}
                  onChange={handleFormChange}
                ></input>
                <i className="text-red-500">{keyError}</i>
              </div>
            </div>

            <div className="flex w-full gap-x-12 justify-center pt-4 font-bold">
              <button
                className={`${encodeLoading ? "opacity-50" : ""
                  } bg-[#319B76] border-2 border-[#319B76] text-white text-md rounded-lg block w-60 p-2.5 hover:bg-[#067465]`}
                onClick={() =>
                  handleClick("encode")
                }
                disabled={encodeLoading}
              >
                {encodeLoading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  "Encode"
                )}
              </button>
              <button
                className="bg-[#fcf6e0] border-2 border-[#319B76] text-[#319B76] text-md rounded-lg block w-60 p-2.5 hover:bg-[#319B76] hover:text-white"
                onClick={() =>
                  handleClick("decode")
                }
                disabled={encodeLoading}
              >
                {encodeLoading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  "Decode"
                )}
              </button>
            </div>
          </div>
        </div>


        <div className="flex w-full h-12 my-12">
          <div className="bg-[#319B76] grow"></div>
          <div className="bg-[#fcf6e0] flex flex-col items-center justify-center w-60">
            <h1 className="text-black font-bold">Result</h1>
          </div>
          <div className="bg-[#319B76] grow"></div>
        </div>
        {(formData.inputType === "file") ? (
          <button
            className={`${fileBaseString === undefined ? "opacity-50" : "hover:bg-[#A89A5B]"
              } my-8 bg-[#CABC7D] rounded-lg px-12 py-2 text-white`}
            onClick={downloadAnyFile}
            disabled={fileBaseString === undefined}
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

        {(formData.inputType === "file") ? (
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

export default Page;
