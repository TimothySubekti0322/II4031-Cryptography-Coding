import CleansingAlphabet from "./CleansingAlphabet";

const AutoKeyVigenere = {
  encrypt: (text: string, key: string) => {
    text = CleansingAlphabet(text.split(" ").join(""));
    let tempKey = CleansingAlphabet(key.split(" ").join(""));
    let result = "";
    for (let i = 0; i < text.length; i++) {
      let ascChar = text[i].charCodeAt(0);

      ascChar = (ascChar - 97 + tempKey[i].charCodeAt(0) - 97) % 26 + 97;

      const char = String.fromCharCode(ascChar);
      result += char;
      tempKey += text[i];
    }
    return result;
  },
  decrypt: (text: string, key: string) => {
    text = CleansingAlphabet(text.split(" ").join(""));
    let tempKey = CleansingAlphabet(key.split(" ").join(""));
    let result = "";
    for (let i = 0; i < text.length; i++) {
      let ascChar = text[i].charCodeAt(0);
      ascChar = (ascChar - tempKey[i].charCodeAt(0) + 26) % 26 + 97;
      const char = String.fromCharCode(ascChar);
      result += char;
      tempKey += char;
    }
    return result;

  },
};

export default AutoKeyVigenere;

