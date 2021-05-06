import { Request, Response } from "express";
import personService from "./../service/person.service";

const getAll = async (_: Request, res: Response) => {
  res.send(await personService.getAll());
};

const addPeron = async (req: Request, res: Response) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  try {
    res.send(await personService.add(firstName, lastName));
  } catch (error) {
    res.status(400).send(`Can't add ${firstName} ${lastName}`);
  }
};

const addPersonToGroup = async (req: Request, res: Response) => {
  const firstName = req.body.firstName;
  const groupeName = req.body.groupName;

  try {
    res.send(await personService.addPersonToGroup(firstName, groupeName));
  } catch (error) {
    res.status(400).send(`Can't add ${firstName} to ${groupeName}`);
  }
};

const removePersonFromGroup = async (req: Request, res: Response) => {
  const firstName = req.body.firstName;
  const groupeName = req.body.groupName;

  try {
    res.send(await personService.removePersonFromGroup(firstName, groupeName));
  } catch (error) {
    res
      .status(400)
      .send(`Can't remove ${firstName} from ${groupeName}. ${error}`);
  }
};

const deletePerson = async (req: Request, res: Response) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  try {
    res.send(await personService.del(firstName, lastName));
  } catch (error) {
    res.status(400).send(`Can't add ${firstName} ${lastName}`);
  }
};

const getByName = async (req: Request, res: Response) => {
  const firstName = req.params.name;

  try {
    res.send(await personService.get(firstName));
  } catch (error) {
    res.status(400).send(`Can't add ${firstName} `);
  }
};

const changeLastName = async (req: Request, res: Response) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  try {
    res.send(await personService.changeLastName(firstName, lastName));
  } catch (error) {
    res.status(400).send(`Can't update ${firstName}`);
  }
};

const getPersonGroups = async (req: Request, res: Response) => {
  const firstName = req.params.firstName;

  try {
    const groups = await personService.getGroups(firstName);

    res.send(groups);
  } catch (error) {
    console.log(error);

    res.status(400).send("Something wrong");
  }
};

export default {
  getAll,
  addPeron,
  addPersonToGroup,
  removePersonFromGroup,
  deletePerson,
  getByName,
  changeLastName,
  getPersonGroups,
};
