const mongoose=require("mongoose");
const dbname="learnify";

// const conUri=`mongodb+srv://waqar:waqar@cluster0.roomv.mongodb.net/`+dbname+`?retryWrites=true&w=majority`;
const conUri="mongodb://localhost:27017/"+dbname;
const ConnectDb=()=>{

    mongoose.connect(conUri).then(()=>{
        console.log("connected to database");
    }).catch((err)=>{
        console.log("Error connecting db ".err);

    })
}

module.exports=ConnectDb;