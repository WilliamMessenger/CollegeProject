const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
const config = require('./config');
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const path = require('path');
const api = require('./routes/api');
const exphbs = require('express-handlebars');
const views = require('./routes/views');

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', api);

app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs.create({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials')
}).engine);
app.set('view engine', 'hbs');

app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/', views);
app.use('/*', (req, res) => {
  if(!res.headersSent) {
    res.status(404).send('404 - Page not found');
  }
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})