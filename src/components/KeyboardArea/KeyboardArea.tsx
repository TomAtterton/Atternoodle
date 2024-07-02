'use client';

import { GuessObjectType } from '@/components/PlayArea/PlayArea';
import { Button } from '@/components/ui/button';

const keyboardLetterRows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'back'],
];

const KeyButton = ({
  letter,
  onPress,
  shouldDisableKeyboard,
  backgroundColor,
}: {
  letter: string;
  onPress: (letter: string) => void;
  shouldDisableKeyboard: boolean;
  backgroundColor: string;
}) => {
  const symbols: {
    [key: string]: string;
  } = {
    back: '⌫',
    enter: '↵',
  };

  const isSpecialKey = ['back', 'enter'].includes(letter);
  const symbol = isSpecialKey ? symbols[letter] : letter;

  return (
    <Button
      disabled={shouldDisableKeyboard}
      className={`w-8 h-14 lg:w-32 lg:h-20 ${isSpecialKey ? 'bg-gray-300' : backgroundColor} justify-center items-center flex rounded active:bg-gray-800 active:text-gray-300`}
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
  // TODO fix the state of the keyboard letters that correct overwrites maybe and default

  const uniqueLetters = Object.values(guessObject)
    .flat()
    .map((guess) => guess);

  return (
    <div className={className}>
      {keyboardLetterRows.map((row, rowIndex) => (
        <div key={rowIndex} className={'flex gap-1.5 lg:gap-4'}>
          {row.map((letter, index) => {
            const letterState = uniqueLetters.find((guess) => guess.letter === letter)?.state;

            const backgroundColor = (() => {
              switch (letterState) {
                case 'default':
                  return 'bg-gray-800';
                case 'correct':
                  return 'bg-green-300';
                case 'maybe':
                  return 'bg-yellow-300';
                default:
                  return 'bg-gray-300';
              }
            })();

            return (
              <KeyButton
                key={index}
                letter={letter}
                onPress={onPress}
                shouldDisableKeyboard={shouldDisableKeyboard}
                backgroundColor={backgroundColor}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default KeyboardArea;
