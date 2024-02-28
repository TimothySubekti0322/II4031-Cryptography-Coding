"use client";

import React, { useEffect, useState } from "react";
import VigenereCipher from "../../utils/VigenereCipher";
import { saveAs } from "file-saver";

const findDifference = (str1: string, str2: string) => {
  let text = "";
  let same = true;
  if (str1.length !== str2.length) {
    return `Strings are not the same length ${str1.length} !== ${str2.length}`;
  } else {
    let i = 0;
    while (same) {
      if (str1[i] !== str2[i]) {
        same = false;
      } else {
        text += str1[i];
        i++;
      }
    }
  }

  return text;
};

const TestFileInput = () => {
  const [file, setFile] = useState<File | null>(null);
  // const [file2, setFile2] = useState<File | null>(null);
  const [fileType, setFileType] = useState<string>("");
  // const [fileType2, setFileType2] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  // const [fileName2, setFileName2] = useState<string>("");
  const [fileBaseString, setFileBaseString] = useState<string>("");
  // const [fileBaseString2, setFileBaseString2] = useState<string>("");

  const handleFileRead = async (e: ProgressEvent<FileReader>) => {
    console.log(e.target);
    const content = e.target?.result;
    setFileBaseString(content as string);
    console.log(content);
  };

  // const handleFileRead2 = async (e: ProgressEvent<FileReader>) => {
  //   console.log(e.target);
  //   const content = e.target?.result;
  //   // const text = (content as string)
  //   //   .split(/["\n"" "]/)
  //   //   .join("")
  //   //   .split(" ")
  //   //   .join("");
  //   setFileBaseString2(content as string);
  //   console.log(content);
  //   // console.log(VigenereCipher.encrypt(text, "abc"));
  // };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      console.log(e.target.files[0]);
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
      setFileType(e.target.files[0].type);
      const reader = new FileReader();
      reader.onloadend = handleFileRead;
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // const handleFileChange2 = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   if (e.target.files) {
  //     console.log(e.target.files[0]);
  //     setFile2(e.target.files[0]);
  //     setFileName2(e.target.files[0].name);
  //     setFileType2(e.target.files[0].type);
  //     const reader = new FileReader();
  //     reader.onloadend = handleFileRead;
  //     reader.readAsText(e.target.files[0]);
  //   }
  // };

  // const compareFiles = () => {
  //   if (fileBaseString === fileBaseString2) {
  //     console.log("Files Base String are the same");
  //   } else {
  //     console.log("Files Base String not same");
  //   }
  //   if (fileType === fileType2) {
  //     console.log("Files are the same type");
  //   }
  // };

  // const downloadFile = () => {
  //   const element = document.createElement("a");
  //   const file = new Blob([fileBaseString], {
  //     type: fileType,
  //   });
  //   saveAs(file, fileName);
  //   //  element.href = URL.createObjectURL(file);
  //   //  element.download = fileName;
  //   //  document.body.appendChild(element); // Required for this to work in FireFox
  //   //  element.click();
  // };

  const downloadFile = () => {
    console.log(fileType, fileBaseString, fileName);
    const linkSource = `data:${fileType};base64,${fileBaseString}`;
    const downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);

    downloadLink.href = linkSource;
    downloadLink.target = "_self";
    downloadLink.download = fileName;
    downloadLink.click();
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-1/2 flex flex-col justify-center">
        <label>File Input</label>
        <input type="file" accept="" onChange={handleFileChange} />
        {/* <input type="file" accept="" onChange={handleFileChange2} /> */}
        <button className="mt-4 w-1/2 bg-blue-500" onClick={downloadFile}>
          {/* <button className="mt-4 w-1/2 bg-blue-500" onClick={compareFiles}>
            Compare
          </button> */}
          Download
        </button>
      </div>
    </div>
  );
};

export default TestFileInput;
