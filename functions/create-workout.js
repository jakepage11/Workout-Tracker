
const dayjs = require("dayjs")
const {MongoClient} = require("mongodb")

exports.handler = async(event, context) => {
  try {
    // Connect to the mongodb database
    const mongoClient = new MongoClient(process.env.MONGODB_URI, {})
    const mongoConnection = await mongoClient.connect()
    const workoutToCreate = JSON.parse(event.body)
    // Convert the time to be the same time in UTC
    const dateObj = dayjs(workoutToCreate.date);
    const utcDate = new Date(Date.UTC(dateObj.year(), dateObj.month(), 
                                dateObj.date(), dateObj.hour(), 
                                dateObj.minute(), dateObj.second()))
    // Use the given workout info to add to the database
    const result = await mongoConnection.db(process.env.MONGODB_DATABASE)
        .collection(process.env.MONGODB_COLLECTION_WORKOUTS)
        .insertOne({
          ...workoutToCreate,
          date: utcDate
        });
    return {
      statusCode: 201
    }

  } catch (err) {
    console.log({err})
    return {
      statusCode: 500,
    }
  }

  
}