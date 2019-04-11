const bodyParser = require('body-parser');
const express = require('express');

module.exports = (bankaAPI) => {
  bankaAPI.set('port', 8890);
  bankaAPI.set('testPort', 8891);
  bankaAPI.set('json spaces', 4);
  bankaAPI.use(bodyParser.json());
  bankaAPI.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      status: err.status,
      error: err.message,
    });
    next();
  });
  bankaAPI.use(express.static('public'));
};
