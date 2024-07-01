import { useState } from 'react';
import { GuessObjectType } from '@/components/PlayArea/PlayArea';

const answers = ['DYLAN', 'DAISY'];
const ROW_LENGTH = 6;

const usePlayArea = () => {
  const [currentAnswer, setCurrentAnswer] = useState(answers[0]);
  const [currentRow, setCurrentRow] = useState(0);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [guessObject, setGuessObject] = useState<GuessObjectType>({});

  const [showSuccess, setShowSuccess] = useState(false);

  const handleGuess = (letter: string) => {
    if ('back' === letter) {
      const newGuesses = guesses.slice(0, guesses.length - 1);
      setGuesses(newGuesses);
      return;
    }
    if ('enter' === letter) {
      if (currentRow === ROW_LENGTH - 1) {
        return;
      }

      if (guesses.length < currentAnswer.length) {
        // TODO add shake animation to indicate that the guess is not complete
        return;
      }

      setCurrentRow(currentRow + 1);

      const newGuessObject = guesses.map((guess, index) => {
        if (guess === currentAnswer[index]) {
          return { letter: guess, state: 'correct' };
        }
        if (currentAnswer.includes(guess)) {
          return { letter: guess, state: 'maybe' };
        }
        return { letter: guess, state: 'default' };
      });

      setGuessObject({ ...guessObject, [currentRow]: newGuessObject });

      setGuesses([]);
      return;
    }

    if (guesses.length >= currentAnswer.length) {
      return;
    }

    const newGuesses = [...guesses, letter];
    setGuesses(newGuesses);
  };

  const handleContinue = () => {
    setShowSuccess(false);
    setCurrentAnswer(answers[1]);
    setCurrentRow(0);
    setGuesses([]);
    setGuessObject({});
  };

  return {
    currentAnswer,
    currentRow,
    guesses,
    guessObject,
    showSuccess,
    handleGuess,
    handleContinue,
  };
};

export default usePlayArea;
