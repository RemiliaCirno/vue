<template>
    <div>
        <startmenu :isOpen="isMenuOpen" />
        <div class="taskbar">
            <button id="start" @click="toggleMenu" class="start-button" style="padding: 0; font-size: 17px;">
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
import startmenu from "./StartMenu.vue"
import { ref, onMounted, defineEmits } from 'vue';


const systemtime = ref(new Date().toLocaleString());

function updateSystemTime() {
    systemtime.value = new Date().toLocaleString();
}

onMounted(() => {
    updateSystemTime();
    setInterval(updateSystemTime, 1000);
});

const isMenuOpen = ref(false);

function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value;
}
</script>

<style>
.taskbar {
    position: relative;
    z-index: 999;
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
    justify-content: center;
    /* 水平方向居中 */
    align-items: center;
    /* 垂直方向居中 */
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 3px;
}
</style>
