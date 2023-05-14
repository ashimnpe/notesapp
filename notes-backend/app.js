const express = require("express");
const cors = require("cors");
const sequelize = require("./lib/sequelize");
const NoteRoute = require("./core/note.route");

/**
 * Initialize Express
 */
const app = express();

/**
 * Register Global Middlewares
 */
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Connect to Database With Sequelize
 */
sequelize
  .authenticate()
  .then(() => {
    sequelize.sync({ force: true });
    console.info("DB connected");
  })
  .catch((err) => console.error(err.stack));

/**
 * Register Routes
 */
app.use("/api", NoteRoute);

module.exports = app;
