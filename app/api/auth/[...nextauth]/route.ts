import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import User from '../../../../models/user';
import { connectToDB } from '../../../../utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      if (session.user) {
        const sessionUser = await User.findOne({ email: session.user.email });
        return {
          ...session,
          user: {
            ...session.user,
            id: sessionUser?._id.toString(),
          },
        };
      }

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        if (!profile) {
          console.log('Profile is undefined');
          return false;
        }

        // check if user already exists
        const userExists = profile
          ? await User.findOne({ email: profile.email })
          : null;

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name?.replace(' ', '').toLowerCase(),
            image: (profile as any).picture, // You should ensure that 'picture' exists on your profile type
          });
        }

        return true;
      } catch (error) {
        if (error instanceof Error) {
          console.log('Error checking if user exists: ', error.message);
        } else {
          console.log('An unknown error occurred:', error);
        }
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
