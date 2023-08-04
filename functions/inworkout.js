const { ObjectId, MongoClient } = require("mongodb");

exports.handler = async(event, context) => {
  const uri = process.env.MONGODB_URI
  const options = {}
  const mongoClient = new MongoClient(uri, options)
  const mongoConnection = await mongoClient.conneonnection
  try {
    const { user } = context.clientContext;
    // URL will have id param to specify which workout to grab
    const id = event.queryStringParameters?.id?? null;
    const mongoId = new ObjectId(String(id));

    // Grab data if a user is logged in
    if (user) {
      // Grab workout with id
      const workoutData = await mongoConnection.db(process.env.MONGODB_DATABASE)
              .collection(String(process.env.MONGODB_COLLECTION_WORKOUTS))
              .findOne({"_id": new ObjectId(String(id))});

      const workoutProgress = await mongoConnection.db(process.env.MONGODB_DATABASE)
          .collection(String(process.env.MONGODB_COLLECTION_INWORKOUT))
          .findOne({"_id": new ObjectId(String(id))});
      console.log({email})
      // Ensure that the user requesting this workout is the one who created it
      if (workoutProgress.email !== user.email) {
        return {
          body: JSON.stringify({message: "You don't have access to this workout"}),
          statusCode: 401
        }
      }
      // Grab exercise descriptions
      const exnames = workoutData?.exercises.map((ex) => {return ex.name})?? []
      const exercises = await mongoConnection.db(process.env.MONGODB_DATABASE).collection(String(process.env.MONGODB_COLLECTION_EXERCISES))
            .find({name: {$in: exnames}}).project({name: 1, description: 1, _id: 0}).toArray();
      const exStrArr = JSON.parse(JSON.stringify(exercises))

      return {
        body: JSON.stringify({
            workoutData: workoutProgress === null ? workoutData : workoutProgress,
            ex_descriptions: exStrArr
        }),
        statusCode: 201
      }
    }
    
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.toString())
    }
  }
}