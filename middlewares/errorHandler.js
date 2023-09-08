const { CustomError } = require('../errorClasses');
const { StatusCodes } = require('http-status-codes')
//express error-handling function should have four arguments instead of three: (err, req, res, next)
const errorHandler = (err,req, res, next) => {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({ msg: err.message });
    }
    // otherwise use "catch-all" method
    else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: `Catch all error - something went wrong` });
    }
}

module.exports = errorHandler;