// vue.config.js

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
module.exports = {
  plugins: [vue()],
  // 基本路径
  publicPath: './',

  // 输出文件目录
  outputDir: 'dist',

  // 静态资源目录
  assetsDir: 'public',

  // html的输出路径
  indexPath: 'index.html',

  // 是否在保存时使用‘eslint-loader’进行检查
  lintOnSave: true,

  // 是否使用带有浏览器内编译器的完整版Vue构建
  runtimeCompiler: true,

  // 默认情况下babel-loader忽略其中的node_modules文件

  transpileDependencies: [],

  // 生成生产环境sourceMap
  productionSourceMap: true,

  // 配置webpack-dev-server行为
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: null, // 设置代理
    before: app => { }
  },

  // CSS相关选项
  css: {
    // 是否使用css分离插件
    extract: true,
    // 开启css source maps
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true
  },

  // PWA 插件相关配置
  pwa: {},

  // 第三方插件配置
  pluginOptions: {
    // ...
  }
}
