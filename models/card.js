/*jshint esversion: 6*/

const express = require('express');
const router = express.Router();

module.exports = function(sequelize, DataType){
  var Card = sequelize.define("Card", {
    title: DataType.TEXT,
    priority: DataType.TEXT,
    status: {
      type: DataType.TEXT,
      defaultValue: "Queue"
    },
    created_by: DataType.TEXT,
    assigned_to: DataType.TEXT,
    button: {
      type: DataType.TEXT,
      defaultValue: "Next"

    }
  });
  return Card;
};