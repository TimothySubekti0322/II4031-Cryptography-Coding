
const ExtendedVigenere = {
    encrypt: (text: string, key: string) => {
        let tempKey = key;
        let result = "";
        for (let i = 0; i < text.length; i++) {

          const ascChar = text[i].charCodeAt(0) + tempKey[i].charCodeAt(0);
          const char = String.fromCharCode(ascChar);
          result += char;
          tempKey += text[i];
        }
        return result;
      },
      decrypt: (text: string, key: string) => {
            let result = "";
            let tempKey = key;
            for (let i = 0; i < text.length; i++) {

            const ascChar = (text[i].charCodeAt(0) - tempKey[i].charCodeAt(0) + 256) % 256;
            const char = String.fromCharCode(ascChar);
            result += char;
            tempKey += char;
            }
            return result;

      },
    };
    
    export default ExtendedVigenere;
    
