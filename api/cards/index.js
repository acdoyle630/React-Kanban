/*jshint esversion: 6*/

const express = require('express');
const cards = express.Router();
const { Card } = require('../../models');

cards.get('/', (req,res) => {
  Card.all()
  .then(( cards ) =>{
    res.json( cards );
  });
});

cards.post('/', (req,res) =>{
  console.log( req);
  Card.create(req.body)
  .then(card => {
    res.json( card );
  })
  .catch( res.json.bind(res));
});

module.exports = cards;