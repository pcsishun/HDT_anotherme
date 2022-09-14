<template>
  <div class="iat-board-container">
    <div class="title-iat-container">
      <div class="title-iat">
        {{runner}}
      </div>
    </div>

    <div class="set-is-pages" v-if="isFinsh === false && isStart === true">
      Block Done: {{isCountingPages}} / 7
    </div>

    <div class="popup-container" v-if="isPopupDesc === true">
      <div class="title-popup" v-if="isBtnChange === false">ระบบได้ทำการสลับปุ่มกด</div>
      <div class="title-popup" v-if="isBtnChange === true">ความหมายปุ่มกดมีการเปลี่ยนแปลง</div>
      <div class="example-btn">
        <div class="example-btn-1"  v-if="isBtnChange === false">
          <button class="btn-ok" >{{targetTestName}}</button>
          <button class="btn-nope" >{{targetPraticeName}}</button>
        </div>

        <div class="example-btn-2" v-if="isBtnChange === true">
          <div v-if="this.isType === 'b2' && this.setType !== 'b3'">
            <button class="btn-ok" style="margin-right: 20px;">{{attributePraticeName}}</button>
            <button class="btn-nope" style="margin-left: 20px;">{{attributeTestName}}</button>
          </div>
          <div v-if="this.setType === 'b3'">
            <button class="btn-ok" style="margin-right: 20px;">
              <div>{{targetPraticeName}}</div>
              <div>-or-</div>
              <div>{{attributePraticeName}}</div>
            </button>
            <button class="btn-nope" style="margin-left: 20px;">
              <div>{{targetTestName}}</div>
              <div>-or-</div>
              <div>{{attributeTestName}}</div>
            </button>
          </div>
          <div v-if="this.setType === 'b6'" >
            <button class="btn-ok" style="margin-right: 20px;">
            <div>{{targetTestName}}</div>
            <div>-or-</div>
            <div>{{attributePraticeName}}</div>
          </button>
          <button class="btn-nope" style="margin-left: 20px;">
            <div>{{targetPraticeName}}</div>
            <div>-or-</div>
            <div>{{attributeTestName}}</div>
          </button>
          </div>
        </div>

        <div class="example-btn-2" v-if="isBtnChange === false">
          <button class="btn-ok" >
            <div>{{targetTestName}}</div>
            <div>-or-</div>
            <div>{{attributePraticeName}}</div>
          </button>
           <button class="btn-nope"  >
            <div>{{targetPraticeName}}</div>
            <div>-or-</div>
            <div>{{attributeTestName}}</div>
          </button>
        </div>
        
      </div>
      <div class="submit-popup-btn">
        <button class="popup-submit" @click="haddlePopup">Submit</button>
      </div>
    </div>

    <div class="example-desc-starter" v-if="isStart === false">
      <div class="set-example-title">
        ตัวอย่าง
      </div>
      <div class="explain-b1">
        กรุณากดปุ่มให้ตรงกับความหมายของข้อความที่ปรากฎบนหน้าจอ
      </div>
      <div class="btn-example">
          <div class="example-text">
            <div v-if="isWord.type === 'text'">
              <p>{{isWord.item}}</p>
            </div>
            <div v-if="isWord.type === 'img'">
              <img :src="isWord.item" width="170" height="170"/>
            </div>
          </div>
          <div class="example-btn-select-side">
            <button class="btn-ok" >{{targetPraticeName}}</button>
            <button class="btn-nope" >{{targetTestName}}</button>
          </div>
      </div>
    </div>

    <div :class="cssContentIatContainer" v-if="isFinsh === false && isStart === true">
      <div v-if="cssContentIatContainer === 'content-iat-container-error'" 
      style="color: red; 
      font-weight: bold; margin-top: 10px">Mistaken</div>
      <div class="set-content">
        <div class="content-container">
          <div class="set-text">
            <div v-if="isWord.element.type === 'text'">
              <p>{{isWord.element.item}}</p>
            </div>
            <div  v-if="isWord.element.type === 'img'">
              <img :src="isWord.element.item" width="170" height="170"/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="d-score-content" v-if="showResult === true">
      <div class="title-d-score">
        <div class="dscoreM3">D-score M3: {{dScore.D1}}</div>
        <div class="dscoreM4">D-score M4: {{dScore.D2}}</div>
        <div class="dscoreM5">D-score M5: {{dScore.D3}}</div>
        <div class="dscoreM6">D-score M6: {{dScore.D4}}</div>
      </div>
      <div class="target-attibute">
        <div class="test-set">
          <div class="title-pratice">{{iatData.target_test_name}}</div>
          <div v-for="(data, index) in targetTest" :key="index">
              <div v-if="data.type === 'text'">
                <p>{{data.item}}</p>
              </div>
              <div v-if="data.type === 'img'">
                <img :src="data.item" width="60" height="60"/>
            </div>
          </div>
          <div class="title-test">{{iatData.attribute_test_name}}</div>
          <div v-for="(data, index) in attributeTest" :key="index">
            <div v-if="data.type === 'text'">
                <p>{{data.item}}</p>
              </div>
              <div v-if="data.type === 'img'">
                <img :src="data.item" width="60" height="60"/>
            </div>
          </div>
        </div>
        <div class="pratice-set">
          <div class="title-pratice">{{iatData.target_pratice_name}}</div>
          <div v-for="(data, index) in targetPratice" :key="index">
            <div v-if="data.type === 'text'">
                <p>{{data.item}}</p>
              </div>
              <div v-if="data.type === 'img'">
                <img :src="data.item" width="60" height="60"/>
            </div>
          </div>
          <div class="title-test">{{iatData.attribute_pratice_name}}</div>
          <div v-for="(data, index) in attributePratice" :key="index">
            <div v-if="data.type === 'text'">
                <p>{{data.item}}</p>
              </div>
              <div v-if="data.type === 'img'">
                <img :src="data.item" width="60" height="60"/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-iat-container" v-if="isStart === true && isFinsh === false">

      <div v-if="isType === 'b1'">
        <button class="btn-ok" @click="btnSelection('L',isWord.element,targetPraticeName,targetTestName)">{{targetPraticeName}}</button>
        <button class="btn-nope" @click="btnSelection('R',isWord.element,targetPraticeName,targetTestName)">{{targetTestName}}</button>
      </div>

      <div v-if="isType === 'b2'">
        <button class="btn-ok" @click="btnSelection('L',isWord.element,attributePraticeName,attributeTestName)">{{attributePraticeName}}</button>
        <button class="btn-nope" @click="btnSelection('R',isWord.element,attributePraticeName,attributeTestName)">{{attributeTestName}}</button>
      </div>

      <div  v-if="isType === 'b3' || isType ==='b4'">
        <button class="btn-ok" @click="btnSelection('L',isWord.element,targetPraticeName + '-or-' + attributePraticeName,targetTestName+'-or-'+attributeTestName)">
          <div>{{targetPraticeName}}</div>
          <div>-or-</div>
          <div>{{attributePraticeName}}</div>
        </button>
        <button class="btn-nope" @click="btnSelection('R',isWord.element,targetPraticeName + '-or-' + attributePraticeName,targetTestName+'-or-'+attributeTestName)">
          <div>{{targetTestName}}</div>
          <div>-or-</div>
          <div>{{attributeTestName}}</div>
        </button>
      </div>

      <div v-if="isType === 'b5'">
        <button class="btn-ok" @click="btnSelection('L',isWord.element,targetPraticeName,targetTestName)">{{targetTestName}}</button>
        <button class="btn-nope" @click="btnSelection('R',isWord.element,targetPraticeName,targetTestName)">{{targetPraticeName}}</button>
      </div>

      <div  v-if="isType === 'b6' || isType ==='b7'">
        <button class="btn-ok" @click="btnSelection('L',isWord.element,targetTestName + '-or-' + attributePraticeName,targetPraticeName+'-or-'+attributeTestName)">
          <div>{{targetTestName}}</div>
          <div>-or-</div>
          <div>{{attributePraticeName}}</div>
        </button>
        <button class="btn-nope" @click="btnSelection('R',isWord.element,targetTestName + '-or-' + attributePraticeName,targetPraticeName+'-or-'+attributeTestName)">
          <div>{{targetPraticeName}}</div>
          <div>-or-</div>
          <div>{{attributeTestName}}</div>
        </button>
      </div>
    </div>

    <div class="footer-iat-container-result" v-if="isFinsh === true && showResult === false">
      <button class="btn-nope" @click="btnCalResult">ดูผลลัพท์</button>
    </div>

    <div class="footer-iat-container-result" v-if="showResult === true">
      <button class="btn-nope" @click="haddleRecover">ทำใหม่</button>
    </div>

    <div class="footer-iat-container-start" v-if="isStart === false">
      <button class="btn-nope" @click="btnStart">เริ่มต้น</button>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import { settingAPI } from '../settingAPI';

const sendAPI = settingAPI();

export default {
  components:{

  },
  data(){
    return{
      runner: "",
      iatData:{},
      targetPratice:[],
      targetTest:[],
      attributePratice:[],
      attributeTest:[],
      timingCount: 10,
      switchType:false,
      isFinsh: false,
      isStart: false,
      indexCount: 0,
      isRound: 10,
      setTime:0,
      dScore:0,
      showResult: false,
      isResult:[],
      isType:"b1",
      setType:"",

      isCompareAttrubuteAndTest: false,
      // exampleWord:"",
      isWord:"",

      targetPraticeName:"",
      targetTestName:"",
      attributePraticeName:"",
      attributeTestName:"",
      isCountingPages:1,

      setTrueSide: "",
      isPopupDesc: false,
      isBtnChange: true,

      cssContentIatContainer: "content-iat-container",
      atIndex:0,
      arrayIndex:[]
    }
  },
  methods:{

    async fetchIATData(){
      try{

        const selectionRunner = await axios.get(`${sendAPI}/iatselected`);
        this.runner = selectionRunner.data.runner
        const payload = {
          runner: selectionRunner.data.runner
        }
        
        const selectionIat = await axios.post(`${sendAPI}/useiat`,payload);

        this.iatData = selectionIat.data
        // console.log("this.iatData ===> ", this.iatData)
        this.targetPratice = selectionIat.data.target_pratice
        this.targetTest = selectionIat.data.target_test
        this.attributePratice = selectionIat.data.attribute_pratice
        this.attributeTest = selectionIat.data.attribute_test
        this.targetPraticeName = selectionIat.data.target_pratice_name
        this.targetTestName = selectionIat.data.target_test_name
        this.attributePraticeName = selectionIat.data.attribute_pratice_name
        this.attributeTestName = selectionIat.data.attribute_test_name

        const setArrayRandom = this.targetPratice.concat(this.targetTest);
        let randomIndex = Math.floor(Math.random()*setArrayRandom.length);
        const setWord = setArrayRandom[randomIndex];
        this.isWord = setWord;
        // this.exampleWord = setWord
        // console.log("setWord ===> ",setWord)
      }catch(err){
        console.log(err)
      }
    },

 
    btnSelection(evt, wordShow,contentLeft, contentRight){
      if(this.isType === "b1"){
        console.log('b1')

        if(this.indexCount >= 10){
          this.isType = "b2"
          this.indexCount = 0;
          this.isPopupDesc = true
          this.isCountingPages += 1          
        }

        const setArrayRandom = this.targetPratice.concat(this.targetTest);

        if(this.indexCount !== 0){
          const correctAns = evt === this.setTrueSide? true: false;
          this.cssContentIatContainer = correctAns? "content-iat-container":"content-iat-container-error";
          if(correctAns === false){
            if(this.setTrueSide === "R"){
              alert("Mistaken! correct answer is right side!")
            }else{
              alert("Mistaken! correct answer is left side!")
            }
          }

          let randomIndex = Math.floor(Math.random()*setArrayRandom.length);
          while(true){
            if(this.arrayIndex[0] === this.arrayIndex[1] || this.arrayIndex.length <= 1){
              this.arrayIndex.push(randomIndex)
              // console.log("randomIndex: ",randomIndex);
              break;
            }
          }

          if( this.arrayIndex.length >= 2){
            this.arrayIndex = []
          }

          const setWord = setArrayRandom[randomIndex];
          const setElement = this.targetPratice.includes(setWord)?{side:"L", element:setWord}: {side:"R", element:setWord}

          const timing = performance.now();
          const caltiming = timing - this.setTime;

          // console.log("timing:", caltiming)
          this.isResult.push({
            typeCal: "b1",
            runnerName: this.runner,
            userSelect: evt,
            wordShow: wordShow.type === 'text'? wordShow.item: wordShow.filename,
            contentLeft: contentLeft,
            contentRight: contentRight,
            isCorrect: correctAns,
            milliseconds: caltiming
          });

          console.log("this.isResult ===> ", this.isResult)

          this.setTrueSide = setElement.side;
          this.isWord = setElement

          this.setTime = performance.now();
          this.indexCount += 1
        }else{
          
          let randomIndex = Math.floor(Math.random()*setArrayRandom.length);
          while(true){
            if(this.arrayIndex[0] === this.arrayIndex[1] || this.arrayIndex.length <= 1){
              this.arrayIndex.push(randomIndex)
              // console.log("randomIndex: ",randomIndex);
              break;
            }
          }

          if( this.arrayIndex.length >= 2){
            this.arrayIndex = []
          }

          const setWord = setArrayRandom[randomIndex];
          const setElement = this.targetPratice.includes(setWord)?{side:"L", element:setWord}: {side:"R", element:setWord}
          
          this.setTrueSide = setElement.side;
          this.isWord = setElement

          this.setTime = performance.now();
          this.indexCount += 1
        }

      }else if(this.isType === "b2"){
        console.log('b2')

        const setArrayRandom = this.attributePratice.concat(this.attributeTest);

        if(this.indexCount >= 10){
          this.setType = "b3"
          this.indexCount = 0
          this.isCompareAttrubuteAndTest = true
          this.isPopupDesc = true;          
        }

        const correctAns = evt === this.setTrueSide? true: false;
        this.cssContentIatContainer = correctAns? "content-iat-container":"content-iat-container-error";
        if(correctAns === false){
            if(this.setTrueSide === "R"){
              alert("Mistaken! correct answer is right side!")
            }else{
              alert("Mistaken! correct answer is left side!")
            }
          }

        let randomIndex = Math.floor(Math.random()*setArrayRandom.length);
          while(true){
            if(this.arrayIndex[0] === this.arrayIndex[1] || this.arrayIndex.length <= 1){
              this.arrayIndex.push(randomIndex)
              // console.log("randomIndex: ",randomIndex);
              break;
            }
          }

          if( this.arrayIndex.length >= 2){
            this.arrayIndex = []
          }

        const setWord = setArrayRandom[randomIndex];
        const setElement = this.attributePratice.includes(setWord)?{side:"L", element:setWord}: {side:"R", element:setWord}
        // console.log("testing ==> ",correctAns)

        this.setTrueSide = setElement.side;
        this.isWord = setElement

        const timing = performance.now();
        const caltiming = timing - this.setTime;
        // console.log("caltiming: ", caltiming)
        this.isResult.push({
          typeCal: "b2",
          runnerName: this.runner,
          userSelect: evt,
          wordShow: wordShow.type === 'text'? wordShow.item: wordShow.filename,
          contentLeft: contentLeft,
          contentRight: contentRight,
          isCorrect: correctAns,
          milliseconds: caltiming
        });

        this.setTime = performance.now();
        this.indexCount += 1

      }else if(this.isType === "b3"){
        console.log('b3')

        const checkPratice = this.attributePratice.concat(this.targetPratice) // L side
        const setArrayRandom = this.attributePratice.concat(this.targetTest,this.targetPratice,this.attributeTest )

        if(this.indexCount >= 20){
          this.isType = "b4"
          this.indexCount = 0
          this.isCountingPages += 1
        }

        const correctAns = evt === this.setTrueSide? true: false;
        this.cssContentIatContainer = correctAns? "content-iat-container":"content-iat-container-error";
        if(correctAns === false){
            if(this.setTrueSide === "R"){
              alert("Mistaken! correct answer is right side!")
            }else{
              alert("Mistaken! correct answer is left side!")
            }
          }

        let randomIndex = Math.floor(Math.random()*setArrayRandom.length);
          while(true){
            if(this.arrayIndex[0] === this.arrayIndex[1] || this.arrayIndex.length <= 1){
              this.arrayIndex.push(randomIndex)
              // console.log("randomIndex: ",randomIndex);
              break;
            }
          }

          if( this.arrayIndex.length >= 2){
            this.arrayIndex = []
          }

        const setWord = setArrayRandom[randomIndex];
        const setElement = checkPratice.includes(setWord)?{side:"L", element:setWord}: {side:"R", element:setWord}
        // console.log("testing ==> ",correctAns)

        this.setTrueSide = setElement.side;
        this.isWord = setElement

        const timing = performance.now();
        const caltiming = timing - this.setTime;
        // console.log("caltiming: ", caltiming)
        this.isResult.push({
          typeCal: "b3",
          runnerName: this.runner,
          userSelect: evt,
          wordShow: wordShow.type === 'text'? wordShow.item: wordShow.filename,
          contentLeft: contentLeft,
          contentRight: contentRight,
          isCorrect: correctAns,
          milliseconds: caltiming
        });

        this.setTime = performance.now();
        this.indexCount += 1

      }else if(this.isType === "b4"){
        console.log('b4')

        const checkPratice = this.attributePratice.concat(this.targetPratice) // L side
        const setArrayRandom = this.attributePratice.concat(this.targetTest,this.targetPratice,this.attributeTest )

        if(this.indexCount >= 40){
          this.isType = "b5"
          this.switchType = true
          this.isBtnChange = false
          this.isPopupDesc = true
          this.indexCount = 0
          this.isCountingPages += 1
        }
          const correctAns = evt === this.setTrueSide? true: false;
          this.cssContentIatContainer = correctAns? "content-iat-container":"content-iat-container-error";
          if(correctAns === false){
            if(this.setTrueSide === "R"){
              alert("Mistaken! correct answer is right side!")
            }else{
              alert("Mistaken! correct answer is left side!")
            }
          }
          let randomIndex = Math.floor(Math.random()*setArrayRandom.length);
          while(true){
            if(this.arrayIndex[0] === this.arrayIndex[1] || this.arrayIndex.length <= 1){
              this.arrayIndex.push(randomIndex)
              // console.log("randomIndex: ",randomIndex);
              break;
            }
          }

          if( this.arrayIndex.length >= 2){
            this.arrayIndex = []
          }

          const setWord = setArrayRandom[randomIndex];
          const setElement = checkPratice.includes(setWord)?{side:"L", element:setWord}: {side:"R", element:setWord}
          // console.log("testing ==> ",correctAns)

          this.setTrueSide = setElement.side;
          this.isWord = setElement

          const timing = performance.now();
          const caltiming = timing - this.setTime;
          // console.log("caltiming: ", caltiming)

          this.isResult.push({
            typeCal: "b4",
            runnerName: this.runner,
            userSelect: evt,
            wordShow: wordShow.type === 'text'? wordShow.item: wordShow.filename,
            contentLeft: contentLeft,
            contentRight: contentRight,
            isCorrect: correctAns,
            milliseconds: caltiming
          });

          this.setTime = performance.now();
          this.indexCount += 1
      }else if(this.isType === "b5"){
        console.log('b5')

        const setArrayRandom = this.targetPratice.concat(this.targetTest);

        if(this.indexCount >= 10){
          this.setType = "b6"
          this.indexCount = 0
          this.isCompareAttrubuteAndTest = true;
          this.isBtnChange = true;
          this.isPopupDesc = true;
        }

        const correctAns = evt === this.setTrueSide? true: false;
        this.cssContentIatContainer = correctAns? "content-iat-container":"content-iat-container-error";
        if(correctAns === false){
            if(this.setTrueSide === "R"){
              alert("Mistaken! correct answer is right side!")
            }else{
              alert("Mistaken! correct answer is left side!")
            }
          }

        let randomIndex = Math.floor(Math.random()*setArrayRandom.length);
          while(true){
            if(this.arrayIndex[0] === this.arrayIndex[1] || this.arrayIndex.length <= 1){
              this.arrayIndex.push(randomIndex)
              // console.log("randomIndex: ",randomIndex);
              break;
            }
          }

          if( this.arrayIndex.length >= 2){
            this.arrayIndex = []
          }

          const setWord = setArrayRandom[randomIndex];
        const setElement = this.attributePratice.includes(setWord)?{side:"R", element:setWord}: {side:"L", element:setWord}
        // console.log("testing ==> ",correctAns)

        this.setTrueSide = setElement.side;
        this.isWord = setElement

        const timing =  performance.now();
        const caltiming = timing - this.setTime;
        // console.log("caltiming: ", caltiming)
        this.isResult.push({
          typeCal: "b5",
          runnerName: this.runner,
          userSelect: evt,
          wordShow: wordShow.type === 'text'? wordShow.item: wordShow.filename,
          contentLeft: contentLeft,
          contentRight: contentRight,
          isCorrect: correctAns,
          milliseconds: caltiming
        });

        this.setTime = performance.now();
        this.indexCount += 1
      }else if(this.isType === "b6"){
        console.log('b6')

        const checkPratice = this.attributePratice.concat(this.targetPratice) // L side
        const setArrayRandom = this.attributePratice.concat(this.targetTest,this.targetPratice,this.attributeTest)

        if(this.indexCount >= 20){
          this.isType = "b7"
          this.indexCount = 0
          this.isCountingPages += 1
        }

        const correctAns = evt === this.setTrueSide? true: false;
        this.cssContentIatContainer = correctAns? "content-iat-container":"content-iat-container-error";
        if(correctAns === false){
            if(this.setTrueSide === "R"){
              alert("Mistaken! correct answer is right side!")
            }else{
              alert("Mistaken! correct answer is left side!")
            }
          }
        let randomIndex = Math.floor(Math.random()*setArrayRandom.length);
          while(true){
            if(this.arrayIndex[0] === this.arrayIndex[1] || this.arrayIndex.length <= 1){
              this.arrayIndex.push(randomIndex)
              // console.log("randomIndex: ",randomIndex);
              break;
            }
          }

          if( this.arrayIndex.length >= 2){
            this.arrayIndex = []
          }

          const setWord = setArrayRandom[randomIndex];
        const setElement = checkPratice.includes(setWord)?{side:"R", element:setWord}: {side:"L", element:setWord}
        // console.log("testing ==> ",correctAns)

        this.setTrueSide = setElement.side;
        this.isWord = setElement;

        const timing =  performance.now();
        const caltiming = timing - this.setTime;

        this.isResult.push({
          typeCal: "b6",
          runnerName: this.runner,
          userSelect: evt,
          wordShow: wordShow.type === 'text'? wordShow.item: wordShow.filename,
          contentLeft: contentLeft,
          contentRight: contentRight,
          isCorrect: correctAns,
          milliseconds: caltiming
        });

        this.setTime = performance.now();
        this.indexCount += 1
      }else if(this.isType === "b7"){
        console.log('b7')

        const checkPratice = this.attributePratice.concat(this.targetPratice) // L side
        const setArrayRandom = this.attributePratice.concat(this.targetTest,this.targetPratice,this.attributeTest)

        const correctAns = evt === this.setTrueSide? true: false;
        this.cssContentIatContainer = correctAns? "content-iat-container":"content-iat-container-error";
        if(correctAns === false){
            if(this.setTrueSide === "R"){
              alert("Mistaken! correct answer is right side!")
            }else{
              alert("Mistaken! correct answer is left side!")
            }
          }
        let randomIndex = Math.floor(Math.random()*setArrayRandom.length);
          while(true){
            if(this.arrayIndex[0] === this.arrayIndex[1] || this.arrayIndex.length <= 1){
              this.arrayIndex.push(randomIndex)
              // console.log("randomIndex: ",randomIndex);
              break;
            }
          }

          if( this.arrayIndex.length >= 2){
            this.arrayIndex = []
          }

        const setWord = setArrayRandom[randomIndex];
        const setElement = checkPratice.includes(setWord)?{side:"R", element:setWord}: {side:"L", element:setWord}
        // console.log("testing ==> ",correctAns)

        this.setTrueSide = setElement.side;
        this.isWord = setElement;

        const timing =  performance.now();
        const caltiming = timing - this.setTime;
        // console.log("caltiming: ", caltiming)

        this.isResult.push({
          typeCal: "b7",
          runnerName: this.runner,
          userSelect: evt,
          wordShow: wordShow.type === 'text'? wordShow.item: wordShow.filename,
          contentLeft: contentLeft,
          contentRight: contentRight,
          isCorrect: correctAns,
          milliseconds: caltiming
        });

        this.setTime = performance.now();
        this.indexCount += 1;

        if(this.indexCount >= 40){
          this.isFinsh = true;
          this.indexCount = 0
          this.isCompareAttrubuteAndTest = false;
        }
      }

    },
    btnStart(){
      this.isStart = true;
      this.btnSelection();
    },

    haddlePopup(){
      if(this.setType === 'b3'){
        this.isType = 'b3'
        this.isCountingPages += 1
        this.isPopupDesc= false;
        this.setType = ""
      }else if(this.setType === 'b6'){
        this.isType = 'b6'
        this.isCountingPages += 1
        this.isPopupDesc= false;
        this.setType = ""
      }else{
        this.isPopupDesc= false;
      }
    },

    async btnCalResult(){

      const personalData = localStorage.getItem("user_sign_iat");
      const convertData = JSON.parse(personalData);

      const payload = {
        firstname: convertData.firstname,
        lastname: convertData.lastname,
        phonenum: convertData.phonenum,
        gender: convertData.male ? "M" : "F",
        birthday: convertData.birthday,
        personalities: convertData.personalities,
        iatReply: this.isResult
      }

      try{
        const resultReplyBack  =  await axios.post(`${sendAPI}/analysis`, payload);
        console.log("all methods d score ==> ",resultReplyBack);
        
        const M1Score = Math.round(resultReplyBack.data.D1 * 100) / 100;
        const M2Score = Math.round(resultReplyBack.data.D2 * 100) / 100;
        const M3Score = Math.round(resultReplyBack.data.D3 * 100) / 100;
        const M4Score = Math.round(resultReplyBack.data.D4 * 100) / 100;
        

        this.dScore = {
          D1:M1Score,
          D2:M2Score,
          D3:M3Score,
          D4:M4Score
        }

        this.showResult = true;
        
      }catch(err){
        console.log(err);
      }
    },

    haddleRecover(){
      this.$router.go()
    }

  },
  computed:{

  },
  mounted(){
    this.fetchIATData();

        window.addEventListener("keypress", e => {
        const getKey = String.fromCharCode(e.keyCode)
        console.log(getKey);
        if(getKey === "a" || getKey === "A"){
          this.btnSelection('left',this.isWord)
        }else if(getKey === "l" || getKey === "L"){
          this.btnSelection('right',this.isWord)
        }

      });


  },
  updated(){

  }
}
</script>

<style scoped>
.iat-board-container{
  width: 80%;
  margin: auto;
  margin-top: 50px;
}


.content-iat-container{
  /* display: flex;
  justify-content: space-around; */
  margin: auto;
  text-align: center;
}

.content-iat-container-error{
  /* display: flex;
  justify-content: space-around; */
  margin: auto;
  text-align: center;
  border: 1px solid red;
  border-radius: 30px;
  translate: 0.5s;
}


.title-iat{
  margin: auto;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 60px;
  color: grey;
}

.footer-iat-container > div{
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
}

.d-score-content{
  margin: auto;
  text-align: center;
  
}

.set-is-pages{
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 30px;
  color: grey;
}

.content-container{
  margin-left: 50px;
  margin-right: 50px;
}
.title-d-score{
  font-weight: bold;
  font-size: 20px;
}

.target-attibute{
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
  margin-bottom: 30px;
}

.set-text{
  font-size: 30px;
  font-weight: bold;
  margin-top: 150px;
  margin-bottom: 150px;
}

.title-test{
  text-align: center;
  font-weight: bold;
}
.title-pratice, .title-test{
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 10px;
  border-bottom: 2px solid grey
}

.footer-iat-container-result , .footer-iat-container-start{
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
}

.btn-ok{
  width: 120px;
  height: 60px;
  border-radius: 10px;
  color: white;
  border: 1px solid rgb(129, 125, 125);
  background: rgb(129, 125, 125);
  font-weight: bold;
}

.btn-nope{
  width: 120px;
  height: 60px;
  border-radius: 10px;
  color: white;
  border: 1px solid rgb(129, 125, 125);
  background: rgb(129, 125, 125);
  font-weight: bold;
}

.popup-container{
  position: fixed;
  left:0;
  top:0;
  width: 100%;
  height: 100vh;
  margin: auto;
  z-index: 999;
  text-align: center;
  background: rgb(46, 46, 46);
  opacity: 0.8;
}

.title-popup{
  margin-top: 45%;
  color: white;
  font-size: 20px;
  font-weight: bold;
}

.example-btn{
  margin-top: 200px;
}

.example-btn-1  > button, .example-btn-2> button{
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 20px;
}

.popup-submit{
  margin-top: 30px;
  border: 1px solid rgb(0, 157, 255);
  background: rgb(0, 157, 255);;
  color: white;
  width: 120px;
  height:30px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}
.popup-submit:active{
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
}

.example-desc-starter{
  border: 1px solid grey;
  border-radius: 30px;
}
.set-example-title{
  margin-top: 30px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}
.explain-b1{
  text-align: center;
}

.btn-example{
  margin-top: 50px;
}

.example-btn-select-side{
  margin-top: 30px;
  text-align: center;
  margin-bottom: 30px; 
}

.example-btn-select-side > button{
  margin-left: 10px;
  margin-right: 10px;
}

.example-text{
  text-align: center;
}
</style>