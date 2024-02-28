import React from "react";
import VigenereCipher from "../utils/VigenereCipher";
import PlayFair from "../utils/PlayFair";
import ProductCipher from "../utils/ProductCipher";
import AutoKeyVigenere from "./AutoKeyVigenere";
import ExtendedVigenere from "./ExtendedVigenere";
import Affine from "./Affine";

const decode = (
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
  if (cipher === "Extended Vigenere Cipher" && inputType === "file") {
    if (typeof fileBaseString !== "undefined") {
      const view = new Uint8Array(fileBaseString);
      console.log(view);

      console.log(cipher);
      const result = ExtendedVigenere.decryptFile(view, key);
      console.log("Decoded:", result);
      // setOutput(atob(result));
      // setOutput64(result);
      setFileBaseString(result);
    }
  } else {
    if (inputAndKeyInputed()) {
      console.log(inputText, key);
      if (cipher === "Vigenere Cipher") {
        console.log(cipher);
        const result = VigenereCipher.decrypt(inputText, key);
        console.log(result);
        setOutput(result);
        setOutput64(btoa(result));
      }
      // Playfair Cipher - Text
      else if (cipher === "Playfair Cipher") {
        console.log(cipher);
        const result = PlayFair.decrypt(inputText, key);
        console.log(result);
        setOutput(result);
        setOutput64(btoa(result));
      }
      // Product Cipher - Text
      else if (cipher === "Product Cipher") {
        console.log(cipher);
        const result = ProductCipher.decrypt(inputText, key);
        console.log(result);
        setOutput(result);
        setOutput64(btoa(result));
      }
      // Affine Cipher - Text
      else if (cipher === "Affine Cipher") {
        console.log(cipher);
        const intMultiplier = Number(multiplier);
        const intKey = Number(key);
        const result = Affine.decrypt(inputText, intMultiplier, intKey);
        console.log(result);
        setOutput(result);
        setOutput64(btoa(result));
      }
      // AutoKey Vigenere Cipher - Text
      else if (cipher === "Autokey Vigenere Cipher") {
        console.log(cipher);
        const result = AutoKeyVigenere.decrypt(inputText, key);
        console.log(result);
        setOutput(result);
        setOutput64(btoa(result));
      }
      // Extended Vigenere Cipher - Text
      else if (cipher === "Extended Vigenere Cipher") {
        console.log(cipher);
        const result = ExtendedVigenere.decrypt(inputText, key);
        console.log("Decoded: ", result);
        setOutput(atob(result));
        setOutput64(result);
      }
    }
  }
};

export default decode;
