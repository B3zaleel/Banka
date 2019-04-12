const bodyParser = require('body-parser');
const express = require('express');

module.exports = (bankaAPI) => {
  bankaAPI.set('defaultPort', 8890);
  bankaAPI.set('testPort', 8891);
  bankaAPI.set('json spaces', 4);
  bankaAPI.use(bodyParser.json());
  bankaAPI.use(express.static('public'));
};
