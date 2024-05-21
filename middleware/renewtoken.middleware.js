const jwt = require('jsonwebtoken');

const renewToken = (req, res, next) =>{

    const {username} = req.body;

    const data = {
        username
    };

    const jwt_token = jwt.sign(data, JWT_SECRET, { expiresIn: "40s" }); // eg: 1d 10m 43s

    res.cookie('jwt_token', jwt_token).json({success: true, message: "New token generated for the user"});


    next();
}

module.exports = renewToken;