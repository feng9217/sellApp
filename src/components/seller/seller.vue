<template>
  <div class="seller">
    {{seller.name}}
  </div>
</template>

<script type="text/javascript">
  // import {getSellerData} from '../../common/js/getApiData.js'
  // 更改 seller 来源 在初始页获取 经router-view传递 由:prop接收
  // 由于需要多次使用 所以不能多次获取 太浪费资源了

  // const ERR_OK = 0

  export default {
    props: {
      seller: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    mounted() {
      this.checkSeller()
    },
    methods: {
      // _getSellerData() {
      //   getSellerData().then((res) => {
      //     if (res.errno === ERR_OK) {
      //       this.seller = res.data
      //       // console.log('seller:')
      //       // console.log(this.seller)
      //     }
      //   })
      // }
      checkSeller() {
        // check got seller or not from tab
        console.log(this.seller)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>