import personApi from "./../repo/person.repo";
import groupService from "./group.service";
const getAll = async () => {
  return await personApi.getAll();
};
const add = async (firstName: string, lastName: string) => {
  return await personApi.add(firstName, lastName);
};
const getById = async (id: string) => {
  return await personApi.getById(id);
};
const getGroups = async (firstName: string) => {
  const person = await personApi.get(firstName);

  const groups = await groupService.getPersonGroups(person._id);

  return groups;
};
const del = async (firstName: string, lastName: string) => {
  const allPersonGroup = await getGroups(firstName);

  for (let i = 0; i < allPersonGroup.length; i++) {
    removePersonFromGroup(firstName, allPersonGroup[i].groupName);
  }

  return await personApi.del(firstName, lastName);
};
const changeLastName = async (firstName: string, lastName: string) => {
  return await personApi.changeLastName(firstName, lastName);
};
const get = async (firstName: string) => {
  return await personApi.get(firstName);
};

const addPersonToGroup = async (firstName: string, groupName: string) => {
  const person = await personApi.get(firstName);

  const group = await groupService.insertPersonToGroup(groupName, person._id);

  return group;
};
const removePersonFromGroup = async (firstName: string, groupName: string) => {
  const person = await personApi.get(firstName);

  const group = await groupService.removePersonFromGroup(groupName, person._id);

  return group;
};

const personService = {
  getAll,
  add,
  getById,
  del,
  changeLastName,
  get,
  getGroups,
  addPersonToGroup,
  removePersonFromGroup,
};

export default personService;
