import React from "react";
import VigenereCipher from "../utils/VigenereCipher";
import PlayFair from "../utils/PlayFair";
import ProductCipher from "../utils/ProductCipher";
import AffineCipher from "./Affine";
import Affine from "./Affine";
import AutoKeyVigenere from "./AutoKeyVigenere";
import ExtendedVigenere from "./ExtendedVigenere";

const encode = (
  inputAndKeyInputed: () => boolean,
  inputText: string,
  key: string,
  cipher: string,
  multiplier: string,
  fileBaseString: ArrayBufferLike | undefined,
  setOutput: React.Dispatch<React.SetStateAction<string>>,
  setOutput64: React.Dispatch<React.SetStateAction<string>>
) => {
  console.log("fileBaseString = ", fileBaseString);
  if (typeof fileBaseString !== "undefined") {
    const view = new Uint8Array(fileBaseString);
    console.log(view);
  }
  // console.log(fileBaseString.length);
  if (inputAndKeyInputed()) {
    console.log(inputText, key);
    if (cipher === "Vigenere Cipher") {
      console.log(cipher);
      const result = VigenereCipher.encrypt(inputText, key);
      console.log(result);
      setOutput(result);
      setOutput64(btoa(result));
    }
    // Playfair Cipher - Text
    else if (cipher === "Playfair Cipher") {
      console.log(cipher);
      const result = PlayFair.encrypt(inputText, key);
      console.log(result);
      setOutput(result);
      setOutput64(btoa(result));
    }
    // Product Cipher - Text
    else if (cipher === "Product Cipher") {
      console.log(cipher);
      const result = ProductCipher.encrypt(inputText, key);
      console.log(result);
      setOutput(result);
      setOutput64(btoa(result));
    }
    // // Affine Cipher - Text
    else if (cipher === "Affine Cipher") {
      console.log(cipher);
      const intMultiplier = Number(multiplier);
      const intKey = Number(key);
      const result = Affine.encrypt(inputText, intMultiplier, intKey);
      console.log(result);
      setOutput(result);
      setOutput64(btoa(result));
    }
    // AutoKey Vigenere Cipher - Text
    else if (cipher === "Autokey Vigenere Cipher") {
      console.log(cipher);
      const result = AutoKeyVigenere.encrypt(inputText, key);
      console.log(result);
      setOutput(result);
      setOutput64(btoa(result));
    }
    // Extended Vigenere Cipher - Text
    else if (cipher === "Extended Vigenere Cipher") {
      console.log(cipher);
      const result = ExtendedVigenere.encrypt(inputText, key);
      console.log("Encoded:", result);
      setOutput(atob(result));
      setOutput64(result);
    }
  }
};

export default encode;
