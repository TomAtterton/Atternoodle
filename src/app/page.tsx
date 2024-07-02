'use client';
import { redirect } from 'next/navigation';
import { useGlobalStore } from '@/store';

export default function Page() {
  const state = useGlobalStore();

  if (state?.name) {
    return redirect('/game');
  } else {
    return redirect('/introduction');
  }
}
