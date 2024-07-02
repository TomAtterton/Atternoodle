import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import ReactCanvasConfetti from 'react-canvas-confetti';
import { TCanvasConfettiInstance } from 'react-canvas-confetti/src/types/normalization';
import { Options } from 'canvas-confetti';

// eslint-disable-next-line react/display-name
const ConfettiCanvas = forwardRef(({}, ref) => {
  const refAnimationInstance = useRef<TCanvasConfettiInstance>();

  useImperativeHandle(ref, () => ({
    fire,
  }));

  const handleShot = useCallback((particleRatio: number, opts: Options) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      });
  }, []);

  const fire = useCallback(() => {
    handleShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    handleShot(0.2, {
      spread: 60,
    });

    handleShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    handleShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    handleShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [handleShot]);

  return (
    <ReactCanvasConfetti
      onInit={(params: { confetti: TCanvasConfettiInstance }) => {
        refAnimationInstance.current = params.confetti;
      }}
      className={'fixed pointer-events-none top:0 left:0 w-[100%] h-[100%]'}
    />
  );
});

export default ConfettiCanvas;
