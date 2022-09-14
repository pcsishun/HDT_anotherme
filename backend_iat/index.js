// active function //
require("dotenv").config();
require("./connection/connection").connect();

// import lib //
const express  = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const json2csv = require('json2csv').parse;
// const bodyParser = require('body-parser');
// const imageToBase64 = require("image-to-base64");


// import middleware // 
const auth = require("./middleware/auth");

// import database model // 
const userAdmin = require('./model/userAdmin');
const IATmodel = require("./model/IATmodel");
const IATAdminSelection = require("./model/IATAdminSelection");
const normalUserSign = require("./model/normalUserSign");
const userDscore = require("./model/userDscore");
const imgModel = require("./model/imageSchema");

// config backend // 
const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
// end setup upload image //

const port = process.env.PORT
const hashRound = process.env.saltRounds 


app.get('/backend_iat/debug', async (req, res) => {
    res.send("ok")
});


app.post("/backend_iat/register", async (req, res) => {
    const {username, password}  = req.body;
    // console.log("hashRound==>",hashRound)
    const convertRound = parseInt(hashRound)
    try{
        const hashPassword = bcrypt.hashSync(password, convertRound);
        console.log("hashPassword ==>",hashPassword)
        userAdmin.create({
            username: username,
            password: hashPassword
        })
        res.sendStatus(200)
    }catch(err){
        console.log("error api register ==> ", err);
        res.sendStatus(500)
    }
})

app.post("/backend_iat/login", async (req, res) => {
    const {username, password} = req.body; 
    try{
        const isLogin = await userAdmin.findOne({username})
        
        if(isLogin && (await bcrypt.compare(password, isLogin.password))){
            // console.log("login")
            const getToken = jwt.sign(
                {user_id: isLogin._id},
                process.env.TOKEN_KEY,
                {expiresIn: "1h"}
            )
            const payload = {
                username: username,
                token: getToken
            }
            res.send(payload)

        }else{
            // console.log("cannot login")
            res.sendStatus(401)
        }
    }catch(err){
        console.log("error api login ==> ", err);
        res.sendStatus(500)
    }
})

app.post("/backend_iat/creataiat", auth,async (req, res) => {

    const {
        runner, 
        btn_left,
        btn_right,
        attribute_pratice_name,
        attribute_test_name,
        target_pratice_name,
        target_test_name,
        target_pratice, 
        target_test, 
        attribute_pratice,
        attribute_test,
        d1,
        d2,
        d3,
        d4,
        d5,
        d6,
        d7
    } = req.body

    try{

        IATmodel.create({
            runner:runner, 
            btn_left:btn_left,
            btn_right:btn_right,
            attribute_pratice_name:attribute_pratice_name,
            attribute_test_name:attribute_test_name,
            target_pratice_name:target_pratice_name,
            target_test_name:target_test_name,
            target_pratice:target_pratice, 
            target_test:target_test, 
            attribute_pratice:attribute_pratice,
            attribute_test:attribute_test,
            d1:d1,
            d2:d2,
            d3:d3,
            d4:d4,
            d5:d5,
            d6:d6,
            d7:d7
        });

        IATAdminSelection.create({
            runner:runner,
            is_selection: false
        })

        res.sendStatus(200)

    }catch(err){
        console.log("error api creataiat ==> ", err);
        res.sendStatus(500)
    }

});


app.get("/backend_iat/findingiat", auth,async (req, res) => {
    try{
        const listIAT = await  IATmodel.find({});
        res.send(listIAT);
    }catch(err){
        console.log("error api findingiat ==> ", err);
        res.sendStatus(500);
    }
});

app.post("/backend_iat/iatquerydata" , async (req, res) => {
    const {runner} = req.body;
    // console.log(runner)
    try{
        const dataRunner = await IATmodel.findOne({runner:runner});
        res.send(dataRunner)
    }catch(err){
        console.log("error api iatquerydata ==> ", err);
        res.sendStatus(500)
    }
    

})

app.get("/backend_iat/iatselected", async (req, res) => {
    try{
        const fetchRunner = await IATAdminSelection.findOne({is_selection:true});
        // console.log("fetchRunner ==> ",fetchRunner)
        const listIAT = await  IATmodel.findOne({runner:fetchRunner.runner});
        
        res.send(listIAT)
    }catch(err){
        console.log("err in api iatselected: "+ err);
        res.sendStatus(500);
    }
})

app.post("/backend_iat/useiat", async (req, res) => {
    const {runner} = req.body
    try{
        const replyIAT = await IATmodel.findOne({runner});
        res.send(replyIAT);
    }catch(err){
        console.log("err in api useiat: "+ err);
        res.sendStatus(500);
    }
})

app.put("/backend_iat/updateselection", auth, async (req, res) => {
    const {runner, isSelection} = req.body;
    const runnerQuery = {runner:runner};
    try{
        await IATAdminSelection.updateOne(runnerQuery, {is_selection:isSelection});
        await IATAdminSelection.updateMany({
            runner:{
                $ne:runner
            }
        },
        {
            $set:{
                is_selection:false
            }
        },
        )
        res.sendStatus(200)
    }catch(err){
        console.log("err in api updateselection: "+ err);
        res.sendStatus(500)
    }
})


app.post("/backend_iat/usersign", async (req, res) => {

    const {
        firstname, 
        lastname, 
        phonenum, 
        male, 
        birthday,
        selectPersonal } = req.body

    let gender = male? "M" : "F"

    try{
        await normalUserSign.create({
            firstname: firstname,
            lastname: lastname,
            phone_num: phonenum,
            sex: gender,
            birthday: birthday,
            personalities: selectPersonal
        });
        res.sendStatus(200)
    }catch(err){
        console.log("err in api usersign: "+ err);
        res.sendStatus(500)
    }
});


app.post("/backend_iat/analysis", async (req, res) => {
    
    const {
        firstname,
        lastname,
        phonenum,
        gender,
        birthday,
        personalities,
        iatReply
    } = req.body

    // console.log("array of IAT: ",iatReply);

    const avgCalculate = require("./calculateFunction/avgCalculate")

    const stdCalulate = require("./calculateFunction/stdCalulate")
    const DscoreFunc = require("./calculateFunction/cal_Dscore")
    
    // console.log("iatReply: ==> ",iatReply)

    // let arrayOfWorngD3 = [];
    // let arrayOfWorngD4 = [];
    // let arrayOfWorngD6 = [];
    // let arrayOfWorngD7 = [];

    // let arrayOfCorrectD3 = [];
    // let arrayOfCorrectD4 = [];
    // let arrayOfCorrectD6 = [];
    // let arrayOfCorrectD7 = [];

    let correctArray = [];
    let setArrayElementCorrect = [];
    let setArrayElementWorng = [];

    try{
        // console.log(iatReply);

        iatReply.forEach((element) => {

            if(element.typeCal === "b3"){
                if(element.milliseconds >= 10000 ){
      
                }else if(element.isCorrect === false){
                    const replyBack = {
                        typeCal: element.typeCal,
                        milliseconds: element.milliseconds
                    }
                    setArrayElementWorng.push(replyBack)
                }else{
                    const replyBack = {
                        typeCal: element.typeCal,
                        milliseconds: element.milliseconds
                    }
                    correctArray.push(element.milliseconds)
                    setArrayElementCorrect.push(replyBack)
                }
                
            }if(element.typeCal === "b4" ){
                if(element.milliseconds >= 10000 ){
  
                }else if(element.isCorrect === false){
                    const replyBack = {
                        typeCal: element.typeCal,
                        milliseconds: element.milliseconds
                    }
                    setArrayElementWorng.push(replyBack)
                }else{
                    const replyBack = {
                        typeCal: element.typeCal,
                        milliseconds: element.milliseconds
                    }
                    correctArray.push(element.milliseconds)
                    setArrayElementCorrect.push(replyBack)
                }
            }if(element.typeCal === "b6"){
                if(element.milliseconds >= 10000 ){
   
                }else if(element.isCorrect === false){
                    const replyBack = {
                        typeCal: element.typeCal,
                        milliseconds: element.milliseconds
                    }
                    correctArray.push(element.milliseconds)
                    setArrayElementWorng.push(replyBack)
                }else{
                    const replyBack = {
                        typeCal: element.typeCal,
                        milliseconds: element.milliseconds
                    }
                    correctArray.push(element.milliseconds)
                    setArrayElementCorrect.push(replyBack)
                }
            }if(element.typeCal === "b7"){
                if(element.milliseconds >= 10000 ){
      
                }else if(element.isCorrect === false){
                    const replyBack = {
                        typeCal: element.typeCal,
                        milliseconds: element.milliseconds
                    }
                    correctArray.push(element.milliseconds)
                    setArrayElementWorng.push(replyBack)
                }else{
                    const replyBack = {
                        typeCal: element.typeCal,
                        milliseconds: element.milliseconds
                    }
                    correctArray.push(element.milliseconds)
                    setArrayElementCorrect.push(replyBack)
                }
            }

        });

        // console.log("concatArrayCorrect: ", concatArrayCorrect)
        const correctAvg = avgCalculate(correctArray);
        const correctStd = stdCalulate(correctArray);
        
        const replayDscore = DscoreFunc(setArrayElementCorrect, setArrayElementWorng, correctAvg, correctStd)
        
        // console.log("dScoreMethod: ", replayDscore ,"\n")

        try{

            await userDscore.create({
                firstname:firstname,
                lastname:lastname,
                phonenum:phonenum,
                gender:gender,
                birthday:birthday,
                personalities:personalities,
                dscore_method3:replayDscore.D1,
                dscore_method4:replayDscore.D2,
                dscore_method5:replayDscore.D3,
                dscore_method6:replayDscore.D4,
                result:iatReply
            });

            res.send(replayDscore);

        }catch(err){
            console.log("err in api analysis: "+ err);
            res.sendStatus(500);
        }
    }catch(err){
        console.log("err in api analysis: "+ err);
        res.sendStatus(500);
    }

});

app.get("/backend_iat/dashboard", async (req, res) => {
    let arrayUserData = [];

    try{
        const userData = await userDscore.find({});
        // console.log("userData ==> ",userData[0].result)
        

        userData.forEach((arrayResult) => {
            arrayResult.result.forEach((element) => {
                const setData = {
                    firstname: arrayResult.firstname,
                    lastname: arrayResult.lastname,
                    gender: arrayResult.gender,
                    personalities: arrayResult.personalities,
                    dscore_method3: arrayResult.dscore_method3,
                    dscore_method4: arrayResult.dscore_method4,
                    dscore_method5: arrayResult.dscore_method5,
                    dscore_method6: arrayResult.dscore_method6,
                    blockType: element.typeCal,
                    runnerName: element.runnerName, 
                    contentLeft: element.contentLeft,
                    contentRight: element.contentRight,
                    wordShow: element.wordShow,
                    userSelect: element.userSelect, 
                    isCorrect: element.isCorrect,
                    milliseconds: element.milliseconds
                }

                arrayUserData.push(setData);
            })
        })

        const arrayData = {
            listData: arrayUserData
        }
    
        res.send(arrayData);

    }catch(err){
        console.log(`Error in api backend_iat/dashboard: ${err}`);
        res.sendStatus(500);
    }

    

});

app.post("/backend_iat/download", async (req, res) => {
    const {typeFile} = req.body;

    let arrayUserData = [];

    try{
        const userData = await userDscore.find({});
        // console.log("userData ==> ",userData[0].result)

        userData.forEach((arrayResult) => {
            arrayResult.result.forEach((element) => {
                const setData = {
                    firstname: arrayResult.firstname,
                    lastname: arrayResult.lastname,
                    gender: arrayResult.gender,
                    personalities: arrayResult.personalities,
                    dscore_method3: arrayResult.dscore_method3,
                    dscore_method4: arrayResult.dscore_method4,
                    dscore_method5: arrayResult.dscore_method5,
                    dscore_method6: arrayResult.dscore_method6,
                    blockType: element.typeCal,
                    runnerName: element.runnerName, 
                    contentLeft: element.contentLeft,
                    contentRight: element.contentRight,
                    wordShow: element.wordShow,
                    userSelect: element.userSelect, 
                    isCorrect: element.isCorrect,
                    milliseconds: element.milliseconds
                }

                arrayUserData.push(setData);
            })
        })

    }catch(err){
        console.log(`Error in api backend_iat/dashboard: ${err}`);
        res.sendStatus(500);
    }

    if(typeFile === "json"){
        const arrayData = {
            listData: arrayUserData
        }
        res.send(arrayData)
    }else if(typeFile === "excel"){
        // console.log("jsonDatav", jsonData)
        const workSheet = XLSX.utils.json_to_sheet(arrayUserData);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, "Sheet 1");
        XLSX.writeFile(workBook, "./result/emotion.xlsx");
        const file = `${__dirname}/result/emotion.xlsx`;
        console.log("backend action", file)
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader("Content-Disposition", 'attachment; filename=emotion.xlsx');
        res.download(file, "emotion.xlsx", (err) => {
            if(err){
                console.log("download error:", err)
            }else{
                console.log("download!")
            }
        });
    }else if(typeFile === "csv"){
        const csvString = json2csv(arrayUserData);
        // console.log(csvString);
        res.setHeader('Content-disposition', 'attachment; filename=shifts-report.csv');
        res.set('Content-Type', 'text/csv');
        res.status(200).send(csvString);
    }
    
});

// show image upload //
app.get('/backend_iat/imgshow', (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('imagesPage', { items: items });
        }
    });
});

// upload image api // 


app.listen(port, () => {
    console.log(`app running on port: ${port} ==> http://localhost:${port}`)
})