import { useMemo } from 'react';
import Tile from '@/components/Tile/Tile';
import { GuessObjectType } from '@/components/PlayArea/PlayArea';

const Row = ({
  answer,
  rowIndex,
  isActive,
  guesses,
  guessObject,
}: {
  answer: string;
  rowIndex: number;
  guesses: string[];
  isActive: boolean;
  guessObject: GuessObjectType;
}) => {
  const generateRow = useMemo(() => {
    return new Array(answer.length).fill(null);
  }, [answer.length]);

  return (
    <div className={'flex gap-4'}>
      {generateRow.map((tile, index) => {
        if (guessObject[rowIndex]) {
          return (
            <Tile
              key={index}
              letter={guessObject[rowIndex][index].letter}
              titleState={guessObject[rowIndex][index].state}
            />
          );
        }

        return (
          <Tile
            key={index}
            letter={isActive ? guesses[index] || '' : ''}
            titleState={isActive && guesses[index] ? 'default' : undefined}
          />
        );
      })}
    </div>
  );
};

export default Row;
