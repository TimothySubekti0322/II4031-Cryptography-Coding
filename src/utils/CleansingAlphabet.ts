import Alphabet from "./Alphabet";

const CleansingAlphabet = (text: string) => {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        const char = text[i].toLowerCase();
        if (Alphabet.indexOf(char) !== -1) {
        result += char;
        }
    }
    return result;
}

export default CleansingAlphabet;