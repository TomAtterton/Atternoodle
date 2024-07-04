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

  return (
    <main className="flex min-h-screen flex-col items-center mt-14">
      <div className={'flex flex-col gap-8'}>
        <div className={'flex'}>
          {user && (
            <>
              <p className={'font-extrabold pr-4'}> Username: </p>
              <p>{user}</p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
