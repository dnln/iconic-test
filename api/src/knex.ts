import * as knexModule from "knex";

const config = require("../knexfile");

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
}

export default knexModule(config[process.env.NODE_ENV]);
