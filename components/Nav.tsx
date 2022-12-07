/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { auth } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Nav() {
  const [user, loading, error] = useAuthState(auth);
  return (
    <nav className="flex justify-between items-center py-10">
      <Link href="/">
        <button className="texl-lg font-medium">Message board</button>
      </Link>
      <ul className="flex items-center gap-10">
        {!user && (
          <Link href={'/auth/login'}>
            <button className="py-2 px-4 text-sm bg-indigo-500 text-white rounded-lg font-medium ml-8">
              Start now
            </button>
          </Link>
        )}
        {user && (
          <div className="flex items-center gap-6">
            <Link href="/post">
              <button className="font-medium bg-indigo-500 text-white py-2 px-4 rounded-md text-sm">
                Publicate
              </button>
            </Link>
            <Link href="/dashboard">
              <img
                className="w-12 rounded-full cursor-pointer"
                src={user.photoURL as string}
                alt="user image"
              />
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
}
