<!-- BootLoader.vue -->
<template>
    <div class="boot-screen" @keydown.esc="skipBoot">
        <div class="boot-container">
            <img src="/assets/d98.png" alt="windows98logo" style="width: 400px;margin-left: 9%;">
            <h1>Windows 98</h1>
            <h3> Simulator for NAVI</h3>
            <div class="status-text">{{ currentStatus }}</div>
            <div class="progress-bar">
                <div v-for="(_, index) in segments" :key="index"
                    :class="['progress-segment', { active: index < progress }]"></div>
            </div>
        </div>
        <div class="copyright">© {{ new Date().getFullYear() }} lain.thallo.world</div>

        <audio ref="audioRef" :src="beepAudio"></audio>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

// 音频配置（需替换实际base64数据）
const beepBase64 = 'UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YV9vT18KAAAADAAIABgAHAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAKAAAADAAIABgAHAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAKAAAADAAIABgAHAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAKAAAADAAIABgAHAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAA='
const beepAudio = `data:audio/wav;base64,${beepBase64}`

// 响应式状态
const progress = ref(0)
const currentStatus = ref('Starting Windows 98...')
const audioRef = ref(null)
const bootTimer = ref(null)

// 常量配置
const MESSAGES = [
    "Checking system files...",
    "Loading NAVI drivers...",
    "Initializing NAVI hardware...",
    "Starting Gen 6th network services...",
    "Preparing desktop environment..."
]
const TOTAL_SEGMENTS = 15

// 计算属性
const segments = computed(() => Array(TOTAL_SEGMENTS).fill(null))

// 路由实例
const router = useRouter()

// 方法
const playBeep = () => {
    if (audioRef.value) {
        audioRef.value.currentTime = 0
        audioRef.value.play()
    }
}

const updateStatus = () => {
    currentStatus.value = MESSAGES[Math.floor(Math.random() * MESSAGES.length)]
}

const startBooting = () => {
    const boot = () => {
        if (progress.value < TOTAL_SEGMENTS) {
            playBeep()
            progress.value++

            if (progress.value % 4 === 0) {
                updateStatus()
            }

            const delay = Math.random() * 300 + 100
            bootTimer.value = setTimeout(boot, delay)
        } else {
            currentStatus.value = "Welcome to lain.thallo.world..."
            setTimeout(() => {
                router.push('/main')
            }, 2000)
        }
    }

    bootTimer.value = setTimeout(boot, 1500)
}

const skipBoot = () => {
    clearTimeout(bootTimer.value)
    router.push('/main')
}

// 生命周期
onMounted(() => {
    startBooting()
    window.addEventListener('keydown', handleKeyPress)
})

onBeforeUnmount(() => {
    clearTimeout(bootTimer.value)
    window.removeEventListener('keydown', handleKeyPress)
})

// 键盘事件处理
const handleKeyPress = (e) => {
    if (e.key === 'Escape') {
        skipBoot()
    }
}
</script>

<style scoped>
/* 保持之前的样式不变 */
.boot-screen {
    margin: 0;
    padding: 0;
    background-color: #008080;
    color: white;
    font-family: 'Courier New', monospace;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: wait;
}

.boot-container {
    width: 80%;
    max-width: 600px;
}

.progress-bar {
    border: 2px solid white;
    padding: 2px;
    margin: 20px 0;
    display: flex;
    flex-wrap: wrap;
}

.progress-segment {
    width: 24px;
    height: 24px;
    margin: 2px;
    background-color: #C0C0C0;
    transition: background-color 0.3s;
}

.progress-segment.active {
    background-color: #FFFFFF;
}

.status-text {
    font-size: 1.2em;
    margin: 10px 0;
    min-height: 1.5em;
}

.copyright {
    position: fixed;
    bottom: 10px;
    font-size: 0.8em;
}

/* CRT 效果 */
.boot-screen::after {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.2) 50%);
    background-size: 100% 2px;
    pointer-events: none;
    animation: scanline 6s linear infinite;
}

@keyframes scanline {
    from {
        transform: translateY(-100%);
    }

    to {
        transform: translateY(100%);
    }
}
</style>