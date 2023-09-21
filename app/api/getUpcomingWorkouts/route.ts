import connectToDatabase from "@/lib/mongo";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // await connectToDatabase()
  // Check that the user is logged in and can access this info
  const secret = process.env.NEXTAUTH_SECRET
  const token = await getToken({req, secret})
  console.log({token})
  // const resjson = await req.json()
  // console.log({resjson})
  return NextResponse.json({status: 200})
}