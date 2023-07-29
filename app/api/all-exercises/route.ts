import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const mongoClient = await clientPromise
  // Grab all distinct exercise names
  console.log(String(process.env.MONGODB_COLLECTION_EXERCISES))
  const exercises = await mongoClient.db(process.env.MONGODB_DATABASE).
            collection(String(process.env.MONGODB_COLLECTION_EXERCISES))
            .find({}, {projection:{_id:0}}).toArray()
  const exerciseList = JSON.parse(JSON.stringify(exercises))
  return NextResponse.json({body: exerciseList, status: 201})
}