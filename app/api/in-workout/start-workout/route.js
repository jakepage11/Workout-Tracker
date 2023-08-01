import clientPromise from "@/lib/mongodb"
import { MONGO_CLIENT_EVENTS, ObjectId } from "mongodb"

export default async function handler(req, res) {
  if (req.method === 'POST') {
     const mongoClient = await clientPromise;
     const data = req.body;
     
     const result = await mongoClient.db().collection(process.env.MONGODB_COLLECTION_INWORKOUT)
          .insertOne({
            ...data,
            _id: new ObjectId(data._id),
            date: new Date()
          });

    //  console.log(result)
     res.status(201).json('Workout started :)');
  }
}