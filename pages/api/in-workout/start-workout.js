import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export default async function handler(req, res) {
  if (req.method === 'POST') {
     const mongoClient = await clientPromise;
     const data = req.body;
     
     const result = await mongoClient.db().collection("in-workout-testing")
          .insertOne({
            ...data,
            _id: new ObjectId(data._id),
            date: new Date(data.date)
          });

    //  console.log(result)
     res.status(201).json('Workout started :)');
  }
}