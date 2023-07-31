import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import connectToDB from '../../../../utils/database';
import User from '../../../../models/user';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  async session({ session }) {
    const sessionUser = await User.findOne({
      email: session.user.email,
    });
    session.user.id = sessionUser._id.toString();
    return session;
  },
  async signIm({ profile }) {
    try {
      await connectToDB();
      const userExists = await User.findOne({ email: profile.email });
      if (!userExists) {
        email: profile.email;
        username: profile.name.replace(' ', '').toLowerCase();
        avatar: profile.picture;
      }
    } catch (error) {}
  },
});

export { handler as GET, handler as POST };
