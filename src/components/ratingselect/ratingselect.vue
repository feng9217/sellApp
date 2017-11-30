<template>
  <div class="ratingselect">
    <div class="rating-type border-1px-bottom">
      <span class="block regular" :class="{'active':selectType===2}">{{desc.all}}<span class="count">2</span></span>
      <span class="block regular" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">3</span></span>
      <span class="block unregular"  :class="{'active':selectType===1}">{{desc.negative}}<span class="count">3</span></span>
    </div>
    <div class="switch" :class="{'on':onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/javascript">
  // const POSITIVE = 0
  // const NEGATIVE = 1
  const ALL = 2

  export default {
    props: {
      ratings: {
        type: Array,
        default() {
          return []
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: true
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  .ratingselect
    .rating-type
      // 为了实现底部那条 贯穿线的效果 而写的padding+margin
      padding: 0 18px 18px
      margin: 18px 0 0
      border-1px-bottom(rgba(7,17,27,0.1))
      font-size: 0
      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        line-height: 16px
        border-radius: 1px
        color: rgb(77,85,93)
        font-size: 12px
        &.active
          color: #fff
        .count
          font-size: 8px
          margin-left: 2px
        &.regular
          background: rgba(0,160,220,0.2)
          &.active
            background: rgb(0,160,220)
        &.unregular
          background: rgba(77,85,93,0.2)
          &.active
            background: rgb(77,85,93)
    .switch
      padding: 12px 18px
      line-height: 24px
      border-bottom: 1px solid rgba(7,17,27,0.1)
      color: rgb(147,153,159)
      font-size: 0
      &.on
        .icon-check_circle
          color: #00c850
      .icon-check_circle
        display: inline-block
        vertical-align: top
        margin-right: 4px
        font-size: 24px
      .text
        display: inline-block
        vertical-align: top
        font-size: 12px
</style>