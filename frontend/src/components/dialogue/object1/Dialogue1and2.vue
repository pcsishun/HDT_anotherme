<script>
// import VoiceAnimation from '../../VoiceAnimation.vue'

export default {
    components:{
        // VoiceAnimation
    },
    data(){
        return{
            arrayOfSentence: [],
            countObject:0,
            isStart:false,
            isFirstTime: false,
            content:"",
            counting:0,
            rangeOfArray:0,
            mySentenceNow: []

        }
    },
    methods:{
 
        
        objectSentence(){

            // console.log("start index ==>", this.$store.state.userAction.sentenceIndex)
            this.counting = this.$store.state.userAction.sentenceIndex;

            // console.log(this.counting);
         
                this.content = this.arrayOfSentence[this.counting];
                this.$store.state.userAction.setSentence = this.mySentenceNow[this.counting];     
                this.$store.state.userAction.setQuestion = this.content;
 
    
                if(this.rangeOfArray ===this.counting){
                    alert("You are complete 50% of dialogue.")
                    this.$store.state.userAction.sentenceIndex = 0;
                    this.$store.state.userAction.dialogueNow = "Dialogue3"
                    // console.log(this.$store.state.userAction.dialogueNow)
                }
            
        }

    },
    beforeMount(){
        const ranInt = Math.floor(Math.random() * 2);

        if(this.isFirstTime === false){

            this.$store.state.objective1.firstTimeGreeting.forEach((element) => {
                this.arrayOfSentence.push(element)
                this.mySentenceNow.push("firstTimeGreeting")
            })

            this.$store.state.objective1.goalSetting.forEach((element) => {
                this.arrayOfSentence.push(element)
                this.mySentenceNow.push("goalSetting")
            })

            this.$store.state.objective2.moodCheck.forEach((element) => {
                this.arrayOfSentence.push(element)
                this.mySentenceNow.push("moodCheck")
            })

            if(ranInt === 0){
                this.$store.state.objective2.askForUpdate.forEach((element) => {
                    this.arrayOfSentence.push(element)
                    this.mySentenceNow.push("askForUpdate")
                })
            }else{
                this.$store.state.objective2.reviewTheHomework.forEach((element) => {
                    this.arrayOfSentence.push(element)
                    this.mySentenceNow.push("reviewTheHomework")
                })
            }

            this.$store.state.objective2.identifyIssuesOrGoalsForTheSession.forEach((element) => {
                this.arrayOfSentence.push(element)
                this.mySentenceNow.push("identifyIssuesOrGoalsForTheSession")
            })
        }
        else{
            
            this.$store.state.objective2.moodCheck.forEach((element) => {
                this.arrayOfSentence.push(element)
                this.mySentenceNow.push("moodCheck")
            })

            if(ranInt === 0){
                this.$store.state.objective2.askForUpdate.forEach((element) => {
                    this.arrayOfSentence.push(element)
                    this.mySentenceNow.push("askForUpdate")
                })
            }else{
                this.$store.state.objective2.reviewTheHomework.forEach((element) => {
                    this.arrayOfSentence.push(element)
                    this.mySentenceNow.push("reviewTheHomework")
                })
            }

            this.$store.state.objective2.identifyIssuesOrGoalsForTheSession.forEach((element) => {
                this.arrayOfSentence.push(element)
                this.mySentenceNow.push("identifyIssuesOrGoalsForTheSession")
            })
        }

        this.rangeOfArray = this.arrayOfSentence.length;
    },
    updated(){
        this.objectSentence()
    }
}
</script>

<template>
    <div class="dialogue-container">

        <div class="msg-container">
            {{this.content}}
        </div>

        <div class="set-animation" v-if="this.$store.state.userAction.isStartRec === true">
            <!-- <VoiceAnimation/> -->
        </div>

    </div>
</template>

<style >
.dialogue-container{
    width: 85%;
    margin: auto;
    text-align: left;
}

.msg-container{
    margin-top: 40%;
    font-size: 20px;
}
</style>