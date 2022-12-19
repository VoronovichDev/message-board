import React, { useEffect, useState } from 'react';
import { auth, db } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
import Message from '../components/message';
import { FaTrash } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import Link from 'next/link';
import { ParsedUrlQueryInput } from 'querystring';

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
      const q = query(collectionRef, where('user', '==', user.uid), orderBy('timestamp', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
      return unsubscribe;
    };
    getData();
  }, [user, loading, route]);

  // Delete
  const deletePost = async (id: string | undefined) => {
    if (typeof id === 'string') {
      const docRef = doc(db, 'posts', id);
      await deleteDoc(docRef);
    }
    return;
  };

  return (
    <div>
      <h1 className="py-4">Your posts</h1>
      <div>
        {posts.map((post) => (
          <Message {...post} key={post.id}>
            <div className="flex gap-4">
              <button
                onClick={() => deletePost(post.id)}
                className="flex text-rose-500 items-center justify-center gap-2 py-2 text-sm"
              >
                <FaTrash className="text-xl" />
                Delete
              </button>
              <Link href={{ pathname: '/post', query: post as ParsedUrlQueryInput }}>
                <button className="flex text-zinc-400 items-center justify-center gap-2 py-2 text-sm">
                  <FaEdit className="text-xl" />
                  Edit
                </button>
              </Link>
            </div>
          </Message>
        ))}
      </div>
      <button
        className="font-medium text-white bg-slate-800 py-2 px-4 my-8 rounded-lg"
        onClick={() => auth.signOut()}
      >
        Sign Out
      </button>
    </div>
  );
}
