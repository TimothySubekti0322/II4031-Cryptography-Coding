import Alphabet from "./Alphabet";

const removeDuplicates = (str: string): string => {
  return str
    .split("")
    .filter(
      (value, index, self) =>
        self.indexOf(value) === index && value !== " " && value !== "j"
    )
    .join("");
};

const createMatrixFromString = (str: string): string[][] => {
  let index = 0;
  let matrix = new Array(5).fill("").map(() => new Array(5).fill(""));
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      matrix[i][j] = str[index];
      index++;
    }
  }
  return matrix;
};

const checkRepeatedChars = (key: string) => {
  const set = new Set();
  for (const char of key) {
    if (set.has(char)) {
      return true;
    }
    set.add(char);
  }
  return false;
};

export const generateMatrix = (key: string) => {
  // if the key already formed well
  let newKey = key.toLowerCase();
  if (
    !newKey.includes("j") &&
    newKey.length === 25 &&
    !checkRepeatedChars(newKey)
  ) {
    const result = createMatrixFromString(newKey.toLowerCase());
    return result;
  }

  let modifiedKey = newKey.split(" ").join("");
  modifiedKey = removeDuplicates(modifiedKey);

  const set = new Set(modifiedKey);
  const alphabet = Alphabet.filter((char) => !set.has(char) && char !== "j");
  modifiedKey += alphabet.join("");

  const result = createMatrixFromString(modifiedKey);
  return result;
};

const createPairs = (text: string): string[] => {
  let index = 0;
  let pairs = [];
  let formatedText = text.split(" ").join("").toLowerCase().replace("j", "i");
  while (index < text.length) {
    if (
      formatedText[index] === formatedText[index + 1] ||
      formatedText[index + 1] === undefined
    ) {
      pairs.push(formatedText[index], "x");
      index++;
    } else {
      pairs.push(formatedText[index], formatedText[index + 1]);
      index += 2;
    }
  }
  return pairs;
};

const findIndex = (matrix: string[][], char: string) => {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === char) {
        return [i, j];
      }
    }
  }
  return [-1, -1];
};

const encryptPair = (matrix: string[][], first: number[], second: number[]) => {
  let result = "";
  if (first[0] === second[0]) {
    result += matrix[first[0]][(first[1] + 1) % 5];
    result += matrix[second[0]][(second[1] + 1) % 5];
  } else if (first[1] === second[1]) {
    result += matrix[(first[0] + 1) % 5][first[1]];
    result += matrix[(second[0] + 1) % 5][second[1]];
  } else {
    result += matrix[first[0]][second[1]];
    result += matrix[second[0]][first[1]];
  }
  return result;
};

const decryptPair = (matrix: string[][], first: number[], second: number[]) => {
  let result = "";
  if (first[0] === second[0]) {
    result += matrix[first[0]][(first[1] - 1 + 5) % 5];
    result += matrix[second[0]][(second[1] - 1 + 5) % 5];
  } else if (first[1] === second[1]) {
    result += matrix[(first[0] - 1 + 5) % 5][first[1]];
    result += matrix[(second[0] - 1 + 5) % 5][second[1]];
  } else {
    result += matrix[first[0]][second[1]];
    result += matrix[second[0]][first[1]];
  }
  return result;
};

const PlayFair = {
  encrypt: (plainteks: string, key: string) => {
    let teks = plainteks.split(" ").join("").toLowerCase();
    const matrix = generateMatrix(key);
    const bigram = createPairs(teks);
    for (let i = 0; i < bigram.length; i += 2) {
      const first = bigram[i];
      const second = bigram[i + 1];
      const firstIndex = findIndex(matrix, first);
      const secondIndex = findIndex(matrix, second);
      const encryptedPair = encryptPair(matrix, firstIndex, secondIndex);
      bigram[i] = encryptedPair[0];
      bigram[i + 1] = encryptedPair[1];
    }
    const result = bigram.join("");
    return result;
  },
  decrypt: (cipherteks: string, key: string) => {
    let teks = cipherteks.split(" ").join("").toLowerCase();
    const matrix = generateMatrix(key);
    const bigram = createPairs(teks);
    for (let i = 0; i < bigram.length; i += 2) {
      const first = bigram[i];
      const second = bigram[i + 1];
      const firstIndex = findIndex(matrix, first);
      const secondIndex = findIndex(matrix, second);
      const decryptedPair = decryptPair(matrix, firstIndex, secondIndex);
      bigram[i] = decryptedPair[0];
      bigram[i + 1] = decryptedPair[1];
    }
    const result = bigram.join("");
    return result;
  },
};

export default PlayFair;

// const PlayFair = {
//   encrypt: (text: string, key: string) => {
//     key = key.split(" ").join("");
//     let result = "";
//     const matrix = generateMatrix(key);
//     const textPairs = generateTextPairs(text);
//     for (const pair of textPairs) {
//       const [first, second] = pair;
//       const firstIndex = findIndex(matrix, first);
//       const secondIndex = findIndex(matrix, second);
//       const encryptedPair = encryptPair(matrix, firstIndex, secondIndex);
//       result += encryptedPair;
//     }
//     return result;
//   },
//   decrypt: (text: string, key: string) => {
//     key = key.split(" ").join("");
//     let result = "";
//     const matrix = generateMatrix(key);
//     const textPairs = generateTextPairs(text);
//     for (const pair of textPairs) {
//       const [first, second] = pair;
//       const firstIndex = findIndex(matrix, first);
//       const secondIndex = findIndex(matrix, second);
//       const decryptedPair = decryptPair(matrix, firstIndex, secondIndex);
//       result += decryptedPair;
//     }
//     return result;
//   },
// };
