import mongoose from "mongoose";
import personSchema from "../model/person.model";

const Person = mongoose.model("Person", personSchema);

const personApi = {
  getAll: async () => {
    return await Person.find({});
  },
  getById: async (id: string) => {
    return await Person.findById(id);
  },
  getByName: async (firstName: string) => {
    return await Person.findOne({ firstName });
  },
  add: async (firstName: string, lastName: string) => {
    return await new Person({ firstName, lastName }).save();
  },
  changeLastName: async (firstName: string, lastName: string) => {
    const person = await Person.findOne({ firstName });

    person.lastName = lastName;

    return await person.save();
  },
  del: async (firstName: string) => {
    return await Person.findOneAndDelete({ firstName });
  },
};

export default personApi;
