const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
const config = require('./config');
const port = process.env.PORT || 3000;

mongoose.connect(config.db.url, config.db.options);

mongoose.connection.on('connected', () => {
  console.log('Mongoose connection established');
})

mongoose.connection.on('error', error => {
  console.error('Mongoose error', error);
})

mongoose.connection.on('disconnected', error => {
  console.error('Mongoose error', error);
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})