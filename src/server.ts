import app from "./app";
import * as db from "./dbConnect";

const PORT = process.env.PORT || 3000;

const start = () =>
  db.connect().then(() => {
    app.listen(PORT, () => {
      console.log("Listening on port: " + PORT);
    });
  });
start();

export default start;
