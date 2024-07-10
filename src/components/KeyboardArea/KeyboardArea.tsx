'use client';

import { Button } from '@/components/ui/button';
import { GuessObjectType } from '@/app/game/page';
import { useMemo } from 'react';

const keyboardLetterRows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'back'],
];
const symbols: {
  [key: string]: string;
} = {
  back: '⌫',
  enter: '↵',
};
const KeyButton = ({
  key,
  letter,
  onPress,
  shouldDisableKeyboard,
  backgroundColor,
}: {
  key: string;
  letter: string;
  onPress: (letter: string) => void;
  shouldDisableKeyboard: boolean;
  backgroundColor: string;
}) => {
  const isSpecialKey = ['back', 'enter'].includes(letter);
  const symbol = isSpecialKey ? symbols[letter] : letter;
  return (
    <Button
      key={key}
      disabled={shouldDisableKeyboard}
      className={`w-8 h-14 lg:w-32 lg:h-14 ${isSpecialKey ? 'bg-gray-300' : backgroundColor} justify-center items-center flex rounded active:bg-gray-800  active:text-gray-300`}
      onClick={() => onPress(letter)}
    >
      <p className={'text-xl lg:text-3xl md:text-l uppercase'}>{symbol}</p>
    </Button>
  );
};

const KeyboardArea = ({
  className,
  onPress,
  guessObject,
  shouldDisableKeyboard,
}: {
  className?: string;
  onPress: (letter: string) => void;
  guessObject: GuessObjectType;
  shouldDisableKeyboard: boolean;
}) => {
  const letterStateObject: { [key: string]: string } = useMemo(() => {
    const letterStateMap: { [key: string]: string } = {};
    const flattenedGuess = Object.values(guessObject).flat();
    flattenedGuess.forEach((guess) => {
      if (
        !letterStateMap[guess.letter] ||
        guess.state === 'correct' ||
        (guess.state === 'maybe' && letterStateMap[guess.letter] === 'default')
      ) {
        letterStateMap[guess.letter] = guess.state;
      }
    });

    return letterStateMap;
  }, [guessObject]);

  const getBackgroundColor = (letter: string) => {
    const letterState = letterStateObject[letter];
    switch (letterState) {
      case 'correct':
        return 'bg-green-300';
      case 'maybe':
        return 'bg-yellow-300';
      case 'default':
        return 'bg-gray-800';
      default:
        return 'bg-gray-300';
    }
  };
  return (
    <div className={className}>
      {keyboardLetterRows.map((row, rowIndex) => (
        <div key={rowIndex} className={'flex gap-1.5 lg:gap-4'}>
          {row.map((letter, index) => (
            <KeyButton
              key={`${letter}-${index}-${rowIndex}`}
              letter={letter}
              onPress={onPress}
              shouldDisableKeyboard={shouldDisableKeyboard}
              backgroundColor={getBackgroundColor(letter)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default KeyboardArea;
