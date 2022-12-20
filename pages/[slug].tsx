/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import Message from '../components/message';
import { useRouter } from 'next/router';
import { auth, db } from '../utils/firebase';
import { toast } from 'react-toastify';
import { arrayUnion, doc, getDoc, onSnapshot, Timestamp, updateDoc } from 'firebase/firestore';

interface IAllMessages {
  message?: string;
  avatar?: string;
  userName?: string;
  time?: string;
}

export default function Details() {
  const router = useRouter();
  const routeData = router.query;
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState<IAllMessages[]>([]);

  // Submit comment
  const submitMessage = async () => {
    // Redirect if there is no logged user
    if (!auth.currentUser) return router.push('/auth/login');

    // empty input check
    if (!message) {
      toast.error('Empty comment, write smth', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }

    const docRef = doc(db, 'posts', routeData.id as string);
    await updateDoc(docRef, {
      comments: arrayUnion({
        message,
        avatar: auth.currentUser.photoURL,
        userName: auth.currentUser.displayName,
        time: Timestamp.now(),
      }),
    });

    setMessage('');
  };

  useEffect(() => {
    // Get comments
    if (!router.isReady) return;
    const getComments = async () => {
      const docRef = doc(db, 'posts', routeData.id as string);
      const unsubscribe = onSnapshot(docRef, (snapshot) => {
        setAllMessages(snapshot.data()?.comments);
      });
      return unsubscribe;
    };
    getComments();
  }, [allMessages, routeData.id, router.isReady]);

  return (
    <div>
      <Message {...routeData}></Message>
      <div className="my-4">
        <div className="flex">
          <input
            onChange={(e) => setMessage(e.target.value)}
            type="text gap-2"
            value={message}
            placeholder="Comment it!"
            className="bg-blue-300 w-full p-2 placeholder:text-blue-900 placeholder:opacity-70 text-black text-sm"
          />
          <button
            onClick={submitMessage}
            className="bg-violet-500 text-white sm:py-2 sm:px-4 py-1 px-2 sm:text-sm text-xs"
          >
            Comment
          </button>
        </div>
        <div className="py-6">
          <h2 className="font-bold">Comments</h2>
          {allMessages ? (
            allMessages.map((message) => (
              <div className="bg-white p-4 my-4 border-2" key={message.time}>
                <div className="flex items-center gap-2 mb-4">
                  <img className="w-10 rounded-full" src={message.avatar} alt="user avatar" />
                  <h2>{message.userName}</h2>
                </div>
                <h2>{message.message}</h2>
              </div>
            ))
          ) : (
            <div>no comments yet</div>
          )}
        </div>
      </div>
    </div>
  );
}
