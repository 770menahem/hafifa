import { Schema } from "mongoose";

const person = new Schema({
  groupName: { type: String, unique: true },
  persons: [{ type: Schema.Types.ObjectId, ref: "Person" }],
});

export default person;
