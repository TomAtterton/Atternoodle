'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useGlobalStore } from '@/store';
import { useRouter } from 'next/navigation';

export default function Introduction() {
  const [name, setNameText] = useState('');
  const [gameName, setGameNameText] = useState('');

  const setName = useGlobalStore((state) => state.setName);
  const setGameName = useGlobalStore((state) => state.setGameName);
  const router = useRouter();

  const handleAddName = () => {
    // Check name against duplicate to prevent adding the same name
    // Check secret to see if it matches what is stored in db
    // persist name to db

    setName(name);
    setGameName(gameName);

    // Redirect to game page
    router.push('/game');
  };

  return (
    <main className="flex min-h-screen flex-col items-center ">
      <div className="w-full max-w-xs mt-20">
        <p className="text-lg font-bold mb-14">Welcome to atternoodle blah blah blah blah</p>

        <p className="mb-2">Enter your name</p>
        <input
          value={name}
          onChange={(e) => setNameText(e.target.value)}
          placeholder={'Name'}
          className="w-full py-2 px-3"
        />

        <p className="mt-4 mb-2">Which game are you joining ?</p>
        <input
          value={gameName}
          onChange={(e) => setGameNameText(e.target.value)}
          placeholder={'Game Name'}
          className="w-full py-2 px-3"
        />

        <Button
          onClick={handleAddName}
          disabled={!name || !gameName}
          className=" font-bold py-2 px-4 mt-8"
        >
          Submit
        </Button>
      </div>
    </main>
  );
}
