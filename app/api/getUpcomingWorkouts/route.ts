import connectToDatabase from "@/lib/mongo";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth/next"
import { NextRequest, NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(options)
  console.log("Session from getUpcomingWorkout: ", session)
  // Only retrieve info if user is signed in
  if (!session) {
    return NextResponse.json({status: 401})
  }
    // user is logged in but attempts to grab other user info

  // const resjson = await req.json()
  // console.log({resjson})
  return NextResponse.json({status: 200})
}