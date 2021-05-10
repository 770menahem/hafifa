import { groupApi } from "../../repo/group.repo";
import groupGet from "./get";

const deleteGroupById = async (id: string, deletedArr: any[]) => {
  let deleted = await groupApi.deleteGroupById(id);

  if (deleted.parentGroup) {
    const parent = await groupApi.byId(deleted.parentGroup);

    if (parent) {
      parent.groups.remove(deleted._id);
      await parent.save();
    }
  }

  deletedArr.push(deleted);

  for (let i = 0; i < deleted?.groups?.length; i++) {
    deletedArr.push(await deleteGroupById(deleted.groups[i], deletedArr));
  }
};

const deleteGroupByName = async (groupName: string) => {
  const deletedArr: any[] = [];
  const group = await groupApi.oneByField({ groupName });

  await deleteGroupById(group._id, deletedArr);

  return deletedArr.filter((del) => del);
};

const removePersonFromGroup = async (groupName: string, id: object) => {
  const group = await groupGet.getByField("groupName", groupName);

  if (!group) throw "group not exist";

  const personNum = group.persons.length;

  group.persons.remove(id);

  if (personNum === group.persons.length) {
    throw "person doe's not exists in this group";
  }

  return await group.save();
};

export default {
  deleteGroupByName,
  removePersonFromGroup,
};
