const { ObjectId } = require("mongodb");

// Handles deleting the workout from the in-workout database and adds the
// results to the main database
exports.handler = async(event, context) => {
  const {user} = context.clientContext
  const {data} = JSON.parse(event.body)
  const id = data._id;
  try {
    if (user === null) {
      return {
        statusCode: 400,
        body: JSON.stringify({mssg: "Need to be logged in"})
      }
    } else if (user.email !== data.user) {
      return {statusCode: 400, body: JSON.stringify({mssg: "Current user is not able to update workout info of another user"})}
    }
    const mongoClient = new MongoClient(process.env.MONGODB_URI, {})
    const mongoConnection = await mongoClient.connect();
    const result = await mongoConnection.db(process.env.MONGODB_DATABASE).collection(process.env.MONGODB_COLLECTION_WORKOUTS)
        .findOneAndUpdate({"_id": new ObjectId(id)},
          {$set: {
            exercises: data.exercises, // added feedback
            completeIn: data.completeIn,
            difficulty: data.difficulty
        }});
    // Delete workout from the in-workout database
    const result2 = await mongoConnection.db(process.env.MONGODB_DATABASE).collection(process.env.MONGODB_COLLECTION_INWORKOUT)
                  .findOneAndDelete({'_id': new ObjectId(id)})
    return {
      statusCode: 201,
      body: JSON.stringify({res: result + result2})
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({error})
    }
  }
}