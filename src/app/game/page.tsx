'use client';

import KeyboardArea from '@/components/KeyboardArea/KeyboardArea';
import Row from './Row';

import usePlayArea from './usePlayArea';
import ConfettiCanvas from '@/components/ConfettiCanvas/confetti-canvas';
import { Button } from '@/components/ui/button';
import { useGlobalStore } from '@/store';
import GameOver from '@/components/game-over/GameOver';

export type GuessObjectType = {
  [key: string]: { letter: string; state: 'default' | 'correct' | 'maybe' }[];
};

const Game = () => {
  const {
    currentAnswer,
    currentRow,
    guesses,
    guessObject,
    handleGuess,
    showSuccess,
    handleContinue,
    showFailure,
    shouldWiggle,
    confettiRef,
  } = usePlayArea();

  const currentLevel = useGlobalStore((state) => state.level);
  const hasCompleted = !currentAnswer;

  return hasCompleted ? (
    <GameOver />
  ) : (
    <div className={'flex flex-col items-center min-h-screen'}>
      <div className={'flex gap-2 lg:gap-4 flex-col pb-12'}>
        <h1 className={'text-xl font-bold '}>Level {currentLevel + 1}</h1>
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
              shouldWiggle={isActive && shouldWiggle}
            />
          );
        })}
      </div>

      <KeyboardArea
        className={'gap-4 flex-wrap flex justify-center align-bottom'}
        onPress={handleGuess}
        guessObject={guessObject}
        shouldDisableKeyboard={showSuccess}
      />

      <ConfettiCanvas ref={confettiRef} />
      {showSuccess && (
        <div
          className={
            'flex flex-col items-center absolute top-1/4 bg-success p-8 rounded-2xl ml-8 mr-8 animate-slide-in-bottom'
          }
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
          className={
            'flex flex-col items-center absolute top-1/4  bg-red-300  p-8 rounded-2xl ml-8 mr-8 animate-slide-in-bottom'
          }
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
    </div>
  );
};

export default Game;
