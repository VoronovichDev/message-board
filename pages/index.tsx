import Head from 'next/head';
import Message from '../components/message';
import { useEffect, useState } from 'react';
import { db } from '../utils/firebase';
import { collection, onSnapshot, orderBy, query, Timestamp } from 'firebase/firestore';
import Link from 'next/link';
import { ParsedUrlQueryInput } from 'querystring';

interface IPostData {
  description?: string;
  avatar?: string;
  timestamp?: Timestamp;
  user?: string;
  username?: string;
  id?: string;
}

export default function Home() {
  // All post state
  const [allPosts, setAllPosts] = useState<IPostData[]>([]);
  const getPosts = async () => {
    const collectionRef = collection(db, 'posts');
    const q = query(collectionRef, orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsubscribe;
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="my-12 text-lg font-medium">
        <h2 className="py-4">People&rsquo;s thoughts</h2>
        {allPosts.map((post) => (
          <Message key={post.id} {...post}>
            <Link href={{ pathname: `/${post.id}`, query: { ...post } as ParsedUrlQueryInput }}>
              <button>comments</button>
            </Link>
          </Message>
        ))}
      </div>
    </div>
  );
}
