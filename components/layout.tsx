import React from 'react';
import Nav from './Nav';

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="mx-6 md:max-w-2xl md:mx-auto font-inter">
      <Nav />
      <main>{children}</main>
    </div>
  );
}
