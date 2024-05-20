const express = require('express')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieValidate = require('../middleware/token.middleware')

const router = express.Router(); 

// variables
const JWT_SECRET = process.env.JWT_SECRET


// ROUTE 1: Register a user
router.post("/register", (req, res) => {
    const { username, password, cpassword, email, phone } = req.body;

    /*
   TODO:
       1. check for existing user found on db
       1.1 if ALREADY EXISTS then return from here
   */


    if (password != cpassword) {
        return res.status(400).json({ success: false, message: "Password doesn't match" });
    }

    if (username == "" || email == "" || phone == "") {
        return res.status(404).json({ success: false, message: "All fields are required" });
    }

    // password encryption
    const encryptedPassword = bcrypt.hashSync(password, 5);

    // generate token
    // payload
    const data = {
        username,
        email
    }
    const jwt_token = jwt.sign(data, JWT_SECRET, { expiresIn: "40s" }); // eg: 1d 10m 43s

    // set cookie
    res.cookie('jwt_token', jwt_token);

    res.status(200).json({ success: true, username, email, password: encryptedPassword, phone, jwt_token });
})

// ROUTE 2: Login a user
router.post("/login", cookieValidate, async (req, res) => {
    const { username, password } = req.body;

    /*
    TODO:
        1. check for existing user found on db
        1.1 if NOT found the return from here
    */



    /* 
        if the token is expired then use 
        username and password to authenticate the user 
    */

    const hashPassword = "$2a$05$z9Zh2aOukW89X4MsTd1yJ.BoC1plW5tK1P.FZw.Yn03QhVtk0FE/u"; // get from db instead
    const pwdMatched = bcrypt.compareSync(password, hashPassword);

    if (!pwdMatched) {
        return res.status(400).json({ success: true, message: "Invalid credentials" });
    }

    res.status(200).json({ success: true, message: "user logged in succesful using credentials" });
})

module.exports = router