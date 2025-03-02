// app/api/auth/[...nextauth]/route.js

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { dbConnect } from '@/lib/dbConnect';
import User from '@/models/User';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    // This is called after a user successfully signs in
    async signIn({ user }) {
      try {
        // Connect to DB
        await dbConnect();

        // Check if user already exists
        const existingUser = await User.findOne({ email: user.email });

        // If not, create a new user
        if (!existingUser) {
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
          });
        }

        return true; // Return true to continue sign in
      } catch (error) {
        console.log('Error checking if user exists: ', error);
        return false;
      }
    },

    // Control what’s stored in the JWT
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },

    // Make the user object available to the client
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
