// to export all classes together - combine 3 error classes into one export

const CustomError = require('./CustomError');
const BadRequestError = require('./BadRequestError');
const Unauthorized = require('./Unauthorized');

module.exports = {
    CustomError,
    BadRequestError,
    Unauthorized
}