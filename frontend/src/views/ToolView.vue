<script>
import StarterTools from '../components/StarterTools.vue';
import Dialogue1and2 from '../components/dialogue/object1/Dialogue1and2.vue';
import Dialogue3 from '../components/dialogue/object2/Dialogue3.vue';
import Dialogue4 from '../components/dialogue/object3/Dialogue4.vue';
import EndDialogue from '../components/EndDialogueTest.vue';
import axios  from 'axios';
import VoiceAnimation from '../components/VoiceAnimation.vue'
import { httpAPI } from '../APIsetting';

const httpAPIs = httpAPI();

const builder = CY.loader()
    .licenseKey("dad9b5df5ffd65750e82018b4286e6ce96c1d0dfd868")
    .addModule(CY.modules().FACE_EMOTION.name)
    .load()

window.SpeechRecognition = window.SpeechRecognition ||  window.webkitSpeechRecognition;
const recognition = new window.SpeechRecognition();

recognition.interimResults = true;
recognition.continuous = true;

    export default {
        components:{
            StarterTools,
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
                endProcess: false,

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
                    this.endProcess = true
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
                    <StarterTools v-if="isStarter"/>
                    <EndDialogue  v-if="endProcess"/>

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

                        <!-- <div class="btn-switch-result" v-if="this.$store.state.userAction.dialogueNow === 'end'">
                            <button class="btn-switch" @click="haddleSwitch(0)"></button>
                            <button class="btn-switch" @click="haddleSwitch(1)"></button>
                            <button class="btn-switch" @click="haddleSwitch(2)"></button>
                        </div> -->

                        <div class="finish-dialogue" v-if="this.$store.state.userAction.dialogueNow === 'end'">
                            <button class="ending-container" @click="haddleToHomePage" >End</button>
                        </div>  
                        <div class="pad-main-frame"></div>       
                    </div>
                    <div class="control-panel-container">
                        <div class="control-main-frame">
                            <!-- <div class="analyzing-btn">

                                <div class="icon-set">
                                    <i class='fas fa-chart-pie' style='font-size:36px'></i>
                                </div>

                                <button class="analyzing" @click="testing">Analyzing</button>
                            </div> -->
                        
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
    </div>
</template>

<style scoped>

.set-detection{
    margin: auto;
    text-align: center;
    margin-top: 30px;
}

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

.test-button{ 
    margin-top: 50px;
    border-radius:  0.25rem;
    background-color: rgb(54,58,63);
    color: rgb(250,252,254);
    border-width: 0.1rem;
    border-color: white;
}
.welcome-container{
    text-align: center;
    margin: auto;
    background: white;
    border-radius: 30px;
    height: 100%;
    margin-top: 10%;
    width: 85%;
}

.content-contianer{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: auto;
}

.is-mic-text{
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
    font-weight: bold;
    font-size: 15px;
    color: red;
}

.header-title{
    margin-top: 10%;
}

.body-content{
    margin-top: 15%;
}

.footer-container{
    margin-top: 40%;
    padding-bottom: 40px;
}

.setting-img{
    margin-top: 10%
}

</style>
