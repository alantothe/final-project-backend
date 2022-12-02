const User = require('../../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")


const postRegister = async (req, res) => {
    try{
        const {username, email, password} =req.body
        // check if user exists
        const userExists = await User.exists({ email: email.toLowerCase() });
        if (userExists) {
        return res.status (409).send("E-mail already in use.");
        }
        // encrypt password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // create user and save to mongoDB

        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password: encryptedPassword
        })

        //create JWT token
        const token = "";

        res.status (201).json({
            userDetails: {
            email: user.email,
            token: token,
            username: user.username,
            },
        })







    }
    catch (err){
        return res.status(500).send("Error, Please try again")
    }
    };

    module.exports = postRegister