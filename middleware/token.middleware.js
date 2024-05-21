const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET

const cookieValidate = (req, res, next) => {
    const jwt_token = req.cookies.jwt_token;

    try {
        const isValid = jwt.verify(jwt_token, JWT_SECRET);

        if (isValid.exp > Date.now() / 1000) {
            return res.status(200).json({ success: true, message: "Logged in successful because Token is still valid" });
        }

    } catch (error) {
        console.log('token is expired');
        res.clearCookie('jwt_token');
    }

    next();
}

module.exports = cookieValidate