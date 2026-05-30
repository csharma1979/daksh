import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          console.log("NextAuth authorize attempt for:", credentials?.email);

          if (!credentials?.email || !credentials?.password) {
            console.error("Missing credentials in auth attempt");
            throw new Error("Missing credentials");
          }

          // EMERGENCY FALLBACK (Move BEFORE dbConnect to allow login when DB is down)
          if (credentials.email === process.env.ADMIN_EMAIL && credentials.password === process.env.ADMIN_PASSWORD) {
            console.log("Access granted via Emergency Fallback for:", credentials.email);
            return {
              id: "master-admin",
              email: credentials.email,
              name: "Daksh Support",
              role: "admin"
            };
          }

          // Try Database connection for regular accounts
          console.log("Connecting to database for regular user auth...");
          await dbConnect();
          console.log("Database connected successfully in auth route");

          const user = await User.findOne({ email: credentials.email });
          console.log("Database user find result:", user ? "Found" : "Not Found");

          if (!user) {
            throw new Error("Invalid email or password");
          }

          const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
          console.log("Password comparison result:", isPasswordCorrect);

          if (!isPasswordCorrect) {
            throw new Error("Invalid email or password");
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role
          };
        } catch (error: any) {
          console.error("NextAuth Authorize Error:", error.message);
          
          // Re-throw specific errors for NextAuth to handle
          if (error.message.includes("selection timeout") || error.message.includes("ECONNREFUSED")) {
             throw new Error("Database connection failed. Please check Atlas IP Whitelist.");
          }
          throw error;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: "/admin-login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
