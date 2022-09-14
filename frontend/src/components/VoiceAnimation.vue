
<script>
export default {

}
</script>

<template>
  <div class="voice-icon">
            <div class="boxContainer">
                <div class="box box1"></div>
                <div class="box box2"></div>
                <div class="box box3"></div>
                <div class="box box4"></div>
                <div class="box box5"></div>
            </div>
            <div class="boxContainer">
                <div class="box box1"></div>
                <div class="box box2"></div>
                <div class="box box3"></div>
                <div class="box box4"></div>
                <div class="box box5"></div>
            </div>
        </div>
</template>


<style scoped>
.voice-icon{
    display: flex;
    text-align: center;
    justify-content: center;
    margin-top: 30%;
}

@keyframes quiet {
  25%{
    transform: scaleY(.6);
  }
  50%{
    transform: scaleY(.4);
  }
  75%{
    transform: scaleY(.8);
  }
}

@keyframes normal {
  25%{
    transform: scaleY(1);
  }
  50%{
    transform: scaleY(.4);
  }
  75%{
    transform: scaleY(.6);
  }
}
@keyframes loud {
  25%{
    transform: scaleY(1);
  }
  50%{
    transform: scaleY(.4);
  }
  75%{
    transform: scaleY(1.2);
  }
}
body{
  display: flex;
  justify-content: center;
  background: black;
  margin: 0;padding: 0;
  align-items: center;
  height: 100vh;
}

.boxContainer{
  display: flex;
  justify-content: space-between;
  margin-left: 7px;
  height: 64px;
  --boxSize: 8px;
  --gutter: 4px;
  width: calc((var(--boxSize) + var(--gutter)) * 5);
}

.box{
  transform: scaleY(.4);
  height: 100%;
  width: var(--boxSize);
  background: #0e827e;
  animation-duration: 1.2s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  border-radius: 8px;
}

.box1{
  animation-name: quiet;
}

.box2{
  animation-name: normal;
}

.box3{
  animation-name: quiet;
}

.box4{
  animation-name: loud;
}

.box5{
  animation-name: quiet;
}
</style>