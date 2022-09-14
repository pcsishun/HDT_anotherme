<template>
  <div class="config-iat-container">
    <div class="title-page">
      <div class="back-btn" @click="haddleAdminPanel"><img src="../assets/arrow.png" width="20" height="20"/></div>
      <div class="title-iat">New Config IAT</div>
    </div>
    <div class="set-config">
      
      <div class="set-runner">
        <div class="title-runner">
          Runner
        </div>
        <input class="runner-input" v-model="runner"/>
      </div>
      <div class= "set-category">
        <div class="target-category"> 
          <div class="title">
            <h4>Target Category</h4>
            <p>Adding your target category.</p>
            <div class="input-content-left-right">
              <div class="left-side">
                <div class="set-title-left-right">
                  <div>{{tarTittleLeft}}</div>
                  <!-- <div><button  class="btn-haddle-t" @click="haddleChangeTitle('att-p')">+</button></div> -->
                </div>
                
                <input placeholder="name attribute left" v-model="tarTittleLeft"/>
              </div>
              <div class="right-side">
                <div class="set-title-left-right">
                  <div>{{tarTittleRight}}</div>
                  <!-- <div><button  class="btn-haddle-t" @click="haddleChangeTitle('att-t')">+</button></div> -->
                </div>
                <input placeholder="name attribute right" v-model="tarTittleRight"/>
              </div>
            </div>
          </div>

          <div class="show-input"> 
            <div class="input-text">
              <p v-if="targetLeft.length < 0 || targetRight.length < 0">No target category adding</p>
              <div class="setting-list" v-if="targetLeft.length > 0 || targetRight.length > 0">
                <div v-if="targetLeft.length > 0"> 
                  <div v-for="(data, index) in targetLeft" :key="index" >
                    <p v-if="data.type === 'text'">{{data.item}}</p>
                    <img v-if="data.type === 'img'" :src="data.item" height="50" width="50"/>
                  </div>
                  </div>
                <div v-if="targetRight.length > 0">
                  <div v-for="(data, index) in targetRight" :key="index">
                    <p v-if="data.type === 'text'">{{data.item}}</p>
                    <img v-if="data.type === 'img'" :src="data.item" height="50" width="50"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="left-size">
            <div class="pratice-category">
              {{tarTittleLeft}}
            </div>
            <div class="btn-add-remove">
              <input class="target-input" v-if="switchTargetTypeLeft === false" v-model="targetPratice"/>
              <input class="target-input" v-if="switchTargetTypeLeft === true" type="file" @change="haddleImgTargetTypeLeft"/>

              <button  class="btn-haddle" @click="haddleAddingTargetPratice">+</button>
              <button  class="btn-haddle-mius" @click="haddleRemoveTargetPratice">-</button>
              <button  class="btn-haddle-switch" v-if="switchTargetTypeLeft === false" @click="switchType('switchTargetTypeLeft')"><img class="btn-swtich" src="../assets/photo.png" width="20" height="20"/></button>
              <button  class="btn-haddle-switch" v-if="switchTargetTypeLeft === true" @click="switchType('switchTargetTypeLeft')"><img class="btn-swtich" src="../assets/text-font.png" width="20" height="20"/></button>
            </div>
          </div>

          <div class="right-size">
            <div class="pratice-category">
              {{tarTittleRight}}
            </div>
            <div class="btn-add-remove">
              <input class="target-input" v-if="switchTargetTypeRight === false" v-model="targetTest"/>
              <input class="target-input" v-if="switchTargetTypeRight === true" type="file" @change="haddleImgTargetTypeRight"/>

              <button  class="btn-haddle" @click="haddleAddingTargetTest">+</button>
              <button  class="btn-haddle-mius" @click="haddleRemoveTargetTest">-</button>
              <button  class="btn-haddle-switch" v-if="switchTargetTypeRight === false" @click="switchType('switchTargetTypeRight')"><img class="btn-swtich" src="../assets/photo.png" width="20" height="20"/></button>
              <button  class="btn-haddle-switch" v-if="switchTargetTypeRight === true" @click="switchType('switchTargetTypeRight')"><img class="btn-swtich" src="../assets/text-font.png" width="20" height="20"/></button>
            </div>
          </div>
        </div>

        <div class="attribute-category">
          
          <div class="title">
            <h4>Attribute</h4>
            <p >Adding your attribute.</p>
            <div class="input-content-left-right">
              <div class="left-side">
                <div class="set-title-left-right">
                  <div>{{attTitleLeft}}</div>
                </div>
                
                <input placeholder="name attribute left" v-model="attTitleLeft"/>
              </div>
              <div class="right-side">
                <div class="set-title-left-right">
                  <div>{{attTitleRight}}</div>
                </div>
                <input placeholder="name attribute right" v-model="attTitleRight"/>
              </div>
            </div>
          </div>

          <div class="show-input"> 
            <div class="input-text">
              <p v-if="attributeLeft.length < 0 || attributeRight.length < 0">No attribute adding.</p>
              <div class="setting-list" v-if="attributeLeft.length > 0 || attributeRight.length > 0">
              <div v-if="attributeLeft.length > 0">
                <div v-for="(data, index) in attributeLeft" :key="index">
                  <p v-if="data.type === 'text'">{{data.item}}</p>
                  <img v-if="data.type === 'img'" :src="data.item" height="50" width="50"/>
                </div>
              </div>
              <div v-if="attributeRight.length > 0">
                <div v-for="(data, index) in attributeRight" :key="index">
                  <p v-if="data.type === 'text'">{{data.item}}</p>
                  <img v-if="data.type === 'img'" :src="data.item" height="50" width="50"/>
                </div>
              </div>
              </div>
            </div>
          </div>
          <div class="left-size">
            <div class="pratice-category">
              {{attTitleLeft}}
            </div>
            <div class="btn-add-remove">
              <input class="target-input" v-if="switchAttributeTypeLeft === false" v-model="attributePratice"/>
              <input class="target-input" v-if="switchAttributeTypeLeft === true" type="file" @change="haddleImgAttributeTypeLeft"/>

              <button  class="btn-haddle" @click="haddleAddingAttributePratice">+</button>
              <button  class="btn-haddle-mius" @click="haddleRemoveAttributePratice">-</button>
              <button  class="btn-haddle-switch" v-if="switchAttributeTypeLeft === false" @click="switchType('switchAttributeTypeLeft')"><img class="btn-swtich" src="../assets/photo.png" width="20" height="20"/></button>
              <button  class="btn-haddle-switch" v-if="switchAttributeTypeLeft === true" @click="switchType('switchAttributeTypeLeft')"><img class="btn-swtich" src="../assets/text-font.png" width="20" height="20"/></button>
            </div>
          </div>

          <div class="right-size">
            <div class="pratice-category">
              {{attTitleRight}}
            </div>
            <div class="btn-add-remove">
              <input class="target-input" v-if="switchAttributeTypeRight === false" v-model="attributeTest"/>
              <input class="target-input" v-if="switchAttributeTypeRight === true" type="file" @change="haddleImgAttributeTypeRight"/>

              <button  class="btn-haddle" @click="haddleAddingAttributeTest">+</button>
              <button  class="btn-haddle-mius" @click="haddleRemoveAttributeTest">-</button>
              <button  class="btn-haddle-switch" v-if="switchAttributeTypeRight === false" @click="switchType('switchAttributeTypeRight')"><img src="../assets/photo.png" width="20" height="20"/></button>
              <button  class="btn-haddle-switch" v-if="switchAttributeTypeRight === true" @click="switchType('switchAttributeTypeRight')"><img src="../assets/text-font.png" width="20" height="20"/></button>
            </div>
          </div>


        </div>
      </div>

      <div class="calculation-methods">
        <div class="title-calculation">
          Calculation methods
        </div>

        <div class="warp-check-ing-cal">
          <div class="check-ing-cal">
            <div>
              <input class="set-checkbox" type="checkbox" v-model="d1" />
              <label class="set-label">D1</label>
            </div>
            <div>
              <input class="set-checkbox" type="checkbox"  v-model="d2"/>
              <label class="set-label">D2</label>
            </div>
            <div>
              <input class="set-checkbox" type="checkbox" v-model="d3" />
              <label class="set-label">D3</label>
            </div>
          </div>

          <div class="check-ing-cal">
              <div>
              <input class="set-checkbox" type="checkbox"  v-model="d4"/>
              <label class="set-label">D4</label>
             </div>
              <div>
              <input class="set-checkbox" type="checkbox"  v-model="d5"/>
              <label class="set-label">D5</label>
            </div>
              <div>
              <input class="set-checkbox" type="checkbox"  v-model="d6"/>
              <label class="set-label">D6</label>
            </div>
          </div>

          <div class="check-ing-cal">
            <div>
              <input class="set-checkbox" type="checkbox" v-model="d7"/>
              <label class="set-label">D7</label>
             </div>
             <div class="set-default-cal">
                <button @click="haddleDefault">default</button>
             </div>
          </div>

        </div>
        
      </div>

      <div class="set-save-btn">
        <button class="save-btn" @click="haddleSaveIAT">save</button>
      </div>

    </div>
    <div class="footer-container">
      
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { settingAPI } from '../settingAPI'

const sendAPI = settingAPI();

export default {
  components:{

  },
  data(){
    return{
      runner:"",
      btn_left:"L",
      btn_right: "R",
      tarTittleLeft: "left side",
      tarTittleRight:"right side",
      attTitleLeft:"left side",
      attTitleRight:"right side",
      targetPratice:"",
      targetTest:"",
      attributePratice:"",
      attributeTest:"",
      targetLeft:[],
      targetRight:[],
      attributeLeft:[],
      attributeRight:[],
      switchTargetTypeLeft:false,
      base64TarLeft:null,
      switchTargetTypeRight:false,
      base64TarRight:null,
      switchAttributeTypeLeft:false,
      base64AttributeLeft:null,
      switchAttributeTypeRight:false,
      base64AttributeRight:null,
      d1:false,
      d2:false,
      d3:true,
      d4:true,
      d5:false,
      d6:true,
      d7:true,
      isError:""
    }
  },
  methods:{
    switchType(evt){
      if(evt === 'switchTargetTypeLeft'){
        if(this.switchTargetTypeLeft === false){
          this.switchTargetTypeLeft = true
        }else{
          this.switchTargetTypeLeft = false
        }
      }else if(evt === 'switchTargetTypeRight'){
        if(this.switchTargetTypeRight === false){
          this.switchTargetTypeRight = true
        }else{
          this.switchTargetTypeRight = false
        }
      }else if(evt === 'switchAttributeTypeLeft'){
        if(this.switchAttributeTypeLeft === false){
          this.switchAttributeTypeLeft = true
        }else{
          this.switchAttributeTypeLeft = false
        }
      }else if(evt === 'switchAttributeTypeRight'){
        if(this.switchAttributeTypeRight === false){
          this.switchAttributeTypeRight = true
        }else{
          this.switchAttributeTypeRight = false
        }
      }
    },

    // haddle show image //
    async haddleImgTargetTypeLeft(e){
      const file = e.target.files[0];
      // console.log("file ===> ", file.name);
      if(file.size < 1500000){
          const render = new FileReader();
          render.readAsDataURL(file);
          render.onloadend = () => {
          this.base64TarLeft = {  
            filename: file.name,
            base64:String(render.result)
          }

        }
      }else{
        alert("image must lesser than 1.4Mb")
      }
      
    },

    async haddleImgTargetTypeRight(e){
      const file = e.target.files[0];
      
      if(file.size < 1500000){
        const render = new FileReader();
        render.readAsDataURL(file);
        render.onloadend = () => {
          this.base64TarRight = {  
            filename: file.name,
            base64:String(render.result)
          }
        }
      }else{
        alert("image must lesser than 1.4Mb")
      }
      
    },

    async haddleImgAttributeTypeLeft(e){
      const file = e.target.files[0];
      
      if(file.size < 1500000){
        const render = new FileReader();
        render.readAsDataURL(file);
        render.onloadend = () => {
          this.base64AttributeLeft = {  
            filename: file.name,
            base64:String(render.result)
          }
        }
      }else{
        alert("image must lesser than 1.4Mb")
      }
      
    },

    async haddleImgAttributeTypeRight(e){
      const file = e.target.files[0];
      
      if(file.size < 1500000){
        const render = new FileReader();
        render.readAsDataURL(file);
        render.onloadend = () => {
          this.base64AttributeRight = {  
            filename: file.name,
            base64:String(render.result)
          }
        }
      }else{
        alert("image must lesser than 1.4Mb")
      }
    },

    haddleAdminPanel(){
      this.$router.push("/adminpanel")
    },

    haddleAddingTargetPratice(){
      
      if(this.targetPratice.trim()!== ''){
        const warping = {
          type:"text",
          item: this.targetPratice.trim()
        }
        this.targetLeft.push(warping)
        this.targetPratice = ""
      }else if(this.base64TarLeft){
        const warping = {
          type:"img",
          filename: this.base64TarLeft.filename,
          item: this.base64TarLeft.base64
        }
        this.targetLeft.push(warping)
      }
      
      // console.log("this.targetLeft ==> ",this.targetLeft)
    },
    haddleRemoveTargetPratice(){
      this.targetLeft.pop()
    },

    haddleAddingTargetTest(){

      if(this.targetTest.trim()!== ''){
        const warping = {
          type:"text",
          item: this.targetTest.trim()
        }
        this.targetRight.push(warping)
        this.targetTest = ""
      }else if(this.base64TarRight){
        const warping = {
          type:"img",
          filename: this.base64TarRight.filename,
          item: this.base64TarRight.base64
        }
        this.targetRight.push(warping)
      }

      // console.log("this.targetTest ==> ",this.targetRight)
    },
    haddleRemoveTargetTest(){
      this.targetRight.pop()
    },
    haddleAddingAttributePratice(){

      if(this.attributePratice.trim()!== ''){
        const warping = {
          type:"text",
          item: this.attributePratice.trim()
        }
        this.attributeLeft.push(warping)
        this.attributePratice = ""
      }else if(this.base64AttributeLeft){
        const warping = {
          type:"img",
          filename: this.base64AttributeLeft.filename,
          item: this.base64AttributeLeft.base64
        }
        this.attributeLeft.push(warping)
      }
      // console.log("this.attributePratice ==> ",this.attributeLeft)
    },
    haddleRemoveAttributePratice(){
      this.attributeLeft.pop()
    },

    haddleAddingAttributeTest(){

      if(this.attributeTest.trim()!== ''){
        const warping = {
          type:"text",
          item: this.attributeTest.trim()
        }
        this.attributeRight.push(warping)
        this.attributeTest = ""
      }else if(this.base64AttributeRight){
        const warping = {
          type:"img",
          filename:this.base64AttributeRight.filename,
          item: this.base64AttributeRight.base64
        }
        this.attributeRight.push(warping)
      }
      // console.log("this.attributePratice ==> ",this.attributeRight)
    },
    haddleRemoveAttributeTest(){
      this.attributeRight.pop()
    },
    haddleDefault(){
      this.d1  = false;
      this.d2  = false;
      this.d3  = true;
      this.d4  = true;
      this.d5  = false;
      this.d6  = true;
      this.d7  = true;
    },
    async haddleSaveIAT(){

      const payload = {
        runner: this.runner,  
        btn_left: this.btn_left,
        btn_right: this.btn_right,
        attribute_pratice_name: this.attTitleLeft,
        attribute_test_name:this.attTitleRight,
        target_pratice_name:this.tarTittleLeft,
        target_test_name:this.tarTittleRight,
        target_pratice: this.targetLeft, 
        target_test: this.targetRight,  
        attribute_pratice: this.attributeLeft,
        attribute_test: this.attributeRight,
        d1:this.d1 ,
        d2:this.d2,
        d3:this.d3,
        d4:this.d4,
        d5:this.d5,
        d6:this.d6,
        d7:this.d7
      }

      const headerConf = {
        headers:{
          'Content-Type': 'application/json',
          'access-token':  this.$cookies.get("IATToken")
        }
      }

      try{
        const createStatus = await axios.post(`${sendAPI}/creataiat`,payload,headerConf);
        if(createStatus.status === 200){
          alert("IAT create success.")
          this.runner = ""
          this.targetLeft = []
          this.targetRight = []
          this.attributeLeft = []
          this.attributeRight = []
          this.d1 = false
          this.d2 = false
          this.d3 = true
          this.d4 = true
          this.d5 = false
          this.d6 = true
          this.d7 = true
        }else{
          alert("connection timeout.")
          this.runner = ""
          this.targetLeft = []
          this.targetRight = []
          this.attributeLeft = []
          this.attributeRight = []
          this.d1 = false
          this.d2 = false
          this.d3 = true
          this.d4 = true
          this.d5 = false
          this.d6 = true
          this.d7 = true
          this.$cookies.remove("IATToken")
          this.$cookies.remove("IATAdmin")
          this.$router.push("/login")
        }
      }catch(err){
        alert("connection timeout.")
        this.runner = ""
        this.targetLeft = []
        this.targetRight = []
        this.attributeLeft = []
        this.attributeRight = []
        this.d1 = false
        this.d2 = false
        this.d3 = true
        this.d4 = true
        this.d5 = false
        this.d6 = true
        this.d7 = true
        this.$cookies.remove("IATToken")
        this.$cookies.remove("IATAdmin")
        this.$router.push("/login")
      }
    },
    haddleChangeTitle(evt){
      if(evt === "tar-p"){
        this.tarTittleLeft = this.tarTittleLeft
      }else if(evt === "tar-t"){
        this.tarTittleRight = this.tarTittleRight
      }else if(evt === "att-p"){
        this.attTitleLeft = this.attTitleLeft
      }else if(evt === "att-t"){
        this.attTitleRight = this.attTitleRight
      }
    }
  }
}
</script>

<style scoped>

.title-page{
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.title-iat{
  text-align: center;
  font-weight: bold;
  font-size: 20px;
}


.set-btn-change{
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
  margin-top: 30px;
}

.btn-config{
  width: 120px;
  height: 40px;
  border-radius: 10px;
  color: white;
  border: 1px solid rgb(129, 125, 125);
  background: rgb(129, 125, 125);
  font-weight: bold;
}

.input-change{
  margin-bottom: 10px;
  width: 120px;
  height: 25px;
  border-radius: 5px;
  border: 1px solid gray
}
.input-content-left-right{
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.left-side > input{
  width: 120px;
  height: 20px;
}

.right-side > input{
  width: 120px;
  height: 20px;
}

.set-title-left-right{
  display:flex;
  
}
.config-iat-container{
  width: 95%;
  margin: auto;
  text-align: center;
}

.back-btn{
  transform: translateX(-90px);
}

.set-config{
  margin-top: 30px;
}

.set-runner{
  display: flex;
  justify-content: center;
}

.title-runner{
  font-size: 15px;
  margin-top: 5px;
  padding-right: 10px;
}

.target-category, .attribute-category{
  margin-top: 50px;
  border: 1px solid grey;
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 10px;
  padding-right: 10px;
  
}
.runner-input{
  height: 25px;
  width: 250px;
}
.set-category{
  margin-top: 50px;
}

.target-input , .attribute-input{
  height: 25px;
  width: 150px;
}

.input-text{
  color: gray;
}

.title-calculation{
  margin-top: 50px;
  font-weight: bold;
  margin-bottom: 30px;
}
.show-input{
  border: 1px solid gray;
  border-radius: 10px;
  margin-bottom: 10px;
  font-size: 12px;
}

.btn-haddle{
  color: white;
  width: 20px;
  height: 20px;
  border: 1px solid rgb(90, 203, 241);
  background: rgb(90, 203, 241);
  border-radius: 50%;
  font-weight: bold;
  margin-left: 10px;
}

.btn-haddle-t{
  color: white;
  width: 20px;
  height: 20px;
  border: 1px solid rgb(39, 141, 42);
  background: rgb(39, 141, 42);
  border-radius: 50%;
  font-weight: bold;
  margin-left: 10px;
}

.btn-haddle-mius{
  color: white;
  width: 20px;
  height: 20px;
  border: 1px solid rgb(255, 117, 117);
  background: rgb(255, 117, 117);
  border-radius: 50%;
  font-weight: bold;
  margin-left: 10px;
}

.left-size, .right-size{
  display: grid;
  grid-template-columns:  1fr 3fr;
  margin-top: 5px;
}

.setting-list{
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.set-btn{
  margin-top: 10px;
}

.pratice-category{
  text-align: left;
}
.warp-check-ing-cal{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.footer-container{
  margin-top: 50px;
}
.set-checkbox{
  width: 25px;
  height: 25px;
}

.set-save-btn{
  margin-top: 20px;
}

.save-btn{
  border: 1px solid rgb(60, 190, 255);
  background: rgb(60, 190, 255);
  color: white;
  width: 150px;
  height: 30px;
  min-width: 40px;
  font-weight: bold;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}

.save-btn:active{
  box-shadow: rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset;
}

 
.set-default-cal > button{
  margin-top: 15px;
  color: white;
  border: 1px solid gray;
  background: grey;
  height: 30px;
  border-radius: 10px;
  font-weight: bold;
}

.btn-swtich{
  transform: translateY(3.5px);
}

.btn-haddle-switch{
  margin-left: 2px;
  border: none;
  background: none;
}

</style>