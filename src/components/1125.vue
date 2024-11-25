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
  <div id="buttonstart">
    <div><button @click="showWindow('mymusic')">A Music player</button></div>
    <div><button @click="showWindow('lain')">Just Lain 'GOD'</button></div>
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
function showWindow(windowId: string) {
  // 如果窗口已经是打开状态，则不做任何操作
  if (windowClosingStatus.value[windowId]) {
    windowClosingStatus.value[windowId] = false; // 重置关闭状态
    console.log([windowId] + "被打开了");
    // 可以在这里添加额外的逻辑，比如重置窗口位置等
  }
}
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
  }, 200); // 延迟200毫秒模拟渐隐效果
}

const playOrder = ref<playOrderType>('along');
type playOrderType = 'along' | 'random' | 'loop';

const musicList = ref<musicListType>([
  {
    name: 'NOTOK',
    author: 'ヒトリエ',
    url: '/assets/NOTOK.m4a',
    img: 'http://p2.music.126.net/V89JpcVkGSSZHFpZmZlqzQ==/109951170088068396.jpg?param=130y130',
    lrc: `[00:00.000] 作曲 : wowaka
[00:01.000] 作词 : wowaka
[00:02.000] 编曲 : ヒトリエ
[00:11.729] 戯言たちは風任せ
[00:15.146] 息を呑んだ少女、夢任せ
[00:18.756] 嗚呼、
[00:19.493] 終いにこの街の色も
[00:22.470] 誰も気付かず変わるのでしょう
[00:27.080]
[00:30.638] 振出しまで戻れどまだ
[00:33.672] 息を止めることはできないな
[00:38.084] 誰一人と視得ないのは
[00:41.191] 誰一人あたしじゃないから
[00:45.166]
[00:45.231] 宵闇を切る鴉と
[00:47.318] 朝に怯える声
[00:49.113] もう良いよ、って
[00:50.090] 確かめたくて
[00:51.086] あの娘を探してる
[00:52.805]
[00:52.826] その果てに視た答えを
[00:54.828] この心にくれよ
[00:56.560] それが誰かを
[00:58.346] 傷つけたとしても
[01:00.704]
[01:00.972] それでも人は続く
[01:02.829] 呼吸をやめるまで
[01:04.658] その声を焦がし尽すまで
[01:08.367] あの娘の夢が覚め
[01:10.192] 空が白むのなら
[01:12.115] この戯言だって良いだろう
[01:14.806]
[01:15.595] 数秒で終わる世界を
[01:17.479] 何処までも続けたいんだ
[01:19.408] 正解不正解なんて
[01:21.288] あたしの中にしかないわ
[01:23.651]
[01:39.988] 戯言たちは風任せ
[01:42.907] 嗚呼、
[01:46.709] 息を呑んだ少女、夢任せ
[01:50.467] 嗚呼、
[01:51.745]
[01:54.698] 宵闇を切る鴉と
[01:56.545] 朝に怯える声
[01:58.427] もう良いよ、って
[01:59.312] 確かめたくて
[02:00.392] あの娘を探してる
[02:02.179]
[02:02.254] その果てに視た答えを
[02:04.077] この心にくれよ
[02:05.978] それが誰かを
[02:07.641] 傷つけたとしても
[02:10.535]
[02:13.866] それでも人は続く
[02:15.799] 呼吸をやめるまで
[02:17.699] その声を焦がし尽すまで
[02:21.303] あの娘の夢が覚め
[02:23.303] 空が白むのなら
[02:25.175] この戯言だって良いだろう
[02:28.767]
[02:29.046] それでも人は続く
[02:30.829] 呼吸をやめるまで
[02:32.666] その声を焦がし尽すまで
[02:36.356] あの娘の夢が覚め
[02:38.290] 空が白むのなら
[02:40.167] この戯言だって良いだろう
[02:43.381]
[02:43.473] 数秒で終わる世界を
[02:45.585] 何処までも続けたいんだ
[02:47.414] 正解不正解なんて
[02:49.290] あたしの中にしかないわ
[02:51.201] あたしの中にしかないわ
`
  },
  {
    name: 'Duvet',
    author: 'Bôa',
    url: '/assets/Duvet.m4a',
    img: '/assets/16c.gif',
    lrc: `[00:00.00] 作词 : Jasmine Rodgers
[00:00.50] 编曲 : Bôa
[00:01.01] 作曲 : Lee Sullivan
[00:01.52]And you don't seem to understand
[00:06.17]A shame you seemed an honest man
[00:11.23]And all the fears you hold so dear
[00:16.45]Will turn to whisper in your ear
[00:21.40]And you know what they say might hurt you
[00:24.13]And you know that it means so much
[00:26.55]And you don't even feel a thing
[00:31.48]I am falling, I am fading,
[00:37.17]I have lost it all
[00:40.42]
[00:42.06]And you don't seem the lying kind
[00:47.09]A shame then I can read your mind
[00:52.17]And all the things that I read there
[00:57.42]Candle lit smile that we both share
[01:02.33]And you know I don't mean to hurt you
[01:05.00]But you know that it means so much
[01:07.56]And you don't even feel a thing
[01:12.62]I am falling, I am fading,
[01:18.11]I am drowning,
[01:20.73]Help me to breathe
[01:23.55]I am hurting,I have lost it all
[01:28.45]I am losing
[01:30.94]Help me to breathe
[01:34.02]
[02:14.68]I am falling, I am fading,
[02:19.49]I am drowning,
[02:22.16]Help me to breathe
[02:24.76]I am hurting,I have lost it all
[02:29.90]I am losing
[02:32.32]Help me to breathe
[02:35.19]
[02:55.47]I am falling, I am fading,
[03:00.50]I am drowning,
[03:03.11]Help me to breathe
[03:05.39]I am hurting,I have lost it all
[03:10.82]I am losing
[03:13.25]Help me to breathe
[03:17.35]
`,
  },
  {
    name: '借口',
    author: '周杰伦 ',
    url: '/assets/借口_周杰伦.mp3',
    img: 'https://img4.kuwo.cn/star/albumcover/500/60/74/2971323563.jpg',
    lrc: `public/assets/Duvet.lrc`
  },
  {
    name: 'メイドノココロハ アヤツリドール',
    author: 'あよ',
    url: '/assets/あよ - メイドノココロハ アヤツリドール.flac',
    img: 'http://p1.music.126.net/LeI7B-boLQ1Nz8LWlYrDmg==/109951164912363859.jpg?param=130y130',
    lrc: `public/assets/Duvet.lrc`
  },
]);
</script>

<style scoped>
#mymusic {
  width: 335px;
  height: 230px;
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

#buttonstart {
  display: flex;
  justify-content: flex-end;
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