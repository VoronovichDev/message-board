import React, { useState, useEffect } from 'react';
import Message from '../components/message';
import { useRouter } from 'next/router';
import { auth, db } from '../utils/firebase';
import { toast } from 'react-toastify';
import { arrayUnion, doc, Timestamp, updateDoc } from 'firebase/firestore';

export default function Details() {
  const router = useRouter();
  const routeData = router.query;
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);

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
          <button onClick={submitMessage} className="bg-violet-500 text-white py-2 px-4 text-sm">
            Comment
          </button>
        </div>
        <div className="py-6">
          <h2 className="font-bold">Comments</h2>
          {allMessages.map((message) => (
            <div>
              <div>qq</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
