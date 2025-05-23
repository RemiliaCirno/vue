import './style.css';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 引入组件
import lbAudio from 'lb-audio-v3';

// 引入组件样式
import 'lb-audio-v3/style'

const app = createApp(App);
app.use(router)
// 全局注册组件
app.use(lbAudio);                // 注册组件需要在 mount(挂载) 之前哦

app.mount('#app')