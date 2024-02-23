import Alphabet from "./Alphabet";

const VigenereCipher = {
  encrypt: (text: string, key: string) => {
    key = key.split(" ").join("");
    let result = "";
    for (let i = 0; i < text.length; i++) {
      if (text[i] === " ") {
        result += " ";
        continue;
      }
      const char = text[i].toLowerCase();
      const keyChar = key[i % key.length].toLowerCase();
      const charIndex = Alphabet.indexOf(char);
      const keyIndex = Alphabet.indexOf(keyChar);
      const encryptedCharCode = (charIndex + keyIndex) % 26;
      result += Alphabet[encryptedCharCode];
    }
    return result;
  },
  decrypt: (text: string, key: string) => {
    key = key.split(" ").join("");
    let result = "";
    for (let i = 0; i < text.length; i++) {
      if (text[i] === " ") {
        result += " ";
        continue;
      }
      const char = text[i].toLowerCase();
      const keyChar = key[i % key.length].toLowerCase();
      const charIndex = Alphabet.indexOf(char);
      const keyCharIndex = Alphabet.indexOf(keyChar);
      const decryptedCharIndex = (charIndex - keyCharIndex + 26) % 26;
      result += Alphabet[decryptedCharIndex];
    }
    return result;
  },
};

export default VigenereCipher;
