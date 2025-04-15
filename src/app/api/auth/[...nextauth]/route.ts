
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextRequest, NextResponse } from 'next/server';

const handler = async (req: NextRequest, res: NextResponse) => {
  try {
    return await NextAuth(req, res, {
      providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID || "",
          clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
      ],
      secret: process.env.NEXTAUTH_SECRET,
    });
  } catch (error) {
    console.error("NextAuth Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export { handler as GET, handler as POST };
