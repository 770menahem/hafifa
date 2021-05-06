import express from "express";
import morgan from "morgan";
import { connectDB } from "./dbConnect";
import groupRouter from "./route/group.route";
import personRoute from "./route/person.route";

const app = express();
const port = 3000;
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/group", groupRouter);
app.use("/api/person", personRoute);

(async () => {
  await connectDB();
  app.listen(port, () => console.log(`app listening on port ${port}!`));
  //   closeDB();
})();
