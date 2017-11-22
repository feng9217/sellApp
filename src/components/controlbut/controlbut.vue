<template>
  <div class="controlbut">
    <div class="decrease" v-show="food.count>0" @click="decreFromCart">
      <span class="inner icon-remove_circle_outline"></span>
    </div>
    <div class="count" v-show="food.count>0">{{food.count}}</div>
    <div class="add icon-add_circle" @click="addToCart"></div>
  </div>
</template>

<script type="text/javascript">
  import Vue from 'vue'
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
      addToCart() {
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
    &.move-enter-active, &.move-leave-active
      opacity: 1
      transform: translate3D(0,0,0)
    &.move-enter, &.move-leave-to
      opacity: 0
      transform: translate3D(24px,0,0)
    .decrease
      display: inline-block
      // 增加点击区域
      padding: 6px
      // 动画完成后添加的属性
      transition: all 0.4 linear
      &.move-transition
        opacity: 1
        // 可以开启硬件加速
        transform: translate3D(0,0,0)
      &.move-enter, &.move-leave-to
        opacity: 0
        transform: translate3D(24px,0,0)
      .inner
        font-size: 24px
        line-height: 24px
        color: rgb(0,160,220)
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