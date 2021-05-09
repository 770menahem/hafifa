import { groupApi } from "../../repo/group.repo";
import personService from "../person.service";

const getByField = async (key: string, value: string) => {
  const fields = {
    [key]: value,
  };

  return await groupApi.oneByField(fields);
};

const getAllGroups = async () => {
  return await groupApi.getAll();
};

const isInGroup = async (firstName: string, groupName: string) => {
  const group = await getByField("groupName", groupName);
  if (!group) throw `${groupName} doesn't exists`;

  const person = await personService.get(firstName);
  if (!person) throw `${firstName} doesn't exists`;

  if (group.persons.includes(person._id)) {
    return { group, person };
  } else {
    throw `${firstName} doesn't exists in ${groupName}`;
  }
};

const getPersonGroups = async (id: string) => {
  const groups = await groupApi.getByPersonId(id);

  return groups;
};

const getGroupChildren = async (groupName: string) => {
  const group = (await groupApi.getByFieldPopulated({ groupName })).toObject();

  await populateGroups(group);

  return group;
};

export default {
  getAllGroups,
  getGroupChildren,
  getByField,
  getPersonGroups,
  isInGroup,
};

async function populateGroups(group: any) {
  for (let i = 0; i < group.groups.length; i++) {
    group.groups[i] = await groupApi.getByFieldPopulated({
      _id: group.groups[i],
    });

    if (group.groups[i].groups.length > 0) {
      await populateGroups(group.groups[i]);
    }
  }
}
