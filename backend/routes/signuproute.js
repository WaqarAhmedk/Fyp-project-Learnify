const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/usermodel");



router.post("/signup",
    //validating request 
    [
        body("fname").isEmpty().withMessage("First name should not be empty"),
        body("email").isEmail().withMessage("Email is not correct"),
        body("password").isLength({ min: 5 }).withMessage("Password must be greater then 5 characters"),


    ],
    async (req, res) => {
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
                    password: req.body.password,
                    role: req.body.role,
                }
            );

        }
        catch (err) {
            console.error(err.message);
            return res.status(500).json({ error: "Some Error occured in the app" })
        }



    });



module.exports = router;