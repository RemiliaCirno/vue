<template>
    <div v-if="isOpen" class="window" id="start-menu-up">
        <div class="title-bar" id="start-menu-title-bar">
            <span class="start-menu-title">WDNMD 98 Simulator for NAVI</span>
        </div>
        <div id="buttonstart">
            <div><button @click="closeWindow('mymusic')" class="Music">
                    <img src="/assets/icos/wm-4.png" alt="">
                    <div>A Music player</div>
                </button>
            </div>
            <div>
                <button @click="closeWindow('lain')" class="God">
                    <img src="/assets/icos/computer_explorer_cool-0.png" alt="">
                    <div>Just Lain'GOD'</div>
                </button>
            </div>
            <div>
                <button @click="closeWindow('game')" classs="Game">
                    <img src="/assets/icos/joystick-5.png" alt="">
                    <div>A STG Game</div>
                </button>
            </div>
            <div class="Refresh">
                <button @click="reload()" class="re">
                    <img src="/assets/icos/msg_error-0.png" alt="">
                    <div>Refresh</div>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import "98.css"
import { defineProps, inject } from 'vue';
const props = defineProps({
    isOpen: Boolean
});

//下面为控制窗口的开启
const updateWindowStatus = inject('updateWindowStatus');

// 打开窗口的函数
function closeWindow(windowId) {
    updateWindowStatus(windowId, false);
}
function reload() {
    location.reload()
}
</script>

<style scoped>
#start-menu-up {
    display: grid;
    position: relative;
    height: 300px;
    width: 200px;
    z-index: 9999;
    border-radius: 5px;
    overflow: hidden;
    justify-content: end;
}

#start-menu-title-bar {
    font-size: large;
    color: silver;
    padding: 5px;
    transform: rotate(270deg);
    width: 296px;
    height: 30px;
    transform-origin: left top;
    position: absolute;
    top: 308px;
    left: 3px;
    box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, inset -2px -2px grey, inset 2px 2px #fff;
}

.start-menu-title {
    font-weight: bold;
}

button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 8px;
}

button {
    font-size: small;
    width: 159px;
    height: 40px;
    text-align: left;
    transition: background-color 0.3s ease;
}

button:hover {
    color: silver;
    text-align: center;
    background-color: #1d50be;
}

img {
    width: 25px;
    height: 25px;
    flex-shrink: 0;
}

.Refresh {
    margin-top: 140px;
}
</style>
