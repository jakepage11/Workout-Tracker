import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  provider: String,
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: Date,
})

const Users = mongoose.model("Users", userSchema);

export default Users

