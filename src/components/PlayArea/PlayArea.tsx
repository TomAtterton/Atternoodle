'use client';

import KeyboardArea from '@/components/KeyboardArea/KeyboardArea';
import Row from '@/components/PlayArea/Row';

import usePlayArea from '@/components/PlayArea/usePlayArea';

export type GuessObjectType = {
  [key: string]: { letter: string; state: 'default' | 'correct' | 'maybe' }[];
};

const PlayArea = () => {
  const { currentAnswer, currentRow, guesses, guessObject, handleGuess } = usePlayArea();

  return (
    <div className={'flex flex-col items-center min-h-screen justify-around '}>
      <div className={'flex gap-1.5 lg:gap-4 flex-col pb-12'}>
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
      <KeyboardArea
        className={'gap-4 flex-wrap flex justify-center align-bottom'}
        onPress={handleGuess}
        guessObject={guessObject}
      />
    </div>
  );
};

export default PlayArea;
