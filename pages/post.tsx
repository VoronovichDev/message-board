/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { auth, db } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Post() {
  const [post, setPost] = useState<{ description: string; id?: string }>({ description: '' });
  const [user, loading, error] = useAuthState(auth);
  const route = useRouter();
  const routeData = route.query;

  // Post submission
  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();

    // Checks
    if (!post.description) {
      toast.error('Post is empty', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }
    if (post.description.length > 280) {
      toast.error('Post is too long', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }

    // Checks if the user trying to update post or make a new one
    if (post?.hasOwnProperty('id')) {
      // Update post
      const docRef = doc(db, 'posts', post.id as string);
      const undatedPost = { ...post, timestamp: serverTimestamp() };
      await updateDoc(docRef, undatedPost);
      return route.push('/');
    } else {
      // Create new post
      const collectionRef = collection(db, 'posts');
      await addDoc(collectionRef, {
        ...post,
        timestamp: serverTimestamp(),
        user: user?.uid,
        avatar: user?.photoURL,
        username: user?.displayName,
      });
      setPost({ description: '' });
      toast.success('Your thought has been published', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2500,
      });
      return route.push('/');
    }
  };

  // Check current user
  const chekUser = async () => {
    if (loading) return;
    if (!user) route.push('/auth/login');
    if (routeData.id) {
      setPost({ description: routeData.description as string, id: routeData.id as string });
    }
  };

  useEffect(() => {
    chekUser();
  }, [user, loading]);

  return (
    <div className="my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto">
      <form onSubmit={submitPost}>
        <h1 className="text-2xl font-bold">
          {post.hasOwnProperty('id') ? 'Edit post' : 'Add a new post'}
        </h1>
        <div className="py-2">
          <h3 className="text-lg font-medium py-2">Share your thoughts...</h3>
          <textarea
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            value={post.description}
            className="bg-sky-200 h-48 w-full rounded-lg p-2 text-sm focus:outline-sky-700"
          ></textarea>
          <p
            className={`text-indigo-500 font-medium text-sm ${
              post.description.length > 280 ? 'text-red-600' : ''
            } `}
          >
            {post.description.length}/280
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 opacity-80 text-white rounded-lg p-2 my-2 text-sm hover:opacity-100 transition-opacity duration-300"
        >
          Post
        </button>
      </form>
    </div>
  );
}
