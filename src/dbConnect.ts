const mongoose = require("mongoose");

const dbUrl = "mongodb://localhost:27017";
const dbName = "hafifa";

const connect = async () => {
  await mongoose.connect(`${dbUrl}/${dbName}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log("connect db");

  // await cb();
  // mongoose.connection.close();
};

const close = () => mongoose.connection.close();

export { close, connect };
