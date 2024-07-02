'use client';
import { onFetchLeaderboardScores } from '@/actions';
import { useEffect, useState } from 'react';

export default function Leaderboard() {
  const [scores, setScores] = useState<{ name: string; score: number }[]>([]);

  useEffect(() => {
    const fetchScores = async () => {
      const scoresResponse = await onFetchLeaderboardScores('atterton25');
      setScores(scoresResponse);
    };
    fetchScores();
  }, []);

  return (
    <main className="flex min-h-screen flex-col pl-8 pr-8">
      <p className="text-4xl font-bold mb-4">Leaderboard</p>
      {scores.map((score: { name: string; score: number }) => {
        return (
          <div className="flex justify-between  p-4 rounded-lg  mb-2" key={score.name}>
            <p className="font-medium">{score.name}</p>
            <p className="font-medium">{score.score}</p>
          </div>
        );
      })}
    </main>
  );
}
