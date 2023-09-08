require("dotenv").config();
require("express-async-errors"); // in place of async middleware

const PORT = process.env.PORT || 3000;
const errorHandler = require('./middlewares/errorHandler');
const notFoundHandler = require(`./middlewares/notFound`);

const mainRouter = require('./routes/main');

const express = require('express');
const app = express();

// ***  middlewares   ***//
app.use(express.json());
app.use(express.static("public"));

// // initial api testing
// app.use('/api/v1/products', (req, res, next) => {
//     res.status(200).json({ msg: `connect to products page` })
// });


// api calls through router
app.use('/api/v1', mainRouter);



// error handling at the end
app.use(errorHandler);
app.use(notFoundHandler);

//start()
const start = () => {
    try {
        app.listen(PORT, () => {
            console.log(`listening to port ${PORT}`)
        })
    } catch (error) {
        console.log(`could not connect to PORT ${PORT}`)
    }
}

start();