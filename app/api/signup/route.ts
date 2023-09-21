import { NextRequest, NextResponse } from "next/server";
import User from "@/lib/models/User";
import connectToDatabase from "@/lib/mongo";
const bcrypt = require("bcrypt");

export async function POST(request: NextRequest, response: NextResponse) {
  const body = await request.json()
  const { name, email, password } = body
  // Check if user(email) already exists with an account
  await connectToDatabase()
  const userExists = await User.exists({email: email})
  if (userExists) {
    return NextResponse.json("User already exists", {status: 400})
  }
  // Create new user
  const hashedPassword = await bcrypt.hash(password, 10)
  User.create({
    email,
    name,
    password: String(hashedPassword),
  })
  return NextResponse.json("", {status: 200})
}

