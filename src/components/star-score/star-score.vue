<template>
  <div class="star" :class="starType">
    <span class="star-item" v-for="itemClass in itemClasses" :class="itemClass"></span>
  </div>
</template>

<script type="text/javascript">
  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'

  export default {
    props: {
      size: {
        type: Number,
        default: 24
      },
      score: {
        type: Number,
        default: 4
      }
    },
    computed: {
      starType() {
        // 拼接出后台数据返还的 star 类型来决定样式
        return 'star-' + this.size
      },
      // 星数是通过遍历span来创造的
      // 控制星数的样式
      // 构造一个result数组来判断星数
      itemClasses() {
        let result = []
        // 满足向下取 0.5倍数 星数的算法
        let score = Math.floor(this.score * 2) / 2
        // 半星判断 判断有没有小数 取余不为0 就是有 .5的小数
        let hasDecimal = score % 1 !== 0
        // 全星判断 整数部分的判断
        let integer = Math.floor(score)
        // 遍历全星个数
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON)
        }
        // 判断是否要添加半星
        if (hasDecimal) {
          result.push(CLS_HALF)
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF)
        }
        return result
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  // 组件最好不要添加不相关样式
  // 与外部的样式关系最好都交给一个wrapper来处理
  // 这样重复使用样式就不会冲突
  @import "../../common/stylus/mixin.styl"

  .star
    font-size: 0
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right: 22px
        background-size: 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    &.star-36
      .star-item
        width: 15px
        height: 15px
        margin-right: 6px
        background-size: 15px 15px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-24
      .star-item
        width: 10px
        height: 10px
        margin-right: 3px
        background-size: 10px 10px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')
</style>