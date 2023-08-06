import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { NextResponse } from "next/server";

export async function POST(req) {
  const mongoClient = await clientPromise;
  const data = await req.json();

  console.log({data})
  
  const result = await mongoClient.db(process.env.MONGODB_DATABASE).collection(process.env.MONGODB_COLLECTION_INWORKOUT)
                .insertOne({
                  ...data,
                  _id: new ObjectId(data._id),
                  date: new Date()
                });

  console.log(result)
  return NextResponse.json({status: 201})
}