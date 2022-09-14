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
            // console.log(this.$store.state.userAction.dialogueNow)
            this.$store.state.objective4.summary.forEach((element) => {
                this.arrayOfSentence.push(element);
                this.mySentenceNow.push("summary");
            });    

            // console.log(this.arrayOfSentence)
            
            this.rangeOfArray = this.arrayOfSentence.length
            this.content = this.arrayOfSentence[this.counting];
        },
        
        objectSentence(){

            this.counting = this.$store.state.userAction.sentenceIndex;
            
            // console.log(this.counting);
            this.content = this.arrayOfSentence[this.counting];
            this.$store.state.userAction.setSentence = this.mySentenceNow[this.counting];     
            this.$store.state.userAction.setQuestion = this.content;

            if(this.counting === this.rangeOfArray){
                
                this.$store.state.userAction.sentenceIndex = 0;
                this.$store.state.userAction.dialogueNow = "end";

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