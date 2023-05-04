const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const jwt = require("jsonwebtoken");
const user_route = require("./routes/login");
const event_route = require("./routes/eventRoute");
const invite_route = require("./routes/inviteRoute");
const app = express();
const port = 8000;
app.use(express.json());
app.use(bodyparser.json());
app.use(cors());
mongoose
  .connect(
    "mongodb+srv://calendar:ambaram@cluster0.q5hzefo.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to db");
  });
app.use("/events", async (req, res, next) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization;
    console.log(token);
    if (token) {
      const decoded = jwt.verify(token, "secret");
      console.log(decoded);
      req.user = decoded.data;
      console.log(req.user);
      next();
    } else {
      res.status(401).json({
        status: "failed",
        message: "token are missing",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error" });
  }
});

app.use("/", user_route);
app.use("/", event_route);
app.use("/", invite_route);
app.listen(port, () => {
  console.log(`server is on ${port}`);
});
