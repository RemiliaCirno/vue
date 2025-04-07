<template>
    <div>
        <div>
            <div class="title-bar">
                <div class="title-bar-text">WDNMD 98 Simulator for NAVI</div>
                <div class="title-bar-controls">
                </div>
            </div>
        </div>
        <!-- wubaka -->
        <div v-if="windowShow.baka" class="window" :class="{ 'closing': windowClosingStatus.baka }"
            :style="{ top: `${position.baka.y}px`, left: `${position.baka.x}px`, 'z-index': zIndexvalue.baka }"
            @mousedown.stop="changeZIndex('baka', 1)" id="baka">
            <div class="title-bar" @mousedown.stop="startDrag('baka', $event)"
                @touchstart.stop="startTouchDrag('baka', $event)">
                <div class="title-bar-text">五狸子抱baka，试试点击baka</div>
                <div class="title-bar-controls">
                    <button aria-label="Close" @click="changeZIndex('baka', -1); closeWindow('baka')"></button>
                </div>

            </div>
            <div class="window-body" id="bakabody">
                <img src="/assets/wubaka.jpg" alt="baka" style="width: 300px; height: auto;" @click.stop="goToBaka">
            </div>
        </div>
        <!-- player -->
        <div v-if="windowShow.mymusic" class="window" :class="{ 'closing': windowClosingStatus.mymusic }"
            :style="{ top: `${position.mymusic.y}px`, left: `${position.mymusic.x}px`, height: dynamicHeight + 'px', 'z-index': zIndexvalue.mymusic }"
            @mousedown.stop="changeZIndex('mymusic', 1)" id="mymusic">

            <div class="title-bar" @mousedown.stop="startDrag('mymusic', $event)"
                @touchstart.stop="startTouchDrag('mymusic', $event)">
                <div class="title-bar-text">A Music player</div>
                <div class="title-bar-controls">
                    <button aria-label="Close" @click="changeZIndex('mymusic', -1); closeWindow('mymusic')"></button>
                </div>
            </div>
            <div class="window-body">
                <lbAudio :musicList="musicList" :index="0" :volume="10" :lyrics="false" :playList="true"
                    style="background: silver;" id="playe">
                </lbAudio>
            </div>
        </div>
        <!-- lain -->
        <div v-if="windowShow.lain" class="window" :class="{ 'closing': windowClosingStatus.lain }"
            :style="{ top: `${position.lain.y}px`, left: `${position.lain.x}px`, 'z-index': zIndexvalue.lain }"
            @mousedown.stop="changeZIndex('lain', 1)" id="lain">
            <div class="title-bar" @mousedown.stop="startDrag('lain', $event)"
                @touchstart.stop="startTouchDrag('lain', $event)">
                <div class="title-bar-text">Lain looking your</div>
                <div class="title-bar-controls">
                    <button aria-label="Close" @click="changeZIndex('lain', -1); closeWindow('lain')"></button>
                </div>

            </div>
            <div class="window-body" id="lainsbody">
                <img src="/assets/16c.gif" alt="G O D" style="margin-top: 30px;width: 630px; height: auto;">
            </div>
        </div>
        <!-- game -->
        <div v-if="windowShow.game" class="window" :class="{ 'closing': windowClosingStatus.game }"
            :style="{ top: `${position.game.y}px`, left: `${position.game.x}px`, 'z-index': zIndexvalue.game }"
            @mousedown.stop="changeZIndex('game', 1)" id="game">
            <div class="title-bar" @mousedown.stop="startDrag('game', $event)"
                @touchstart.stop="startTouchDrag('game', $event)">
                <img src="/assets/icos/joystick-5.png" alt="" style="width: 16px;height: 16px;margin-left: 5px;">
                <div class="title-bar-text">STG Game</div>
                <div class="title-bar-controls">
                    <button aria-label="Close" @click="changeZIndex('game', -1); closeWindow('game')"></button>
                </div>
            </div>
            <div class="window-body" style="margin: 1px;">
                <iframe src="/assets/test-1.html" frameborder="0" id="stg"></iframe>
            </div>
        </div>
        <!-- touhougame -->
        <div v-if="windowShow.touhoustg" class="window" :class="{ 'closing': windowClosingStatus.touhoustg }"
            :style="{ top: `${position.touhoustg.y}px`, left: `${position.touhoustg.x}px`, 'z-index': zIndexvalue.touhoustg }"
            @mousedown.stop="changeZIndex('touhoustg', 1)" id="touhoustggame">
            <div class="title-bar" @mousedown.stop="startDrag('touhoustg', $event)"
                @touchstart.stop="startTouchDrag('touhoustg', $event)">
                <img src="/assets/icos/joystick-5.png" alt="" style="width: 16px;height: 16px;margin-left: 5px;">
                <div class="title-bar-text">Touhou like</div>
                <div class="title-bar-controls">
                    <button aria-label="Close" @click="changeZIndex('touhoustg', -1); closeWindow('touhoustg')"></button>
                </div>
            </div>
            <div class="window-body" style="margin: 1px;">
                <iframe src="/assets/touhoulike.html" frameborder="0" id="touhoustg"></iframe>
            </div>
        </div>
        <!-- <div id="buttonstart">
    <div><button @click="showWindow('mymusic')">A Music player</button></div>
    <div><button @click="showWindow('lain')">Just Lain 'GOD'</button></div>
  </div> -->
        <div style="display: flex; flex-direction: column; justify-content: flex-end;transition: height 0.5s cubic-bezier(0.42, 0, 0, 0.97)"
            :style="{ height: `${bodyHeight - 17}px` }">
            <BottomComponent></BottomComponent>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter()
import BottomComponent from "./bottom.vue";
import "98.css"
// import AudioPlayer from 'vue3-audio-player'
// import 'vue3-audio-player/dist/style.css'
import lbAudio, { type musicListType } from 'lb-audio-v3';
import 'lb-audio-v3/style'

import { ref, onMounted, onBeforeUnmount, computed, provide } from 'vue';
const goToBaka = () => {

    router.push({ name: 'Baka' })
}
const bodyHeight = ref(0);

const updateBodyHeight = () => {
    bodyHeight.value = window.innerHeight; // 或者使用 offsetHeight 或 clientHeight
};

onMounted(() => {
    // 在 Vue 实例挂载到 DOM 后获取初始高度
    updateBodyHeight();

    // 如果页面内容会动态变化，您可以在这里设置事件监听器
    // 例如，监听窗口的 resize 事件来更新高度
    window.addEventListener('resize', updateBodyHeight);
});

onBeforeUnmount(() => {
    // 移除在 onMounted 中添加的事件监听器，以避免内存泄漏
    window.removeEventListener('resize', updateBodyHeight);
});

const zIndexvalue = ref({
    baka: 11,
    mymusic: 9,
    lain: 8,
    game: 10,
    touhoustg: 11,
});

let maxZIndex = 0;
let minZIndex = Infinity;

const updateMaxZIndex = () => {
    maxZIndex = Math.max(...Object.values(zIndexvalue.value)); // 找最大zindex
};

const changeZIndex = (id, newIndex) => {
    const element = document.getElementById(id);
    if (element) {
        updateMaxZIndex();
        let newZIndex = (newIndex != "-1") ? maxZIndex + 1 : maxZIndex - 3;
        element.style.zIndex = newZIndex.toString(); // 更新 z-index of the element
        console.log(`New z-index for element with id "${id}": ${newZIndex}`);
        zIndexvalue.value[id] = newZIndex;
    } else {
        console.error(`Element with id "${id}" not found.`);
    }
};

// 窗口位置，现在使用对象来存储每个窗口的位置
interface WindowPosition {
    x: number;
    y: number;
    height?: string;
}
const position = ref<Record<string, WindowPosition>>({
    baka: { x: 10, y: 40 },
    mymusic: { x: 10, y: 30 },
    lain: { x: 200, y: 100 },
    game: { x: 10, y: 200 },
    touhoustg: { x: 200, y: 15 },
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
        changeZIndex(windowName, 1);
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
        changeZIndex(windowName, 1);
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
    baka: boolean;
    mymusic: boolean;
    lain: boolean;
    closeMusic(): void;  // 添加一个方法
}
const windowShow = ref({
    baka: true,
    mymusic: false,
    lain: true,
    game: true,
    touhoustg: true
});
const windowClosingStatus = ref({
    baka: false,
    mymusic: true,
    lain: false,
    game: false,
    touhoustg: false
});
// 定义一个函数来更新窗口状态
function updateWindowStatus(windowId, status) {
    windowShow.value[windowId] = true;
    setTimeout(() => {
        windowClosingStatus.value[windowId] = status;
        changeZIndex(windowId, 1);
        console.log(`${windowId} 已打开`);
    }, 200)
}

// 使用provide将windowStatus和updateWindowStatus提供给后代组件
provide('windowClosingStatus', windowClosingStatus);
provide('updateWindowStatus', updateWindowStatus);

function closeWindow(windowId: string) {
    windowClosingStatus.value[windowId] = true;
    position.value[windowId].height = '0px';
    // 使用setTimeout模拟渐隐效果结束后的操作
    setTimeout(() => {
        windowShow.value[windowId] = false;
        console.log(`${windowId} 已关闭`);
    }, 201);
}

const playOrder = ref<playOrderType>('along');
type playOrderType = 'along' | 'random' | 'loop';

const musicList = ref<musicListType>([
    {
        name: 'NOTOK',
        author: 'ヒトリエ',
        url: '/assets/NOTOK.m4a',
        img: 'http://p2.music.126.net/V89JpcVkGSSZHFpZmZlqzQ==/109951170088068396.jpg?param=130y130',
        lrc: `
[00:00.000] 作曲 : wowaka
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
        lrc: `
[00:00.00] 作词 : Jasmine Rodgers
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
//自动增加窗口长度来适配歌曲列表，超过6歌按6歌算
const dynamicHeight = computed(() => {
    const maxGroups = 6; // 最大组数（或歌曲数）
    const actualGroups = Math.min(musicList.value.length, maxGroups); // 实际用于计算的组数
    // 默认高度为100px，每个音乐组增加32px
    return 100 + (actualGroups * 32);
});
</script>

<style scoped>
#baka {
    background-image: url(/assets/bg_main2.gif);
    /* background-repeat: repeat;
  /* 图片将水平和垂直重复 */
    background-color: #d2738a;
    /* 当图片未覆盖时显示的背景颜色 */
    color: #c1b492;
    width: 300px;
    height: 321px;
    transition: heigt 0.2s linear, opacity 0.2s linear;
    /* 高度变化的平滑过渡 */
    position: absolute;
    /* 绝对定位 */
    /* 可能还需要添加 top, right, bottom, 或 left 属性来指定位置 */
}

#bakabody {
    margin: 0;
    image-rendering: pixelated;
    background-size: auto;
}

#mymusic {
    width: 335px;
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

#game {
    padding: 0;
    margin: 0;
    color: #c1b492;
    width: 300px;
    height: 600px;
    transition: height 0.2s linear, opacity 0.2s linear;
    position: absolute;
    box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, inset -2px -2px grey, inset 2px 2px #fff;
}

#stg {
    width: 300px;
    height: 577px;
    box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, inset -2px -2px grey, inset 2px 2px #fff;
}

#touhoustggame{
    position: absolute;
    width: 500px;
    height: 600px;
}

#touhoustg{
    width: 500px;
    height: 577px;
}

#lainsbody {
    image-rendering: pixelated;
    background-size: auto;
}

#buttonstart {
    display: flex;
    justify-content: flex-end;
}




/* 添加关闭窗口时的过渡效果 */
.window.closing {
    transition: height 0.2s linear, opacity 0.2s linear;
    height: 0;
    /* 或者使用max-height和overflow: hidden来实现更平滑的效果 */
    opacity: 0;
    /* 透明度逐渐变为0 */
}
</style>