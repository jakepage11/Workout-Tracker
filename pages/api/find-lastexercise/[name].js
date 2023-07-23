// Grabs the data from the last time the exercise was used, along

import clientPromise from "@/lib/mongodb";

// with the date.
export default async function handler(req, res) {
  const mongoClient = await clientPromise;
  // console.log(req.query)
  const { name } = req.query;
  console.log(name);

  const data = await mongoClient.db().collection('workout-testing')
              .findOne({completeIn: {$ne: ""}, "exercises.$.name": name});
  console.log({data});
  res.status(201).json('Found last exercise');
}