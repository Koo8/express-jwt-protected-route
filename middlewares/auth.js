const { Unauthorized  } = require("../errorClasses");
const jwt = require('jsonwebtoken')

const authorizationMiddleware = (req, res, next)=> {
    const bearToken = req.headers.authorization;
    if (!bearToken || !bearToken.startsWith('Bearer ')) {
        throw new Unauthorized("not authorized to access this page.")
    }
    const token = bearToken.split(' ')[1];
    try {
      // decode token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { id, username } = decoded;
      // create a attribute for req, so that id and username can be passed along to next()
      req.user = { id, username };

      next();
    } catch (error) {
        throw new Unauthorized("Wrong token, not authorized.")
    }
   
}

module.exports=authorizationMiddleware