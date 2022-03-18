const mongoose = require("mongoose");
const { ServerApiVersion } = require("mongodb");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      serverApi: ServerApiVersion.v1,
    })
    .then((data) => {
      console.log(`Mongodb connected with server ${data.connection.host}`);
    });
};

module.exports = connectDatabase;
