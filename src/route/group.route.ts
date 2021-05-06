import express from "express";
import { groupService } from "./../service/groupe.service";

const groupRouter = express.Router();

groupRouter.post("/create/:name/parent/:parent", async (req, res) => {
  const groupeName = req.params.name;
  const parentGroup = req.params.parent;

  const newGroup = await groupService.createGroup(groupeName, parentGroup);

  res.send(newGroup);
});

groupRouter.patch("/change/name/:name/toName/:newName", async (req, res) => {
  const name = req.params.name;
  const newName = req.params.newName;

  try {
    const newGroup = await groupService.updateName(name, newName);

    res.send(newGroup);
  } catch (error) {
    res.status(400).send("Can't change group");
  }
});

groupRouter.get("/fields/:key/:value", async (req, res) => {
  const key = req.params.key;
  const value = req.params.value;

  const foundedGroup = await groupService.getByField(key, value);

  res.send(foundedGroup || `no group in ${key} => ${value}`);
});

groupRouter.get("/all", async (_, res) => {
  const allGroups = await groupService.getAllGroups();
  res.send(allGroups);
});

groupRouter.post(
  "/insert/:toInsert/to/:insertTo",
  async (req: any, res: any) => {
    const to = req.params.insertTo;
    const child = req.params.toInsert;

    const result = await groupService.connectGroups(to, child);

    res.send(result);
  }
);

groupRouter.post("/move/:toMove/to/:moveTo", async (req: any, res: any) => {
  const to = req.params.moveTo;
  const child = req.params.toMove;

  const result = await groupService.moveGroup(to, child);

  res.send(result);
});

export default groupRouter;
