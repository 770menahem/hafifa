import express from "express";
import morgan from "morgan";
import { connectDB } from "./dbConnect";
import Group from "./repo/groupRepo";
import groupRouter from "./route/group.route";

const app = express();
const port = 3000;

app.use(morgan("dev"));
app.use("/api/group", groupRouter);

(async () => {
  await connectDB();
  app.listen(port, () => console.log(`app listening on port ${port}!`));
  //   closeDB();
})();
