// Require mongoose
const { connect, connection } = require("mongoose");

// Connect to the Mongo DB
connect("mongodb://127.0.0.1:27017/networkDB");

// Return DB connection
module.exports = connection;
