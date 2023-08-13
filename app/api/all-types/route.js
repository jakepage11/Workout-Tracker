import { NextResponse } from "next/server"
import clientPromise from '@/lib/mongodb'
// Gets the list of workout types
export async function GET() {
  const mongoClient = await clientPromise;
  const workoutTypes = await mongoClient.db(process.env.MONGODB_DATABASE).collection(process.env.MONGODB_COLLECTION_TYPES)
        .find({}, {projection: {_id: 0}}).toArray();
  return NextResponse.json({body: workoutTypes[0].types, status: 201})
}

