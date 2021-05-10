import express from "express";
import morgan from "morgan";
import groupRouter from "./route/group.route";
import personRoute from "./route/person.route";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/group", groupRouter);
app.use("/api/person", personRoute);

export default app;
