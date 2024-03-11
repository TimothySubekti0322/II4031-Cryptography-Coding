import React from "react";
import VigenereCipher from "../utils/VigenereCipher";
import PlayFair from "../utils/PlayFair";
import ProductCipher from "../utils/ProductCipher";
import AffineCipher from "./Affine";
import Affine from "./Affine";
import AutoKeyVigenere from "./AutoKeyVigenere";
import ExtendedVigenere from "./ExtendedVigenere";
import RC4 from "./RC4";

const encode = (
  setEncodeLoading: React.Dispatch<React.SetStateAction<boolean | undefined>>,
  inputAndKeyInputed: () => boolean,
  inputText: string,
  inputType: string,
  key: string,
  cipher: string,
  multiplier: string,
  fileBaseString: ArrayBufferLike | undefined,
  setOutput: React.Dispatch<React.SetStateAction<string>>,
  setOutput64: React.Dispatch<React.SetStateAction<string>>,
  setFileBaseString: React.Dispatch<
    React.SetStateAction<ArrayBuffer | undefined>
  >
) => {
  setEncodeLoading(true);
  // console.log("fileBaseString = ", fileBaseString);
  if (inputType === "file") {
    if (typeof fileBaseString !== "undefined" && inputAndKeyInputed()) {
      const view = new Uint8Array(fileBaseString);
      console.log(view);
      console.log(cipher);

      let result = new Uint8Array();
      if (cipher === "Extended Vigenere Cipher") {
        result = ExtendedVigenere.encryptFile(view, key);
      } else if (cipher === "RC4") {
        result = RC4.encryptFile(view, key);
      }
      console.log("Encoded:", result);
      // setOutput(atob(result));
      // setOutput64(result);
      setFileBaseString(result);
    }
  } else {
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
        // console.log(cipher);
        const result = ExtendedVigenere.encrypt(inputText, key);
        // console.log("Encoded:", result);
        setOutput(atob(result));
        setOutput64(result);
      }
      // RC4 Cipher - Text
      else if (cipher === "RC4") {
        console.log(cipher);
        const result = RC4.encrypt(inputText, key);
        console.log(result);
        setOutput(result);
        setOutput64(btoa(result));
      }
    }
  }
  setEncodeLoading(false);
};

export default encode;
