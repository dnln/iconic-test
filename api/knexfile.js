require("dotenv").config({});

const config = {
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
  },
  migrations: {
    tablename: "knex_migrations"
  }
};

module.exports = {
  development: config,
  staging: config,
  production: config,
  test: config
};
