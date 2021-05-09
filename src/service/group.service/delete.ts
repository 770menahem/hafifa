import { groupApi } from "../../repo/group.repo";
import groupGet from "./get";

const deletedArr: any[] = [];

const deleteGroupeById = async (id: string) => {
  let deleted = await groupApi.deleteGroupeById(id);

  deletedArr.push(deleted);

  for (let i = 0; i < deleted.groups?.length; i++) {
    deletedArr.push(await deleteGroupeById(deleted.groups[i]));
  }
};

const deleteGroupeByName = async (groupName: string) => {
  const group = await groupApi.oneByField({ groupName });

  await deleteGroupeById(group._id);

  return deletedArr.filter((del) => del);
};

const removePersonFromGroup = async (groupName: string, id: object) => {
  const group = await groupGet.getByField("groupName", groupName);

  const personNum = group.persons.length;

  group.persons.remove(id);

  if (personNum === group.persons.length) {
    throw "person doe's not exists";
  }

  return await group.save();
};

export default {
  deleteGroupeByName,
  removePersonFromGroup,
};
