import { kv } from '@vercel/kv';

export type ScoresType = {
  [key: string]: { name: string; score: number };
};

type Leaderboard = {
  [key: string]: {
    id: string;
    name: string;
    scores: ScoresType;
  };
};

/**
 * Create a new user for the leaderboard
 * - If leaderboard does not exist, throw an error
 * - If leaderboard exists, check if user already exists
 * - If user does not exist, create a new user and add to leaderboard
 *
 * @param name
 * @param leaderboard
 */
export const onCreateUserForLeaderboard = async (name: string, leaderboard: string) => {
  try {
    const leaderboards = await onFetchLeaderboards();
    if (!leaderboards) {
      throw new Error('Leaderboard not found');
    }
    const foundLeaderboard = leaderboards[leaderboard];
    if (!foundLeaderboard) {
      throw new Error('Leaderboard not found');
    }

    const scores = foundLeaderboard?.scores[name];
    if (scores?.name) {
      throw new Error('User already exists please choose a different name');
    }

    await setUserScore(name, leaderboard, 0);
    return;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

/**
 * Set user score
 *
 *  - If user already exists, update the score
 *  - If user does not exist, create a new user
 *  - Order the scores in descending order
 *
 * @param name
 * @param leaderboard
 * @param score
 */
export const setUserScore = async (name: string, leaderboard: string, score: number) => {
  const leaderboards = await onFetchLeaderboards();
  const foundLeaderboard = leaderboards?.[leaderboard];

  const currentUserScore = foundLeaderboard?.scores[name];

  const updatedScores = {
    ...foundLeaderboard?.scores,
    [name]: { name, score: currentUserScore?.score ? currentUserScore.score + score : score },
  };

  const orderedScores = Object.fromEntries(
    Object.entries(updatedScores).sort(([, a], [, b]) => b.score - a.score),
  );

  await kv.set('leaderboards', {
    [leaderboard]: {
      id: leaderboard,
      name: leaderboard,
      scores: orderedScores,
    },
  });
};

export const onFetchLeaderboards = async () => {
  const leaderboard = await kv.get<Leaderboard>('leaderboards');
  console.log('Leaderboard fetched', leaderboard);
  return leaderboard;
};

export const onFetchLeaderboardScores = async (leaderboardName: string) => {
  const leaderboards = await onFetchLeaderboards();
  const leaderboard = leaderboards?.[leaderboardName];
  return leaderboard?.scores ? Object.values(leaderboard.scores) : [];
};

/**
 * Debug function to create a new leaderboard
 */
export const onCreateLeaderboard = async () => {
  const response = await kv.set('leaderboards', {
    atterton25: {
      id: process.env.GAME_NAME || 'default',
      name: 'Atterton 25',
      scores: {},
    },
  });
  console.log('Leaderboard created', response);
};

/**
 *  Debug function to clear leaderboard
 */
export const onClearLeaderboard = async () => {
  await kv.del('leaderboards');
  console.log('Leaderboard cleared');
};
