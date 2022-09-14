const mongoose = require("mongoose"); 

const userDscore = new mongoose.Schema({
    firstname: {type:String},
    lastname: {type:String},
    phonenum: {type:String},
    gender: {type:String},
    birthday: {type:String},
    personalities: {type:String},
    dscore_method3: {type:Number},
    dscore_method4: {type:Number},
    dscore_method5: {type:Number},
    dscore_method6: {type:Number},
    result: [
        {
            typeCal: {type:String},
            runnerName: {type:String},
            userSelect:{type:String},
            wordShow:{type:String},
            contentLeft: {type:String},
            contentRight: {type:String},
            isCorrect: {type:Boolean},
            milliseconds: {type:Number},
        }
    ]
})

module.exports = mongoose.model("iat_userDscore", userDscore);

