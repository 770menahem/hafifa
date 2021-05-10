import mongoose from "mongoose";
import groupSchema from "../model/group.model";

const Group = mongoose.model("Group", groupSchema);

export const groupApi = {
  getAll: async () => {
    return await Group.find({});
  },
  byId: async (id: string) => {
    return await Group.findById(id);
  },
  oneByField: async (fields: object) => {
    return await Group.findOne(fields);
  },
  getByFieldPopulated: async (fields: object) => {
    return await Group.findOne(fields).populate([
      {
        path: "persons",
        select: "firstName -_id",
      },
      {
        path: "groups",
        // select: "groupName groups persons -_id",
      },
    ]);
  },
  getByPersonId: async (id: string) => {
    return await Group.find({ persons: id }, "_id groupName");
  },
  createWithParent: async (groupName: string, parentGroup: string) => {
    return await new Group({ groupName, parentGroup }).save();
  },
  create: async (groupName: string) => {
    return await new Group({ groupName }).save();
  },
  deleteGroupById: async (id: string) => {
    const deleted = await Group.findByIdAndDelete(id);

    return deleted;
  },
};
