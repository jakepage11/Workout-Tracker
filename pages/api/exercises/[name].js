import clientPromise from "@/lib/mongodb"
// import {MongoClient} from "mongodb"

export default async function handler(req, res) {
  if (req.method === 'GET') {  // retrieving ex info
    const mongoClient = await clientPromise;
    const { name } = req.query;
    const result = await mongoClient.db().collection(process.env.EX_TEST_DATA)
                      .find({name: name}).toArray();
    res.status(201).json(result);
  } else if (req.method === 'POST') {
     const mongoClient = await clientPromise;
     const data = JSON.parse(JSON.stringify(req.body));
     console.log(data);
     const result = await mongoClient.db().collection("exercises-testing").insertOne({
      ...data
    });

     console.log(result)
     res.status(201).json('Exercise created :)');
  }
}