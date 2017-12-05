<template>
  <div id="app">
    <v-header></v-header>
    <tab></tab>
    <keep-alive>
      <router-view :seller="seller"/>
    </keep-alive>
  </div>
</template>

<script>
import header from './components/header/header.vue'
import Tab from './components/tab/tab.vue'
import {getSellerData} from './common/js/getApiData.js'
import {urlParse} from './common/js/util.js'

const ERR_OK = 0

export default {
  name: 'app',
  data() {
    return {
      seller: {
        // 添加立即执行函数 在URL中添加商家对应ID
        // http://localhost:8080/goods?id=12345/seller
        id: (() => {
          let queryParam = urlParse()
          console.log(queryParam)
          return queryParam.id
        })()
        // 其实可以在 vue-router 跳转到商家页的时候传递参数
        // 使用 this.$router.push({
        //        path: `/seller/${seller.id}`
        //      })
        // 执行 this.setSeller(seller) 使用vuex管理
      }
    }
  },
  mounted() {
    this._getSellerData()
  },
  components: {
    // 不能直接使用header 和原生的 h5标签 冲突
    'v-header': header,
    Tab
  },
  methods: {
    _getSellerData() {
      getSellerData().then((res) => {
        if (res.errno === ERR_OK) {
          this.seller = res.data
          console.log('seller:')
          console.log(this.seller)
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  // vue-loader 带有的 postcss 插件 会自动解决大部分浏览器兼容问题  
  // 将 localhost 改为 本机ip地址 然后上 草料网 复制地址生成二维码 在同个局域网内的手机可以扫描二维码看结果
  // window下是 cmd --> ipconfig wifi连接就是IPv4地址
  // z-index整合: header页: header detail蒙层: 100 / good页: menu-item&current: 10 / shopcart: 50 ball: 200 shopcartlist: -1 list-wrapper: 40 / food页: 30
</style>
