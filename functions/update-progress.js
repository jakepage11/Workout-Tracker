const { MongoClient, ObjectId } = require("mongodb");

// This route is used to update the progress (set completed) and difficulty
// feedback for a given exercise.
exports.handler = async (event, context) => {
  const data = JSON.parse(event.body);
  const {user} = context.clientContext;
  const id = data._id;

  try {
    // Check that this request is being made by the owner
    if (user !== null && user.email !== data.user) {
      return JSON.stringify({mssg: "Current user doesn't own this workout", statusCode: 400})
    } else if (user === null) {
      // If the user isn't logged in then send an error message
      return JSON.stringify({mssg: "Need to be logged in to update progress"})
    }
    const mongoClient = new MongoClient(process.env.MONGODB_URI, {})
    const mongoConnection = await mongoClient.connect();
    
    const index = data.exIndex
    const rating = data.rating
    let result;

    if (index === undefined) { // update progress
     result = await mongoConnection.db(process.env.MONGODB_DATABASE).collection(process.env.MONGODB_COLLECTION_INWORKOUT)
                           .updateOne({"_id": new ObjectId(id)}, {
                             $set: {
                               progress: data.progress
                             }
                           });
    } else {  // update feedback
     result = await mongoConnection.db(process.env.MONGODB_DATABASE).collection(process.env.MONGODB_COLLECTION_INWORKOUT)
                             .updateOne({"_id": new ObjectId(id)}, 
                             {$set: {[`exercises.${index}.difficulty`]: rating}});
    }
    return {
     statusCode: 201,
     body: JSON.stringify(result)
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({mssg: error})
    }
  }
}