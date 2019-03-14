/* eslint-disable indent */
// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

// Dependencies
var Sequelize = require("sequelize");
require("dotenv").config();

// Creates mySQL connection using Sequelize, the empty string in the third argument spot is our password.
var sequelize = new Sequelize(
  "hopStop",
  "process.env.DB_USER",
  "process.env.DB_PASS",
  {
    host: "process.env.DB_HOST",
    port: "process.env.DB_PORT",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  }
);

// Exports the connection for other files to use
module.exports = sequelize;
