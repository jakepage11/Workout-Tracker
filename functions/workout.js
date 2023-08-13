const {MongoClient, ObjectId} = require('mongodb')

exports.handler = async(event, context) => {
  const uri = process.env.MONGODB_URI
  const options = {}
  const mongoClient = new MongoClient(uri, options)
  const mongoConnection = await mongoClient.connect()
  try {
    const { user } = context.clientContext;
    console.log(context.clientContext)
    // URL will have id param to specify which workout to grab
    const id = event.queryStringParameters?.id?? null;
    const mongoId = new ObjectId(String(id));
    // Grab data if a user is logged in
    if (user) {
      // Grab workout with id
      const workoutData = await mongoConnection.db(process.env.MONGODB_DATABASE)
              .collection(String(process.env.MONGODB_COLLECTION_WORKOUTS))
              .findOne({"_id": new ObjectId(String(id))});
      // Ensure that the user requesting this workout is the one who created it
      if (workoutData.user !== user.email) {
        return {
          body: JSON.stringify({message: "You don't have access to this workout"}),
          statusCode: 401
        }
      }
      console.log("approved")
      return {
        body: JSON.stringify(workoutData),
        statusCode: 201
      }
    }
    // user can't access this info
    return {
      body: JSON.stringify({message: "Not authorized to view content"}),
      statusCode: 401
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.toString())
    }
  }
}