const express = require("express");

const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/getuser");
const Subject = require("../models/subjectmodel");
const { route } = require("./authroute");

//Route to get all the subject against a particular user
router.get("/getsub", async (req, res) => {
   

    try {

        const fsub = await Subject.find({});
        res.send(fsub);

    } catch (error) {
        console.error(error);
        return res.status(401).send("Some Internal Server error occured");
    }

});



//Route to Create subject Authnticcation is required
router.post("/createsub", fetchUser,
    [
        body("subjecttitle").isEmpty().withMessage("Subject name cannot be empty"),

    ],
    async (req, res) => {
       
        const verrors = validationResult(req);
        if (!verrors.isEmpty) {
            return res.json(verrors.array());
        }
        try {
            const {subjectname} = req.body;
            const subject = await new Subject({
                //subject title is coming from request which i got through object restructuring
                subjectname, user: req.user.id,
            }).save();

            res.send(subject);

        } catch (error) {
            console.error(error);
            return res.status(401).send("Some Internal Server error occured");
        }

    });









module.exports = router;