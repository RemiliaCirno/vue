<template>
  <div>
    <div class="title-bar">
      <div class="title-bar-text">WDNMD 98</div>
      <div class="title-bar-controls">
      </div>
    </div>
  </div>
  <div @mousedown.stop="startDrag('mymusic', $event)" @touchstart.stop="startTouchDrag('mymusic', $event)" class="window"
    :class="{ 'closing': windowClosingStatus.mymusic }"
    :style="{ top: `${position.mymusic.y}px`, left: `${position.mymusic.x}px` }" id="mymusic">
    <div class="title-bar">
      <div class="title-bar-text">A Music player</div>
      <div class="title-bar-controls">
        <button aria-label="Close" @click="closeWindow('mymusic')"></button>
      </div>
    </div>
    <div class="window-body">
      <lbAudio :musicList="musicList" :index="0" :lyrics="false" :playList="true" style="background: silver;" id="playe">
      </lbAudio>
    </div>
  </div>
  <!-- lain -->
  <div @mousedown.stop="startDrag('lain', $event)" @touchstart.stop="startTouchDrag('lain', $event)" class="window"
    :class="{ 'closing': windowClosingStatus.lain }"
    :style="{ top: `${position.lain.y}px`, left: `${position.lain.x}px` }" id="lain">
    <div class="title-bar">
      <div class="title-bar-text">Lain looking your</div>
      <div class="title-bar-controls">
        <button aria-label="Close" @click="closeWindow('lain')"></button>
      </div>

    </div>
    <div class="window-body" id="lainsbody">
      <img src="/assets/16c.gif" alt="G O D" style="margin-top: 30px;width: 630px; height: auto;">
    </div>
  </div>
</template>

<script setup lang="ts">
import "98.css"
// import AudioPlayer from 'vue3-audio-player'
// import 'vue3-audio-player/dist/style.css'
import lbAudio, { type musicListType } from 'lb-audio-v3';
import 'lb-audio-v3/style'

import { ref, onMounted, onBeforeUnmount } from 'vue';

// 窗口位置，现在使用对象来存储每个窗口的位置
const position = ref({
  mymusic: { x: 10, y: 30 },
  lain: { x: 200, y: 100 } // 假设另一个窗口的初始位置
});

// 拖动状态
const isDragging = ref(false);

// 用于存储拖动开始时鼠标/触摸点相对于窗口左上角的偏移
const offset = ref({ x: 0, y: 0 });

// 当前被拖动的窗口名称（例如 'mymusic' 或 'lain'）
const draggedWindow = ref(null);

// 鼠标按下事件
function startDrag(windowName, event) {
  if (windowName in position.value) {
    isDragging.value = true;
    draggedWindow.value = windowName;
    const windowPos = position.value[windowName];
    offset.value.x = event.clientX - windowPos.x;
    offset.value.y = event.clientY - windowPos.y;

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', stopDrag);
  }
}

// 鼠标移动事件
function onMouseMove(event) {
  if (isDragging.value && draggedWindow.value) {
    const windowName = draggedWindow.value;
    position.value[windowName].x = event.clientX - offset.value.x;
    position.value[windowName].y = event.clientY - offset.value.y;
  }
}

// 鼠标松开事件
function stopDrag() {
  isDragging.value = false;
  draggedWindow.value = null;
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', stopDrag);
}

// 触屏拖动相关变量
let touchOffset = { x: 0, y: 0 };

// 触屏按下事件
function startTouchDrag(windowName, event: TouchEvent) {
  if (event.touches.length === 1 && windowName in position.value) {
    isDragging.value = true;
    draggedWindow.value = windowName;
    const touch = event.touches[0];
    const windowPos = position.value[windowName];
    touchOffset.x = touch.clientX - windowPos.x;
    touchOffset.y = touch.clientY - windowPos.y;

    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', stopDrag);
  }
}

// 触屏移动事件
function onTouchMove(event: TouchEvent) {
  if (isDragging.value && draggedWindow.value && event.touches.length === 1) {
    const windowName = draggedWindow.value;
    const touch = event.touches[0];
    position.value[windowName].x = touch.clientX - touchOffset.x;
    position.value[windowName].y = touch.clientY - touchOffset.y;
  }
}

// 示例：绑定到某个元素上以开始拖动 mymusic 窗口
// document.getElementById('mymusic-drag-handle').addEventListener('mousedown', (event) => startDrag('mymusic', event));
// document.getElementById('mymusic-drag-handle').addEventListener('touchstart', (event) => startTouchDrag('mymusic', event));
// 关闭窗口的状态（使用对象来跟踪每个窗口的关闭状态）
interface IsClosing {
  mymusic: boolean;
  lain: boolean;
  closeMusic(): void;  // 添加一个方法
}

const windowClosingStatus = ref({
  mymusic: false,
  lain: false
});

// 关闭窗口的函数，接收窗口ID作为参数
function closeWindow(windowId: string) {
  windowClosingStatus.value[windowId] = true;
  position.value[windowId].height = '0px';
  // 使用setTimeout模拟渐隐效果结束后的操作
  setTimeout(() => {
    // 这里可以添加额外的逻辑，比如从DOM中移除元素或重置状态等
    // 但由于我们使用了v-if或v-show来控制显示，所以不需要手动移除DOM
    // 重置位置（可选，根据需求来决定是否要在关闭后重置）
    // position.value[windowId] = { x: 初始值, y: 初始值 };

    // 重置关闭状态（如果需要再次打开窗口的话）
    // isClosing.value[windowId] = false; // 这通常会在重新打开窗口的逻辑中处理

    console.log(`${windowId} 已关闭`);

    // 注意：由于我们使用了v-if或v-show来控制窗口的显示，
    // 因此实际上不需要在这里将窗口的display属性设置为none。
    // Vue会根据v-if或v-show的值来自动处理DOM的添加和移除或显示和隐藏。
    // 如果您想要在页面上完全移除窗口元素，可以在父组件中控制一个变量，
    // 该变量决定是否渲染该窗口组件，并使用v-if来绑定这个变量。
  }, 200); // 延迟200毫秒模拟渐隐效果
}

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

<style scoped>
#mymusic {
  width: 335px;
  height: 200px;
  transition: height 0.2s linear, opacity 0.2s linear;
  position: absolute;
}

#lain {
  background-image: url(/assets/bg_main2.gif);
  /* background-repeat: repeat;
  /* 图片将水平和垂直重复 */
  background-color: #d2738a;
  /* 当图片未覆盖时显示的背景颜色 */
  color: #c1b492;
  width: 600px;
  height: 600px;
  transition: height 0.2s linear, opacity 0.2s linear;
  /* 高度变化的平滑过渡 */
  position: absolute;
  /* 绝对定位 */
  /* 可能还需要添加 top, right, bottom, 或 left 属性来指定位置 */
}

#lainsbody {
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

/* 添加关闭窗口时的过渡效果 */
.window.closing {
  transition: height 0.2s linear, opacity 0.2s linear;
  height: 0;
  /* 或者使用max-height和overflow: hidden来实现更平滑的效果 */
  opacity: 0;
  /* 透明度逐渐变为0 */
}

/* 注意：由于我们使用了v-if或v-show来控制窗口的显示，
   因此实际上不需要在.closing类中添加display: none;
   因为Vue会根据v-if或v-show的值来自动处理display属性。
   但是，如果您想要在页面上保留窗口元素但隐藏它，
   可以使用v-show和opacity属性来控制显示和隐藏，
   并在.closing类中添加opacity: 0;来实现渐隐效果。
   如果您想要完全移除窗口元素，应该使用v-if而不是v-show，
   并在关闭窗口后控制一个变量来决定是否渲染该窗口组件。 */
</style>