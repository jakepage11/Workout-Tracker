import mongoose, { Connection } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

let globalConnection: Connection

async function connectToDatabase(): Promise<Connection> {
  if (globalConnection) {
    return globalConnection;
  }

  const connection = await mongoose.connect(MONGODB_URI);

  globalConnection = connection.connection;
  return globalConnection;
}

export { globalConnection }
export default connectToDatabase

