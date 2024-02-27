import CleansingAlphabet from "./CleansingAlphabet";
import ModInv from "./ModInv";

const AffineCipher = {
  encrypt: (text: string, multiplier: number, b: number) => {
    text = CleansingAlphabet(text.split(" ").join(""));
    if (ModInv.modInv(multiplier, 26) ===-1){
      return "";
    };

    let result = "";
    for (let i = 0; i < text.length; i++) {
        let ascValue = text[i].charCodeAt(0);
        let ascRet;

        // if (ascValue<91 && ascValue > 64){
        //     ascValue -= 65;
        //     ascRet = 65;
        // } else if (ascValue<123 && ascValue > 96){
            ascValue -= 97
            ascRet = 97
        // } else {
        //     continue
        // }
      
      ascValue = ((ascValue*multiplier) + b +26) 
      while (ascValue<0){
        ascValue += 2600;
      }
      const ascEncrypt = ascValue % 26 + ascRet;
      result += String.fromCharCode(ascEncrypt)
    }
    return result;
  },

  decrypt: (text: string, multiplier: number, b: number) => {
    text = CleansingAlphabet(text.split(" ").join(""));
    const invMod = ModInv.modInv(multiplier, 26);
    console.log(invMod);
    if (invMod ===-1){
      return "";
    };
    let result = "";
    for (let i = 0; i < text.length; i++) {
        let ascValue = text[i].charCodeAt(0);
        let ascRet;

        // if (ascValue<91 && ascValue > 64){
        //     ascValue -= 65;
        //     ascRet = 65;
        // } else if (ascValue<123 && ascValue > 96){
            ascValue -= 97
            ascRet = 97
        // } else {
        //     continue
        // }
        
      let ascDecrypt = (ascValue - b + 26 )
      while (ascDecrypt<0){
        ascDecrypt += 2600;
      }
      ascDecrypt = (((ascDecrypt%26) * invMod) %26) + ascRet
      result += String.fromCharCode(ascDecrypt)
    }
    return result;
  }
};

export default AffineCipher;
