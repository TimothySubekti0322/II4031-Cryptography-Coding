
const AutoKeyVigenere = {
  encrypt: (text: string, key: string) => {
    text = text.toLowerCase();
    key = key.toLowerCase();
    let tempKey = key;
    let result = "";
    for (let i = 0; i < text.length; i++) {
      let ascChar = text[i].charCodeAt(0);
      // if (ascChar<91 && ascChar > 64){
      //   ascChar = (ascChar - 65 + tempKey[i].charCodeAt(0)) % 26 +65;
      // } else 
      if (ascChar < 123 && ascChar > 96) {
        ascChar = (ascChar - 97 + tempKey[i].charCodeAt(0) - 97) % 26 + 97;
      } else {
        continue;
      }
      const char = String.fromCharCode(ascChar);
      result += char;
      tempKey += text[i];
    }
    return result;
  },
  decrypt: (text: string, key: string) => {
    text = text.toLowerCase();
    key = key.toLowerCase();
    let result = "";
    let tempKey = key;
    for (let i = 0; i < text.length; i++) {
      let ascChar = text[i].charCodeAt(0);
      // if (ascChar<91 && ascChar > 64){
      //   ascChar = (ascChar - 65 - tempKey[i].charCodeAt(0) +26) % 26 +65;
      // } else 
      if (ascChar < 123 && ascChar > 96) {
        ascChar = (ascChar - tempKey[i].charCodeAt(0) + 26) % 26 + 97;
      } else {
        continue;
      }
      const char = String.fromCharCode(ascChar);
      result += char;
      tempKey += char;
    }
    return result;

  },
};

export default AutoKeyVigenere;

