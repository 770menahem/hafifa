import mongoose from "mongoose";
import personSchema from "../model/people.model";

const People = mongoose.model("Person", personSchema);

export default People;
