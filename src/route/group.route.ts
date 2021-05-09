import express from "express";
import groupController from "../controller/group.controller";

const groupRouter = express.Router();

groupRouter.post("/create/:name/parent/:parent", groupController.createGroup);

groupRouter.post("/create/:name", groupController.createGroup);

groupRouter.delete("/delete/:name", groupController.deleteGroup);

groupRouter.patch(
  "/change/name/:name/toName/:newName",
  groupController.changeGroupName
);
groupRouter.get("/fields/:key/:value", groupController.findByField);

groupRouter.get("/", groupController.allGroups);

groupRouter.post(
  "/insert/:toInsert/to/:insertTo",
  groupController.addGroupUnderGroup
);

groupRouter.post("/move/:toMove/to/:moveTo", groupController.moveGroupe);

groupRouter.get(
  "/person/:firstName/ingroup/:name",
  groupController.checkIfPersonInGroup
);

groupRouter.get("/:name/all", groupController.allHierarchy);

export default groupRouter;
