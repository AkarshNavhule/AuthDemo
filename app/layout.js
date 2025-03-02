// app/layout.js
import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'My Next.js App',
  description: 'Google Auth with NextAuth',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Providers>{children}</Providers>
      </body>
    </html>
  );
}
