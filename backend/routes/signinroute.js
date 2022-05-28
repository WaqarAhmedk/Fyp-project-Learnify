const express = require("express");
const user = require("../models/usermodel")

const router = express.Router();



router.post("/signin", (req, res) => {
    user.findOne(
        {
            email: req.body.email,
            password: req.body.password,
        }
        )
        .then((user)=>{
            
            if (user !=null) {
                console.log(user);
                
            } else {
                console.log(user);
                console.log("No User Found try again");
            }
        })
        .catch(err=>console.log(err));

});

module.exports=router;