const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

mongoose.connect(
  process.env.ATLAS_URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => {
    console.log("The database is up and running");
  }
);

const authRoute = require("./routes/auth");
const teacherRoute = require("./routes/teacher");
const classRoute = require("./routes/class")

app.use("/api/admin", authRoute);
app.use("/api/admin", teacherRoute);
app.use("/api/admin", classRoute);

app.listen((process.env.PORT || 6001), () => {
  console.log("The server is running on port 6001");
});
