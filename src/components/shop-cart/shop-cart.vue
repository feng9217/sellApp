<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo">
            <i class="icon-shopping_cart"></i>
          </div>
        </div>
        <div class="price">¥100元</div>
        <div class="desc">另需配送费¥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay">
          ¥{{minPrice}}元起送
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    props: {
      deliveryPrice: {
        type: Number,
        default: 5
      },
      minPrice: {
        type: Number,
        default: 21
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 100
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255,255,255,0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          font-size: 24px
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          vertical-align: top
          border-radius: 50%
          text-align: center
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            background: #2b343c
            .icon-shopping_cart
              color: #80858a
              line-height: 44px
        .price
          // 为了 border-right 不是占完整个区块的线
          // 所以采用了 line-height + margin-top 的布局
          display: inline-block
          vertical-align: top
          margin-top: 12px
          padding-right: 12px
          line-height: 24px
          box-sizing: border-box
          border-right: 1px solid rgba(255,255,255,0.1)
          font-size: 16px
          font-weight: 700
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex:0 0 105px
        width: 105px
        .pay
          font-size: 12px
          height: 48px
          line-height: 48px
          text-align: center
          font-weight: 700
          background: #2b333b
</style>