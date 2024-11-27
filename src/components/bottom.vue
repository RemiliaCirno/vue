<template>
    <div class="bo">
        <button id="start" style="padding: 0;font-size: 17px;"><img src="/assets/d98.png" alt="" style="margin-left: 5px; width: 20px;height: 20px;;float: inline-start;">start</button>
        <div class="container"><input id="text21" disabled type="text" value={systemtime} style="text-align: center;"></div>
    </div>
</template>
<script setup>
import "98.css"
function updateSystemTime() {
            var currentTime = new Date().toLocaleString(); // 获取当前时间字符串
            document.getElementById('text21').value = currentTime; // 更新输入框的值
        }

        window.onload = function() {
            // 页面加载时先设置一次时间
            updateSystemTime();

            // 每秒更新一次时间
            setInterval(updateSystemTime, 1000);
        };
</script>

<style>
.bo {
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: space-between; /* 子元素之间分配空间 */
  align-items: center; /* 垂直居中子元素 */
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
  display: flex; /* 使 .container 成为 Flex 容器 */
  justify-content: center; /* 水平居中子元素 */
  align-items: center; /* 垂直居中子元素 */
  margin-right: 3px;
}

</style>