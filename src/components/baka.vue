<template>
    <div class="container" ref="container" @click="handleFirstInteraction" @click.stop="spawnImage">
        <!-- 弹跳动画元素 -->
        <button v-if="!isPlaying" class="fixed top-4 left-4 p-2 bg-blue-500 text-white rounded" @click.stop="spawnImage">
            Baka? baka!
        </button>
        <!-- <div style="display: flex; flex-direction: column; justify-content: flex-end;transition: height 0.5s cubic-bezier(0.42, 0, 0, 0.97)"
            :style="{ height: `${bodyHeight - 17}px` }">
            <BottomComponent></BottomComponent>
        </div> -->
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
// import BottomComponent from "./bottom.vue";
// 音频控制逻辑
const audio = ref(null)
const hasInteracted = ref(false)
const isPlaying = ref(false)
import {
    onBeforeRouteUpdate,
    onBeforeRouteLeave
} from 'vue-router'



// 离开路由时清理资源
onBeforeRouteLeave(() => {
    clearInterval(autoSpawnTimer)
    images.value.forEach(img => container.value.removeChild(img.element))
    images.value = []
})
const resetState = () => {
    clearInterval(autoSpawnTimer)
    images.value.forEach(img => container.value.removeChild(img.element))
    images.value = []
    startAutoSpawn() // 重新启动自动生成
    update()         // 重启动画循环
}

// 初始化音频（兼容浏览器策略）
onMounted(() => {
    if (!audio.value) {
        audio.value = new Audio('assets/11122.mp3')
        audio.value.loop = true
        audio.value.muted = true
        audio.value.autoplay = false
    }
})

// 处理首次交互
const handleFirstInteraction = async () => {
    if (hasInteracted.value) return;
    hasInteracted.value = true;

    try {
        audio.value.muted = false;
        await audio.value.play(); // 用户点击后播放
        isPlaying.value = true;
    } catch (err) {
        console.error('音频播放失败:', err);
    }
};

// 容器引用
const container = ref(null)
// 存储所有活动图片
const images = ref([])

// 物理参数
const gravity = 0.5
const damping = 0.8
const airResistance = 0.98

// 生成随机初始值
const random = (min, max) => Math.random() * (max - min) + min

// 创建新图片元素
const createImage = () => {
    const img = new Image()
    img.src = 'assets/clickwu.jpg' // 替换为你的GIF地址
    img.className = 'bouncing-image'
    return img
}

// 生成新动画
const spawnImage = () => {
    const newImage = {
        element: createImage(),
        x: random(0, window.innerWidth - 100),
        y: random(-200, -100),
        vx: random(-5, 5),
        vy: random(2, 5),
        scale: random(0.5, 1.2),
        rotation: random(-15, 15)
    }

    // 添加样式
    Object.assign(newImage.element.style, {
        position: 'fixed',
        width: `${80 * newImage.scale}px`,
        transform: `rotate(${newImage.rotation}deg)`
    })

    container.value.appendChild(newImage.element)
    images.value.push(newImage)
}

// 动画帧更新
const update = () => {
    images.value.forEach((img, index) => {
        // 更新物理参数
        img.vy += gravity
        img.vx *= airResistance
        img.vy *= airResistance

        // 更新位置
        img.x += img.vx
        img.y += img.vy

        // 边界碰撞检测
        if (img.x < 0) {
            img.x = 0
            img.vx = -img.vx * damping
        }
        if (img.x > window.innerWidth - img.element.offsetWidth) {
            img.x = window.innerWidth - img.element.offsetWidth
            img.vx = -img.vx * damping
        }
        if (img.y > window.innerHeight - img.element.offsetHeight) {
            img.y = window.innerHeight - img.element.offsetHeight
            img.vy = -img.vy * damping
        }

        // 应用变换
        img.element.style.left = `${img.x}px`
        img.element.style.top = `${img.y}px`
        img.element.style.transform = `rotate(${img.rotation += img.vx}deg)`

        // 移除超出边界的元素
        if (img.y > window.innerHeight * 1.5) {
            container.value.removeChild(img.element)
            images.value.splice(index, 1)
        }
    })

    requestAnimationFrame(update)
}

// 自动生成动画
let autoSpawnTimer
const startAutoSpawn = () => {
    autoSpawnTimer = setInterval(spawnImage, 2000)
}

// 生命周期
onMounted(() => {
    startAutoSpawn()
    update()
})

onBeforeUnmount(() => {
    clearInterval(autoSpawnTimer)
    images.value.forEach(img => container.value.removeChild(img.element))
})
</script>

<style scoped>
.container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

.bouncing-image {
    pointer-events: none;
    user-select: none;
    transition: transform 0.1s;
}

button {
    z-index: 999;
    cursor: pointer;
    transition: transform 0.2s;
}

button:hover {
    transform: scale(1.1);
}
</style>