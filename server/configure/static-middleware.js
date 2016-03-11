'use strict';

var path = require('path');
var express = require('express');

module.exports = function (app) {

  var npmPath = path.join(__dirname, '../../node_modules');
  var publicPath = path.join(__dirname, '../../public');
  var browserPath = path.join(__dirname, '../../browser');

  app.use(express.static(npmPath));
  app.use(express.static(publicPath));
  app.use(express.static(browserPath));

};
