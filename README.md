# Express + jwt (json web token)

#### setup
* npm init => create a package.json file
* add "start": "nodemon app.js", in package.json-'script'. nodemon is globally installed
* npm install "dotenv" "express" "express-async-errors" "http-status-codes" "jsonwebtoken" "mongoose"
* note:: 'dotevn' can be replaced in node.js 20.6 by <code> start: node --env-file=.env main.js </code> in script/package.json
* create app.js as entry point
* the basic setup of the structure: 
    - controllers/main.js
    - routes/main.js
    - db/connect.js
    - errorClasses/CustomError.js
    - middlewares/errorHandler.js and middlewares/notFound.js
    - public/index.html and other static files
    - .gitignore and .env
    
    

#### app.js routine setup
* dotevn, aysnc-errors, middleware error handler and not found handler.For post http, add express.json(), define PORT, then start() to listen to the port

#### customError
* all errors thrown by controllers call back functions has specific statusCode. This CustomError class is to specify the statusCode.

#### Frontend public/main.js
* three functions: 1. checkToken() for token_alert display 2. form submit event to post data 3. button click event to get data with authorization headers - **`Bearer ${token}`**
* axios.get and axios.post return response has a { data } key. data.msg or data.secret should be defined by relavent endpoint methods in controllers. axios is for frentend to reach out to backend with/without user-provided data; express (req, res, next) middleware function is for backend to send required info to front. This info is accessible in { data } from frontend.

#### two api endpoints
* dashboard endpoint is protected, only after jwt validation, the requested data will display on dashboard, otherwise an error message will be sent from backend.

#### validation for protected routes - three approaches
* when connected with db, mongoose db model has its validation
* joi package - adding a layer of validation in front of all requests. 
* manually check if username and password are present and valid in controllers

#### if validation failed, throw an Error - express-async-errors
* <code>app.use(async (req, res) => {
  const user = await User.findByToken(req.get('authorization'));

  if (!user) throw Error("access denied");
});

    app.use((err, req, res, next) => {
    if (err.message === 'access denied') {
        res.status(403);
        res.json({ error: err.message });
    }

    next(err);
    });</code>

#### create an JWT
* how front end should store the token? --TODO
* login sign a token **jwt.sign(payload, secret, options)** after having username & password, send response with token to be stored by frontend.
* JWT is for protected routes, only allow access with signed JWT. 
* JWT.IO allows you to decode, verify and generate JWT.
* the user agent should send the JWT, typically in the Authorization header using the Bearer schema <code>Authentication:Bearer *token*</code>. Dashboard retrieves the token and send to backend in authorization header with 'Bearer'.
* To send JWT tokens through HTTP headers, you should try to prevent them from getting too big, to scale up, use an alternative Auth0 Fine-Graind Authentication
* should not put secret information within the token payload because it is exposed to users/other parties
* backend use **jwt.verify(decoded token, stored token)** to get the data stored in the token payload as well as other key/value pairs.

#### in Controllers, async without await must return a value
- both *login* and *dashboard* are async function without await, which therefore will return immediately a Promise that's not resolved yet, or immediately return a value.
- the frontend will experience it as a synchronous event
- I removed *async* from auth.js, login and dashboard controllers.


#### auth.js - the middleware
* the idea of this middleware is to make it available to all routes that require to be authorized before being accessible to info requested. eg. It is done in dashboard controller.
* this middleware should come before dashboard in routes of get(authMiddleware, dashboard)
* steps to check authorization:
    1. function(req, res, next)
    2. req.header.authorization ?
    3. req.header.authorization startsWith 'Bearer '?
    4. Throw Error if not authorized.
    5. decode JWT *jwt.verify*
    6. assign req.user to { id, username } that from decode destructure.
    7. next() -> so that all routes that use this middleware will have req.user available for use

#### error handling
* make CustomError, and two subClass of it: BadRequest and Unauthorized, export all of them in index.js, so that only require('./errorClasses')
* CustomError is like Error, but is needed in errorHandler.js for instanceOf.
* use external library to generate status code -> http-status-codes. Instead of typying status codes manually, use its pre-defined classes.