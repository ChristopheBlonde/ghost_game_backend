const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(formidable());
app.use(cors());

const gamesRoutes = require("./routes/games");
app.use(gamesRoutes);

app.all("*", (req, res) => {
  res.status(400).json("Page not found");
});

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
