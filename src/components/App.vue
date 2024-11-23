<template>
  <div>
    <div class="title-bar">
      <div class="title-bar-text">WDNMD 98</div>
      <div class="title-bar-controls">
      </div>
    </div>
  </div>
  <div @mousedown="startDrag" @touchstart="startTouchDrag" class="window"
    :style="{ top: `${position.y}px`, left: `${position.x}px` }" id="mymusic">
    <div class="title-bar">
      <div class="title-bar-text">A Music player</div>
      <div class="title-bar-controls">
        <button aria-label="Close" @click="closede"></button>
      </div>
    </div>
    <div class="window-body">
      <lbAudio :musicList="musicList" :index="0" :lyrics="false" :playList="true" style="background: silver;" id="playe">
      </lbAudio>
    </div>
  </div>
  <div @mousedown="startDrag" @touchstart="startTouchDrag" class="window" id="lain">
    <div class="title-bar">
      <div class="title-bar-text">Lain looking your</div>
      <div class="title-bar-controls">
        <button aria-label="Close" @click="closede"></button>
      </div>
    </div>
    <div class="window-body" id="lainsbody">
      <img src="https://fauux.neocities.org/16c.gif" alt="G O D" style="margin-top: 30px;width: 630px; height: auto;">

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
const position = ref({ x: 10, y: 30 });
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
// 触屏拖动相关变量
let touchOffset = { x: 0, y: 0 };

// 触屏按下事件
function startTouchDrag(event: TouchEvent) {
  if (event.touches.length === 1) {
    isDragging.value = true;
    const touch = event.touches[0];
    touchOffset.x = touch.clientX - position.value.x;
    touchOffset.y = touch.clientY - position.value.y;

    // 绑定全局的触屏移动和松开事件
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', stopDrag);
  }
}

// 触屏移动事件
function onTouchMove(event: TouchEvent) {
  if (isDragging.value && event.touches.length === 1) {
    const touch = event.touches[0];
    position.value.x = touch.clientX - touchOffset.x;
    position.value.y = touch.clientY - touchOffset.y;
  }
}

function closede(event) {
  var closeeee = document.getElementById('event');
  if (closeeee) {
    closeeee.style.height = '0px'; // 设置高度为0以开始渐隐效果
    closeeee.style.overflow = 'hidden'; // 防止内容溢出

    // 使用setTimeout在延迟后隐藏元素，注意这里没有传递额外的参数给回调函数
    setTimeout(function () {
      // 直接使用在外部获取的closeeee变量
      closeeee.style.display = 'none'; // 完全隐藏元素
      console.log('音乐播放器已关闭');
    }, 200); // 延迟200毫秒
  }
}

const op = ref({
  src: '/assets/Vite App.mp3',
  title: '僕らの手には',
  coverImage: '/assets/RAM WIRE.jpg'

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
#mymusic {
  width: 335px;
  height: 200px;
  transition: height .2s linear;
  position: absolute;
}

#lain {
  background-repeat: repeat;
  /* 图片将水平和垂直重复 */
  background-color: #d2738a;
  /* 当图片未覆盖时显示的背景颜色 */
  color: #c1b492;
  width: 600px;
  height: 600px;
  transition: height 0.2s linear;
  /* 高度变化的平滑过渡 */
  position: absolute;
  /* 绝对定位 */
  /* 可能还需要添加 top, right, bottom, 或 left 属性来指定位置 */
}

#lainsbody {
  width: 50px;
  height: 590px;
  background-image: url(https://fauux.neocities.org/bg/bg_main2.gif.gif);
  image-rendering: pixelated;
  background-size: auto;
}

.d {
  /* margin: auto; */
  /* margin-top: 10%; */
  border-radius: 15px;
  display: block;
}

.b {
  float: right;
  width: 200px;
  /* height: 500px; */
  overflow: hidden;
  margin-right: 20px
}
</style>