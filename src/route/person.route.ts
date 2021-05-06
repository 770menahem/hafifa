import express from "express";
import personController from "../controller/person.controller";

const personRoute = express.Router();

personRoute.get("/all", personController.getAll);
personRoute.post("/", personController.addPeron);
personRoute.post("/toGroup", personController.addPersonToGroup);
personRoute.delete("/fromGroup", personController.removePersonFromGroup);
personRoute.delete("/", personController.deletePerson);
personRoute.get("/name/:name", personController.getByName);
personRoute.patch("/newLastName/", personController.changeLastName);
personRoute.get("/:firstName/groups", personController.getPersonGroups);

export default personRoute;
