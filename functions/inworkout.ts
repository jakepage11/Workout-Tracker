import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions"
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { PlannedEx } from "@/types";

const handler = async(event: HandlerEvent, context: HandlerContext) => {
  const mongoClient = await clientPromise
  // URL will have id param to specify which workout to grab
  const id = event.queryStringParameters?.id?? null;
  const mongoId: ObjectId = new ObjectId(String(id));
  // const { user } = context.clientContext
  console.log(context.clientContext)
  // Grab workout with id
  const workoutData = await mongoClient.db(process.env.MONGODB_DATABASE)
                            .collection(String(process.env.MONGODB_COLLECTION_WORKOUTS))
                            .findOne({"_id": new ObjectId(String(id))});

  const workoutProgress = await mongoClient.db(process.env.MONGODB_DATABASE)
                            .collection(String(process.env.MONGODB_COLLECTION_INWORKOUT))
                            .findOne({"_id": new ObjectId(String(id))});
  // Ensure that the user requesting this workout is the one who created it

  // Grab exercise descriptions
  const exnames = workoutData?.exercises.map((ex: PlannedEx) => {
                    return ex.name
                  })?? []
  const exercises = await mongoClient.db(process.env.MONGODB_DATABASE).collection(String(process.env.MONGODB_COLLECTION_EXERCISES))
                              .find({name: {$in: exnames}}).project({name: 1, description: 1, _id: 0}).toArray();
  const exStrArr = JSON.parse(JSON.stringify(exercises))
 
  return {
    body: JSON.stringify({
      workoutData: workoutProgress === null ? workoutData : workoutProgress,
      ex_descriptions: exStrArr
    }),
    statusCode: 201
  }
}

export {handler}