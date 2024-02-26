import React from "react";
import VigenereCipher from "../utils/VigenereCipher";
import PlayFair from "../utils/PlayFair";
import ProductCipher from "../utils/ProductCipher";
import AutoKeyVigenere from "./AutoKeyVigenere";
import ExtendedVigenere from "./ExtendedVigenere";

const decode = (
  inputAndKeyInputed: () => boolean,
  inputText: string,
  key: string,
  cipher: string,
  setOutput: React.Dispatch<React.SetStateAction<string>>
) => {
  if (inputAndKeyInputed()) {
    console.log(inputText, key);
    if (cipher === "Vigenere Cipher") {
      console.log(cipher);
      const result = VigenereCipher.decrypt(inputText, key);
      console.log(result);
      setOutput(result);
    }
    // Playfair Cipher - Text
    else if (cipher === "Playfair Cipher") {
      console.log(cipher);
      const result = PlayFair.decrypt(inputText, key);
      console.log(result);
      setOutput(result);
    }
    // Product Cipher - Text
    else if (cipher === "Product Cipher") {
      console.log(cipher);
      const result = ProductCipher.decrypt(inputText, key);
      console.log(result);
      setOutput(result);
    }
    else if (cipher === "Autokey Vigenere Cipher") {
      console.log(cipher);
      const result = AutoKeyVigenere.decrypt(inputText, key);
      console.log(result);
      setOutput(result);
    }
    // Extended Vigenere Cipher - Text
    else if (cipher === "Extended Vigenere Cipher") {
      console.log(cipher);
      const result = ExtendedVigenere.decrypt(inputText, key);
      console.log("Decoded: ",result);
      setOutput(result);
    }
  }
};

export default decode;
