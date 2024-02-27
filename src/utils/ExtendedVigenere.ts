
const ExtendedVigenere = {
    encrypt: (text: string, key: string) => {
        let result = "";
        const keyLength = key.length;
        for (let i = 0; i < text.length; i++) {

          const ascChar = (text[i].charCodeAt(0) + key[i%keyLength].charCodeAt(0)) %256;
          const char = String.fromCharCode(ascChar);
          result += char;
        }
        return result;
      },
      decrypt: (text: string, key: string) => {
            let result = "";
            const keyLength = key.length;

            for (let i = 0; i < text.length; i++) {

            const ascChar = (text[i].charCodeAt(0) - key[i%keyLength].charCodeAt(0) + 256) % 256;
            const char = String.fromCharCode(ascChar);
            result += char;
            }
            return result;

      },
    };
    
    export default ExtendedVigenere;
    
