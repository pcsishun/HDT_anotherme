<script>
import {  RouterView } from 'vue-router';

export default {
    components:{
      RouterView,
    },

    methods:{
      haddleRouter(menu){
        if(menu === 'tool'){
          this.$router.push("/tool")
        }else if(menu === 'iat'){
            window.location.href = "https://iat-project-dot-testdeploy-330007.as.r.appspot.com/"
        }else if(menu === 'summary'){
            window.location.href = "https://hdtresult-dot-testdeploy-330007.as.r.appspot.com/login"
        }
      }
    }

}
 
</script>

<template>
    <div class="welcome-container">
        <div class="content-contianer">
            <div class="header-title">
                <h4>Welcome to AnotherMe</h4>
            </div>
            <div class="body-content">
                <div class="setting-img">
                    <img  width="300" height="300" src="../components/img/homepage.jpg"/>
                </div>
                <div>
                    <img class="icon-img" src="../assets/demo.png" height="45" width="45"/>
                    <button class="test-button" @click="haddleRouter('tool')">
                        Using Tools
                    </button>
                </div>
                <div>
                    <img class="icon-img" src="../assets/exam.png" height="45" width="45"/>
                    <button class="conf-button" @click="haddleRouter('iat')">
                        IAT
                    </button>
                </div>
                <div>
                    <img class="icon-img" src="../assets/stadistics.png" height="45" width="45"/>
                    <button class="conf-button" @click="haddleRouter('summary')">
                        Summary
                    </button>
            </div>
            <div class="rec-app">
                <div class="rec-text"><u>We recommend google application.</u></div>
                <div class="rec-google-apk">
                    <div class="rec-img">
                        <img src="../assets/google.png" height="120" width="120"/>
                    </div>
                    <div class="rec-link">
                        <a href="https://apps.apple.com/us/app/google/id284815942">
                            <img class="apple-app" src="../assets/apple.png" height="60" width="150"/>
                        </a>
                        <a href="https://play.google.com/store/apps/details?id=com.google.android.googlequicksearchbox&hl=th&gl=US">
                            <img class="google-app" src="../assets/appstore.png"  height="100" width="130"/>
                        </a>
                    </div>
                </div>
            </div>
            <div class="footer-container">
                <h5>Created by Nexter Living team.</h5>
            </div>
        </div>
    </div>
    </div>
</template>

<style scoped>

.icon-img{
    margin-right: 15px;
}

.rec-text{
    margin-top: 50px;
}
.rec-google-apk{
    display: flex;
    justify-content: space-around;
    /* display: grid;
    grid-template-columns: 1fr 1fr */
}

.rec-img{
    margin-left: 1rem;
}

.rec-app{
    text-align: center;
    max-width: 350px;
    margin: auto;
}

.test-button{ 
    margin-top: 40px;
    width: 200px;
    height:40px;
    border-radius:  15px;
    background-color: rgb(54,58,63);
    color: rgb(250,252,254);
    border-width: 0.1rem;
    border-color: white;
}

.conf-button{
    margin-top: 20px;
    height:40px;
    width: 200px;
    border-radius:  15px;
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

.header-title{
    margin-top: 10%;
}

.body-content{
    margin-top: 15%;
}

.footer-container{
    margin-top: 50px;
    padding-bottom: 40px;
}

.setting-img{
    margin-top: 10%
}

.google-app{
    transform: translateY(-20px);
}

</style>