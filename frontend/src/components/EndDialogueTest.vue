<script>
import BarChart from '../components/charts/BarChart.vue';
import axios from 'axios';
import {httpAPIWordCloud} from '../APIsetting';

const faskAPI = httpAPIWordCloud();

export default {
    components:{
        BarChart
    },
    data(){
        return{
            mySummaryData: [],
            imgBase64:[],
            selectionMood: '',
            resultSentiment: '',
            base64Dialogue1: '',
            base64Dialogue2: '',
            base64Dialogue3: ''
        }
    },
    methods:{
        findMean(arrayOfScore){
            // console.log("moodArray ===> ",arrayOfScore);
            const rangeOfScore = arrayOfScore.length
            let score = 0
            arrayOfScore.forEach((element) => {
                score  = score + element
            });
            const sentimentMean = score / rangeOfScore;
            return sentimentMean;
        },
        funcConvetMood(moodArray){
            // console.log("funcConvetMood ===> ", moodArray);
            const countsDup = {};
            const setMood = []
            const setScore = []

            moodArray.forEach((element) => {
                setMood.push(element.mood);
                setScore.push(element.sentimentScore);
            })

            // console.log("setMood ===> ", setMood , "setScore ====>", setScore);
            
            const convertArray = [].concat.apply([], setMood);
            convertArray.forEach(function (x) { countsDup[x] = (countsDup[x] || 0) + 1; });
            
            const wrapingEmotion = {
                Angry: (countsDup.Angry === undefined) ? 0: countsDup.Angry,
                Fear: ( countsDup.Fear === undefined) ? 0: countsDup.Fear,
                Disgust: (countsDup.Disgust === undefined) ?  0: countsDup.Disgust,
                Happy:(countsDup.Happy === undefined) ?  0:countsDup.Happy,
                Sad: (countsDup.Sad === undefined) ?  0: countsDup.Sad,
                Suprise: (countsDup.Suprise === undefined) ? 0: countsDup.Suprise,
                Neutral: (countsDup.Neutral === undefined) ? 0: countsDup.Neutral
            }

            const anxiety = wrapingEmotion.Angry + wrapingEmotion.Fear + wrapingEmotion.Disgust;
            const joy = wrapingEmotion.Suprise + wrapingEmotion.Happy;
            const Relax = wrapingEmotion.Neutral;   
            const Depress = wrapingEmotion.Sad;

            if(anxiety >= joy && anxiety >= Relax && anxiety >= Depress){
                this.selectionMood = "anxiety"
            }else if(Depress > anxiety && Depress > joy && Depress > Relax){
                this.selectionMood = "depress"
            }else if(joy > anxiety && joy > Relax && joy > Depress){
                this.selectionMood = "joy"
            }else if(Relax > anxiety && Relax > joy && Relax > Depress ){
                this.selectionMood = "relax"
            }
            // console.log("setScore ===> ", setScore)

            const mySentimentMean = this.findMean(setScore);
            // let resultSentiment = ''
            if(mySentimentMean >= 0.25){
                this.resultSentiment = "Positive";
            }else if(mySentimentMean < 0.25 && mySentimentMean > -0.25){
                this.resultSentiment = "Natural";
            }else if(mySentimentMean <= -0.25){
                this.resultSentiment = "Negtive";
            }
            // console.log("mySentimentMean ===> ", mySentimentMean);

            const warpingContent = {
                morphcastEmotion: [
                    wrapingEmotion.Angry, 
                    wrapingEmotion.Disgust, 
                    wrapingEmotion.Fear, 
                    wrapingEmotion.Happy, 
                    wrapingEmotion.Neutral, 
                    wrapingEmotion.Sad, 
                    wrapingEmotion.Suprise],
                groupEmotion: this.selectionMood,
                meanSentiment: mySentimentMean,
                resultSentiment: this.resultSentiment
            }

            this.mySummaryData.push(warpingContent);

            this.selectionMood = '';
        },


        async settingArray(){
            let scoreDialogue1and2 = [];
            let scoreDialogue3 = [];
            let scoreDialogue4 = [];

            let wordDialogue1and2 = [];
            let wordDialogue3 = [];
            let wordDialogue4 = [];

            let wrapingWord = [];
            // let stringToBase64 = [];

            // console.log("settingArray start ===> ",this.$store.state.storeUserArray);

            for(let i = 0; i < this.$store.state.storeUserArray.objective.length; i ++){
                // console.log("interation ==> ",i)

                if(this.$store.state.storeUserArray.objective[i] === 'Dialogue1and2'){
                    // console.log(this.$store.state.storeUserArray.objective[i])
                    scoreDialogue1and2.push({
                        mood: this.$store.state.storeUserArray.arrayMood[i],
                        sentimentScore: this.$store.state.storeUserArray.sentimentScore[i],
                        })
                    wordDialogue1and2.push(this.$store.state.storeUserArray.word[i])

                    // console.log("scoreDialogue1and2 ===>", scoreDialogue1and2)
                }else if(this.$store.state.storeUserArray.objective[i] === 'Dialogue3'){
                    scoreDialogue3.push({
                        mood: this.$store.state.storeUserArray.arrayMood[i],
                        sentimentScore: this.$store.state.storeUserArray.sentimentScore[i]
                        })
                    wordDialogue3.push(this.$store.state.storeUserArray.word[i])
                }else if(this.$store.state.storeUserArray.objective[i] === 'Dialogue4'){
                    scoreDialogue4.push({
                        mood: this.$store.state.storeUserArray.arrayMood[i],
                        sentimentScore: this.$store.state.storeUserArray.sentimentScore[i]
                        })
                    wordDialogue4.push(this.$store.state.storeUserArray.word[i])
                }
            }

            // wrapingWord.push(wordDialogue1and2.join(''))
            // wrapingWord.push(wordDialogue3.join(''))
            // wrapingWord.push(wordDialogue4.join(''))

            const setSending1 = wordDialogue1and2.join('');
            const settingSend1 = {
                text: setSending1
            }

            const setSending2 = wordDialogue3.join('');
            const settingSend2 = {
                text: setSending2
            }

            const setSending3 = wordDialogue4.join('');
            const settingSend3 = {
                text: setSending3
            }

            try{
                const dataImg1 = await axios.post(`${faskAPI}/wordcloud`,settingSend1);
                this.base64Dialogue1 = dataImg1.data; 

                const dataImg2 = await axios.post(`${faskAPI}/wordcloud`,settingSend2);
                this.base64Dialogue2 = dataImg2.data; 

                const dataImg3 = await axios.post(`${faskAPI}/wordcloud`,settingSend3);
                this.base64Dialogue3 = dataImg3.data; 
                // console.log(dataImg.data);
                
                // dataImg.data.forEach((element) => { 
                //     this.imgBase64.push(window.btoa(element))
                // })

            }catch(err){
                console.log(err);
                this.imgBase64 = ["","",""]
            }
            
            this.funcConvetMood(scoreDialogue1and2);
            this.funcConvetMood(scoreDialogue3);
            this.funcConvetMood(scoreDialogue4);
        }

    },
    created(){
        this.settingArray();
        // console.log(this.mySummaryData);
    }
}
</script>

<template>
    <div class="end-dialogue-container" >
        <div class="text-end-container" >
            <div v-for="(element, index) in mySummaryData" :key="index">
                <div class="title-continer"  v-if="index === $store.state.isChangePages">
                    <h3> Speaking Text </h3>
                    <!-- <h3>Phase: {{index + 1}}</h3> -->
                    <div style="border-radius: 10px; border: 1px solid gray; margin: 50px 0px;">
                        <h5>
                            {{($store.state.storeUserArray.word)[0]}}
                        </h5>
                    </div>
                </div>

                <BarChart :isCounting="element.morphcastEmotion" v-if="index === $store.state.isChangePages"/>

                <div class="mood-explian-contianer" v-if="index === $store.state.isChangePages">
                    <div class="content-sentiment">
                        <h4>Sentiment</h4>
                        <h4>{{element.resultSentiment}}</h4>
                    </div>
                    <div class="content-emotion">
                        <h4>Emotion</h4>
                        <h4>{{element.groupEmotion}}</h4>
                    </div>    
                </div>

                <div class="wordcloud-continaer" v-if="index === $store.state.isChangePages">
                    <h3>My answer</h3>
                    <!-- <img height="300" width="300" :src="`data:image/png;base64, ${this.imgBase64[index]}`"/> -->
                    <img class="border-word-cloud" height="300" width="300" v-if="index === 0" :src="`data:image/png;base64, ${base64Dialogue1}`"/>
                    <img class="border-word-cloud" height="300" width="300" v-if="index === 1" :src="`data:image/png;base64, ${base64Dialogue2}`"/>
                    <img class="border-word-cloud" height="300" width="300" v-if="index === 2" :src="`data:image/png;base64, ${base64Dialogue3}`"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.end-dialogue-container{
    width: 85%;
    margin: auto;
    text-align: center;
}
.text-end-container{
    margin-top: 10%;
    font-size: 25px;
}

.border-word-cloud{
    box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
    border-radius: 10px;
}
.mood-explian-contianer{
    display: flex;
    justify-content: space-around;
    text-align: center;
    margin: auto;
    margin-top: 20px;
}

.content-sentiment{
    padding: 10px;
    border: 1px solid gray;
    border-radius: 10px;
}

.content-emotion{
    padding: 15px;
    border: 1px solid gray;
    border-radius: 10px;
}

.wordcloud-continaer{
    margin-top: 50px;
}
</style>