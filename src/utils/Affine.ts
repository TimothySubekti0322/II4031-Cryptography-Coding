
const modInv = (m: number, a:number): number => {
    let t = 0; let nextT = 1;
    let r = a; let nextR = m;

    while (nextR !== 0) {
      let quotient = Math.floor(r/nextR);
      let tempT = t;
      t = nextT;
      nextT = tempT - (quotient*nextT);
      let tempR = r;
      r = nextR;
      nextR = tempR - (quotient*nextR);
    }

    if (r > 1) {
      return -1;
    } 
    if(t<0){
      t += m
    }
    return t;
}

const AffineCipher = {
  encrypt: (text: string, multiplier: number, b: number) => {
    text = text.split(" ").join("");
    if (modInv(multiplier, 26) ===-1){
      return "";
    };

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
    text = text.split(" ").join("");
    const invMod = modInv(multiplier, 26);
    if (invMod ===-1){
      return "";
    };
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
      
      const ascDecrypt = (((ascValue - b + 26 ) % 26) * invMod) %26 + ascRet
      result += String.fromCharCode(ascDecrypt)
    }
    return result;
  }
};

export default AffineCipher;
