require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const database = require('./models');

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');

const authController = require('./controllers/auth');

// General
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use('/auth', authRouter);
app.use('/users', authController.authenticateToken, usersRouter);

// Drop and re-sync database
database.sequelize.sync({ force: true })
  .then(() => {
    console.log('Drop and re-sync database.');
  });

module.exports = app;
