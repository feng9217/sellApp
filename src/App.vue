<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab">
      <router-link tag="div" class="tab-item" to="/goods">
        <span>商品</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/ratings">
        <span>评价</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/seller">
        <span>商家</span>
      </router-link>
    </div>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import header from './components/header/header.vue'
export default {
  name: 'app',
  components: {
    // 不能直接使用header 和原生的 h5标签 冲突
    'v-header': header
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  // vue-loader 带有的 postcss 插件 会自动解决大部分浏览器兼容问题
  #app
    .tab
      display: flex
      width: 100%
      // 设计稿高度80px 设备上是375px 物理像素750px
      // 所以设计稿也是按两倍标记的 码的时候知道就行
      height: 40px
      line-height: 40px
      .tab-item
        flex: 1
        text-align: center
</style>
