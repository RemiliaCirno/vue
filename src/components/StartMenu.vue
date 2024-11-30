<template>
    <div v-if="isOpen" class="window" id="start-menu-up">
        <div class="title-bar" id="start-menu-title-bar">
            <span class="start-menu-title">WDNMD 98 Simulator for NAVI</span>
        </div>
        <div id="buttonstart">
            <div><button @click="closeWindow('mymusic')">A Music player</button></div>
            <div><button @click="closeWindow('lain')">Just Lain 'GOD'</button></div>
        </div>
    </div>
</template>

<script setup>
import "98.css"
import { defineProps, inject } from 'vue';
const props = defineProps({
    isOpen: Boolean
});

//下面为控制window的开启
const updateWindowStatus = inject('updateWindowStatus');

// 关闭窗口的函数
function closeWindow(windowId) {
    updateWindowStatus(windowId, false);
    // 可以在这里添加额外的逻辑，比如关闭窗口的动画效果
}
</script>

<style scoped>
#start-menu-up {
    display: grid;
    position: relative;
    height: 300px;
    width: 200px;
    z-index: 9999;
    /* 确保菜单在其他内容之上显示 */
    border-radius: 5px;
    /* 可选：为菜单添加圆角 */
    overflow: hidden;
    /* 防止内容溢出 */
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
</style>
