const jwt = require('jsonwebtoken');
const jwt_secret = "thisis@secret";

const fetchUser = (req, res, next) => {

    //getting the token from the header
   
   try {
    const token = req.header('auth-token');
    if (!token) {
       return res.status(401).send("Please provde a  token");
    }
    const data = jwt.verify(token, jwt_secret);
    req.user = data.user;
       
   } catch (error) {
       console.error(error);
     return  res.status(401).send("Please provide a valid token to authnticate");
   }

    //next will execute next function which will be after the middleware in the routes
    next();
};


module.exports = fetchUser;