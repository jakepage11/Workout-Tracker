const { MongoClient, ObjectId } = require("mongodb")
const dayjs = require('dayjs')

exports.handler = async(event, context) => {
  try {
    const mongoClient = new MongoClient(process.env.MONGODB_URI, {})
    const mongoConnection = await mongoClient.connect()
    const workoutToUpdate = JSON.parse(event.body)
   
    // // Convert the time to be the same time in UTC
    const id = workoutToUpdate._id
    const dateObj = dayjs(workoutToUpdate.date);
    const utcDate = new Date(Date.UTC(dateObj.year(), dateObj.month(), 
                                dateObj.date(), dateObj.hour(), 
                                dateObj.minute(), dateObj.second()))
    // Find and update the workout
    const result = await mongoConnection.db(process.env.MONGODB_DATABASE).collection(process.env.MONGODB_COLLECTION_WORKOUTS)
        .findOneAndUpdate({"_id": new ObjectId(id)},
          {$set: {
            exercises: workoutToUpdate.exercises,
            date: utcDate,
            type: workoutToUpdate.type,
            completeIn: workoutToUpdate.completeIn,
            difficulty: workoutToUpdate.difficulty
        }});
    return {
      statusCode: 201
    }
  } catch (err) {
    // console.log({err})
    return {
      statusCode: 500
    }
  }
}