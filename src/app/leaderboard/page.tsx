'use client';
import { onFetchLeaderboardScores } from '@/actions';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useGlobalStore } from '@/store';

export default function Leaderboard() {
  const [scores, setScores] = useState<{ name: string; score: number }[]>([]);

  const gameName = useGlobalStore((state) => state.gameName);

  useEffect(() => {
    const fetchScores = async () => {
      const scoresResponse = await onFetchLeaderboardScores(gameName);
      setScores(scoresResponse);
    };
    fetchScores();
  }, [gameName]);

  const highestScore = Math.max(...scores.map((score) => score?.score), 0);

  return (
    <main className="flex min-h-screen flex-col pl-8 pr-8">
      {scores.map((score, index) => {
        return (
          <div className="flex justify-between items-center p-4 rounded-lg mb-2" key={score.name}>
            <div className="flex items-center">
              {score?.score === highestScore && (
                <Image
                  src="/crown.svg"
                  className={'pb-2'}
                  width={40}
                  height={40}
                  alt="Picture of the author"
                />
              )}
              <p className="font-medium pl-2 ">{score.name}</p>
            </div>
            <p className="font-medium">{score.score}</p>
          </div>
        );
      })}
    </main>
  );
}
