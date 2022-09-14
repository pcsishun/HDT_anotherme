<template>
  <div class="dashboard-container" >
    <div class="title-dashboard">
        หน้าจอสรุปผลข้อมูล: {{isUseDatabase}}
    </div>
    <div class="all-user">
        <div :class="cssFilter">
            
            <div class="set-filter-contianer" v-if="cssFilter === 'set-filter'">
                <div class="close-btn" @click="haddleFitlerMenu">X</div>
                <div class="find-with-name" >
                    <label>user email</label>
                    <input v-model="fWriteUsername"/>
                </div>
                <div class="find-with-drop-down">
                    <label>user email</label>
                    <select v-model="fEmail" >
                        <!-- <option>All</option> -->
                        <option v-for="(data, index) in arrayEmail"  :key="index">{{data}}</option>
                    </select>
                </div>
                <div class="gender-selection">
                    <label>Gender</label>
                    <select v-model="fGender">
                        <option>All</option>
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                </div>
                <div class="objective-selection">
                    <label>objective</label>
                    <select v-model="fObjective" >
                        <!-- <option>All</option> -->
                        <option v-for="(data, index) in arrayObjective"  :key="index"> {{data}}</option>
                    </select>
                </div>
                <div class="sentence-selection">
                    <label>Sentence</label>
                    <select v-model="fSentence"  >
                        <option v-for="(data, index) in arraySentence"  :key="index">{{data}}</option>
                    </select>
                </div>
                <div class="face-selection">
                    <label>Sentence</label>
                    <select v-model="fFaceResult"  >
                        <option v-for="(data, index) in arrayFaceResult"  :key="index">{{data}}</option>
                    </select>
                </div>
                <div class="set-btn-find">
                    <button class="btn-search">Search</button>
                </div>
            </div>
        </div>
        <div class="warping-config-container">
            <div class="change-module">
                <span>Change Database</span>
                <select v-model="selectionDatabase">
                    <option>Emotion</option>
                    <option>IAT</option>
                </select>
                <button class="btn-change-database" @click="haddleChangeDatabase">Submit</button>
            </div>
            
        </div>
        <div class="config-filter" @click="haddleFitlerMenu">
                Filter
        </div>
       
        <div class="counting-page">
                Page {{isStayInPage}}/ {{isNumOfPage}}
            </div>

        <div class="dashboard-container" v-if="isUseDatabase === 'Emotion'">
            <div class="setting-table">
                <table>
                    <tr>
                        <th>email</th>
                        <th>username</th>
                        <th>phone</th>
                        <th>Gender</th>
                        <th>marital status</th>
                        <th>occupation</th>
                        <th>interest</th>
                        <th>objective</th>
                        <th>sentence</th>
                        <th>question</th>
                        <th>face result</th>
                        <th>sentiment score</th>
                        <th>answer</th>
                    </tr>
                    <tr v-for="(data, index) in userData" :key="index" >
                        <td v-if="index < indexEnd && index >= indexStart">{{data.email}}</td>
                        <td v-if="index < indexEnd && index >= indexStart">{{data.username}}</td>
                        <td v-if="index < indexEnd && index >= indexStart">{{data.phone}}</td>
                        <td v-if="index < indexEnd && index >= indexStart">{{data.sex}}</td>
                        <td v-if="index < indexEnd && index >= indexStart">{{data.marital_status}}</td>
                        <td v-if="index < indexEnd && index >= indexStart">{{data.occupation}}</td>
                        <td v-if="index < indexEnd && index >= indexStart">{{data.interest}}</td>
                        <td v-if="index < indexEnd && index >= indexStart">{{data.objective}}</td>
                        <td v-if="index < indexEnd && index >= indexStart">{{data.sentence}}</td>
                        <td v-if="index < indexEnd && index >= indexStart">{{data.question}}</td>
                        <td v-if="index < indexEnd && index >= indexStart">{{data.face_result}}</td>
                        <td v-if="index < indexEnd && index >= indexStart">{{data.sentiment_score}}</td>
                        <td v-if="index < indexEnd && index >= indexStart">{{data.answer}}</td>
                    </tr>
                </table>
                
            </div>
            <div class="setting-btn-change-table">
                    <button class="btn-pre" @click="haddlePervioseTalbe">Previous</button>
                    <span>Page {{isStayInPage}}/ {{isNumOfPage}}</span>
                    <button class="btn-next" @click="haddleNextTable">Next</button>
                </div>
            <div class="set-download-area">
                <select class="type-file" name="type-file" id="type-file" v-model="selectionFile">
                    <option>csv</option>
                    <option>json</option>
                    <!-- <option>excel</option> -->
                </select>
                <button class="btn-download" @click="haddleDownload('Emotion')">Download</button>
            </div>
        </div>


        <div class="dashboard-container" v-if="isUseDatabase === 'IAT'">
            <div class="setting-table">
                <table>
                    <tr>
                        <th>firstname</th>
                        <th>lastname</th>
                        <th>gender</th>
                        <th>personalities</th>
                        <th>dscore D3</th>
                        <th>dscore D4</th>
                        <th>dscore D5</th>
                        <th>dscore D6</th>
                        <th>blockType</th>
                        <th>runner name</th>
                        <th>selection</th>
                        <th>word show</th>
                        <th>content left</th>
                        <th>content right</th>
                        <th>correct status</th>
                        <th>milliseconds</th>
                    </tr>
                    <tr v-for="(data, index) in userIatData" :key="index" >
                        <td v-if="index < indexEnd && index >= indexStart">{{data.firstname}}</td>
                        <td v-if="index < indexEnd && index >= indexStart">{{data.lastname}}</td>
                        <td v-if="index < indexEnd && index >= indexStart">{{data.gender}}</td>
                        <td v-if="index < indexEnd && index >= indexStart">{{data.personalities}}</td>
                        <td v-if="index < indexEnd && index >= indexStart">{{data.dscore_method3}}</td>
                        <td v-if="index < indexEnd && index >= indexStart">{{data.dscore_method4}}</td>
                        <td v-if="index < indexEnd && index >= indexStart">{{data.dscore_method5}}</td>
                        <td v-if="index < indexEnd && index >= indexStart">{{data.dscore_method6}}</td>
                        <td v-if="index < indexEnd && index >= indexStart">{{data.blockType}}</td>
                        <td v-if="index < indexEnd && index >= indexStart">{{data.runnerName}}</td>
                        <td v-if="index < indexEnd && index >= indexStart">{{data.userSelect}}</td>
                        <td v-if="index < indexEnd && index >= indexStart">{{data.wordShow}}</td>
                        <td v-if="index < indexEnd && index >= indexStart">{{data.contentLeft}}</td>
                        <td v-if="index < indexEnd && index >= indexStart">{{data.contentRight}}</td>
                        <td v-if="index < indexEnd && index >= indexStart">{{data.isCorrect?'Correct':'Wrong'}}</td>
                        <td v-if="index < indexEnd && index >= indexStart">{{data.milliseconds}}</td>
                    </tr>
                </table>
                
            </div>
            <div class="setting-btn-change-table">
                    <button class="btn-pre" @click="haddlePervioseTalbe">Previous</button>
                    <span>Page {{isStayInPage}}/ {{isNumOfPage}}</span>
                    <button class="btn-next" @click="haddleNextTable">Next</button>
                </div>
            <div class="set-download-area">
                <select class="type-file" name="type-file" id="type-file" v-model="selectionFile">
                    <option>csv</option>
                    <option>json</option>
                    <!-- <option>excel</option> -->
                </select>
                <button class="btn-download" @click="haddleDownload('IAT')">Download</button>
            </div>
        </div>
        
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {httpAPIEmotion, httpApiIat} from '../apiSetting';

const sendAPI = httpAPIEmotion();
const sendAPIEmo = httpApiIat();


export default {
    data(){
        return{
            selectionDatabase: "Emotion",
            isUseDatabase:"Emotion",
            selectionFile:"csv",
            userData:"",
            userIatData:"",

            filteruserData:"",
            countOfRow:0,
            indexStart:0,
            indexEnd: 20,
            
            isNumOfPage:0,
            isStayInPage:1,
            maxRows:20,
            
            arrayEmail:[],
            arrayObjective:[],
            arraySentence:[],
            arrayFaceResult:[],

            cssFilter: "set-filter-close",
            fWriteUsername:"",
            fEmail:"All",
            fGender:"All",
            fUsername:"All",
            fObjective:"All",
            fSentence:"All",
            fFaceResult:"All",
            fIsAnswer:"All"

        }
    },
    methods:{

        // async haddleSelectionDatabase(){
        //     if(this.SelectionDatabase === "Emotion"){
        //         this.haddleShowData();
        //     }else{
        //         console.log("IAT")
        //     }
        // },

        haddleFitlerMenu(){
            if(this.cssFilter === "set-filter"){
                this.cssFilter = "set-filter-close"
            }else{
                this.cssFilter = "set-filter"
            }
        },
        haddleNextTable(){
            if(this.isStayInPage !== this.isNumOfPage){
                this.isStayInPage += 1;
                this.indexStart += this.maxRows;
                this.indexEnd += this.maxRows;
            }
        },

        haddlePervioseTalbe(){
            if(this.isStayInPage !== 1){
                this.isStayInPage -= 1;
                this.indexStart -= this.maxRows;
                this.indexEnd -= this.maxRows;
            }
        },

        async haddleShowData(){
            // console.log("Hi")
            const headerConf = {
                headers:{
                    'access-token': this.$cookies.get("admin_anotherme")
                }
            }

            const payload = {
                typeFile: "json",
            }

            try{
                const dataAllUser = await axios.post(`${sendAPI}/download`, payload, headerConf);
                this.userData = dataAllUser.data.listData;
                this.countOfRow = dataAllUser.data.listData.length;

                const setPages = dataAllUser.data.listData.length / this.maxRows;
                this.isNumOfPage = parseInt(setPages) + 1; 

                this.arrayEmail.push("All")
                this.arrayObjective.push("All")
                this.arraySentence.push("All")
                this.arrayFaceResult.push("All")

                this.userData.forEach((element) => {
                    if(!(this.arrayEmail.some(item => item === element.email))){
                        this.arrayEmail.push(element.email)
                    }

                    if(!(this.arrayObjective.some(item => item === element.objective))){
                        this.arrayObjective.push(element.objective)
                    }

                    if(!(this.arraySentence.some(item => item === element.sentence))){
                        this.arraySentence.push(element.sentence)
                    }

                    if(!(this.arrayFaceResult.some(item => item === element.face_result))){
                        this.arrayFaceResult.push(element.face_result)
                    }
                })

                //  console.log(this.arrayEmail)
                //  console.log(this.arrayObjective)
                //  console.log(this.arraySentence)
                //  console.log(this.arrayFaceResult)

                // console.log(this.countOfRow )

            }catch(err){
                console.log(err)
                this.$cookies.remove("admin_anotherme");
                alert("user alreadly expired please login again");
                this.$router.push("./login");
            }


        },

        async haddleDownload(evt){
            
            const headerConf = {
                headers:{
                    'access-token': this.$cookies.get("admin_anotherme")
                }
            }

            const payload = {
                typeFile: this.selectionFile,
                // typeFile:  "csv"
            }

            if(evt === "Emotion"){
                try{

                    const emotionData = await axios.post(`${sendAPI}/download`,payload,headerConf );

                    if(emotionData.status === 500){
                        this.$cookies.remove("admin_anotherme");
                        alert("user alreadly expired please login again");
                        this.$router.push("./login")
                    }else{
                        if(this.selectionFile === "csv"){
                            // console.log(emotionData.data)
                            const anchor = document.createElement('a');
                            anchor.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(emotionData.data);
                            anchor.target = '_blank';
                            anchor.download = 'emotionFile.csv';
                            anchor.click();
                        }else if(this.selectionFile === "json"){
                            // console.log("json: ",emotionData)
                            this.$store.state.setJson = emotionData.data.listData
                            this.$router.push("./json")
                        }

                    }

                }catch(err){
                    this.$cookies.remove("admin_anotherme");
                    alert("user alreadly expired please login again");
                    this.$router.push("./login");
                }

            }else if(evt === "IAT"){
                try{

                    const IATData = await axios.post(`${sendAPIEmo}/download`,payload,headerConf );
                    // console.log("before download: ",IATData.data.listData)

                    if(IATData.status === 500){
                        this.$cookies.remove("admin_anotherme");
                        alert("user alreadly expired please login again");
                        this.$router.push("./login")
                    }else{
                        if(this.selectionFile === "csv"){
                            // console.log("array ===> ",IATData.data)
                            const anchor = document.createElement('a');
                            anchor.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(IATData.data);
                            anchor.target = '_blank';
                            anchor.download = 'iatFile.csv';
                            anchor.click();
                        }else if(this.selectionFile === "json"){
                            // console.log("json: ",IATData)
                            this.$store.state.setJson = IATData.data.listData
                            this.$router.push("./json")
                        }

                    }

                }catch(err){
                    console.log(err)
                    this.$cookies.remove("admin_anotherme");
                    alert("user alreadly expired please login again");
                    this.$router.push("./login");
                }
            }

            
        },

        async haddleShowDataIAT(){

            try{
                const showDataIAT = await axios.get(`${sendAPIEmo}/dashboard`);
                console.log(showDataIAT.data.listData)
                this.userIatData = showDataIAT.data.listData;
                this.countOfRow = showDataIAT.data.listData.length;

                const setPages = showDataIAT.data.listData.length / this.maxRows;
                this.isNumOfPage = parseInt(setPages) + 1;
            }catch(err){
                console.log(`error in function haddleShowDataIAT: ${err}`);
            }
            
        },

        async haddleChangeDatabase(){
            if(this.selectionDatabase === "Emotion"){
                this.isUseDatabase = "Emotion";
                this.haddleShowData();
            }else{
                this.isUseDatabase = "IAT";
                console.log(this.isUseDatabase)
                this.haddleShowDataIAT();

            }
        }
    },
    mounted(){
        const tokenset = this.$cookies.get("admin_anotherme")
        if(!tokenset){
            this.$cookies.remove("admin_anotherme")
            this.$router.push("/login")
        }else{
            this.haddleShowData();
        }
        
        // if(this.SelectionDatabase === "Emotion"){
        //     this.haddleShowData();
        // }else{
        //     console.log(this.SelectionDatabase)
        // }
    },
    updated(){
    }
}
</script>

<style scoped> 
 
    .dashboard-container{
        width: 90%;
        height: 100%;
        margin: auto;
        margin-top: 30px;
        border: 1px solid grey;
        border-radius: 10px;
    }

    .title-dashboard{
        font-size: 18px;
        margin-top: 10px;
        font-weight: bold;
        text-align: center;
    }

    .change-module{
        margin-left: 50px
    }

    .btn-change-database{
        margin-left: 10px;
        height: 30px;
        width: 80px;
        border: 1px solid rgb(65, 128, 255);
        background: rgb(65, 128, 255);
        color: white;
        border-radius: 10px;
        
    }

    .warping-config-container{
        display:flex;
        justify-content: start;
        margin-top: 20px;
    }

    .config-filter{
        margin-left: 50px;
        margin-top: 20px;
        background: grey;
        width: 100px;
        height: 30px;
        color: white;
        font-weight: bold;
        padding-top: 10px;
        border-radius: 10px;
        text-align: center;
    }

    .set-filter-close{
        background: white;
        border-radius: 10px;
        height: 0vh;
        z-index: 999;
        top: 0;
        left: 0;
        text-align: center;
        margin: auto;
        translate: 0.5s;
    }

    .set-filter{
        position: fixed;
        background: white;
        border: 1px solid gray;
        border-radius: 10px;
        height: 50vh;
        z-index: 999;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50%;
        margin: auto;
        translate: 0.5s;
    }

    .set-filter-contianer{
        margin-left: 20px;
    }
    .set-filter-contianer > div{
        margin-top: 10px;
    }

    label{
        margin-right: 30px;
        font-size: 20px;
    }

    select, input{
        height: 30px;
        width: 200px;
        margin-left: 20px;
    }

    .set-btn-find{
        text-align: center;
        margin: auto;
        margin-top: 10px;
    }

    .btn-search{
        border: 1px solid grey;
        background: grey;
        color: white;
        font-size: 15px;
        height: 30px;
        width: 100px;
        border-radius: 10px;
    }

    .close-btn{
        text-align: right;
        margin-right: 10px;
        margin-top: 5px;
        font-size: 24px;
        font-weight: bold;
    }

    .set-download-area{
        text-align: center;
        margin: auto;
        margin-bottom: 10px;
        margin-top: 30px
    }

    .type-file{
        margin-right:10px;
    }

    .btn-download{
        background: rgb(1, 165, 224);
        color: white;
        border: 1px solid rgb(1, 165, 224);
        height: 30px;
        width: 100px;
        border-radius: 10px;
    }

    .type-file{
        height: 30px;
        width: 60px;
        border-radius: 10px;
    }

    .setting-table{
        width: 95%;
        margin:auto;
        margin-top: 30px;
        height: 70vh;
        overflow-y: scroll;
        border: 1px solid rgb(164, 164, 164);
        border-radius: 10px;
    }

    

    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
        
    }
    th{
        text-align: center;
        border: 1px solid #dddddd;
    }

    td {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }

    tr:nth-child(even) {
        background-color: #dddddd;
    }
    .counting-page{
        text-align: right;
        font-size: 20px;
        font-weight: bold;
        margin-right: 10px;
        margin-bottom: 5px;
    }

    .setting-btn-change-table{
        margin: auto;
        text-align: center;
    }

    .setting-btn-change-table > button{
        margin-left: 5px;
        margin-right: 5px;
        width: 100px;
        border: 1px solid grey;
        background: gray;
        color: white;
        border-radius: 10px;
        height: 30px;
        margin-top: 20px;
    }
    
</style>