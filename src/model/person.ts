import { Schema } from "mongoose";

const person = new Schema({
  firstName: String,
  lastName: String,
  id: { type: String, unique: true },
});

export default person;
