import express from "express";
import groupController from "../controller/group.controller";

const groupRouter = express.Router();

groupRouter.get(
  "/person/:firstName/ingroup/:name",
  groupController.checkIfPersonInGroup
);

groupRouter.get("/:name/all", groupController.allHierarchy);

groupRouter.get("/fields/:key/:value", groupController.findByField);

groupRouter.get("/all", groupController.allGroups);

groupRouter.post("/create/:name/parent/:parent", groupController.createGroup);

groupRouter.post("/create/:name", groupController.createGroup);

groupRouter.post(
  "/insert/:toInsert/to/:insertTo",
  groupController.addGroupUnderGroup
);

groupRouter.post("/move/:toMove/to/:moveTo", groupController.moveGroupe);

groupRouter.patch(
  "/change/name/:name/toName/:newName",
  groupController.changeGroupName
);

groupRouter.delete("/delete/:name", groupController.deleteGroup);

export default groupRouter;
