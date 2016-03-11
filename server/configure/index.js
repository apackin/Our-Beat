'use strict';

module.exports = function (app) {
  
  require('./static-middleware')(app);
  require('./parsing-middleware')(app);

};
