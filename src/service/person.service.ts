import personApi from "./../repo/person.repo";
import groupService from "./group.service";

const personService = {
  getAll: async () => {
    return await personApi.getAll();
  },
  add: async (firstName: string, lastName: string) => {
    return await personApi.add(firstName, lastName);
  },
  getById: async (id: string) => {
    return await personApi.getById(id);
  },
  del: async (firstName: string, lastName: string) => {
    return await personApi.del(firstName, lastName);
  },
  changeLastName: async (firstName: string, lastName: string) => {
    return await personApi.changeLastName(firstName, lastName);
  },
  get: async (firstName: string) => {
    return await personApi.get(firstName);
  },
  getGroups: async (firstName: string) => {
    const person = await personApi.get(firstName);

    const groups = await groupService.getPersonGroups(person._id);

    return groups;
  },
  addPersonToGroup: async (firstName: string, groupName: string) => {
    const person = await personApi.get(firstName);

    const group = await groupService.insertPersonToGroup(groupName, person._id);

    return group;
  },
  removePersonFromGroup: async (firstName: string, groupName: string) => {
    const person = await personApi.get(firstName);

    const group = await groupService.removePersonFromGroup(
      groupName,
      person._id
    );

    return group;
  },
};

export default personService;
