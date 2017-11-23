<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount > 0}">
            <i class="icon-shopping_cart" :class="{'highlight':totalCount > 0}"></i>
          </div>
          <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight':totalPrice > 0}">¥{{totalPrice}}元</div>
        <div class="desc">另需配送费¥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
    <div class="ball-container">
      <transition-group name="drop" tag="div"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:after-enter="afterEnter">
        <div :key="ball.index" class="ball" v-show="ball.show" v-for="ball in balls">
          <div class="inner inner-hook"></div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script type="text/javascript">
  import eventBus from '../../common/js/eventBus.js'

  export default {
    data() {
      return {
        balls: [
          {
            show: false,
            index: 0
          },
          {
            show: false,
            index: 1
          },
          {
            show: false,
            index: 2
          },
          {
            show: false,
            index: 3
          },
          {
            show: false,
            index: 4
          }
        ],
        dropBalls: []
      }
    },
    created() {
      // console.log(this.balls)
      eventBus.$on('cartAdded', target => {
        // console.log('我接收到啦')
        // console.log(target)
        this.drop(target)
      })
    },
    props: {
      deliveryPrice: {
        type: Number,
        default: 5
      },
      minPrice: {
        type: Number,
        default: 21
      },
      selectFoods: {
        type: Array,
        // 数组和对象要通过函数返回空值
        default() {
          return [{
            price: 10,
            count: 3
          }]
        }
      }
    },
    computed: {
      totalPrice() {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount() {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      payDesc() {
      // 和总价有逻辑关系
        if (this.totalPrice === 0) {
          return `¥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差¥${diff}元起送`
        } else {
          return `去结算`
        }
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      }
    },
    methods: {
      drop(el) {
        // 点击以后就会触发
        // 把选到的小球.show 设为 true
        // 并push进集合中
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            return
          }
        }
      },
      beforeEnter(el) {
        // 把所有设为true的小球都找到
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            // 获取元素相对于视口位置
            // 返回left 和 top 就是相对于视口的偏移
            let rect = ball.el.getBoundingClientRect()
            console.log(rect)
            // 对应减少的 left 和 bottom 值
            let x = rect.left - 32
            console.log(x)
            let y = -(window.innerHeight - rect.top - 22)
            console.log(y)
            // 设置初始位置 且初始化把 display 显示起来
            // 外层做纵向 内层做横向 动画
            el.style.display = ''
            el.style.webkitTransform = `translate3D(0,${y}px,0)`
            el.style.transform = `translate3D(0,${y}px,0)`
            // 使用只供js选择用的 className: '....-hook'
            // get Elements By ClassName
            let inner = el.getElementsByClassName('inner-hook')[0]
            // console.log(inner)
            inner.style.webkitTransform = `translate3D(${x}px,0,0)`
            inner.style.transform = `translate3D(${x}px,0,0)`
          }
        }
      },
      enter(el) {
        // 触发浏览器重绘 且注释不让ES-lint检查
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight
        this.$nextTick(() => {
          // 把样式全部重置
          el.style.webkitTransform = 'translate3D(0,0,0)'
          el.style.transform = 'translate3D(0,0,0)'
          // 使用只供js选择用的 className: '....-hook'
          // get Elements By ClassName
          let inner = el.getElementsByClassName('inner-hook')[0]
          // console.log(inner)
          inner.style.webkitTransform = 'translate3D(0,0,0)'
          inner.style.transform = 'translate3D(0,0,0)'
        })
      },
      afterEnter(el) {
        // 做完一次动画 就把show重置
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
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
            &.highlight
              background: rgb(0,160,220)
            .icon-shopping_cart
              color: #80858a
              line-height: 44px
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #fff
            background: rgb(240,20,20)
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4)
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
          &.highlight
            color: #fff
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
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .ball-container
      .ball
        // fixed 布局 相对于视口做动画的
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        &.drop-enter, &.drop-enter-active
          transition: all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41)
          .inner
            width: 16px
            height: 16px
            border-radius: 50%
            background: rgb(0,160,220)
            transition: all 0.4s linear
        // 动画过程交由JS定义
        // 刚开始继续使用 ↓ 定义动画时, 出现了动画 enter的x坐标与js钩子定义不符的情况
        // 是因为 js钩子 与 这里的 enter enter-active 冲突了
        // &.drop-enter-active, &.drop-leave-active
        // &.drop-enter, &.drop-leave-to
</style>