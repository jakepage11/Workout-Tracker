import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === 'POST') {
     const mongoClient = await clientPromise;
     const data = req.body;
     const id = data._id;

     const index = JSON.parse(JSON.stringify(data)).exIndex
     const rating = JSON.parse(JSON.stringify(data)).rating
     let result;

     if (index === undefined) { // update progress
      result = await mongoClient.db(process.env.MONGODB_DATABASE).collection(process.env.MONGODB_COLLECTION_INWORKOUT)
                            .updateOne({"_id": new ObjectId(id)}, {
                              $set: {
                                progress: data.progress
                              }
                            });
     } else {  // update feedback
      result = await mongoClient.db(process.env.MONGODB_DATABASE).collection(process.env.MONGODB_COLLECTION_INWORKOUT)
                              .updateOne({"_id": new ObjectId(id)}, 
                              {$set: {[`exercises.${index}.difficulty`]: rating}});
     }

     res.status(201).json('Workout updated :)');
  }
}