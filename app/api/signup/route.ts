import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/dbConnection";
const bcrypt = require("bcrypt");

// Registers users that used the credentials provider
export async function POST(request: NextRequest, response: NextResponse) {
  const body = await request.json()
  // TODO: handle google provider registering
  const { name, email, password } = body

  // Check if user(email) already exists with an account
  const userExists = await prisma.users.findUnique({where: {email: email}})
  if (userExists) {
    return NextResponse.json("User already exists", {status: 400})
  }
  // Create new user
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await prisma.users.create({data: {email, name, hashedPassword, createdAt: new Date(), updatedAt: new Date()}})
 
  return NextResponse.json("", {status: 200})
}

