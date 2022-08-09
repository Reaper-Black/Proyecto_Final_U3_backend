const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const AnswerSchema = require("./routes/Models");
// const PollSchema = require("./routes/Models");
const models = require('./routes/Models');
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());

// app.use("/Answer", AnswerSchema);
app.use("/", models);


const mongoUri = process.env.MONGODB_URI;

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("connected to mongo");
  })
  .catch((error) => {
    console.log({ error });
  });

app.listen(3001);