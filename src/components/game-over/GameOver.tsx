import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const GameOver = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center  min-h-screen p-16">
      <h1 className="text-4xl font-bold text-center text-white">Congratulations!</h1>
      <p className="text-lg text-gray-200 text-center mt-2">
        You have successfully completed the game
      </p>
      <Button
        onClick={() => router.push('/leaderboard')}
        className="mt-4  font-bold py-2 px-4 rounded"
      >
        Check out the leaderboard
      </Button>
    </div>
  );
};
export default GameOver;
