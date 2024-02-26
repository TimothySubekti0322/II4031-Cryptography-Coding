import CleansingAlphabet from "./CleansingAlphabet";
import VigenereCipher from "./VigenereCipher";

// --------------------------ENCRYPT-------------------------- //
const initEmptyMatriks = (input: string, key: string) => {
  const col = key.length;
  const row = Math.ceil(input.length / col);
  let matrix: string[][] = [];
  for (let i = 0; i < row; i++) {
    matrix[i] = [];
    for (let j = 0; j < col; j++) {
      matrix[i][j] = "";
    }
  }
  return matrix;
};

const fillMatriks = (input: string, matrix: string[][]) => {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (input[i * matrix[i].length + j] === undefined) {
        matrix[i][j] = " ";
      } else {
        matrix[i][j] = input[i * matrix[i].length + j];
      }
    }
  }
  return matrix;
};

const permutationKey = (key: string): number[] => {
  const lowerCaseKey = key.toLowerCase();

  const characters = lowerCaseKey.split("");

  const sortedCharacters = [...characters].sort();

  const permutationKey = characters.map((char) =>
    sortedCharacters.indexOf(char)
  );
  return permutationKey;
};

const tranposeMatriksResult = (matrix: string[][], key: string): string => {
  const permutation = permutationKey(key);
  let result = "";
  for (let permutKey = 0; permutKey < permutation.length; permutKey++) {
    for (let row = 0; row < matrix.length; row++) {
      result += matrix[row][permutation.indexOf(permutKey)];
    }
  }

  return result;
};

// --------------------------DECRYPT-------------------------- //
const initEmptyMatriksDecrypt = (input: string, key: string): string[][] => {
  const row = key.length;
  const col = Math.ceil(input.length / row);
  let matrix: string[][] = [];
  for (let i = 0; i < row; i++) {
    matrix[i] = [];
    for (let j = 0; j < col; j++) {
      matrix[i][j] = "";
    }
  }
  return matrix;
};

const fillMatriksDecrypt = (
  input: string,
  matrix: string[][],
  key: string
): string[][] => {
  const permutation = permutationKey(key);
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (input[row * matrix[row].length + col] === undefined) {
        matrix[permutation.indexOf(row)][col] = "";
      } else {
        matrix[permutation.indexOf(row)][col] =
          input[row * matrix[row].length + col];
      }
    }
  }
  return matrix;
};

const tranposeMatriksResultDecrypt = (matrix: string[][]): string => {
  let result = "";
  for (let col = 0; col < matrix[0].length; col++) {
    for (let row = 0; row < matrix.length; row++) {
      result += matrix[row][col];
    }
  }
  return result;
};

const ProductCipher = {
  encrypt: (input: string, key: string) => {
    const vigenereCipherText = VigenereCipher.encrypt(input, key);
    console.log(vigenereCipherText);
    // const formatedInput = input.split(" ").join("");
    const formatedInput = vigenereCipherText.split(" ").join("");

    // Trim key
    let formatedKey = CleansingAlphabet(key.split(" ").join(""));
    if (formatedKey.length > formatedInput.length) {
      formatedKey = formatedKey.slice(0, formatedInput.length);
    }

    const matrix = fillMatriks(
      formatedInput,
      initEmptyMatriks(formatedInput, formatedKey)
    );
    console.log(matrix);
    const Result = tranposeMatriksResult(matrix, formatedKey);
    return Result;
  },
  decrypt: (input: string, key: string) => {
    const formatedInput = input.split(" ").join("");
    // Trim key
    let formatedKey = CleansingAlphabet(key.split(" ").join(""));
    if (formatedKey.length > formatedInput.length) {
      formatedKey = formatedKey.slice(0, formatedInput.length);
    }
    const matrix = fillMatriks(
      formatedInput,
      initEmptyMatriksDecrypt(formatedInput, formatedKey)
    );
    console.log(fillMatriksDecrypt(formatedInput, matrix, formatedKey));
    const Result = tranposeMatriksResultDecrypt(matrix);
    const vigenereCipherText = VigenereCipher.decrypt(Result, formatedKey);
    return vigenereCipherText;
  },
};

export default ProductCipher;
