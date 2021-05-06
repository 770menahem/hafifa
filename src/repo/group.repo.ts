import mongoose from "mongoose";
import groupSchema from "../model/group.model";

const Group = mongoose.model("Group", groupSchema);

export const groupApi = {
  create: async (groupName: string, parentGroup: string) => {
    return await new Group({ groupName, parentGroup }).save();
  },
  getAll: async () => {
    return await Group.find({});
  },
  byId: async (id: string) => {
    return await Group.findById(id);
  },
  oneByField: async (fields: object) => {
    return await Group.findOne(fields);
  },
};
