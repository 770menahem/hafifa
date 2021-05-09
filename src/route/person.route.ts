import express from "express";
import personController from "../controller/person.controller";

const personRoute = express.Router();

personRoute.get("/all", personController.getAll);
personRoute.get("/:firstName/groups", personController.getPersonGroups);
personRoute.get("/name/:name", personController.getByName);
personRoute.post("/", personController.addPeron);
personRoute.post("/toGroup", personController.addPersonToGroup);
personRoute.patch("/newLastName/", personController.changeLastName);
personRoute.delete("/fromGroup", personController.removePersonFromGroup);
personRoute.delete("/", personController.deletePerson);

export default personRoute;
