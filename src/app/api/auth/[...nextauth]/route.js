import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import connectDB from '@/lib/db';
import Users from '@/models/Users';

const handler = NextAuth({
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        await connectDB();

        const user = await Users.findOne({ username: credentials.username });
        if (!user) {
          throw new Error('No user found with that username');
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error('Password is incorrect');
        }

        return { id: user._id, username: user.username, role: user.role };
      },
    }),
  ],
  session: {
    strategy: 'jwt', // Use JWT for sessions
    maxAge: 7 * 24 * 60 * 60, // Session expiration time (7 days)
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET, // JWT secret for signing tokens
    maxAge: 7 * 24 * 60 * 60, // JWT expiration time (7 days)
  },
  callbacks: {
    async jwt({ token, user }) {
      // First time the token is created
      if (user) {
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.permission = session.user.role === "Admin" || session.user.role === "Manager"
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
