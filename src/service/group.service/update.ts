import { groupApi } from "../../repo/group.repo";
import groupGet from "./get";

const createGroup = async (groupName: string, parentGroup: string) => {
  if (!parentGroup) {
    return await groupApi.create(groupName);
  } else {
    const parent = await groupApi.oneByField({ groupName: parentGroup });
    const newGroup = await groupApi.createWithParent(groupName, parent._id);

    parent.groups.push(newGroup._id);
    await parent.save();

    return newGroup;
  }
};

const moveGroup = async (moveTo: string, toMove: string) => {
  const move = await groupApi.oneByField({ groupName: toMove });

  const parent = move.parentGroup;
  move.parentGroup = null;
  await move.save();

  const parentGroup = await groupApi.byId(parent);
  parentGroup.groups.remove(move._id);
  await parentGroup.save();

  const result = await connectGroups(moveTo, toMove);

  if (result.error) {
    move.parentGroup = parent;
    await move.save();
    parentGroup.groups.push(move._id);
    await parentGroup.save();

    throw result;
  }

  return result;
};

const connectGroups = async (insertTo: string, toInsert: string) => {
  try {
    const [childGroup, targetGroup] = await insertToGroup(insertTo, toInsert);

    return {
      target: targetGroup,
      child: childGroup,
    };
  } catch (error) {
    console.log(error);

    return {
      error,
      groups: {
        target: await groupApi.oneByField({ groupName: insertTo }),
        child: await groupApi.oneByField({ groupName: toInsert }),
      },
    };
  }
};

const insertToGroup = async (targetName: string, childName: string) => {
  const childGroup = await groupApi.oneByField({ groupName: childName });

  const targetGroup = await groupApi.oneByField({ groupName: targetName });

  if (childGroup.parentGroup) {
    throw "group already has parent group";
  }

  if (targetGroup && childGroup) {
    const childId = childGroup._id.toString();

    await validateGroup(targetGroup, childId);

    targetGroup.groups.push(childId);

    childGroup.parentGroup = targetGroup._id;

    await childGroup.save();
    await targetGroup.save();
  } else {
    throw "group not exists";
  }

  return [childGroup, targetGroup];
};

const updateName = async (name: string, newName: string) => {
  const group = await groupGet.getByField("groupName", name);

  group.groupName = newName;
  const updatedGroup = await group.save();

  return updatedGroup;
};

const insertPersonToGroup = async (groupName: string, id: object) => {
  const group = await groupGet.getByField("groupName", groupName);

  if (group.persons.includes(id)) {
    return { error: "person already in group", group };
  }

  group.persons.push(id);

  return await group.save();
};

export default {
  connectGroups,
  moveGroup,
  createGroup,
  updateName,
  insertPersonToGroup,
};

const validateGroup = async (group: any, id: string) => {
  if (
    group.groups.some((i: object) => i.toString() === id) ||
    group.parentGroup?.toString() === id ||
    group._id.toString() === id
  ) {
    throw "cant add group";
  }

  while (group.parentGroup) {
    if (
      group.groups.some((i: object) => i.toString() === id) ||
      group.parentGroup?.toString() === id ||
      group._id.toString() === id
    ) {
      throw "cant add group";
    }

    const parent = await groupApi.byId(group.parentGroup);

    if (parent?.groups?.some((i: object) => i.toString() === id)) {
      throw "cant add group";
    }

    group = parent;
  }

  if (!(await validateChild(group, id))) {
    throw "cant add group";
  }
};

const validateChild = async (group: any, id: string) => {
  for (let i = 0; i < group.groups?.length; i++) {
    const child = await groupApi.byId(group.groups[i]);

    if (child?.groups?.some((_id: object) => _id.toString() === id)) {
      return false;
    }

    if (child?.groups?.length > 0) {
      await validateChild(child, id);
    }
  }
  return true;
};
