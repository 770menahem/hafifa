import { Schema } from "mongoose";

const personSchema = new Schema({
  firstName: { type: String, unique: true, required: true },
  lastName: { type: String, required: true },
});

export default personSchema;
