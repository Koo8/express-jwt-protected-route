const { StatusCodes } = require('http-status-codes');

const notFoundHandler = (req, res, next) => {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: `the requested is not found`})
}

module.exports = notFoundHandler;