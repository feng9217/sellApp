<template>
  <div id="app">
    <v-header></v-header>
    <tab></tab>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import header from './components/header/header.vue'
import Tab from './components/tab/tab.vue'

export default {
  name: 'app',
  components: {
    // 不能直接使用header 和原生的 h5标签 冲突
    'v-header': header,
    Tab
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  // vue-loader 带有的 postcss 插件 会自动解决大部分浏览器兼容问题  
  // 将 localhost 改为 本机ip地址 然后上 草料网 复制地址生成二维码 在同个局域网内的手机可以扫描二维码看结果
  // window下是 cmd --> ipconfig wifi连接就是IPv4地址
  // z-index整合: header页: header: -10 蒙层: 10 / tab: -10 / good页: -20 menu-item: -20 &current: -10 / shopcart: 100 ball: 200 list: -1 / food页: 20
</style>
