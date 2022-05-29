const express = require("express");
const ConnectDb = require("./dbfiles/dbconnect");
const authRoute = require("./routes/authroute");

const cors = require("cors");


const portno = "4000";

const { body, validationResult } = require("express-validator");
const Subject = require("./models/subjectmodel");



const app = express();
//middleware to use json in requests and responses
app.use(cors());
app.use(express.json());

//using connectdb function from dbconnect file to connect database
ConnectDb();







//using routes

app.use(authRoute);



//get all subjects
app.get("/subj", async (req, res) => {
    const subject = await Subject.find({});
    if(!subject){
        return res.send("no course found");
    }
    res.send(subject);
});


//getsubj byid
app.post("/subj/id", async (req, res) => {

    console.log("id a;asd");
    const subject = await Subject.find({ _id: req.body.id });
    console.log(subject);
    res.send(subject);
})
//deletesubject
app.post("/delete", async (req, res) => {

    try {
        console.log(req.body.id);
        await Subject.findByIdAndDelete(req.body.id)
            .then(res.send("Item deleted"))
            .catch(err => console.log(err))


    }
    catch (err) {
        return res.send(err)
    }
});
//create subj
app.post("/createsub",

    [
        body("subjecttitle").isEmpty().withMessage("Subject name cannot be empty"),

    ],
    async (req, res) => {
        console.log("here");
        const verrors = validationResult(req);
        if (!verrors.isEmpty) {
            return res.json(verrors.array());
        }
        try {
            console.log(req.body);
            const { subjectname, subjectdesc } = req.body;
            const subject = await new Subject({
                //subject title is coming from request which i got through object restructuring
                subjectname, subjectdesc
            }).save();

            res.send(subject);

        } catch (error) {
            console.error(error);
            return res.status(401).send("Some Internal Server error occured");
        }

    });
//update subj
app.post("/updatec",
    async (req, res) => {

        try {
           
            const { subjectname, subjectdesc } = req.body;
           await Subject.updateOne(
                { name: req.params.name },
                { $set: { subjectname: subjectname, subjectdesc: subjectdesc } })
                .then(
                    res.send("updated")
                )
                .catch(res.send("error"))



        } catch (error) {
            console.error(error);
            return res.status(401).send("Some Internal Server error occured");
        }

    });

app.listen(portno, () => {
    console.log("App is runing on port " + portno);
});