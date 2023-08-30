import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
const { MongoClient } = require('mongodb');

exports.handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Create the mongodb connection to access the users upcoming workouts
  const uri = process.env.MONGODB_URI
  const options = {}
  const mongoClient = new MongoClient(uri, options)
  const mongoConnection = await mongoClient.connect()
  
  try {
    const user: Object= context.clientContext?.user;
    if (user) { // logged in
      const dayjs = require('dayjs');
      const utc = require('dayjs/plugin/utc');
      dayjs.extend(utc);
     
      const startTodayUTC = dayjs().startOf('day').utc("true")
      const endTodayUTC = dayjs().endOf('day').utc("true")
      const endWeek = endTodayUTC.add(1, 'week')
      const userEmail = (user as {email: string}).email
      // Grab all upcoming workouts in the next 1 week
      const data = await mongoConnection.db(process.env.MONGODB_DATABASE).collection(process.env.MONGODB_COLLECTION_WORKOUTS)
                  .find({date: {$gte: startTodayUTC.$d, $lt: endWeek.$d}, completeIn: "", user: userEmail})
                  .sort({date: 1}).toArray();
      return {
        statusCode: 200,
        body: JSON.stringify(data)
      }
    }
    return {
      statusCode: 401,
      body: JSON.stringify({mssg: "Current user is not logged in"})
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }
}