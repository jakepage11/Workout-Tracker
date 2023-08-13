const { MongoClient, ObjectId } = require("mongodb")
const dayjs = require('dayjs')

exports.handler = async(event, context) => {
  try {
    const mongoClient = new MongoClient(process.env.MONGODB_URI, {})
    const mongoConnection = await mongoClient.connect()
    const workoutToUpdate = JSON.parse(event.body)
    console.log({workoutToUpdate})
    // // Convert the time to be the same time in UTC
    // const id = workoutToUpdate._id
    // const dateObj = dayjs(workoutToCreate.date);
    // const utcDate = new Date(Date.UTC(dateObj.year(), dateObj.month(), 
    //                             dateObj.date(), dateObj.hour(), 
    //                             dateObj.minute(), dateObj.second()))
    // // Find and update the workout
    // const result = await mongoClient.db(process.env.MONGODB_DATABASE).collection(process.env.MONGODB_COLLECTION_WORKOUTS)
    //     .findOneAndUpdate({"_id": new ObjectId(id)},
    //       {$set: {
    //         exercises: data.exercises,
    //         date: utcDate,
    //         type: data.type,
    //         completeIn: data.completeIn,
    //         difficulty: data.difficulty
    //     }});
    return {
      statusCode: 201
    }
  } catch (err) {
    return {
      statusCode: 500
    }
  }
}