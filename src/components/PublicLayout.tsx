import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 4.75rem - 300px)' }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
