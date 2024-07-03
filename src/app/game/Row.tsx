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
  const generateRow = useMemo(() => {
    return new Array(answer.length).fill(null);
  }, [answer.length]);

  return (
    <div className={'flex gap-4'}>
      {generateRow.map((tile, index) => {
        if (guessObject[rowIndex]) {
          const isCorrect = guessObject[rowIndex][index].state === 'correct';

          return (
            <Tile
              key={index}
              letter={guessObject[rowIndex][index].letter}
              titleState={guessObject[rowIndex][index].state}
              shouldBounce={isCorrect && true}
            />
          );
        }

        return (
          <Tile
            key={index}
            letter={isActive ? guesses[index] || '' : ''}
            titleState={isActive && guesses[index] ? 'default' : undefined}
            shouldWiggle={shouldWiggle}
          />
        );
      })}
    </div>
  );
};

export default Row;
