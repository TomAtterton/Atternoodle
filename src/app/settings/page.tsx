'use client';
import { useGlobalStore } from '@/store';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import {
  onClearLeaderboard,
  onCreateLeaderboard,
  onFetchLeaderboards,
  setUserScore,
} from '@/actions';

export default function Settings() {
  const handleClearStorage = useGlobalStore((state) => state.clear);
  const router = useRouter();

  const handleClear = () => {
    handleClearStorage();
    router.replace('./');
  };

  const user = useGlobalStore((state) => state.name);
  const leaderboard = useGlobalStore((state) => state.gameName);

  return (
    <main className="flex min-h-screen flex-col items-center mt-14">
      <div className={'flex flex-col gap-8'}>
        <div className={'flex'}>
          <p className={'font-extrabold pr-4'}> Username: </p>
          <p>{user}</p>
        </div>
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
      </div>
    </main>
  );
}
