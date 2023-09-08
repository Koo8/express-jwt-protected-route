// express api calls needs route and controllers' function calls
// all function calls should be wrapped within aysnc/await for promises, await promises should be within try/catch block
// this middleware is for easing the repeated tasks of try/catch and async/await
// more easier approach is to install 'express-async-errors' package and require it at the top of app.js, so that this middleware is not needed anymore.
// this middleware is not used in this project, replaced by the above-mentioned package


// when use: asyncWrapper(async(req, res, next) => { const data = await ....}) 
const asyncWrapper = ( func ) => {
    return async (req, res, next) => {
        try {
            await func(req, res, next)  // this func return a promise, 
        } catch (error) {
            next(error); // error is passed down to next middleware
        }
    }
}

module.exports = asyncWrapper;