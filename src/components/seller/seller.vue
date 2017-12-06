<template>
  <scroll class="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <!-- 横向排布列表 -->
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite">
          <span class="icon-favorite" @click="toggleFavorite" :class="{'active':favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="board">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item" v-for="(item, index) in seller.supports">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics" v-if="seller">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picScroll">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="info-item" v-for="info in seller.infos">
            {{info}}
          </li>
        </ul>
      </div>
    </div>
  </scroll>
</template>

<script type="text/javascript">
  // import {getSellerData} from '../../common/js/getApiData.js'
  // 更改 seller 来源 在初始页获取 经router-view传递 由:prop接收
  // 由于需要多次使用 所以不能多次获取 太浪费资源了
  import scroll from '../scroll/scroll.vue'
  import star from '../star-score/star-score.vue'
  import split from '../split/split.vue'
  import Bscroll from 'better-scroll'
  import {saveToLocal, loadFromLocal} from '../../common/js/store.js'

  // const ERR_OK = 0

  export default {
    props: {
      seller: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        favorite: (() => {
          return loadFromLocal(this.seller.id, 'favorite', false)
        })()
      }
    },
    mounted() {
      // this.checkSeller()
      // this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      setTimeout(() => {
        this._initWidth()
        this._initScroll()
      }, 20)
    },
    computed: {
      favoriteText() {
        return this.favorite ? '已收藏' : '收藏'
      }
    },
    methods: {
      // _getSellerData() {
      //   getSellerData().then((res) => {
      //     if (res.errno === ERR_OK) {
      //       this.seller = res.data
      //       // console.log('seller:')
      //       // console.log(this.seller)
      //     }
      //   })
      // },
      // checkSeller() {
      //   // check got seller or not from tab
      //   console.log(this.seller)
      // }
      _initWidth() {
        // 不要作什么 DOM里面是 pic-list 这里用驼峰的死了
        // 统一驼峰 !!!
        let picWidth = 120
        let margin = 6
        let width = (picWidth + margin) * this.seller.pics.length - margin
        // console.log(width)
        // console.log(this.$refs.picList)
        this.$refs.picList.style.width = width + 'px'
      },
      _initScroll() {
        // 务必初始化宽度了之后 再初始化 Bscroll
        // 还有要加个延时 确保DOM渲染后再使用
        // console.log(this.$refs.picScroll)
        this.picScroll = new Bscroll(this.$refs.picScroll, {
          scrollX: true,
          // 滚动横向时 竖向不滚动
          eventPassthrough: 'vertical'
        })
        console.log(this.picScroll)
      },
      toggleFavorite() {
        this.favorite = !this.favorite
        saveToLocal(this.seller.id, 'favorite', this.favorite)
      }
    },
    components: {
      scroll,
      star,
      split
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .seller
    position: absolute
    // 固定视口高度
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .seller-content
      padding-bottom: 50px
    .overview
      padding: 18px
      position: relative
      .title
        margin-bottom: 8px
        line-height: 14px
        font-size: 14px
        color: rgb(7,17,27)
      .desc
        padding-bottom: 18px
        border-1px-bottom(rgba(7,17,27,0.3))
        font-size: 0
        .star
          display: inline-block
          vertical-align: top
          margin-right: 8px
        .text
          display: inline-block
          line-height: 18px
          margin-right: 12px
          vertical-align: top
          font-size: 10px
          color: rgb(77,85,93)
      // 横向排布部分
      .remark
        display: flex
        padding-top: 18px
        .block
          flex: 1
          text-align: center
          border-right: 1px solid rgba(7,17,27,0.3)
          // css3选择
          &:last-child
            border: none
          h2
            margin-bottom: 4px
            line-height: 10px
            font-size: 10px
            color: rgb(147,153,159)
          .content
            line-height: 24px
            font-size: 10px
            color: rgb(7,17,27)
            .stress
              font-size: 24px
      .favorite
        position: absolute
        right: 18px
        top: 18px
        text-align: center
        // 限制宽度 防止抖动
        width: 36px
        .icon-favorite
          display: block
          margin-bottom: 4px
          color: #d4d6d9
          line-height: 24px
          font-size: 24px
          &.active
            color: rgb(240,20,20)
        .text
          line-height: 10px
          font-size: 10px
          color: rgb(77,85,93)
    // 公告部分
    .board
      padding: 18px 18px 0 18px
      .title
        margin-bottom: 8px
        line-height: 14px
        font-size: 14px
        color: rgb(7,17,27)
      .content-wrapper
        padding: 0 12px 16px 12px
        border-1px-bottom(rgba(7,17,27,0.3))
        .content
          line-height: 24px
          font-size: 12px
          font-weight: 200
          color: rgb(240,20,20)
      .supports
        .support-item
          padding: 16px 12px
          border-1px-bottom(rgba(7,17,27,0.3))
          font-size: 0
          &:last-child
            border-none()
          .icon
            display: inline-block
            width: 16px
            height: 16px
            vertical-align: top
            margin-right: 6px
            background-size: 16px 16px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_4')
            &.discount
              bg-image('discount_4')
            &.guarantee
              bg-image('guarantee_4')
            &.invoice
              bg-image('invoice_4')
            &.special
              bg-image('special_4')
          .text
            display: inline-block
            line-height: 16px
            font-size: 12px
            font-weight: 200
            color: rgb(7,17,27)
    // 实景图
    .pics
      padding: 18px
      .title
        margin-bottom: 12px
        line-height: 14px
        font-size: 14px
        color: rgb(7,17,27)
        // 用来固定视口大小 用来滚动的
      .pic-wrapper
        overflow: hidden
        width: 100%
        // 超出不折行
        white-space: nowrap
        // ul的宽度需要动态计算 超过wrapper的宽度 才能使better-scroll滚动
        .pic-list
          font-size: 0
          .pic-item
            // 使用inline-block 改变li的排列
            display: inline-block
            margin-right: 6px
            width: 120px
            height: 90px
            &:last-child
              margin: 0
    // 商家信息
    .info
      padding: 18px 18px 0 18px
      .title
        // 伪元素生成的线 margin影响不了 只能用padding
        padding-bottom: 12px
        line-height: 14px
        font-size: 14px
        color: rgb(7,17,27)
        border-1px-bottom(rgba(7,17,27,0.3))
      .info-item
        padding: 16px 12px
        line-height: 16px
        font-size: 12px
        color: rgb(7,17,27)
        border-1px-bottom(rgba(7,17,27,0.3))
        &:last-child
          border-none()
        // &:nth-child(2n+1)
        // &:nth-child(-n+2)
        //   background-color: #aceb20
</style>