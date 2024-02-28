import Alphabet from "./Alphabet";
import CleansingAlphabet from "./CleansingAlphabet";

export const createVigenereCipherKey = (text: string, key: string) => {
  const formatedKey = CleansingAlphabet(key.split(" ").join(""));
  const textWithoutSpace = CleansingAlphabet(text.split(" ").join(""));
  let result = "";
  for (let i = 0; i < textWithoutSpace.length; i++) {
    const keyChar = formatedKey[i % formatedKey.length].toLowerCase();
    result += keyChar;
  }
  return result;
}

const VigenereCipher = {
  encrypt: (text: string, key: string) => {
    const formatedKey = CleansingAlphabet(key.split(" ").join(""));
    const textWithoutSpace = CleansingAlphabet(text.split(" ").join(""));
    let result = "";
    for (let i = 0; i < textWithoutSpace.length; i++) {
      const char = textWithoutSpace[i].toLowerCase();
      const keyChar = formatedKey[i % formatedKey.length].toLowerCase();
      const charIndex = Alphabet.indexOf(char);
      const keyIndex = Alphabet.indexOf(keyChar);
      const encryptedCharCode = (charIndex + keyIndex) % 26;
      result += Alphabet[encryptedCharCode];
    }
    return result;
  },
  decrypt: (text: string, key: string) => {
    const formatedKey = CleansingAlphabet(key.split(" ").join(""));
    const textWithoutSpace = CleansingAlphabet(text.split(" ").join(""));
    let result = "";
    for (let i = 0; i < textWithoutSpace.length; i++) {
      if (textWithoutSpace[i] === " ") {
        result += " ";
        continue;
      } else {
        const char = textWithoutSpace[i].toLowerCase();
        const keyChar = formatedKey[i % formatedKey.length].toLowerCase();
        const charIndex = Alphabet.indexOf(char);
        const keyCharIndex = Alphabet.indexOf(keyChar);
        const decryptedCharIndex = (charIndex - keyCharIndex + 26) % 26;
        result += Alphabet[decryptedCharIndex];
      }
    }
    return result;
  },
};

export default VigenereCipher;
