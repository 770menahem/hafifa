import { Request, Response } from "express";
import groupService from "./../service/group.service";

const createGroup = async (req: Request, res: Response) => {
  const groupName = req.params.name;
  const parentGroup = req.params.parent;

  try {
    const newGroup = await groupService.createGroup(groupName, parentGroup);

    res.send(newGroup);
  } catch (error) {
    const eMsg = `${error}`.split("error")[0];

    res.status(400).send(`Can't create group ${groupName}. ${eMsg}`);
  }
};

const allGroups = async (_: Request, res: Response) => {
  const allGroups = await groupService.getAllGroups();
  res.send(allGroups || "Can't get all groups");
};

const allHierarchy = async (req: Request, res: Response) => {
  const groupName = req.params.name;

  try {
    const groupChildren = await groupService.getGroupChildren(groupName);

    res.send(groupChildren || "no groups an people in this group");
  } catch (error) {
    res.send(error);
  }
};

const findByField = async (req: Request, res: Response) => {
  const key = req.params.key;
  const value = req.params.value;

  try {
    const foundedGroup = await groupService.getByField(key, value);

    res.send(foundedGroup);
  } catch (error) {
    res.status(400).send(`no group in ${key} => ${value}.`);
  }
};

const checkIfPersonInGroup = async (req: Request, res: Response) => {
  const firstName = req.params.firstName;
  const groupName = req.params.name;

  try {
    const groupAndPerson = await groupService.isInGroup(firstName, groupName);

    res.send(groupAndPerson);
  } catch (error) {
    res.send(error);
  }
};

const changeGroupName = async (req: Request, res: Response) => {
  const name = req.params.name;
  const newName = req.params.newName;

  try {
    const newGroup = await groupService.updateName(name, newName);

    res.send(newGroup);
  } catch (error) {
    res.status(400).send(`Can't change group name. ${error}`);
  }
};

const addGroupUnderGroup = async (req: any, res: any) => {
  const to = req.params.insertTo;
  const child = req.params.toInsert;

  try {
    const result = await groupService.connectGroups(to, child);

    res.send(result);
  } catch (error) {
    const eMsg = `${error}`.split("error")[0];

    res.status(400).send(`Can't insert ${child} to ${to}. ${eMsg}`);
  }
};

const moveGroup = async (req: any, res: any) => {
  const to = req.params.moveTo;
  const child = req.params.toMove;

  try {
    const result = await groupService.moveGroup(to, child);

    res.send(result);
  } catch (error) {
    const eMsg = `${error}`.split("error")[0];

    res.status(400).send(`Can't insert ${child} to ${to}. ${eMsg}`);
  }
};

const deleteGroup = async (req: Request, res: Response) => {
  const name = req.params.name;
  try {
    return res.send(await groupService.deleteGroupByName(name));
  } catch (error) {
    const eMsg = `${error}`.split("error")[0];

    res.status(400).send(`Can't delete group ${name}. ${eMsg}`);
  }
};

export default {
  checkIfPersonInGroup,
  moveGroup,
  addGroupUnderGroup,
  allGroups,
  createGroup,
  changeGroupName,
  findByField,
  allHierarchy,
  deleteGroup,
};
