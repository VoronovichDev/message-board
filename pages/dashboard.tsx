import React, { useEffect } from 'react';
import { auth } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const route = useRouter();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    const getData = async () => {
      if (loading) return;
      if (!user) return route.push('./auth/login');
    };
    getData();
  }, [user, loading, route]);

  return (
    <div>
      <h1>Your posts</h1>
      <div>posts</div>
      <button onClick={() => auth.signOut()}>Sign Out</button>
    </div>
  );
}
