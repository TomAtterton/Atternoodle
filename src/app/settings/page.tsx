'use client';
import { useGlobalStore } from '@/store';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Settings() {
  const handleClearStorage = useGlobalStore((state) => state.clear);
  const router = useRouter();
  const handleClear = () => {
    handleClearStorage();
    router.replace('./');
  };
  return (
    <main className="flex min-h-screen flex-col items-center">
      <p className={'text-xl font-bold mb-14'}>Settings</p>
      <Button onClick={handleClear}>Clear Storage</Button>
    </main>
  );
}
