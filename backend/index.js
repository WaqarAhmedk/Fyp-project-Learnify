const express = require("express");
const ConnectDb = require("./dbfiles/dbconnect");
const signuproute = require("./routes/signuproute");
const signinroute=require("./routes/signinroute");
const cors=require("cors");
const portno="4000";


const app = express();
//middleware to use json in requests and responses
app.use(cors());
app.use(express.json());

//using connectdb function from dbconnect file to connect database
ConnectDb();







//using routes

app.use(signuproute);
app.use(signinroute);





app.listen(portno, () => {
    console.log("App is runing on port "+portno);
});