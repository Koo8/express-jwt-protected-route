const mongoose = require('mongoose');

// return a promise
const connectDB = (url) => {
    return mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
} 

module.exports = connectDB;