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
  console.log( req.body);
  Card.create(req.body)
  .then(card => {
    res.json( card );
  })
  .catch( res.json.bind(res));
});

cards.put('/', (req,res) =>{
  console.log(req.body);

    if(req.body.status === "Queue"){
    Card.update(
      {status: "In Progress"},
      {where: {id: req.body.id}});
    }
    if(req.body.status === "In Progress"){
    Card.update(
      {status: "Complete"},
      {where: {id: req.body.id}});
    }
    if(req.body.status === "Complete"){
    Card.update(
      {status: "Done"},
      {where: {id: req.body.id}});
  }
});

cards.delete('/', (req,res) =>{
  console.log(req.body.id);
  Card.destroy({
    where: {id: req.body.id}
  });
});

module.exports = cards;