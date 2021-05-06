import mongoose from "mongoose";
import personSchema from "../model/people";

const People = mongoose.model("Person", personSchema);

export default People;
