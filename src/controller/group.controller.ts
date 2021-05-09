import { Request, Response } from "express";
import groupService from "./../service/group.service";

const createGroup = async (req: Request, res: Response) => {
  const groupeName = req.params.name;
  const parentGroup = req.params.parent;

  try {
    const newGroup = await groupService.createGroup(groupeName, parentGroup);

    res.send(newGroup);
  } catch (error) {
    const eMsg = `${error}`.split("error")[0];

    res.status(400).send(`Can't create groupe ${groupeName}. ${eMsg}`);
  }
};

const deleteGroup = async (req: Request, res: Response) => {
  const name = req.params.name;
  try {
    return res.send(await groupService.deleteGroupeByName(name));
  } catch (error) {
    const eMsg = `${error}`.split("error")[0];

    res.status(400).send(`Can't delete groupe ${name}. ${eMsg}`);
  }
};

const changeGroupName = async (req: Request, res: Response) => {
  const name = req.params.name;
  const newName = req.params.newName;

  try {
    const newGroup = await groupService.updateName(name, newName);

    res.send(newGroup);
  } catch (error) {
    res.status(400).send("Can't change group");
  }
};

const findByField = async (req: Request, res: Response) => {
  const key = req.params.key;
  const value = req.params.value;

  const foundedGroup = await groupService.getByField(key, value);

  res.send(foundedGroup || `no group in ${key} => ${value}`);
};

const allGroups = async (_: Request, res: Response) => {
  const allGroups = await groupService.getAllGroups();
  res.send(allGroups || "Can't get all groups");
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

const moveGroupe = async (req: any, res: any) => {
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

const allHierarchy = async (req: Request, res: Response) => {
  const groupName = req.params.name;

  try {
    const groupChildren = await groupService.getGroupChildren(groupName);

    res.send(groupChildren || "no groups an people in this group");
  } catch (error) {
    res.send(error);
  }
};

export default {
  checkIfPersonInGroup,
  moveGroupe,
  addGroupUnderGroup,
  allGroups,
  createGroup,
  changeGroupName,
  findByField,
  allHierarchy,
  deleteGroup,
};
