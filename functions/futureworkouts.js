exports.handler = async (event, context) => {
  // detect whether user is logged in (and user is the same as the info we're grabbing)
  // const currUser = context.clientContext
  console.log(context.clientContext);
  console.log("hello");

  if (false) { // logged in
    // grab that users data
    const { default: clientPromise } = require('@/lib/mongodb');
    const dayjs = require('dayjs');
    const utc = require('dayjs/plugin/utc');
    dayjs.extend(utc);
    const mongoClient = await clientPromise;
   
    // TODO: Fix the date logic
    const startTodayUTC = dayjs().startOf('day').utc("true")
    const endTodayUTC = dayjs().endOf('day').utc("true")
    const endWeek = endTodayUTC.add(1, 'week')

    // Grab all upcoming workouts in the next 1 week
    const data = await mongoClient.db().collection('workout-testing')
                .find({date: {$gte: startTodayUTC.$d, $lt: endWeek.$d}, completeIn: ""}).sort({date: 1}).toArray();
  
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  }

  return {
    statusCode: 401,
    body: JSON.stringify({mssg: "Need to be logged in"})
  }
}