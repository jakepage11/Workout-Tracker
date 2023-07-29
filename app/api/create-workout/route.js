import clientPromise from "@/lib/mongodb"
import dayjs from "dayjs"
import { NextResponse } from "next/server";

export async function POST(req) {

  const mongoClient = await clientPromise;
  const data = await req.json();
  const dateObj = dayjs(data.date);
  const utcDate = new Date(Date.UTC(dateObj.year(), dateObj.month(), 
                                dateObj.date(), dateObj.hour(), 
                                dateObj.minute(), dateObj.second()))
  console.log({data})

  const result = await mongoClient.db(process.env.MONGODB_DATABASE).collection(process.env.MONGODB_COLLECTION_WORKOUTS)
      .insertOne({
        ...data,
        date: utcDate
      });

    //  console.log(result)
  return NextResponse.json({status: 201})
}