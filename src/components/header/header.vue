<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="board-wrapper">
      <span class="board-title"></span><span class="board-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
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
    // 来做跟后台数据type对应的样式
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
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

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .header
    color: #fff
    position: relative
    overflow: hidden
    background: rgba(7,17,27,0.5)
    .content-wrapper
      padding: 24px 12px 18px 24px
      // 给父元素加上 font-size: 0 消除子元素的空白间隙
      font-size: 0
      position: relative
      .avatar
        display: inline-block
        vertical-align: top
        img
          border-radius: 2px
      .content
        display: inline-block
        margin-left: 16px
        .title
          margin: 2px 0 8px 0px
          .brand
            display: inline-block
            width: 30px
            height: 18px
            // 使用了mixin中的带DPR查询的方法
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
            // 设置对齐方式 和文字信息对齐
            vertical-align: top
          .name
            margin-left: 6px
            font-size: 16px
            line-height: 18px
            font-weight: bold
        .description
          margin-bottom: 10px
          line-height: 12px
          font-size: 12px
        .support
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 4px
            background-size: 12px 12px
            background-repeat: no-repeat
            // 父样式的各种子样式
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            line-height: 12px
            font-size: 10px
      .support-count
        position: absolute
        right: 12px
        bottom: 8px
        padding: 0 8px
        height: 24px
        line-height: 24px
        border-radius: 14px
        background-color: rgba(0,0,0,0.2)
        text-align: center
        .count
          font-size: 10px
          vertical-align: top
          line-height: 24px
        .icon-keyboard_arrow_right
          font-size: 10px
          line-height: 24px
          margin-left: 2px
    .board-wrapper
      position: relative
      height: 28px
      line-height: 28px
      padding: 0 22px 0 12px
      background: rgba(7,17,27,0.2)
      // 超出文本显示 ... 的复合属性
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      .board-title
        display: inline-block
        vertical-align: top
        margin-top: 7px
        width: 22px
        height: 12px
        bg-image('bulletin')
        // size拼错了 没报错 但是样式没渲染上
        background-size: 22px 12px
        background-repeat: no-repeat
      .board-text
        vertical-align: top
        margin:0 2px
        font-size: 10px
      .icon-keyboard_arrow_right
        position: absolute
        font-size: 10px
        right: 10px
        top: 8px
    .background
      position: absolute
      left: 0
      top: 0
      width: 100%
      z-index: -1
      // 滤镜产生模糊效果
      filter: blur(10px)
</style>