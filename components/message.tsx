/* eslint-disable @next/next/no-img-element */
import React from 'react';

interface IMessageProps {
  children?: JSX.Element;
  avatar?: string;
  username?: string;
  description?: string;
}

export default function Message({ children, avatar, username, description }: IMessageProps) {
  return (
    <div className="bg-white p-8 border-b-2 rounded-lg">
      <div className="flex items-center gap-2">
        <img src={avatar} alt="user-image" className="w-10 rounded-full" />
        <h2>{username}</h2>
      </div>
      <div className="py-4">
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
}
