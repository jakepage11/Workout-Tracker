import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === 'POST') {
     const mongoClient = await clientPromise;
     const data = req.body;
     const id = data._id;
     
     const result = await mongoClient.db(process.env.MONGODB_DATABASE).collection(process.env.MONGODB_COLLECTION_WORKOUTS)
          .findOneAndUpdate({"_id": new ObjectId(id)},
            {$set: {
              exercises: data.exercises, // added feedback
              completeIn: data.completeIn,
              difficulty: data.difficulty
          }});
    // Delete workout from the in-workout database
    const result2 = await mongoClient.db(process.env.MONGODB_DATABASE).collection(process.env.MONGODB_COLLECTION_INWORKOUT)
                  .findOneAndDelete({'_id': new ObjectId(id)})
     res.status(201).json('Workout completed :)');
  }
}