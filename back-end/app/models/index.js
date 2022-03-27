const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.user = require("./user.model");
db.refreshToken = require("./refreshToken.model");
db.project = require("./project.model");
db.event = require("./event.model");
module.exports = db;