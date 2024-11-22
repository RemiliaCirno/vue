<template>
  <lbAudio class="d" :musicList="musicList" :index="0" :lyrics="false" :playList="true"></lbAudio>
</template>

<script setup lang="ts">
// 引入组件
import lbAudio, { type musicListType } from 'lb-audio-v3';

// 引入组件样式
import 'lb-audio-v3/style'
import { ref } from 'vue';

const playOrder = ref<playOrderType>('along');
type playOrderType = 'along' | 'random' | 'loop';
const musicList = ref<musicListType>([
  {
    name: '僕らの手には何もないけど、',
    author: 'RAM WIRE',
    url: './src/assets/Vite App.mp3',
    img: './src/assets/RAM WIRE.jpg',
    lrc: ``
  },
  {
    name: '啊啊啊，灵梦你在这里干什么啊',
    author: '9',
    url: './src/assets/啊啊啊，灵梦你在这里干什么啊.wav',
    img: './src/assets/1.png',
    lrc: ``
  },
  {
    name: '我没有帮饲养员抢到bw的票啊',
    author: 'Reimu ',
    url: './src/assets/我没有帮饲养员抢到bw的票啊.wav',
    img: './src/assets/1.png',
    lrc: ``
  },

]);
</script>
<style >
.d {
  margin: auto;
  margin-top: 20%;
  border-radius: 15px;
}
</style>