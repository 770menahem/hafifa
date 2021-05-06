import express from "express";
import personService from "./../service/person.service";

const personRoute = express.Router();

personRoute.get("/all", async (_, res) => {
  res.send(await personService.getAll());
});

personRoute.post("/", async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  try {
    res.send(await personService.add(firstName, lastName));
  } catch (error) {
    res.status(400).send(`Can't add ${firstName} ${lastName}`);
  }
});

personRoute.post("/toGroup", async (req, res) => {
  const firstName = req.body.firstName;
  const groupeName = req.body.groupName;

  try {
    res.send(await personService.addPersonToGroup(firstName, groupeName));
  } catch (error) {
    res.status(400).send(`Can't add ${firstName} to ${groupeName}`);
  }
});

personRoute.delete("/fromGroup", async (req, res) => {
  const firstName = req.body.firstName;
  const groupeName = req.body.groupName;

  try {
    res.send(await personService.removePersonFromGroup(firstName, groupeName));
  } catch (error) {
    res
      .status(400)
      .send(`Can't remove ${firstName} from ${groupeName}. ${error}`);
  }
});

personRoute.delete("/", async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  try {
    res.send(await personService.del(firstName, lastName));
  } catch (error) {
    res.status(400).send(`Can't add ${firstName} ${lastName}`);
  }
});

personRoute.get("/name/:name", async (req, res) => {
  const firstName = req.params.name;

  try {
    res.send(await personService.get(firstName));
  } catch (error) {
    res.status(400).send(`Can't add ${firstName} `);
  }
});

personRoute.patch("/newLastName/", async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  try {
    res.send(await personService.changeLastName(firstName, lastName));
  } catch (error) {
    res.status(400).send(`Can't update ${firstName}`);
  }
});

personRoute.get("/:firstName/groups", async (req, res) => {
  const firstName = req.params.firstName;

  try {
    const groups = await personService.getGroups(firstName);

    res.send(groups);
  } catch (error) {
    console.log(error);

    res.status(400).send("Something wrong");
  }
});

export default personRoute;
