import './style.css';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 引入组件
import lbAudio from 'lb-audio-v3';

// 引入组件样式
import 'lb-audio-v3/style'

const app = createApp(App);

// 全局注册组件
app.use(lbAudio);                
app.use(router);
app.mount('#app')