'use client';

import { Button } from '@/components/ui/button';
import {
  onClearLeaderboard,
  onCreateLeaderboard,
  onFetchLeaderboards,
  setUserScore,
} from '@/actions';
import { useGlobalStore } from '@/store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Admin() {
  const handleClearStorage = useGlobalStore((state) => state.clear);
  const router = useRouter();

  const handleClear = () => {
    handleClearStorage();
    router.replace('./');
  };

  const user = useGlobalStore((state) => state.name);
  const leaderboard = useGlobalStore((state) => state.gameName);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const isAdmin = useGlobalStore((state) => state.isAdmin);
  const setIsAdmin = useGlobalStore((state) => state.setIsAdmin);

  const handleLogin = () => {
    // TODO: More secure login, temporary solution for now for event
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      setIsAdmin(true);
    } else {
      alert('Invalid credentials naughty naughty');
    }
  };

  return isAdmin ? (
    <main className="flex min-h-screen flex-col items-center mt-14 gap-4">
      <p>Debug settings</p>
      <Button
        onClick={() => {
          setUserScore(user, leaderboard, 10);
        }}
      >
        Increment score
      </Button>
      <p>Cached settings</p>
      <Button onClick={handleClear}>Clear local storage</Button>
      <p>leaderboard settings</p>
      <Button onClick={onCreateLeaderboard}>Generate Leaderboard</Button>
      <Button onClick={onFetchLeaderboards}>Fetch Leaderboard </Button>
      <Button onClick={onClearLeaderboard}>Clear Leaderboard</Button>
    </main>
  ) : (
    <main className="flex min-h-screen flex-col items-center mt-14 gap-4">
      <input
        type="text"
        placeholder="Username"
        className={'h-10 pl-4'}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className={'h-10 pl-4'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>Login</Button>
    </main>
  );
}
