<template>
    <div>
        <div v-if="showMenu" class="start-menu-overlay">
            <StartMenu @close="toggleMenu" />
        </div>
        <div class="taskbar">
            <button id="start" @click="toggleMenu" style="padding: 0; font-size: 17px;">
                <img src="/assets/d98.png" alt="" style="margin-left: 5px; width: 20px; height: 20px; float: inline-start;">
                start
            </button>
            <div class="container">
                <input id="text21" disabled type="text" :value="systemtime" style="text-align: center; color: #000;">
            </div>
        </div>
    </div>
</template>

<script setup>
import "98.css"; // 确保正确导入了CSS文件
import StartMenu from './StartMenu.vue';
import { ref, onMounted } from 'vue';

const showMenu = ref(false);
const systemtime = ref(new Date().toLocaleString());

function updateSystemTime() {
    systemtime.value = new Date().toLocaleString();
}

function toggleMenu() {
    showMenu.value = !showMenu.value;
}

onMounted(() => {
    updateSystemTime();
    setInterval(updateSystemTime, 1000);
});
</script>

<style>
.taskbar {
    position: relative;
    z-index: 9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: silver;
    width: 100%;
    height: 27px;
    box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px grey, inset 2px 2px #dfdfdf;
}

#start {
    min-height: 0px;
    height: 20px;
    margin-left: 3px;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 3px;
}

.start-menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    /* 确保菜单在其他内容之上 */
}

/* 可以为 StartMenu 组件添加额外的样式以适应覆盖层 */
</style>
