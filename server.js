/*jshint esversion: 6*/

//const session = require('express-session');
const express = require('express');
const app = express();
const db = require('./models');
const PORT = process.envPORT || 3000;
const bodyParser = require('body-parser');


app.use(express.static('public'));


app.use(bodyParser.urlencoded({extended:false}));

app.listen(3000, () =>{
  console.log(`listening on port: ${PORT}`);
  db.sequelize.sync();
});

module.exports = app;