const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/usermodel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const fetchUser = require("../middleware/getuser");




//jwt secret key 
const jwt_secret = "thisis@secret";






//Signup Route  Without auth required
router.post("/signup",
    //validating request 
    [
        body("fname").isEmpty().withMessage("First name should not be empty"),
        body("email").isEmail().withMessage("Email is not correct"),
        body("password").isLength({ min: 5 }).withMessage("Password must be greater then 5 characters"),
    ],
    async (req, res) => {
        //using bcrypt for password hashing and salt
        const salt = await bcrypt.genSalt(11);
        const securepassword = await bcrypt.hash(req.body.password, salt);
        //checking for validation errors
        const verrors = validationResult(req);
        if (!verrors.isEmpty()) {
            return res.json(verrors);
        }
        try {
            //checking if the user already exists in db 
            let user = await User.findOne({ email: req.body.email });
            if (user != null) {
                return res.status(400).json({ error: "email already in use" });
            }
            user = await User.create(
                {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: securepassword,
                    role: req.body.role,
                }
            );
            const data = {
                user:
                {
                    id: user.id,
                }
            }
            const AuthToken = jwt.sign(data, jwt_secret);
            res.json({ AuthToken });
        }
        catch (err) {
            console.error(err.message);
            return res.status(500).json({ error: "Some Error occured in the app" })
        }
    });

//Login Route Without auth

router.post("/login",
    //validating incoming request
    [
        body("email").isEmail().withMessage("Enter a Valid Email"),
        body("password").exists().withMessage("Please enter your password"),
    ],
    async (req, res) => {
        const verrors = validationResult(req);
        if (!verrors.isEmpty) {
         return   res.json(verrors.array());
        }
        //object destructring
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
              return  res.status(400).send("Please provide correct Credentials");
            }
            const comparepassword = await bcrypt.compare(password, user.password);
            //error if password doesnot match 
            if (!comparepassword) {
               return res.status(500).send("Please prvide correct credentials");
            }
            const data = {
                user: {
                    id: user.id,
                }
            }
            const AuthToken = jwt.sign(data, jwt_secret);
            const userid=user.id;
            res.json({AuthToken,userid});
        } catch (error) {
          return  res.status(500).send("Some internal eroro" + error)
        }
    });

//Route for Getting logged in user details -Login-Required

router.post("/getuser",
//middleware to fetch user details with the help of token
    fetchUser,
    async (req, res) => {
       
        try {
            const userid = req.user.id;
           
            const user = await User.findById(userid).select("-password");
            if (!user) {
             return   res.send("No user is found against this token");
                
            }
            res.send(user);

        } catch (error) {
            console.error(error);
         return   res.status(500).send("Some internal eroro" + error)
        }
    });

module.exports = router;