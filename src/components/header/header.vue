<template>
  <div class="header">
    this is header
  </div>
</template>

<script type="text/javascript">
import {getSellerData} from '../../common/js/getData.js'

const ERR_OK = 0

export default {
  // 不能和h5原生标签重名 会弹警告的
  name: 'v-header',
  data() {
    return {
      seller: {}
    }
  },
  mounted() {
    this._getSellerData()
  },
  methods: {
    _getSellerData() {
      getSellerData().then((res) => {
        if (res.errno === ERR_OK) {
          this.seller = res.data
          console.log(this.seller)
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>