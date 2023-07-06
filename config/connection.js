// Require mongoose
const mongoose = require("mongoose");

// Connect to the Mongo DB
mongoose.connect("mongodb://127.0.0.1:27017/networkDB");

// Return DB connection
module.exports = mongoose.connection;
