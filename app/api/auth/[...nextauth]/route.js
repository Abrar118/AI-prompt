import { createConnection } from "@utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

let db;

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session({ session }) {
      if (!session.user) throw new Error("No user found in session");
      if (!db) db = await createConnection();

      const sessionUser = await db.collection("users").findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser?._id.toString();
      return session;
    },

    async signIn({ profile }) {
      try {
        db = await createConnection();
        const user = await db
          .collection("users")
          .findOne({ email: profile.email });

        if (!user) {
          await db.collection("users").insertOne({
            userName: profile.name,
            email: profile.email,
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
