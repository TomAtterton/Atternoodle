import React, { useMemo } from 'react';

interface Props {
  letter?: string;
  titleState?: 'default' | 'correct' | 'maybe';
  shouldWiggle?: boolean;
  shouldBounce?: boolean;
  tileSize: string;
}

const Tile = ({ letter, titleState, shouldWiggle, shouldBounce, tileSize }: Props) => {
  const backgroundColor = useMemo(() => {
    switch (titleState) {
      case 'default':
        return 'bg-gray-300';
      case 'correct':
        return 'bg-green-300';
      case 'maybe':
        return 'bg-yellow-300';
      default:
        return 'bg-gray-800';
    }
  }, [titleState]);

  const animationWiggle = shouldWiggle ? 'animate-wiggle' : '';
  const animationBounce = shouldBounce ? 'animate-bounce' : '';
  return (
    <div
      id={`tile-${letter}`}
      className={`${tileSize} lg:h-20 lg:w-20 ${backgroundColor} justify-center items-center flex rounded ${animationWiggle} ${animationBounce}`}
    >
      <p className={'text-black text-3xl uppercase drop-shadow-md'}>{letter}</p>
    </div>
  );
};

export default Tile;
