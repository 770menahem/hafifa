import { Schema } from "mongoose";

const group = new Schema({
  groupName: { type: String, unique: true, required: true },
  parentGroup: { type: Schema.Types.ObjectId, ref: "Group" },
  persons: [{ type: Schema.Types.ObjectId, ref: "Person", unique: true }],
  groups: [
    {
      type: Schema.Types.ObjectId,
      ref: "Group",
      unique: true,
    },
  ],
});

export default group;
