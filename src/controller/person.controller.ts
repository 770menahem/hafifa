import { Request, Response } from "express";
import personService from "./../service/person.service";

const getAll = async (_: Request, res: Response) => {
  res.send(await personService.getAll());
};

const getByName = async (req: Request, res: Response) => {
  const firstName = req.params.name;

  try {
    const person = await personService.get(firstName);

    if (!person) {
      throw "no found";
    }
    res.send(person);
  } catch (error) {
    res.status(400).send(`Can't find ${firstName} `);
  }
};

const getPersonGroups = async (req: Request, res: Response) => {
  const firstName = req.params.firstName;

  try {
    const groups = await personService.getGroups(firstName);

    res.send(groups);
  } catch (error) {
    res.status(400).send(`Something wrong, ${error}`);
  }
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
  const groupName = req.body.groupName;

  try {
    res.send(await personService.addPersonToGroup(firstName, groupName));
  } catch (error) {
    res
      .status(400)
      .send({ msg: `Can't add ${firstName} to ${groupName}`, ...error });
  }
};

const removePersonFromGroup = async (req: Request, res: Response) => {
  const firstName = req.body.firstName;
  const groupName = req.body.groupName;

  try {
    res.send(await personService.removePersonFromGroup(firstName, groupName));
  } catch (error) {
    res
      .status(400)
      .send({ msg: `Can't remove ${firstName} from ${groupName}.`, error });
  }
};

const changeLastName = async (req: Request, res: Response) => {
  const firstName = req.body.firstName;
  const lastName = req.body.newLastName;

  try {
    res.send(await personService.changeLastName(firstName, lastName));
  } catch (error) {
    res.status(400).send(`Can't update ${firstName}`);
  }
};

const deletePerson = async (req: Request, res: Response) => {
  const firstName = req.params.name;

  try {
    res.send((await personService.del(firstName)) || "Nothing to delete ");
  } catch (error) {
    res.status(400).send(`Can't delete ${firstName}`);
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
