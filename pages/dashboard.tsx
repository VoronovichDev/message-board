import React, { use, useEffect, useState } from 'react';
import { auth, db } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { collection, onSnapshot, query, Timestamp, where } from 'firebase/firestore';
import Message from '../components/message';

interface IDashPostData {
  description?: string;
  avatar?: string;
  timestamp?: Timestamp;
  user?: string;
  username?: string;
  id?: string;
}

export default function Dashboard() {
  const route = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [posts, setPosts] = useState<IDashPostData[]>([]);
  console.log(user);

  useEffect(() => {
    const getData = async () => {
      if (loading) return;
      if (!user) return route.push('./auth/login');
      const collectionRef = collection(db, 'posts');
      const q = query(collectionRef, where('user', '==', user.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
      return unsubscribe;
    };
    getData();
  }, [user, loading, route]);

  return (
    <div>
      <h1>Your posts</h1>
      <div>
        {posts.map((post) => (
          <Message {...post} key={post.id}></Message>
        ))}
      </div>
      <button onClick={() => auth.signOut()}>Sign Out</button>
    </div>
  );
}
