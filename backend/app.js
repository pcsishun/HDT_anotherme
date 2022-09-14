const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const db = require("./connection/connection");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const XLSX = require("xlsx");
const fs = require('fs');
const json2csv = require('json2csv').parse;
// middleware // 
const auth = require("./middleware/auth");

// import collecion // 
const adminProfile = require("./model/adminProfile");
const userProfile = require("./model/userProfile");
const emotion = require("./model/emotion");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

db.connect()

////////////////// Test Debug //////////////////////////////
app.get("/backend", async (req, res) => {
    res.end("OK")
})

////////////////// admin login //////////////////////////////
app.post("/backend/adminregister", async (req, res) => {
    const {username, password} = req.body;
    const hashRound = process.env.ENROUND;
    const convertInt = parseInt(hashRound)
    try{
        const hashPassword = bcrypt.hashSync(password, convertInt);
        const isUser = await adminProfile.findOne({username}); 

        if(isUser){
            const replyMsg = {
                text: "this username alreadly register."
            }
            res.send(replyMsg);
        }else{
            await adminProfile.create({
                username: username,
                password: hashPassword,
            });

            res.sendStatus(200);
        }
    }catch(err){
        console.log(`error in api adminregister: ${err}`);

        res.sendStatus(500);
    }
})

app.post("/backend/adminlogin", async (req, res) => {
    const {username, password} = req.body;

    try{
        const isUser = await adminProfile.findOne({username}); 
        if(isUser && (await bcrypt.compare(password, isUser.password))){
            const genToken = jwt.sign(
                {user_id: isUser._id},
                process.env.TOKEN_KEY,
                {expiresIn: "1h"}
            )
            const replyText = {
                token: genToken
            }
            res.send(replyText);
        }else{
            res.sendStatus(401)
        }
    }catch(err){
        console.log(`error in api adminlogin: ${err}`);
        res.sendStatus(500)
    }
    
})
////////////////// admin dashboard ////////////////////////////// 
app.post("/backend/download", auth, async (req, res) => {
    const {typeFile} = req.body;

    let jsonData = [];
    
    try{
        const allUser = await userProfile.find();
        const personalEmotion = await emotion.find();

        allUser.forEach(element => {

            const isEmail = element.contact.email;

            personalEmotion.forEach(items => {
                if(items.email === isEmail){
                    const settingData = {
                        email: isEmail,
                        username: element.contact.username,
                        phone: element.contact.mobile,
                        sex: element.info.sex,
                        marital_status: element.info.maritalStatus,
                        occupation: element.info.occupation,
                        interest: element.info.interest,
                        objective: items.metadata.objective,
                        sentence: items.metadata.sentence,
                        question: items.metadata.question,
                        face_result: items.result.faceResult,
                        sentiment_score: items.result.voiceResult,
                        answer: items.result.answer,
                    }

                    jsonData.push(settingData)
                }
            })
        });

    }catch(err){
        console.log(`error in api download: ${err}`);
        res.sendStatus(500);
    }

    if(typeFile === "json"){
        const arrayData = {
            listData: jsonData
        }
        res.send(arrayData)
    }else if(typeFile === "excel"){
        // console.log("jsonDatav", jsonData)
        const workSheet = XLSX.utils.json_to_sheet(jsonData);
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
        const csvString = json2csv(jsonData);
        // console.log(csvString);
        res.setHeader('Content-disposition', 'attachment; filename=shifts-report.csv');
        res.set('Content-Type', 'text/csv');
        res.status(200).send(csvString);
    }
})

////////////////// fetch data admin //////////////////////////////
app.get("/backend/alluser", auth, async (req, res) => {
    try{
        const allUser = await userProfile.find();
        res.send(allUser)
    }catch(err){
        console.log(`error in api alluser: ${err}`)
        res.sendStatus(500)
    }
});


app.post("/backend/dashboard", auth,async (req, res) => {
    const {email} = req.body;
    try{
        const personalEmotion = await emotion.find().where("email").in(email);
        res.send(personalEmotion)
    }catch(err){
        console.log(`error in api dashboard: ${err}`)
        res.sendStatus(500)
    }
});

////////////////// User Register API //////////////////////////////
app.post("/backend/register", async (req, res) => {
    const payload = req.body;
    // console.log(payload)
   
    // console.log(payload.contact.email);

    try {
        userAvailable = await userProfile.findOne(
            { "contact.email": payload.contact.email }
        );
        if (userAvailable) {
            const warpText = {
                isError: true,
                text: "Profile already create"
            }
            res.send(warpText)
            // res.sendStatus(200);
            // console.log("Profile already create");
        } else {
            await userProfile.create(payload);
            const warpText = {
                isError: false,
                text: "Register success!"
            }
            res.send(warpText);
            // res.sendStatus(200);
            // console.log("register Profile OK");

        };
    } catch (err) {
        console.log(err)
        res.sendStatus(503)
    };
})

////////////////// User Login API //////////////////////////////
app.post("/backend/login", async (req, res) => {
    const payload = req.body;
    // console.log("login payload ==> ",payload.email);
    const userProfile = require("./model/userProfile");

    try {
        userAvailable = await userProfile.findOne(
            { "contact.email": payload.email }
        );

        // console.log("userAvailable ===> ",userAvailable)

        if (userAvailable) {
            const replyData = {
                isError: false,
                email: userAvailable.contact.email,
                isFirstTime: userAvailable.isFirstTime
            }
            res.send(replyData);
        } else {
            const replyData = {
                isError: true,
                text: "Not found this email.",
            }

            res.send(replyData);
        };
    } catch (err) {
        res.sendStatus(503);
    };
})

app.post("/backend/writeEmotion", async (req, res) => {

    
    /*
    {
        "email": "natt@gmail.com",
        "objective": "test",
        "sentence": "1",
        "question": "wtf"
        "facial": ["sad", "sad", "sad"],
        "answer": "Hello Motherfucker"
    }
    */

    const payload = req.body;
    // console.log("payload ===> ",payload)

    try {
        const processSentiment = require("./modules/processSentiment")
        const countMax = require("./modules/countMax")

        const sentimentScore = await processSentiment(payload.answer)
        const maxFace = await countMax(payload.facial)

        // console.log(sentimentScore)
        // console.log(maxFace)

    
        await emotion.create({
                email: payload.email,
                metadata: {
                    objective: payload.objective,
                    sentence: payload.sentence,
                    question: payload.question
                },
                result: {
                    faceResult: maxFace,
                    voiceResult: sentimentScore,
                    answer: payload.answer
                    // topWord: [ String ]
                }
        
            })
        res.send({status:"OK", sentimentScore: sentimentScore})
    } catch (err) {
        console.log(err);
        res.send(err);
    };
});

//  fetech all data to dashboard // 


module.exports = app;