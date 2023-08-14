const { ObjectId, MongoClient } = require("mongodb");

// Handles deleting the workout from the in-workout database and adds the
// results to the main database
exports.handler = async(event, context) => {
  try {
    // Get current user info and workout id
    const {user} = context.clientContext
    const workoutToUpdate = JSON.parse(event.body)
    console.log({workoutToUpdate})
    const id = workoutToUpdate._id;
    
    if (user === null) { // user is not logged in
      return {
        statusCode: 400,
        body: JSON.stringify({mssg: "Need to be logged in"})
      }
    } else if (user.email !== workoutToUpdate.user) { // wrong user
      return {statusCode: 400, body: JSON.stringify({mssg: "Current user is not able to update workout info of another user"})}
    }
    // Create the MongoDB connection
    const mongoClient = new MongoClient(process.env.MONGODB_URI, {})
    const mongoConnection = await mongoClient.connect();

    // Update the workout with time, difficulty, and other info that was changed
    const result = await mongoConnection.db(process.env.MONGODB_DATABASE).collection(process.env.MONGODB_COLLECTION_WORKOUTS)
        .findOneAndUpdate({"_id": new ObjectId(id)},
          {$set: {
            exercises: workoutToUpdate.exercises, // added feedback
            completeIn: workoutToUpdate.completeIn,
            difficulty: workoutToUpdate.difficulty
        }});

    // Delete workout from the in-workout database
    const result2 = await mongoConnection.db(process.env.MONGODB_DATABASE).collection(process.env.MONGODB_COLLECTION_INWORKOUT)
                  .findOneAndDelete({'_id': new ObjectId(id)})
    return {
      statusCode: 201
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({error})
    }
  }
}