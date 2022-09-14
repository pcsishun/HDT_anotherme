<script>
import axios from 'axios';
import {httpAPI} from '../APIsetting';


const httpAPIs = httpAPI()

export default {
    data(){
        return{
            email:"",
            username:"",
            mobile:"",
            sexMale:false,
            sexFemale:false,
            maritalStatus:"",
            occupation:"",
            interest:"",

            errorDesc:""
        }
    },
    methods:{
        async haddleRegister(){
            if(this.sexMale === true){
                const payload = {
                    contact:{
                        email: this.email,
                        username: this.username,
                        mobile: this.mobile
                    },
                    info:{
                        sex: "Male",
                        maritalStatus: this.maritalStatus,
                        occupation: this.occupation,
                        interest: this.interest
                    },
                    isFirstTime: true
                }

                try{
                    const returnStatus = await axios.post(`${httpAPIs}/register`, payload);
                    if(returnStatus.data.isError === false){
                        alert(returnStatus.data.text);
                        this.$router.push("/login");
                    }else{
                        this.errorDesc = returnStatus.data.text
                    }
                }catch(err){
                    this.errorDesc = err
                }
                
            }else{
                const payload = {
                    contact:{
                        email: this.email,
                        username: this.username,
                        mobile: this.mobile
                    },
                    info:{
                        sex: "Female",
                        maritalStatus: this.maritalStatus,
                        occupation: this.occupation,
                        interest: this.interest
                    },
                    isFirstTime: true
                }

                try{
                    const returnStatus = await axios.post(`${httpAPIs}/register`, payload);
                    if(returnStatus.data.isError === false){
                        alert(returnStatus.data.text);
                        this.$router.push("/login");
                    }else{
                        this.errorDesc = returnStatus.data.text
                    }
                }catch(err){
                    this.errorDesc = err
                }
            }
        }
    },
    // mounted(){
    //     console.log(httpAPI())
    // },
    updated(){
        if(this.sexMale === true){
            this.sexFemale = false
        }else{
            this.sexMale = false
        }
 
    }
}
</script>

<template>
    <div class="reigster-component">

        <div class="page-title">
            <h2><b>Register</b></h2>
        </div>
        <div class="reigster-content">
            <div class="register-container">
                <div class="email-container">
                    <input class="email-input" placeholder="Email" type="email" v-model="email" required/>
                </div>
                <div class="username-container">
                    <input class="username-input" placeholder="Firstname and Lastname" v-model="username" required/>
                </div>
                <div class="mobile-container">
                    <input class="mobile-input" placeholder="Mobile Phone" v-model="mobile" required/>
                </div>
                <div class="sex-container">
                    <div class="set-sex">
                        <h4>Male</h4>
                        <input class="sex-input" type="checkbox" v-model="sexMale" />
                    </div>
                    <div class="set-sex">
                        <h4>Female</h4>
                        <input class="sex-input" type="checkbox" v-model="sexFemale"/>
                    </div>

                </div>
                <div class="maritalStatus-container">
                    <input class="maritalStatus-input" placeholder="Marital" v-model="maritalStatus" required/>
                </div>
                <div class="occupation-container">
                    <input class="occupation-input" placeholder="Occupation" v-model="occupation" required/>
                </div>
                <div class="interest-container">
                    <input class="interest-input" placeholder="Interest" v-model="interest" required/>
                </div>
                <div class="is-error" v-if="errorDesc !== ''"  >
                    <h4>{{errorDesc}}</h4>
                </div>
                <div class="reigster-btn-container">
                    <button class="btn-register" @click="haddleRegister">Register</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.page-title{
    margin-top: 50px;
    color: white;
    text-align: center;
}

.reigster-content{
    width: 85%;
    margin: auto;
    text-align: center;
    background: white;
    border-radius: 30px;
    height: calc(100%);
}

.register-container{
    padding-top: 20px;
}

.register-container > div{
    margin-top: 40px;
}

.register-container > div > input{
    width: 80%;
    height: 60px;
    border: none;
    border-bottom: 1px solid gray;
    background: rgb(242, 242, 242);
    border-radius: 10px;
    text-indent: 15px;
    font-size: 20px;
}

.register-container > div > input::placeholder{
    text-align: center;
}

.sex-container{
    display: flex;
    justify-content: space-around;
    margin-left: 20px;
    margin-right: 20px;
}

.sex-input{
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
.btn-register{
    background: rgb(200, 199, 199);
    border: none;
    width: 150px;
    height: 50px;
    border-radius: 10px;
}

.reigster-btn-container{
    padding-bottom: 30px;
}

.is-error{
    color: red;
}
</style>