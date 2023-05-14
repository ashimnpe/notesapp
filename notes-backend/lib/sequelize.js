const { Sequelize } = require("sequelize");
const { postgres } = require("../configs/config");

const sequelize = new Sequelize(
  postgres.database,
  postgres.user,
  postgres.password,
  {
    dialect: "postgres",
    host: postgres.host,
    dialectOptions: {
      // ssl: true,
    },
    pool: {
      max: 5,
      idle: 30000,
    },
  }
);

module.exports = sequelize;
