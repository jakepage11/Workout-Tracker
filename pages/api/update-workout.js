import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb";
import dayjs from "dayjs"

export default async function handler(req, res) {
  if (req.method === 'POST') {
     const mongoClient = await clientPromise;
     const data = req.body;
     const id = data._id;
     const dateObj = dayjs(data.date);
     const utcDate = new Date(Date.UTC(dateObj.year(), dateObj.month(), 
                                    dateObj.date(), dateObj.hour(), 
                                    dateObj.minute(), dateObj.second()))
     const result = await mongoClient.db().collection("workout-testing")
        .findOneAndUpdate({"_id": new ObjectId(id)},
          {$set: {
            exercises: data.exercises,
            date: utcDate,
            type: data.type,
            completeIn: data.completeIn,
            difficulty: data.difficulty
        }});
     res.status(201).json('Workout updated :)');
  }
}