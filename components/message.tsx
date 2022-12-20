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
    <div className="bg-slate-50 p-8 border-b-2 rounded-lg mb-4 last:mb-0">
      <div className="flex items-center gap-2">
        <img src={avatar} alt="user-image" className="sm:w-10 w-7 rounded-full" />
        <h2 className="sm:text-xl text-sm">{username}</h2>
      </div>
      <div className="py-4">
        <p className="sm:text-base text-xs font-light">{description}</p>
      </div>
      {children}
    </div>
  );
}
