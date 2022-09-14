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
            selectionMood: "",
            mySentenceNow: []
        }
    },
    methods:{

        findEmotionMode(){ 
            // console.log("component Dialogue3 !!")
            const countsDup = {};
            const setMood = this.$store.state.storeUserArray.arrayMood

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

            // this.$store.state.arrayOfMood.push({
            //     morphcastEmotion: wrapingEmotion,
            //     groupEmotion: this.selectionMood
            // })

            if(this.selectionMood === 'depress'){
                const ranInt = Math.floor(Math.random() * 2);
                if(ranInt === 0){
                    this.$store.state.objective3.selfAwareness.forEach((element) => {
                        // {sentence:"firstTimeGreeting" ,topic:element} //
                        this.arrayOfSentence.push(element.topic)    
                        this.mySentenceNow.push("selfAwareness") 
                    });                 
                }else{
                    this.$store.state.objective3.resilience.forEach((element) => {
                        this.arrayOfSentence.push(element.topic)     
                        this.mySentenceNow.push("resilience") 
                    });                        
                }
            }else if(this.selectionMood === 'anxiety'){
                const ranInt = Math.floor(Math.random() * 2);
                if(ranInt === 0){
                    this.$store.state.objective3.problemSolving.forEach((element) => {
                        this.arrayOfSentence.push(element.topic)     
                        this.mySentenceNow.push("problemSolving") 
                    });
                }else{
                    this.$store.state.objective3.motivationInterview.forEach((element) => {
                        this.arrayOfSentence.push(element.topic)    
                        this.mySentenceNow.push("motivationInterview")  
                    });
                }
            }else if(this.selectionMood === 'relax'){
                this.$store.state.objective3.motivationInterview.forEach((element) => {
                    this.arrayOfSentence.push(element.topic);
                    this.mySentenceNow.push("motivationInterview") 
                })
            }else if(this.selectionMood === 'joy'){
                const ranInt = Math.floor(Math.random() * 4);
                if(ranInt === 1){
                    this.$store.state.objective3.selfAwareness.forEach((element) => {
                        this.arrayOfSentence.push(element.topic)    
                        this.mySentenceNow.push("selfAwareness")  
                    });  
                }else if(ranInt === 2){
                    this.$store.state.objective3.resilience.forEach((element) => {
                        this.arrayOfSentence.push(element.topic)    
                        this.mySentenceNow.push("resilience") 
                    });  
                }else if(ranInt === 3){
                    this.$store.state.objective3.problemSolving.forEach((element) => {
                        this.arrayOfSentence.push(element.topic) 
                        this.mySentenceNow.push("problemSolving")     
                    });
                }else if(ranInt === 4){
                    this.$store.state.objective3.motivationInterview.forEach((element) => {
                    this.arrayOfSentence.push(element.topic);
                    this.mySentenceNow.push("motivationInterview")  
                })
                }
            }

            this.rangeOfArray = this.arrayOfSentence.length;
            this.content = this.arrayOfSentence[this.counting];

        },
        
        objectSentence(){
            
            // 
            this.counting = this.$store.state.userAction.sentenceIndex;

            // console.log(this.counting);
            this.content = this.arrayOfSentence[this.counting];
            this.$store.state.userAction.setSentence = this.mySentenceNow[this.counting];     
            this.$store.state.userAction.setQuestion = this.content;
            

            if(this.counting === this.rangeOfArray){
                alert("You are complete 75% of dialogue.")
                this.$store.state.userAction.sentenceIndex = 0;
                this.$store.state.userAction.dialogueNow = "Dialogue4"
            }
        }

    },
    created(){
        this.findEmotionMode();
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
 
</style>