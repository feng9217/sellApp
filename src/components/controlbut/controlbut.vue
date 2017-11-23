<template>
  <div class="controlbut">
    <transition name="move">
    <div class="decrease" v-show="food.count>0" @click="decreFromCart">
      <span class="inner icon-remove_circle_outline"></span>
    </div>
    </transition>
    <div class="count" v-show="food.count>0">{{food.count}}</div>
    <div class="add icon-add_circle" @click="addToCart"></div>
  </div>
</template>

<script type="text/javascript">
// 因为 remove 要做动画, 而且是二层动画, 所以另外起了个span, 对比Vue1.X中, 动画是直接在 tag中定义 transition="name", 在Vue2.X中, 使用了<transition>组件包裹了做动画的部分, 注意, 是包裹做动画的部分, 如 decrease做动画, 就是包裹整个decrease, 虽然实际变化的是inner部分
  import Vue from 'vue'
  import eventBus from '../../common/js/eventBus.js'

  export default {
    props: {
      food: {
        type: Object
      }
    },
    created() {
      // console.log(this.food)
    },
    methods: {
      addToCart(event) {
      // 两种情况 判断是否已存在
      // 不存在: 置为1
      // 存在: ++
        // console.log('点啦点啦')
        if (!this.food.count) {
          // this.food.count = 1
          // 想要观察到新增或删除某个不存在的字段的时候
          // 需要使用 Vue 的一个全局接口
          // 不然直接赋值是观察不到变化的
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
        // 把触发 addToCart 的对象传递给父组件
        // console.log(event.target)
        eventBus.$emit('cartAdded', event.target)
      },
      decreFromCart() {
        if (this.food.count) {
          this.food.count--
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .controlbut
    font-size: 0
    .decrease
      display: inline-block
      // 增加点击区域
      padding: 6px
      transition: all 0.4s linear
      .inner
        // 设置display 使其有宽高
        display: inline-block
        font-size: 24px
        line-height: 24px
        color: rgb(0,160,220)
        transition: all 0.4s linear
      // 结束状态
      &.move-enter-active, &.move-leave-active
        opacity: 1
        // 可以开启硬件加速
        transform: translate3D(0,0,0)
        .inner
          transform: rotate(0)
      // 开始状态
      &.move-enter, &.move-leave-to
        opacity: 0
        transform: translate3D(24px,0,0)
        .inner
          // deg 一定不能忘 .......
          transform: rotate(360deg)
    .count
      display: inline-block
      vertical-align: top
      font-size: 10px
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      color: rgb(147,153,159)
    .add
      display: inline-block
      // 增加点击区域
      padding: 6px
      font-size: 24px
      line-height: 24px
      color: rgb(0,160,220)
</style>