<template>
  <div class="controlbut">
    <div class="decrease icon-remove_circle_outline" v-show="food.count>0"></div>
    <div class="count" v-show="food.count>0">{{food.count}}</div>
    <div class="add icon-add_circle"></div>
  </div>
</template>

<script type="text/javascript">
  export default {
    props: {
      food: {
        type: Object
      }
    },
    created() {
      // console.log(this.food)
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .controlbut
    font-size: 0
    .decrease, .add
      display: inline-block
      font-size: 24px
      line-height: 24px
      // 增加点击区域
      padding: 6px
      color: rgb(0,160,220)
    .count
      display: inline-block
      font-size: 12px
</style>