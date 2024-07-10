'use client';

import KeyboardArea from '@/components/KeyboardArea/KeyboardArea';

import usePlayArea from './usePlayArea';
import ConferttiCanvas from '@/components/ConfettiCanvas/ConferttiCanvas';
import { Button } from '@/components/ui/button';
import { useGlobalStore } from '@/store';
import GameOver from '@/components/GameOver/GameOver';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Row from '@/components/Row/Row';

export type GuessObjectType = {
  [key: string]: { letter: string; state: 'default' | 'correct' | 'maybe' }[];
};

const congratsImages = [
  require('../../assets/congratulations/congratulations_1.jpg'),
  require('../../assets/congratulations/congratulations_2.jpg'),
  require('../../assets/congratulations/congratulations_3.jpg'),
  require('../../assets/congratulations/congratulations_4.jpg'),
  require('../../assets/congratulations/congratulations_5.jpg'),
];

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

  const name = useGlobalStore((state) => state.name);
  const router = useRouter();
  useEffect(() => {
    if (!name) {
      router.push('/');
    }
  }, [name, router]);

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

      <ConferttiCanvas ref={confettiRef} />
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col items-center justify-center bg-green-100 p-6 rounded-2xl shadow-lg animate-slide-in-bottom gap-4 mx-4 max-w-sm md:max-w-md lg:max-w-lg">
            <h1 className="text-3xl md:text-4xl font-bold text-green-800 text-center">
              Congratulations!
            </h1>
            <Image
              src={congratsImages[Math.floor(Math.random() * congratsImages.length)]}
              alt="image"
              className="rounded-2xl w-full h-auto"
            />
            <Button
              onClick={handleContinue}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Next Level
            </Button>
          </div>
        </div>
      )}

      {showFailure && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col items-center justify-center bg-red-300 p-6 rounded-2xl shadow-lg animate-slide-in-bottom gap-4 mx-4 max-w-sm md:max-w-md lg:max-w-lg">
            <h1 className="text-3xl md:text-4xl text-red-800 font-bold text-center">Keep Going!</h1>
            <Image
              src={require('../../assets/next-time/next_time.jpg')}
              alt="Encouragement"
              className="rounded-2xl w-full h-auto"
            />
            <Button
              onClick={handleContinue}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Next Level
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
