<template>
  <div class="tab border-1px">
    <router-link tag="div" class="tab-item" to="/goods">
      <span class="tab-link">商品</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/ratings">
      <span class="tab-link">评价</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/seller">
      <span class="tab-link">商家</span>
    </router-link>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'tab'
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .tab
    display: flex
    width: 100%
    // 设计稿高度80px 设备上是375px 物理像素750px
    // 所以设计稿也是按两倍标记的 码的时候知道就行
    height: 40px
    line-height: 40px
    border-1px-bottom(rgba(7,17,27,0.1))
    .tab-item
      flex: 1
      text-align: center
      display: block
      .tab-link
        color: rgb(77,85,93)
        font-size: 14px
      &.router-link-active
        .tab-link
          color: rgb(240,20,20)
</style>