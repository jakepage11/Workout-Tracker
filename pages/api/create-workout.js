import clientPromise from "@/lib/mongodb"
import dayjs from "dayjs"
// import {MongoClient} from "mongodb"

export default async function handler(req, res) {
  if (req.method === 'POST') {
     const mongoClient = await clientPromise;
     const data = req.body;
     const dateObj = dayjs(data.date);
     const utcDate = new Date(Date.UTC(dateObj.year(), dateObj.month(), 
                                    dateObj.date(), dateObj.hour(), 
                                    dateObj.minute(), dateObj.second()))

     const result = await mongoClient.db(process.env.MONGODB_DATABASE).collection(process.env.MONGODB_COLLECTION_WORKOUTS)
          .insertOne({
            ...data,
            date: utcDate
          });

    //  console.log(result)
     res.status(201).json('Workout create :)');
  }
}