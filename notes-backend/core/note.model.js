const { DataTypes } = require("sequelize");
const sequelize = require("../lib/sequelize");

const Note = sequelize.define("notes", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    field: "title",
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  content: {
    field: "content",
    type: DataTypes.TEXT("long"),
  },
});

module.exports = Note;
