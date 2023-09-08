/**The auth.js middleware parts are commented out in the following */

const { BadRequestError  } = require("../errorClasses");
const jwt = require("jsonwebtoken");

// login is a post http, as user input is passed to backend for validation
const login = (req, res, next) => {
  // look for username and password in req.body
  const { username, password } = req.body;
  console.log(username, password);

  // validate username and password - 3 approaches
  // 1. mongoose model validation
  // 2. Joi package - a layer of validation sitting in front of all requests.
  // 3. validating inside the controllers

  if (!username || !password) {
    // throw error instead of using next(), by express-async-errors handling errors in express functions
    // next(createAnError())
    throw new BadRequestError("Please provide both username and password");
  }
  /** If both username and password are ok, sign a token, send response with the token, the token should be saved by frontend securely */
  //create a dummy id, usually provided by db
  const id = new Date().getDate();

  //try to keep payload small, better user experience
  // don't put password inside payload, not secure, accessible by user/other parties
  // create a jwt secret inside .env
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
// async without await, must has a returned value, here 'return' is implied
   res.status(200).json({ msg: `user created`, token });
};

const dashboard = (req, res, next) => {

  /**The following function of check headers'authorization, then decode it or throw an error is copy-pasted to middleware auth.js so that any routes that needs to be protected can use this middleware for authorization check */
  // decode req.headers.authorization....
  // const reqHeaders = req.headers.authorization;
    // console.log(reqHeaders);

/** Two possible errors 
 *  1. no authorization header when sending dashboard req
 *  2. has authorization header, but without "Bearer " initial before the token
 *  3. both are unauthorized errors
*/
    
  // if (!reqHeaders || !reqHeaders.startsWith("Bearer ")) {
  //   throw new CustomError("No token was found", 401);
  // }
  // try {
  //   const token = reqHeaders.split(" ")[1];
  //   // console.log(token)
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded); //{ id: 6, username: 'ffff', iat: 1694052542, exp: 1696644542 }
    const luckyNumber = Math.floor(Math.random() * 100);
    //  console.log(`lucky number is ${luckyNumber}`);
    // console.log(req.headers)
     res
      .status(200)
      .json({
        msg: `The user is ${req.user.username}`,
        secret: `Secret: Your lucky number is ${luckyNumber}`,
      });
};

module.exports = {
  login,
  dashboard,
};
