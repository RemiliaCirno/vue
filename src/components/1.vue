<script setup>
import AlicePlayer from 'alice-player';

var playList = [{
  audio: 'https://s3-hk.2heng.xin/mstdn/static/alice-player/僕らの手には何もないけど、 - RAM WIRE.mp3',
  cover: 'https://s3-hk.2heng.xin/mstdn/static/alice-player/僕らの手には何もないけど、 - RAM WIRE.jpg',
  lrc: 'https://s3-hk.2heng.xin/mstdn/static/alice-player/僕らの手には何もないけど、 - RAM WIRE.lrc',
  name: '僕らの手には何もないけど、',
  artist: 'RAM WIRE',
}
]

var options = {
  preload: 'metadata',
}

var ap = new AlicePlayer(playList, options)
</script>

<template>
  <div id="app">

  </div>
</template>

<style >
body {
  margin: 0;
  height: 100vh;
  background: #9796f0;
  background: linear-gradient(to right, #fbc7d4, #9796f0);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
