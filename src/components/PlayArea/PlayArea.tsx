'use client';

import KeyboardArea from '@/components/KeyboardArea/KeyboardArea';
import Row from '@/components/PlayArea/Row';

import usePlayArea from '@/components/PlayArea/usePlayArea';
import ConfettiCanvas from '@/components/ConfettiCanvas/confetti-canvas';
import { Button } from '@/components/ui/button';

export type GuessObjectType = {
  [key: string]: { letter: string; state: 'default' | 'correct' | 'maybe' }[];
};

const PlayArea = () => {
  const {
    currentAnswer,
    currentRow,
    guesses,
    guessObject,
    handleGuess,
    confettiRef,
    showSuccess,
    handleContinue,
    showFailure,
  } = usePlayArea();

  // TODO add a shake animation to the keyboard when the guess is not complete

  // TODO add flip animation to reveal the states of the letters

  return (
    <div className={'flex flex-col items-center min-h-screen '}>
      <div className={'flex gap-2 lg:gap-4 flex-col pb-12'}>
        {new Array(6).fill(null).map((tile, index) => {
          const isActive = currentRow === index;
          return (
            <Row
              key={index}
              rowIndex={index}
              answer={currentAnswer}
              isActive={isActive}
              guesses={guesses}
              guessObject={guessObject}
            />
          );
        })}
      </div>
      {showSuccess && (
        <div
          className={'flex flex-col items-center absolute bg-success bg p-8 rounded-2xl ml-8 mr-8'}
        >
          <h1 className={'text-4xl text-successText font-bold'}>Congratulations!</h1>
          <p className={'text-lg text-gray-800 text-center'}>
            You have successfully guessed the word
          </p>
          <Button onClick={handleContinue} className={'mt-4'}>
            Next Level
          </Button>
        </div>
      )}

      {showFailure && (
        <div
          className={'flex flex-col items-center absolute bg-red-300 bg p-8 rounded-2xl ml-8 mr-8'}
        >
          <h1 className={'text-4xl text-failureText font-bold'}>Bad Luck!</h1>
          <p className={'text-lg text-gray-800 text-center'}>
            You have failed to guess the word on to the next one
          </p>
          <Button onClick={handleContinue} className={'mt-4'}>
            Next Level
          </Button>
        </div>
      )}

      <KeyboardArea
        className={'gap-4 flex-wrap flex justify-center align-bottom'}
        onPress={handleGuess}
        guessObject={guessObject}
        shouldDisableKeyboard={showSuccess}
      />

      <ConfettiCanvas ref={confettiRef} />
    </div>
  );
};

export default PlayArea;
