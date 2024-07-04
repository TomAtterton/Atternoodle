import { useMemo } from 'react';
import Tile from '@/components/Tile/Tile';
import { GuessObjectType } from '@/app/game/page';

const Row = ({
  answer,
  rowIndex,
  isActive,
  guesses,
  guessObject,
  shouldWiggle,
}: {
  answer: string;
  rowIndex: number;
  guesses: string[];
  isActive: boolean;
  guessObject: GuessObjectType;
  shouldWiggle?: boolean;
}) => {
  const answerLength = answer.length;

  const generateRow = useMemo(() => {
    return new Array(answerLength).fill(null);
  }, [answerLength]);

  const tileSize = useMemo(() => {
    switch (answerLength) {
      case 4:
        return 'h-16 w-16 ';
      case 5:
        return 'h-14 w-14';
      case 6:
        return 'h-12 w-12';
      case 7:
        return 'h-10 w-10';
    }
  }, [answerLength]);

  return (
    <div className={'flex gap-4'}>
      {generateRow.map((_, index) => {
        if (guessObject[rowIndex]) {
          const isCorrect = guessObject[rowIndex][index].state === 'correct';

          return (
            <Tile
              key={index}
              letter={guessObject[rowIndex][index].letter}
              titleState={guessObject[rowIndex][index].state}
              shouldBounce={isCorrect && true}
              tileSize={tileSize}
            />
          );
        }

        return (
          <Tile
            key={index}
            letter={isActive ? guesses[index] || '' : ''}
            titleState={isActive && guesses[index] ? 'default' : undefined}
            shouldWiggle={shouldWiggle}
            tileSize={tileSize}
          />
        );
      })}
    </div>
  );
};

export default Row;
