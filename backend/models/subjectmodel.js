const mongoose = require("mongoose");

const subjectSchema=mongoose.Schema({
   
    subjectname:{
        type:String,
        required:true,
    },
    subjectdesc:{
        type:String,
        required:true,
    },
    datecreated:{
        type:Date,
        default:Date.now,
    },
});

const Subject=mongoose.model("subject",subjectSchema);
module.exports=Subject;