import mongoose from "mongoose";
import personSchema from "../model/person.model";

const Person = mongoose.model("Person", personSchema);

const personApi = {
  getAll: async () => {
    return await Person.find({});
  },
  add: async (firstName: string, lastName: string) => {
    return await new Person({ firstName, lastName }).save();
  },
  changeLastName: async (firstName: string, lastName: string) => {
    const person = await Person.findOne({ firstName });

    person.lastName = lastName;

    return await person.save();
  },
  del: async (firstName: string, lastName: string) => {
    return await Person.remove({ firstName, lastName });
  },
  get: async (firstName: string) => {
    return await Person.findOne({ firstName });
  },
};

export default personApi;
