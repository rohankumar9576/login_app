const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const route = require('./routes/route')
const cors = require('cors')
dotenv.config();
app.use(express.json());
app.use(cors())

mongoose
  .connect("mongodb+srv://rohankumar123:W9ilajafsNQPKnRm@cluster0.ixwo59p.mongodb.net/personal_DB", { useNewUrlParser: true })
  .then(() => {
    console.log(`MongoDB is connected`);
  })
  .catch((error) => {
    console.log(error.message);
  });

app.use("/", route);

// vercel

if (process.env.NODE_ENV == "production") {
  const path = require("path");
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", function (_, res) {
    res.sendFile(
      path.join(__dirname, "../client/build/index.html"),
      function (err) {
        if (err) {
          res.status(500).send(err);
        }
      }
    );
  });
}


app.listen(process.env.PORT || 4000, function () {
  console.log(`Express app is running on port ` + (process.env.PORT || 4000));
});