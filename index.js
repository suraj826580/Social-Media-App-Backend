const express = require("express");
const { connection } = require("./configs/db");
const { userRoute } = require("./routes/user.route");
const { postRoute } = require("./routes/post.route");
require("dotenv").config();
var cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoute);
app.use("/posts", postRoute);

app.listen(process.env.PORT, async (req, res) => {
  try {
    await connection;
    console.log("Connected to the Database");
  } catch (error) {}
  console.log(`Server is Running on Port Num ${process.env.PORT}`);
});
