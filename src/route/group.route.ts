import express from "express";
import groupController from "../controller/group.controller";

const groupRouter = express.Router();

groupRouter.post("/create/:name/parent/:parent", groupController.createGroup);

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
  "/:firstName/group/:groupName",
  groupController.checkIfPersonInGroup
);

groupRouter.get("/:groupName/all", groupController.allHierarchy);

export default groupRouter;
