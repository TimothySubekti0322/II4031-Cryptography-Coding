"use client";

import React, { useState } from "react";
import VigenereCipher from "../../utils/VigenereCipher";

const TestFileInput = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileRead = async (e: ProgressEvent<FileReader>) => {
    const content = e.target?.result;
    const text = (content as string)
      .split(/["\n"" "]/)
      .join("")
      .split(" ")
      .join("");
    console.log(VigenereCipher.encrypt(text, "abc"));
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      setFile(e.target.files[0]);
      const reader = new FileReader();
      reader.onloadend = handleFileRead;
    }
  };
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-1/2 flex flex-col justify-center">
        <label>File Input</label>
        <input type="file" accept=".txt" onChange={handleFileChange} />
      </div>
    </div>
  );
};

export default TestFileInput;
