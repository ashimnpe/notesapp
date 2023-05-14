require("dotenv").config({ path: ".env" });

module.exports = {
  port: process.env.PORT || 3000,
  postgres: {
    host: process.env.POSTGRES || "localhost",
    user: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "postgres",
    port: process.env.POSTGRES_PORT || 5432,
    database: process.env.POSTGRES_DATABASE || "notes-app",
  },
};
