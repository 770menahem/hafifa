import { Schema } from "mongoose";

const peopleSchema = new Schema({
  firstName: { type: String, unique: true, required: true },
  lastName: { type: String, required: true },
});

export default peopleSchema;
