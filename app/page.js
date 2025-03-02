// app/page.js

'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    // If not logged in, show a "Login with Google" button
    return (
      <main style={{ padding: '2rem' }}>
        <h1>Google Auth Demo </h1>
        <h2>Welcome, please sign in</h2>
        <button onClick={() => signIn('google')}>Login with Google</button>
      </main>
    );
  }

  // If logged in, show user info and "Logout"/"Switch Account" buttons
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Hello, {session.user.name}!</h1>
      <div className="profile-section">
        {session.user.image && (
          <Image
            src={session.user.image}
            alt="User Avatar"
            width={100}
            height={100}
            style={{ borderRadius: '50%' }}
          />
        )}
        <div className="profile-buttons">
          <button onClick={() => signOut()}>Logout</button>
          <button
            onClick={() =>
              signIn('google', {
                prompt: 'select_account',
              })
            }
          >
            Switch Account
          </button>
        </div>
      </div>
    </main>
  );
}
