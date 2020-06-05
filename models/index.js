const Sequelize = require('sequelize');

// Connect with the database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT
});

// Create a database object
const database = { Sequelize, sequelize };

// Add the models to the database object
database.users = require('./User')(Sequelize, sequelize);

module.exports = database;