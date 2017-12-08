var Express = require("express");
var bodyParser = require("body-parser");
var App = Express();
App.use(bodyParser.urlencoded({ extended: false }));
App.use(Express.static(__dirname + '/app/public'));
var PORT = process.env.PORT || 8082;
var DB = require("./app/models");

require("./app/routes/sql-routes.js")(App);
require("./app/routes/html-routes.js")(App);

DB.sequelize.sync({ force: true }).then(function() {
  App.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
}); 