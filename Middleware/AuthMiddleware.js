const jwt = require("jsonwebtoken");
const AsyncHandler = require("express-async-handler");
const User = require("../Modals/user.modal");
const dotEnv = require("dotenv").config();
const { parsed } = dotEnv;

const protect = AsyncHandler(async (req, res, next) => {
    let token;
    let headerToken = req.headers.authorization;
    if(headerToken && headerToken.startsWith('Bearer')){
        try{
            token = headerToken.split(" ")[1];

            //verify token
            const decode = jwt.verify(token, parsed.JWT_SECRET);

            //get user from token
            req.user = await User.findById(decode.id).select('-password');

            next();
        }catch(err){
            res.status(401)
            throw new Error("Forbidden")
        }
    }

    if(!token){
        res.status(401);
        throw new Error("Not authorized")
    }
});

module.exports = {protect};
