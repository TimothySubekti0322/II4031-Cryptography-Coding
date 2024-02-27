
const ExtendedVigenere = {
    encrypt: (text: string, key: string) => {
        let result = "";
        let result64 = "";
        const keyLength = key.length;
        for (let i = 0; i < text.length; i++) {

          const ascChar = (text[i].charCodeAt(0) + key[i%keyLength].charCodeAt(0)) %256;
          const char = String.fromCharCode(ascChar);
          result += char;
          console.log(text[i].charCodeAt(0), ascChar, char);
        }
        result64 = btoa(result);
        return result64;
      },
      decrypt: (text: string, key: string) => {
            let result = "";
            let result64 = "";
            const keyLength = key.length;

            for (let i = 0; i < text.length; i++) {

            const ascChar = (text[i].charCodeAt(0) - key[i%keyLength].charCodeAt(0) + 256) % 256;
            const char = String.fromCharCode(ascChar);
            result += char;
            console.log(text[i].charCodeAt(0), ascChar, char);
          }
            result64 = btoa(result);
            return result64;

      },
    };
    
    export default ExtendedVigenere;
    
