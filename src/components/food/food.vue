<template>
  <transition name="slide">
  <div class="food" v-show="showFlag">
    <div class="food-content">
      <div class="image-header">
        <img :src="food.image">
        <div class="back-wrapper" @click="hide">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}份</span>
          <span class="rating">好评率{{food.rating}}%</span>
        </div>
        <div class="price">
          <span class="now">¥{{food.price}}</span>
          <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
        </div>
      </div>
    </div>
  </div>
  </transition>
</template>

<script type="text/javascript">
  // question: 图片加载是个异步过程 刚开始没有内容高 加载后有宽高 撑起了DOM的高度 看起来像屏幕产生了抖动 如何不做限制的加载图片 不能限制宽高 但也不能因为图片加载过程宽高变化让屏幕产生抖动
  // solution: 通过CSS的奇淫技巧 把宽高都设置好
  export default {
    created() {
      // console.log('food:')
      // console.log(this.food)
    },
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false
      }
    },
    methods: {
      show() {
        this.showFlag = true
      },
      hide() {
        this.showFlag = false
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .food
    position: fixed
    left: 0
    top: 0
    right: 0
    bottom: 48px
    width: 100%
    backgroud: #fff
    &.slide-enter-active,&.slide-leave-active
      transition: all 0.3s linear
    &.slide-enter,&.slide-leave-to
      // 从右向左划入
      // translate3D(x,y,z)
      transition: all 0.3s linear
      transform: translate3D(100%, 0, 0)
    .image-header
      position: relative
      width: 100%
      height: 0
      // 给padding设100%时 是相对盒子宽度计算的百分比 这样设定就形成了一个宽高相等的容器
      padding-top: 100%
      // 实现加载前就把图片宽高限制好
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back-wrapper
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_lift
          display: block
          padding: 10px
          font-size: 20px
          color: #fff
    .content
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7,17,27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        font-size: 0
        .sell-count, .rating
          font-size: 10px
          color: rgb(147,153,159)
        .sell-count
          margin-right: 12px
      .price
        font-weight: 700
        line-height: 24px
        .now
          margin-right: 8px
          font-size: 14px
          color: rgb(240,20,20)
        .old
          text-decoration: line-through
          font-size: 10px
          color: rgb(147,153,159)
</style>