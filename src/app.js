const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect('');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Origin', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  res.header('Access-Control-Allow-Origin', 'GET, POST, PUT, DELETE');
  next();
});

require('./models/client');

//Rotas
const clientRouter = require('./routes/client-route');
app.use('/clients', clientRouter);


module.exports = app;