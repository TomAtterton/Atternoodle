'use client';
import { BarChartIcon, GearIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useGlobalStore } from '@/store';

const NavBar = () => {
  const gameName = useGlobalStore((state) => state.gameName);
  const isAdmin = useGlobalStore((state) => state.isAdmin);
  return (
    <div className="flex justify-between flex-wrap p-8 ">
      {isAdmin && (
        <Link href={'/admin'}>
          <GearIcon className="h-8 w-8" />
        </Link>
      )}
      <Link href={'/'}>
        <p className="text-2xl font-extrabold">AtterNoodle</p>
      </Link>
      <Link href={'/leaderboard'} className={`${!gameName && 'pointer-events-none'}`}>
        <BarChartIcon className={`h-8 w-8 ${!gameName && 'opacity-40'}`} />
      </Link>
    </div>
  );
};

export default NavBar;
