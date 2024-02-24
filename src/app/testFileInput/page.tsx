"use client";

import React, { useState } from "react";

const TestFileInput = () => {
  const [file, setFile] = useState<File | null>(null);
  console.log(file);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-1/2 flex flex-col justify-center">
        <label>File Input</label>
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            }
          }}
        />
      </div>
    </div>
  );
};

export default TestFileInput;
