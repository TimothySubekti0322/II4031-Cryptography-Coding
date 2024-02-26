
const modInv = (m: number, a:number): number => {
    let t = 0; let tempT = 1;
    let r = m; let tempR = a;

    while (tempR !== 0) {
      let quotient = Math.floor(r/tempR);
      t = tempT;
      tempT = t - (quotient*tempT);
      r = tempR;
      tempR = r - (quotient*tempR);
    }

    if (r > 1) {
      return -1;
    } 
    
    return t + m;
}

const AffineCipher = {
  encrypt: (text: string, multiplier: number, b: number) => {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        let ascValue = text[i].charCodeAt(0);
        let ascRet;

        if (ascValue<91 && ascValue > 64){
            ascValue -= 65;
            ascRet = 65;
        } else if (ascValue<123 && ascValue > 96){
            ascValue -= 97
            ascRet = 97
        } else {
            continue
        }
      
      const ascEncrypt = (((ascValue*multiplier) + b +26) % 26) + ascRet
      result += String.fromCharCode(ascEncrypt)
    }
    return result;
  },

  decrypt: (text: string, multiplier: number, b: number) => {
    let result = "";


    for (let i = 0; i < text.length; i++) {
        let ascValue = text[i].charCodeAt(0);
        let ascRet;
        let invMod = modInv(multiplier, 26);

        if (ascValue<91 && ascValue > 64){
            ascValue -= 65;
            ascRet = 65;
        } else if (ascValue<123 && ascValue > 96){
            ascValue -= 97
            ascRet = 97
        } else {
            continue
        }
      
      const ascDecrypt = (((ascValue - b + 26 ) % 26) * invMod) %26 + ascRet
      result += String.fromCharCode(ascDecrypt)
    }
    return result;
  }
};

export default AffineCipher;
