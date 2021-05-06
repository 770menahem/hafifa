import { groupApi } from "../repo/group.repo";

const createGroup = async (groupName: string, parentGroup: string) => {
  const parentId = (await groupApi.oneByField({ groupName: parentGroup }))._id;

  return await groupApi.create(groupName, parentId);
};

const getByField = async (key: string, value: string) => {
  const fields = {
    [key]: value,
  };

  return await groupApi.oneByField(fields);
};

const getAllGroups = async () => {
  return await groupApi.getAll();
};

const moveGroup = async (moveTo: string, toMove: string) => {
  const move = await groupApi.oneByField({ groupName: toMove });
  console.log("to move");
  console.log(move);

  const parent = move.parentGroup;
  move.parentGroup = null;
  const subMove = await move.save();
  console.log("parent del", subMove.parentGroup);

  const parentGroup = await groupApi.byId(parent);
  parentGroup.groups.remove(move._id);
  const subParent = await parentGroup.save();
  console.log("child del, left", subParent.groups);

  const result = await connectGroups(moveTo, toMove);

  if (result.error) {
    move.parentGroup = parent;
    await move.save();
  }

  return result;
};

const connectGroups = async (insertTo: string, toInsert: string) => {
  try {
    await insertToGroup(insertTo, toInsert);
    return {
      target: await groupApi.oneByField({ groupName: insertTo }),
      child: await groupApi.oneByField({ groupName: toInsert }),
    };
  } catch (error) {
    console.log(error);
    return {
      error: error,
      groups: {
        target: await groupApi.oneByField({ groupName: insertTo }),
        child: await groupApi.oneByField({ groupName: toInsert }),
      },
    };
  }
};

async function insertToGroup(targetName: string, childName: string) {
  const childGroup = await groupApi.oneByField({ groupName: childName });
  console.log("to insert");
  console.log(childGroup);

  const targetGroup = await groupApi.oneByField({ groupName: targetName });
  console.log("insert to");
  console.log(targetGroup);

  if (childGroup.parentGroup) {
    throw "groupe already has parent group";
  }

  if (targetGroup && childGroup) {
    const childId = childGroup._id.toString();

    await validateGroupe(targetGroup, childId);

    targetGroup.groups.push(childId);
    console.log("inserted");

    childGroup.parentGroup = targetGroup._id;
    console.log("mark parent");

    await childGroup.save();
    await targetGroup.save();
  } else {
    throw "group not exists";
  }
}

async function validateGroupe(group: any, id: string) {
  if (
    group.groups.some((i: object) => i.toString() === id) ||
    group.parentGroup?.toString() === id ||
    group._id.toString() === id
  ) {
    throw "cant add groupe";
  }

  while (group.parentGroup) {
    if (
      group.groups.some((i: object) => i.toString() === id) ||
      group.parentGroup?.toString() === id ||
      group._id.toString() === id
    ) {
      throw "cant add groupe";
    }

    const parent = await groupApi.byId(group.parentGroup);

    if (parent?.groups?.some((i: object) => i.toString() === id)) {
      throw "cant add groupe";
    }

    group = parent;
  }

  if (!(await validateChild(group, id))) {
    throw "cant add groupe";
  }
}

async function validateChild(group: any, id: string) {
  console.log("validate children");
  console.log(group.groups);

  for (let i = 0; i < group.groups?.length; i++) {
    const child = await groupApi.byId(group.groups[i]);

    if (
      child.toObject()?.groups?.some((_id: object) => _id.toString() === id)
    ) {
      return false;
    }

    if (child?.groups?.length > 0) {
      await validateChild(child, id);
    }
  }
  return true;
}

const updateName = async (name: string, newName: string) => {
  const group = await getByField("groupName", name);
  group.groupName = newName;
  const updatedGroup = await group.save();

  return updatedGroup;
};

export const groupService = {
  getAllGroups,
  connectGroups,
  moveGroup,
  createGroup,
  getByField,
  updateName,
};
