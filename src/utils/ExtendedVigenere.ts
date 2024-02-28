
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
      encryptFile: (arr: Uint8Array, key: string) => {
        let result = new Uint8Array(arr.length);
        // let result64 = "";
        const keyLength = key.length;

        arr.forEach((element, i) => {
          const byteChar = (element + key[i%keyLength].charCodeAt(0)) %256;
          // const char = String.fromCharCode(ascChar);
          result[i] = byteChar;
        })

        // result64 = btoa(result);
        return result;
      },
      decryptFile: (arr: Uint8Array, key: string) => {
        let result = new Uint8Array(arr.length);
        // let result64 = "";
        const keyLength = key.length;

        arr.forEach((element, i) => {
          const byteChar = (element - key[i%keyLength].charCodeAt(0) + 256) %256;
          // const char = String.fromCharCode(ascChar);
          result[i] = byteChar;
        })

        // result64 = btoa(result);
        return result;
      },
    };
    
    export default ExtendedVigenere;
    
