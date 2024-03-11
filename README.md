# II4031 - Cryptography and Coding 

## Description
Project Overview

This project entails the development of a comprehensive website utilizing the NEXT.JS framework, TypeScript language, and Tailwind CSS framework. The website serves as a platform to create a dynamic and interactive website for learning and practicing various cryptography and coding techniques.

**Technical Stack**

- **Front End :** 
    - NEXT.JS
- **Deployment Platforms :**
    - Vercel (Front End)
- **CSS**
    - Taiwind CSS




## Cryptography Page
The cryptography page will have three subpages, each for a different cryptography and coding task. 

### Task 1 : Classic Cipher
<img src="/assets/img/MarineGEO_logo.png" alt="MarineGEO circle logo" style="height: 100px; width:100px;"/>
The first task is for cipher classic that will present six kinds of cipher classic. They are
- **Vigenere Cipher :** A method of encrypting alphabetic text by using a series of interwoven Caesar ciphers based on the letters of a keyword.
- **Extended Vigenere Cipher :** A variant of Vigenere cipher that can encrypt any ASCII character from 0 to 255, including image files, video files, and any other files.
- **Playfair Cipher :** A technique of symmetric encryption that uses a 5x5 matrix of letters to substitute pairs of letters in the plaintext.
- **Product Cipher :** A combination of Vigenere Cipher and transposition to achieve a more secure encryption.
- **Affine Cipher :** A type of monoalphabetic substitution cipher that uses a mathematical function to map each letter to another letter in the alphabet.
- **Autokey Vigenere Cipher :** A variant of Vigenere cipher that uses the plaintext itself as part of the key.

### Task 2 : Modified Cipher - RC4 Stream Cipher
The second task introduces a modified cipher, focusing on a stream cipher known as RC4. RC4 is composed of two main algorithms: the Key-Scheduling Algorithm (KSA) and the Pseudo-random generation algorithm (PRGA).

#### RC4 Overview
- Key-Scheduling Algorithm (KSA): Initializes the permutation array "S" using the provided key. The array "S" is initialized to the identity permutation and is processed for 256 iterations, mixing in bytes of the key at the same time.
- Pseudo-random Generation Algorithm (PRGA): Modifies the state of the permutation array and outputs a byte of the keystream for each iteration. The PRGA:
    - ncrements the index "i".
    - Adds the value of S[i] to "j".
    - Exchanges the values of S[i] and S[j].
    - Fetches a third element of S using the sum S[i] + S[j] (modulo 256) as an index.
    - Performs a bitwise XOR operation with the next byte of the message to produce ciphertext or plaintext.

#### RC4 and Extended Vigenère Cipher Integration
In this project, RC4 is combined with the Extended Vigenère Cipher. During each iteration of the PRGA, the result of the bitwise exclusive operation is shifted by the Extended Vigenère Cipher. For the decryption process, the operation is reversed: the element used for the bitwise operation is first shifted with the Extended Vigenère Cipher, followed by the bitwise operation execution.



### Task 3
**Coming Soon**
## Getting Started

These instructions will get your copy of the project up and running on your local machine for development

First of all you need to clone this project or **download the file**

```bash
git clone https://github.com/TimothySubekti0322/II4031-Kriptografi-Koding
```

Firstly, go to the project folder, and open the folder on your favourite IDE. Then, install all the dependencies by simply run this code on the terminal

```bash
  npm install
```

Run the development server using this command in terminal

```bash
  npm run dev
```

Now you can access **http://localhost:3000**


## Contributing

- [Timothy Subekti](https://github.com/TimothySubekti0322) - 18221063
- [Nadira Rahmananda Arifandi](https://github.com/yourusername) - 18221059
## Deployment
- Deployed on Vercel
- Live URL : **https://ii-4031-kriptografi-koding.vercel.app/**




## Feedback

If you have any feedback, please reach out to me at velmothy14@gmai.com or 18221059@std.stei.itb.ac.id