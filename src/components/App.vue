<template>
  <div>
    <div class="title-bar">
      <div class="title-bar-text">WDNMD 98</div>
      <div class="title-bar-controls">
      </div>
    </div> 
  </div>
  <div  @mousedown="startDrag" class="window" :style="{ top: `${position.y}px`, left: `${position.x}px` }" id="mymusic">
    <div class="title-bar">
      <div class="title-bar-text">A Music player</div>
      <div class="title-bar-controls">
        <button aria-label="Close" @click="closede"></button>
    </div>
  </div>
  <div class="window-body">
    <lbAudio :musicList="musicList" :index="0" :lyrics="false" :playList="true" style="background: silver;" id="playe"></lbAudio>
  </div>
</div>
  <!-- <AudioPlayer class="b" :option=op></AudioPlayer> -->
</template>

<script setup lang="ts">
import "98.css"
// import AudioPlayer from 'vue3-audio-player'
// import 'vue3-audio-player/dist/style.css'

import lbAudio, { type musicListType } from 'lb-audio-v3';
import 'lb-audio-v3/style'

import { ref, onMounted, onBeforeUnmount } from 'vue';

// 窗口位置
const position = ref({ x: 100, y: 100 });
// 拖动状态
const isDragging = ref(false);
// 鼠标按下时的坐标与窗口左上角的偏移
const offset = ref({ x: 0, y: 0 });

// 鼠标按下事件
function startDrag(event) {
  isDragging.value = true;
  offset.value.x = event.clientX - position.value.x;
  offset.value.y = event.clientY - position.value.y;

  // 绑定全局的鼠标移动和松开事件
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', stopDrag);
}

// 鼠标移动事件
function onMouseMove(event) {
  if (isDragging.value) {
    position.value.x = event.clientX - offset.value.x;
    position.value.y = event.clientY - offset.value.y;
  }
}

// 鼠标松开事件
function stopDrag() {
  isDragging.value = false;
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', stopDrag);
}


function closede(){
  var musicplay = document.getElementById('mymusic');
  if(musicplay){
    musicplay.style.height = '0';
 
  }setTimeout(() => {
    let musicplay = document.getElementById('mymusic');
        musicplay.style.display = 'none';
        console.log('窗口关闭了');
      }, 200);
}


const op = ref({
  src: '/assets/Vite App.mp3',
  title: '僕らの手には',
  coverImage:'/assets/RAM WIRE.jpg'

})

const playOrder = ref<playOrderType>('along');
type playOrderType = 'along' | 'random' | 'loop';
const musicList = ref<musicListType>([
  {
    name: '僕らの手には何もないけど、',
    author: 'RAM WIRE',
    url: '/assets/Vite App.mp3',
    img: '/assets/RAM WIRE.jpg',
    lrc: ``
  },
  {
    name: '啊啊啊，灵梦你在这里干什么啊',
    author: '9',
    url: '/assets/啊啊啊，灵梦你在这里干什么啊.wav',
    img: '/assets/1.png',
    lrc: ``
  },
  {
    name: '我没有帮饲养员抢到bw的票啊',
    author: 'Reimu ',
    url: '/assets/我没有帮饲养员抢到bw的票啊.wav',
    img: '/assets/1.png',
    lrc: ``
  },

]);
</script>
<style >
#mymusic{
  margin-top: 20px;width: 335px;height: 200px; transition: height .2s linear;
}
.d {
  /* margin: auto; */
  /* margin-top: 10%; */
  border-radius: 15px;
  display: block;
}
.b{
  float: right;
  width: 200px;
  /* height: 500px; */
  overflow:hidden;
  margin-right: 20px
  
}
</style>