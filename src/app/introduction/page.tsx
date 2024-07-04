'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useGlobalStore } from '@/store';
import { useRouter } from 'next/navigation';
import { onCreateUserForLeaderboard } from '@/actions';
import Image from 'next/image';

export default function Introduction() {
  const [name, setNameText] = useState('');
  // const [gameName, setGameNameText] = useState('');

  const setName = useGlobalStore((state) => state.setName);
  const setGameName = useGlobalStore((state) => state.setGameName);
  const router = useRouter();

  const handleAddName = async () => {
    try {
      await onCreateUserForLeaderboard(name, process.env.GAME_NAME || 'default');

      setName(name);
      setGameName(process.env.GAME_NAME || 'default');

      router.push('/game');
    } catch (error) {
      // TODO a better error handling mechanism show custom dialog or toast
      // @ts-ignore
      alert(error?.message || 'An error occurred');
    }
  };

  const buttonDisabled = name?.length < 2 || !process.env.GAME_NAME;

  return (
    <main className="flex min-h-screen flex-col items-center ">
      <div className="w-full max-w-xs mt-8">
        <Image
          className={'w-full h-full heart-mask bg-red-300'}
          width={720}
          height={720}
          src={require('../../assets/couple.jpg')}
          alt={'image'}
        />
        <p className="text-lg font-bold mb-4">Welcome to AtterNoodle!</p>
        <p className={'text-lg mb-8 '}>
          A fun wordle game to test your knowledge and guess words related to the couple and their
          adventures together!
        </p>
        <p className="text-lg font-bold mb-4">Please enter your name</p>
        <input
          value={name}
          onChange={(e) => setNameText(e.target.value)}
          placeholder={'Name'}
          className="w-full py-2 px-3"
          max={20}
        />

        {/*<p className="mt-4 mb-2">Which game are you joining ?</p>*/}
        {/*<input*/}
        {/*  value={gameName}*/}
        {/*  onChange={(e) => setGameNameText(e.target.value)}*/}
        {/*  placeholder={'Game Name'}*/}
        {/*  className="w-full py-2 px-3"*/}
        {/*  max={20}*/}
        {/*/>*/}

        <Button
          onClick={handleAddName}
          disabled={buttonDisabled}
          className=" font-bold py-2 px-4 mt-8"
        >
          Submit
        </Button>
      </div>
    </main>
  );
}
