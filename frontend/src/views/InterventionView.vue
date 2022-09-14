<script>
import StarterDesc from '../components/StarterDesc.vue';
import Dialogue1and2 from '../components/dialogue/object1/Dialogue1and2.vue';
import Dialogue3 from '../components/dialogue/object2/Dialogue3.vue';
import Dialogue4 from '../components/dialogue/object3/Dialogue4.vue';
import EndDialogue from '../components/EndDialogue.vue';
import axios  from 'axios';
import VoiceAnimation from '../components/VoiceAnimation.vue'
import { httpAPI } from '../APIsetting';

const httpAPIs = httpAPI();
console.log(httpAPIs);

const builder = CY.loader()
    .licenseKey("dad9b5df5ffd65750e82018b4286e6ce96c1d0dfd868")
    .addModule(CY.modules().FACE_EMOTION.name)
    .load()

window.SpeechRecognition = window.SpeechRecognition ||  window.webkitSpeechRecognition;
const recognition = new window.SpeechRecognition();

recognition.interimResults = true;
recognition.continuous = true;
// recognition.lang = 'th-TH'; 
// th-TH
    export default {
        components:{
            StarterDesc,
            Dialogue1and2,
            Dialogue3,
            Dialogue4,
            EndDialogue,
            VoiceAnimation
        },
        data(){
            return{
                isCamera: false,
                isActionBtn: false,
                transcript: '',
                isRecording: false,
                runtimeTranscription_: "",
                isRecord: false,
                isStarter: true,
                isShowReset: false,
                setArrayMood: [],   
                arrayMood: [],
                isWord: [],
                isObject: [],
                isSentimentScore: [],
                myEmail:"",

                isError:"",
                isLoading:false,
                
                selectLang: 'th-TH',
                micOffText: "",

                cssCamera: "not-detect",
            }
        },
        methods:{
            
            testing(){
                this.$store.state.userAction.sentenceIndex = 0;
                // console.log(this.$store.state.storeUserArray);
                this.$store.state.userAction.dialogueNow = "end";
            },

            checkUserIn(){
                
                try{
                    const stringJson = localStorage.getItem("nexter_living_user");
                    const convertStingJson = JSON.parse(stringJson);

                    const isEmail = convertStingJson.email;
                    this.myEmail = isEmail

                    if(!isEmail){
                        this.$router.push("/login")
                    }

                }catch(err){
                    this.$router.push("/login")
                }
                
            },

            async cameraAction(){
                if(!(this.isActionBtn)){

                    this.isStarter = false
                    this.isCamera = true;
                    this.isActionBtn = true;
                    this.isShowReset = true;
                    this.$store.state.userAction.isStartRec = true;
                    this.recordFunction();

                }else{

                    this.isCamera = false;
                    this.isActionBtn = false;
                    this.isShowReset = false;
                    this.$store.state.userAction.isStartRec = false;
                    this.$store.state.userAction.sentenceIndex += 1;

                    this.arrayMood.push(this.setArrayMood);
                    
                    const warpingPayload = {
                        email: this.myEmail,
                        objective: this.$store.state.userAction.dialogueNow,
                        sentence: this.$store.state.userAction.setSentence,
                        question: this.$store.state.userAction.setQuestion,
                        facial: this.setArrayMood,
                        answer: this.runtimeTranscription_
                    }

                    this.isLoading = true;

                    try{

                        const responseReturn = await axios.post(`${httpAPIs}/writeEmotion`,warpingPayload);

                        if(responseReturn.data.status !== "OK"){
                            this.isError = "Cannot connect to server!";
                            this.isLoading = false;
                        }else{
                            this.sentimentScore = responseReturn.data.sentimentScore
                            this.isLoading = false;
                        }

                    }catch(err){
                        console.log(err);
                        this.isError = "Cannot connect to server!";
                        this.isLoading = false;
                    }                   
                    this.isObject.push(this.$store.state.userAction.dialogueNow);
                    this.isSentimentScore.push(this.sentimentScore) 

                    const wraping = {
                        objective:  this.isObject,
                        arrayMood: this.arrayMood,
                        word: this.isWord,
                        sentimentScore: this.isSentimentScore
                    }                    

                    this.$store.state.storeUserArray = wraping;
                    this.setArrayMood = []

                    this.recordFunction();
                }
            },

            recordFunction(){
                
                builder.then(({start, stop}) => {
                    if(this.isCamera){
                        start();
                        // setTimeout(() => {
                        //     stop();
                        // }, 30000)
                    }else{
                        // clearTimeout(settingTime)
                        stop();
                    }
                });

                window.addEventListener(CY.modules().FACE_EMOTION.eventName, (evt) => {
                    if(evt.detail.output.dominantEmotion !== undefined){   
                        // this.cssCamera = "is-detect";   
                        this.setArrayMood.push(evt.detail.output.dominantEmotion);
                    }else{
                        // console.log("passing");
                        // this.cssCamera = "not-detect";
                    }
                });
                

                recognition.lang = this.selectLang;    // << control lang 
                if(this.isRecord === true){
                    
                    this.isWord.push(this.runtimeTranscription_);

                    // console.log("this.isRecord true ==> ",this.isRecord);
                    recognition.stop();
                    this.runtimeTranscription_ = "";
                    this.isRecord = false;

                    recognition.addEventListener("end", () => {
                        this.runtimeTranscription_ = "";
                        recognition.stop();
                        this.isRecord = false;

                        
                    });

                }else{
                    // event current voice reco word
                    recognition.addEventListener("result", event => {      
                    var text = Array.from(event.results)
                        .map(result => result[0])
                        .map(result => result.transcript)
                        .join("");
                        // console.log("text ===> ",text)
                        this.runtimeTranscription_ = text;
                        // this.runtimeTranscription_ = this.runtimeTranscription_ + text;
                    });
                        recognition.start();
                        this.isRecord = true;
                }
            },  

            haddleToHomePage(){
                this.isStarter = true;
                this.$store.state.userAction.dialogueNow = "Dialogue1and2";
                this.$router.go();
            },

            haddleReset(){
                this.runtimeTranscription_ = "";
                this.isWord = [];
                this.arrayMood = [];
                this.setArrayMood = [];
                alert("Reset!")
            },

            haddleSwitch(switchs){
                if(switchs === 0){
                    this.$store.state.isChangePages = 0
                }else if(switchs === 1){
                    this.$store.state.isChangePages = 1
                }else if(switchs === 2){
                    this.$store.state.isChangePages = 2
                }
            },

            haddleLangChange(){
                console.log("before click ==> ",this.selectLang)
                if(this.selectLang === 'th-TH'){
                    this.selectLang = 'en-US'
                    // console.log("after click ==> ",this.selectLang)
                }else{
                    this.selectLang = 'th-TH'
                    // console.log("after click ==> ",this.selectLang)
                }
            },

            haddleMicOff(){
                this.micOffText = "กรุณาปรับกล้องให้ตรงกับใบหน้าของท่านด้วยค่ะ"
            }
        },
        created(){
            this.checkUserIn();
            
        },
        
        updated(){
            window.addEventListener(CY.modules().FACE_EMOTION.eventName, (evt) => {
                
                    if(evt.detail.output.dominantEmotion !== undefined){      
                        this.cssCamera = "is-detect";
                    }else{
                        this.cssCamera = "not-detect";
                    }
                });
        }
    }
</script>

<template>
    <div>
        <div class="home-component">
            
            <div class="warping-loading-container"  v-if="isLoading">
                <div class="is-loading"></div>
                <div class="loading-content"><span class="loader"></span></div>
            </div>

            <div class="page-title">
                <h1>AnotherMe</h1>
            </div>

            <div class="main-frame" v-if="isError === ''">

                    <div :class="cssCamera">
                        <!-- <div >
                            <i class='fas fa-eye-slash' style='font-size:36px; color: red;' v-if="cssCamera === 'not-detect'"></i>
                            <i class='fas fa-eye' style='font-size:36px; color:green' v-if="cssCamera === 'is-detect'"></i>
                        </div> -->
                    </div>

                    <div class="is-mic-text" v-if="micOffText !== ''">
                        {{micOffText}}
                    </div>

                    <StarterDesc v-if="isStarter"/>
                    <Dialogue1and2 v-if="this.$store.state.userAction.dialogueNow === 'Dialogue1and2'"/>
                    <Dialogue3 v-if="this.$store.state.userAction.dialogueNow  === 'Dialogue3'"/>
                    <Dialogue4 v-if="this.$store.state.userAction.dialogueNow  === 'Dialogue4'"/>
                    <EndDialogue  v-if="this.$store.state.userAction.dialogueNow  === 'end'"/>
                    
                    <div class="user-text-in">
                        {{runtimeTranscription_}}
                    </div>

                    <div class="set-animation" v-if="this.$store.state.userAction.isStartRec === true">
                        <VoiceAnimation/>
                    </div>

                    <div class="voice-btn">
                        <div class="set-btn-line" v-if="this.$store.state.userAction.dialogueNow !== 'end'">

                            <div v-if="isShowReset">
                                <button class="mic" @click="haddleReset">Recover</button>
                            </div>

                            <div  v-if="!(isActionBtn)" @click="ToggleMic">
                                <button 
                                class="mic" 
                                @click="cameraAction"
                                >
                                Record
                                </button>
                            </div>
                            
                            <div v-if="(isActionBtn)" @click="ToggleMic"> 
                                <button 
                                class="mic" 
                                @click="cameraAction"
                                v-if="setArrayMood.length > 0"
                                >
                                Next
                                </button>

                                <button 
                                class="mic-off" 
                                @click="haddleMicOff"
                                v-if="setArrayMood.length === 0"
                                >
                                Next
                                </button>
                                
                            </div>
                            

                        </div>
                        <div class="btn-switch-result" v-if="this.$store.state.userAction.dialogueNow === 'end'">
                            <button class="btn-switch" @click="haddleSwitch(0)"></button>
                            <button class="btn-switch" @click="haddleSwitch(1)"></button>
                            <button class="btn-switch" @click="haddleSwitch(2)"></button>
                        </div>

                        <div class="finish-dialogue" v-if="this.$store.state.userAction.dialogueNow === 'end'">
                            <button class="ending-container" @click="haddleToHomePage" >End</button>
                        </div>  
                        <div class="pad-main-frame"></div>       
                    </div>
            </div>
            <div class="control-panel-container">
                <div class="control-main-frame">
                    <div class="analyzing-btn">

                        <div class="icon-set">
                            <i class='fas fa-chart-pie' style='font-size:36px'></i>
                        </div>

                        <button class="analyzing" @click="testing">Analyzing</button>
                    </div>
                    
                    <div class="toggle-lang">
                        <div class="icon-set-mic">
                            <i class='fas fa-microphone' style='font-size:36px'></i>
                        </div>
                        <label for="toggle-1" class="toggle-1">
                            <input type="checkbox" name="toggle-1" id="toggle-1" class="toggle-1__input" @click="haddleLangChange">
                            <span class="toggle-1__button"></span> 
                        </label>
                        
                    </div>
                </div>
            </div>

            <div class="main-frame" v-if="isError !==''">
                <div>Cannot connect to server!</div>
            </div>
        </div>

    </div>
</template>

<style scoed>
/* 
.set-detection{
    margin: auto;
    text-align: center;
    margin-top: 30px;
} */


.not-detect{
    margin: auto;
    margin-top: 20px;
    text-align: center;
    border: 1px solid rgb(132, 23, 23);
    background: rgb(132, 23, 23);
    border-radius: 50%;
    width: 30px;
    height: 30px;
}
.is-detect{
    margin: auto;
    margin-top: 20px;
    text-align: center;
    border: 1px solid rgb(22, 157, 29);
    background: rgb(22, 157, 29);
    border-radius: 50%;
    width: 30px;
    height: 30px;
}


.icon-set{
    margin-top: 10px;
    text-align: center;
}

.icon-set-mic{
    text-align: center;
    margin-bottom: 10px;
}
.control-panel-container{
    margin-top: 30px;
}

.control-main-frame{
    display: flex;
    justify-content: space-around;
    border: 1px solid rgb(249, 249, 249);
    width: 85%;
    height: 100%;
    background: white;
    margin: auto;
    border-radius: 20px;
}

.analyzing{
    color: white;
    font-weight: bold;
    height: 40px;
    margin-top: 10px; 
    margin-bottom: 10px;
    border: none;
    background: rgb(72, 185, 255);
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.is-mic-text{
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
    font-weight: bold;
    font-size: 15px;
    color: red;
}

.pad-main-frame{
    padding-bottom: 60px;
}

.is-loading{
    position: fixed;
    left:0;
    top:0;
    width: 100%;
    height: 100%;
    z-index: 99;
    background: rgb(36, 36, 36);
    opacity: 0.6;    
}

.loading-content{
    position: fixed;
    top: 45%;
    left: 45%;
    z-index: 999;
    font-size: 30px;
    
}

.page-title{
    color: white;
    text-align: center;
}

.page-title > h1{
    margin-top: 5vh;
    margin-bottom: 3vh;
}

.main-frame{
    border: 1px solid rgb(249, 249, 249);
    width: 85%;
    height: 100%;
    background: white;
    margin: auto;
    border-radius: 20px;
}
 

.voice-btn{
    margin-top: 10%;
    text-align: center;
}

.mic{
    height: 80px;
    width: 80px;
    border-radius: 50%;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
}

.mic-off{
    height: 80px;
    width: 80px;
    border-radius: 50%;
    border: none;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
}

.set-btn-line{
    display: flex;
    justify-content: space-around;
}

.user-text-in{
    width: 85%;
    margin: auto;
    text-align: left;
    margin-top: 30px;
}

.btn-switch-result{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
}

.btn-switch{
    border: 1px solid rgb(78, 78, 78);
    background: rgb(222, 222, 222);
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-left: 10px;
    margin-right: 10px;
}

/* ending dialogue */

.ending-container{
    border: 1px solid #39bbf2;
    color: white;
    font-weight: bold;
    font-size: 20px;
    background-color: #39bbf2;
    width: 200px;
    min-width: 100px;
    height: 50px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
}

/* toggle  */
.toggle-lang{
    margin-top: 10px;
    margin-bottom: 10px;
}

.toggle-1 {
    display: inline-block;
    vertical-align: top;
    margin: 0 15px 0 0;
}

    .toggle-1__input {
        display: none;
    }

    .toggle-1__button {
        position: relative;
        cursor: pointer;
        display: inline-block;

        font-family: 'Roboto', sans-serif;
        text-transform: uppercase;
        font-size: 1rem;
        line-height: 20px;

        width: 100px;
        height: 40px;
        color: white;
        background-color: #39bbf2;
        border-radius: 30px;
        border: solid 1px #3989f2;
        box-shadow: 0 0 12px rgba(61, 77, 255, 0.5);

        transition: all 0.3 ease;
    }

    .toggle-1__button::before {
        position: absolute;
        display: flex;
        align-items: center;

        top: 4px;
        left: 50px;
        height: 30px;
        padding: 0 10px;

        content: "TH";
        background: white;
        border-radius: 30px;
        color: #39a5f2;
        transition: all 0.3s ease;
        
    }

    .toggle-1__input:checked + .toggle-1__button {
        
        background: #cfc845;
        border: solid 1px #afcf45;
        box-shadow: 0 2px 20px rgba(182, 207, 69, 0.5);

    }

    .toggle-1__input:checked + .toggle-1__button::before {
        content: 'EN';
        left: 5px;
        color:#bdcf45;
    }

/* css loading animation */
.loader {
    transform: rotateZ(45deg);
    perspective: 1000px;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    color: #fff;
    }
    
    .loader:before,
    .loader:after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: inherit;
        height: inherit;
        border-radius: 50%;
        transform: rotateX(70deg);
        animation: 1s spin linear infinite;
    }
    
    .loader:after {
        color: #FF3D00;
        transform: rotateY(70deg);
        animation-delay: .4s;
    }

    @keyframes rotate {
        0% {
            transform: translate(-50%, -50%) rotateZ(0deg);
        }
        100% {
            transform: translate(-50%, -50%) rotateZ(360deg);
        }
    }
    
    @keyframes rotateccw {
        0% {
            transform: translate(-50%, -50%) rotate(0deg);
        }
        100% {
            transform: translate(-50%, -50%) rotate(-360deg);
        }
    }

    @keyframes spin {
        0%,
        100% {
            box-shadow: .2em 0px 0 0px currentcolor;
        }
        12% {
            box-shadow: .2em .2em 0 0 currentcolor;
        }
        25% {
            box-shadow: 0 .2em 0 0px currentcolor;
        }
        37% {
            box-shadow: -.2em .2em 0 0 currentcolor;
        }
        50% {
            box-shadow: -.2em 0 0 0 currentcolor;
        }
        62% {
            box-shadow: -.2em -.2em 0 0 currentcolor;
        }
        75% {
            box-shadow: 0px -.2em 0 0 currentcolor;
        }
        87% {
            box-shadow: .2em -.2em 0 0 currentcolor;
        }
    }
</style>