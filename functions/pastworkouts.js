const { MongoClient } = require('mongodb');
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')

exports.handler = async (event, context) => {
  try {
    // Create the mongodb connection to access the users upcoming workouts
    const uri = process.env.MONGODB_URI
    const options = {}
    const mongoClient = new MongoClient(uri, options)
    const mongoConnection = await mongoClient.connect()
    const { user } = context.clientContext;
    if (user) { // logged in
      dayjs.extend(utc);
      
      // Create the range of data to fetch for past workouts
      const startTodayUTC = dayjs().startOf('day').utc('true')
      const endTodayUTC = dayjs().endOf('day').utc("true")
      const pastStartDay = startTodayUTC.subtract(2, 'week')

      // Grab all workouts from the past 2 weeks
      const pastData = await mongoConnection.db(process.env.MONGODB_DATABASE)
                      .collection(process.env.MONGODB_COLLECTION_WORKOUTS)
                      .find({date: {$gte: pastStartDay.$d, $lte: endTodayUTC.$d}, completeIn: {$ne: ""}, user: user.email})
                      .sort({date: -1}).toArray();
      return {
        statusCode: 200,
        body: JSON.stringify(pastData)
      }
    }
    // User isn't logged in
    return {
      statusCode: 401,
      body: JSON.stringify({mssg: "Current user is not logged in"})
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.toString())
    }
  }
}
