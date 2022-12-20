/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { auth } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Nav() {
  const [user, loading, error] = useAuthState(auth);
  return (
    <nav className="flex justify-between items-center py-10">
      <Link href="/" className="flex sm:gap-2 gap:0 flex-col sm:flex-row items-center">
        <button className="texl-lg font-medium">Mini-twitter</button>
        <img className="sm:w-10 w-7 p-0" src="/logo.png" alt="mini-twitter" />
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
          <div className="flex items-center sm:gap-6 gap-3">
            <Link href="/post">
              <button className="font-medium bg-indigo-500 text-white sm:py-2 sm:px-4 py-1 px-2 rounded-md sm:text-sm text-xs">
                Publicate
              </button>
            </Link>
            <Link href="/dashboard">
              <img
                className="sm:w-12 w-8 rounded-full cursor-pointer"
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
