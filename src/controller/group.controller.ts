import { Request, Response } from "express";
import personService from "./../service/person.service";
import groupService from "./../service/group.service";

const createGroup = async (req: Request, res: Response) => {
  const groupeName = req.params.name;
  const parentGroup = req.params.parent;

  const newGroup = await groupService.createGroup(groupeName, parentGroup);

  res.send(newGroup);
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
  res.send(allGroups);
};

const addGroupUnderGroup = async (req: any, res: any) => {
  const to = req.params.insertTo;
  const child = req.params.toInsert;

  const result = await groupService.connectGroups(to, child);

  res.send(result);
};

const moveGroupe = async (req: any, res: any) => {
  const to = req.params.moveTo;
  const child = req.params.toMove;

  const result = await groupService.moveGroup(to, child);

  res.send(result);
};

const checkIfPersonInGroup = async (req: Request, res: Response) => {
  const firstName = req.params.firstName;
  const groupName = req.params.groupName;

  try {
    const groupAndPerson = await groupService.isInGroup(firstName, groupName);

    res.send(groupAndPerson);
  } catch (error) {
    res.send(error);
  }
};

const allHierarchy = async (req: Request, res: Response) => {
  const groupName = req.params.groupName;

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
};
