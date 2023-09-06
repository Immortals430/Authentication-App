const mongoose = require('mongoose');
const env = require('../config/environment')

mongoose.connect(env.connectDB);


const db = mongoose.connection;

module.exports = db;