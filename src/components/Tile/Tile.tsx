'use client';

import { useMemo } from 'react';

interface Props {
  letter?: string;
  titleState?: 'default' | 'correct' | 'maybe';
}

const Tile = ({ letter, titleState }: Props) => {
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

  return (
    <div
      className={`h-14 w-14 lg:h-20 lg:w-20 ${backgroundColor} justify-center items-center flex rounded`}
    >
      <p className={'text-black text-3xl uppercase drop-shadow-md'}>{letter}</p>
    </div>
  );
};

export default Tile;
