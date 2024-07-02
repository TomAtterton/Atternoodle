'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useGlobalStore } from '@/store';
import { useRouter } from 'next/navigation';
import { onCreateUserForLeaderboard } from '@/actions';

export default function Introduction() {
  const [name, setNameText] = useState('');
  const [gameName, setGameNameText] = useState('');

  const setName = useGlobalStore((state) => state.setName);
  const setGameName = useGlobalStore((state) => state.setGameName);
  const router = useRouter();

  const handleAddName = async () => {
    try {
      await onCreateUserForLeaderboard(name, gameName.toLowerCase());

      setName(name);
      setGameName(gameName);
      router.push('/game');
    } catch (error) {
      // TODO a better error handling mechanism show custom dialog or toast
      // @ts-ignore
      alert(error?.message || 'An error occurred');
    }
  };

  const buttonDisabled = name?.length < 2 || !gameName;

  return (
    <main className="flex min-h-screen flex-col items-center ">
      <div className="w-full max-w-xs mt-20">
        <p className="text-lg font-bold mb-14">
          Welcome to AtterNoodle! Ready to test your skills and climb the leaderboard?
        </p>
        <p className="mb-2">Enter your name</p>
        <input
          value={name}
          onChange={(e) => setNameText(e.target.value)}
          placeholder={'Name'}
          className="w-full py-2 px-3"
          max={20}
        />

        <p className="mt-4 mb-2">Which game are you joining ?</p>
        <input
          value={gameName}
          onChange={(e) => setGameNameText(e.target.value)}
          placeholder={'Game Name'}
          className="w-full py-2 px-3"
          max={20}
        />

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
