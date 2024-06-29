import setupGuesses from "./src/guess";
import getRandomWord from "./src/randomWord";
import setSharkImage from "./src/sharkImage";
import { isLetterInWord, revealLetterInWord, setupWord } from "./src/word";
import "./style.css";

document.querySelector("#app").innerHTML = `
  <section id="shark-img"></section>

  <section id="game-status"></section>

  <section id="word-container"></section>

  <section id="letter-buttons"></section>
`;

function initSharkwords() {
  let numWrong = 0;
  const word = getRandomWord();

  const sharkImgEl = document.querySelector("#shark-img");
  const gameStatusEl = document.querySelector("#game-status");
  const wordContainerEl = document.querySelector("#word-container");
  const letterButtonsEl = document.querySelector("#letter-buttons");

  setSharkImage(sharkImgEl, numWrong);
  setupWord(word, wordContainerEl);

  // For debugging:

  console.log(`[INFO] Correct word is: ${word}`);

  // This function is passed to setupGuess and gets called when the user makes
  // a guess (by clicking a letter button)
  const handleGuess = (guessEvent, letter) => {
    // Disable button after click
    const button = guessEvent.target;
    button.setAttribute("disabled", true);

    // Handle correct/incorrect guess
    if (isLetterInWord(letter)) {
      revealLetterInWord(letter);
    } else {
      numWrong += 1;
      setSharkImage(sharkImgEl, numWrong);
    }

    // This is used to check if the user has successfully guessed the word. The user
    // has won if all the letter boxes are filled in.
    const isWordComplete = Array.from(
      document.querySelectorAll(".letter-box")
    ).every((el) => el.innerText !== "");

    // Check for game over
    if (isWordComplete || numWrong === 5) {
      // Disable all the buttons
      document.querySelectorAll("button").forEach((btn) => {
        btn.setAttribute("disabled", true);
      });

      // Display the game status
      gameStatusEl.innerText = guessedWord === word ? "You win!" : "You lose!";
    }
  };

  setupGuesses(letterButtonsEl, handleGuess);
}

initSharkwords();
