<template>
  <transition name="slide">
  <scroll class="food" v-show="showFlag" ref="foodWrapper">
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
          <span class="now">¥{{food.price}}</span><span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
        </div>
        <div class="controlbut-wrapper">
          <controlbut :food="food"></controlbut>
        </div>
        <transition name="fade">
        <div class="buy" v-show="!food.count || food.count === 0" @click="addFirstOrder">加入购物车</div>
        </transition>
      </div>
      <split v-if="food.info"></split>
      <div class="info" v-if="food.info">
        <h1 class="title">商品信息</h1>
        <p class="text">{{food.info}}</p>
      </div>
      <split></split>
      <div class="rating">
        <h1 class="title">商品评价</h1>
        <ratingselect
        :selectType="selectType"
        :onlyContent="onlyContent"
        :desc="desc"
        :ratings="food.ratings"></ratingselect>
      </div>
    </div>
  </scroll>
  </transition>
</template>

<script type="text/javascript">
  // question: 图片加载是个异步过程 刚开始没有内容高 加载后有宽高 撑起了DOM的高度 看起来像屏幕产生了抖动 如何不做限制的加载图片 不能限制宽高 但也不能因为图片加载过程宽高变化让屏幕产生抖动
  // solution: 通过CSS的奇淫技巧 把宽高都设置好
  // ------
  // question: 使用 better-scroll 并不能使组件滚动
  // solution: 因为food组件 是被show()控制的 在刚开始就被渲染出来了, 所以组件刚开始渲染的高度并不是传入数据后的高度
  import scroll from '../scroll/scroll.vue'
  // 从Element中看到被scroll包裹的第一个子元素出现各种参数后, 就说明使用成功了
  import controlbut from '../controlbut/controlbut.vue'
  import Vue from 'vue'
  import eventBus from '../../common/js/eventBus.js'
  import split from '../split/split.vue'
  import ratingselect from '../ratingselect/ratingselect.vue'
  // import BScroll from 'better-scroll'

  // const POSITIVE = 0
  // const NEGATIVE = 1
  const ALL = 2

  export default {
    created() {
      // console.log('food:')
      // console.log(this.food)
    },
    mounted() {
      // setTimeout(() => {
      //   console.log(this.food)
      //   this.scroll = new BScroll(this.$refs.foodWrapper, {
      //     scrollY: true
      //   })
      //   console.log(this.scroll)
      // }, 20)
    },
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    methods: {
      show() {
        if (!this.food) {
          return
        }
        console.log(`food:`)
        console.log(this.food)
        this.showFlag = true
        setTimeout(() => {
          this.$refs.foodWrapper.refresh()
        }, 20)
        // 初始化数据
        this.selectType = ALL
        this.onlyContent = true
      },
      hide() {
        this.showFlag = false
      },
      addFirstOrder() {
        // 想要观察到新增或删除某个不存在的字段的时候
        // 需要使用 Vue 的一个全局接口
        // 不然直接赋值是观察不到变化的
        // 在 controlbut组件 里用过
        Vue.set(this.food, 'count', 1)
        // 并且通过 EventBus 传递事件触发动画
        eventBus.$emit('cartAdded', event.target)
      }
    },
    components: {
      scroll,
      controlbut,
      split,
      ratingselect
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 30
    width: 100%
    height: 100%
    // 拼错单词的尴尬 .....
    background: #fff
    // overflow: auto
    &.slide-enter-active,&.slide-leave-active
      transition: all 0.3s linear
    &.slide-enter,&.slide-leave-to
      // 从右向左划入
      // translate3D(x,y,z)
      transition: all 0.3s linear
      transform: translate3D(100%, 0, 0)
    .food-content
      // 为了不让最底下内容被 shopcart 遮挡
      padding-bottom: 58px
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
      position: relative
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7,17,27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        height: 10px
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
      .controlbut-wrapper
        position: absolute
        right: 12px
        bottom: 12px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        height: 24px
        line-height: 24px
        padding: 0 12px
        box-sizing: border-box
        border-radius: 12px
        font-size: 10px
        color: #fff
        background: rgb(0,160,220)
        // 在vue2.0中 不添加 transition缓动 在添加购物车的操作中 小球的动画也是能正常执行的
        // 最终态
        &.fade-enter-active,&.fade-leave-active
          transition: all 0.3s linear
          opacity: 1
        // 初始态
        &.fade-enter,&.fade-leave-to
          transition: all 0.3s linear
          opacity: 0
    .info
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 6px
        font-size: 14px
        font-weight: 700
        color: rgb(7,17,27)
      .text
        padding: 0 8px
        line-height: 24px
        font-size: 12px
        color: rgb(77,85,93)
    .rating
      padding-top: 18px
      .title
        line-height: 14px
        margin-left: 18px
        font-size: 14px
        font-weight: 700
        color: rgb(7,17,27)
</style>