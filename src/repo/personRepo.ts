import personSchema from "../model/person";

const Person = mongoose.model("Person", personSchema);

export default Person;
