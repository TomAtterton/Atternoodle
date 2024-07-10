import { useEffect, useRef, useState } from 'react';
import { setUserScore } from '@/actions';
import { useGlobalStore } from '@/store';
import { GuessObjectType } from '@/app/game/page';

const answers = [
  'HARLEY',
  'DYLAN',
  'DAISY',
  'BIKES',
  'HOUSE',
  'RINGS',
  'WHISKY',
  'CAKES',
  'DOLLY',
  'HEART',
  'CANCUN',
  'HOCKEY',
  'CAKES',
  'BRISTOL',
  'HOGS',
  'POPPY',
  'ROSIE',
  'TENBY',
  'FOSTER',
  'SILVER',
  'MURPHY',
  'LOVE',
  'DOWNEND',
  'CARAVAN',
  'LINGIN',
  'GARDEN',
  'YODA',
];
const ROW_LENGTH = 6;

const usePlayArea = () => {
  const { name, gameName, level, setLevel } = useGlobalStore((state) => state);
  const [currentAnswer, setCurrentAnswer] = useState(answers[level]);
  const [currentRow, setCurrentRow] = useState(0);

  const [guesses, setGuesses] = useState<string[]>([]);
  const [guessObject, setGuessObject] = useState<GuessObjectType>({});

  const confettiRef = useRef<any>(null);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  const [shouldWiggle, setShouldWiggle] = useState(false);

  const handleWiggle = () => {
    setShouldWiggle(true);
    setTimeout(() => {
      setShouldWiggle(false);
    }, 500);
  };

  const handleDelete = () => {
    const newGuesses = guesses.slice(0, guesses.length - 1);
    setGuesses(newGuesses);
  };

  const handleEnter = async () => {
    if (guesses.length < currentAnswer.length) {
      handleWiggle();
      return;
    }

    const newGuessObject = guesses.map((guess, index) => {
      if (guess === currentAnswer[index]) {
        return { letter: guess, state: 'correct' };
      }
      if (currentAnswer.includes(guess)) {
        return { letter: guess, state: 'maybe' };
      }
      return { letter: guess, state: 'default' };
    });

    if (currentRow === ROW_LENGTH - 1) {
      setShowFailure(true);
      return;
    }

    if (newGuessObject.every((guess) => guess.state === 'correct')) {
      // start with 6 points and subtract 1 for each row
      const score = 6 - currentRow;

      await setUserScore(name, gameName, score);
      setTimeout(() => {
        setShowSuccess(true);
      }, 1000);
      confettiRef.current.fire();
    } else {
      setCurrentRow(currentRow + 1);
    }

    setGuessObject({ ...guessObject, [currentRow]: newGuessObject });
    setGuesses([]);
  };

  const handleGuess = async (letter: string) => {
    if ('back' === letter) {
      handleDelete();
      return;
    }
    if ('enter' === letter) {
      await handleEnter();
      return;
    }

    if (guesses.length >= currentAnswer.length) {
      handleWiggle();
      return;
    }

    const newGuesses = [...guesses, letter];
    setGuesses(newGuesses);
  };
  const handleContinue = () => {
    setShowFailure(false);
    setShowSuccess(false);
    // setCurrentAnswer(answers[level + 1]);
    setLevel(level + 1);
    setCurrentRow(0);
    setGuesses([]);
    setGuessObject({});
  };

  // TODO: bug with zustand not loading correct level on first render
  useEffect(() => {
    setCurrentAnswer(answers[level]);
  }, [level]);

  return {
    currentAnswer,
    currentRow,
    guesses,
    guessObject,
    handleGuess,
    handleContinue,
    confettiRef,
    showSuccess,
    showFailure,
    shouldWiggle,
  };
};

export default usePlayArea;
