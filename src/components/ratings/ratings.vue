<template>
  <scroll class="ratings" v-if="seller.score" ref="ratingsWrapper">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">预计{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect
        :ratings="this.ratings"
        @changeSelectType="changeSelectType"
        @toggle="selectToggle"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="rating in ratings">
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="recommend-item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </scroll>
</template>

<script type="text/javascript">
  // 分区块: 整体介绍 + ratingselect组件 + 评价列表
  // 此处评价列表和 food页的是同组件 只是传入的数据不同
  import scroll from '../scroll/scroll.vue'
  import {getSellerData, getRatingsData} from '../../common/js/getApiData.js'
  import star from '../star-score/star-score.vue'
  import split from '../split/split.vue'
  import ratingselect from '../ratingselect/ratingselect.vue'
  import {formatDate} from '../../common/js/util.js'

  const ERR_OK = 0
  const ALL = 2

  export default {
    data() {
      return {
        seller: {},
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        ratings: []
      }
    },
    mounted() {
      this._getSellerData()
      this._getRatingsData()
    },
    methods: {
      _getSellerData() {
        getSellerData().then((res) => {
          if (res.errno === ERR_OK) {
            this.seller = res.data
            // console.log('seller:')
            // console.log(this.seller)
          }
        })
      },
      _getRatingsData() {
        getRatingsData().then((res) => {
          if (res.errno === ERR_OK) {
            this.ratings = res.data
            console.log('ratings:')
            console.log(this.ratings)
          }
        })
      },
      changeSelectType(type) {
        this.selectType = type
        this.$nextTick(() => {
          this.$refs.ratingsWrapper.refresh()
        })
      },
      selectToggle(flag) {
        this.onlyContent = flag
        this.$nextTick(() => {
          this.$refs.ratingsWrapper.refresh()
        })
      }
    },
    filters: {
      // 使用正则定义一个 filter方法
      formatDate(time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-DD hh:mm')
      }
    },
    components: {
      scroll,
      star,
      split,
      ratingselect
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  // 默认是 iphone6 的样式 在 iphone5 中因为屏幕宽度不够 样式会产生折叠 整体效果非常差 所以要在 overview-left和overview-right 两处添加 mediaquery 调整flex以及padding占屏
  // BTW iphone5 320px / iphone6 375px / iphone6p 414px
  @import '../../common/stylus/mixin.styl'

  .ratings
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .ratings-content
      padding-bottom: 48px
    .overview
      display: flex
      padding: 18px 0
      .overview-left
        flex: 0 0 137px
        // 让右侧线上下超出6px
        width: 137px
        padding: 6px 0
        border-right: 1px solid rgba(7,17,27,0.3)
        text-align: center
        // 小屏幕下改变 flex宽度 不破坏整体的 inline-block
        @media only screen and (max-width:320px)
          flex: 0 0 120px
          width: 120px
        .score
          margin-bottom: 6px
          line-height: 28px
          font-size: 24px
          color: rgb(255,153,0)
        .title
          margin-bottom: 8px
          line-height: 12px
          font-size: 12px
          color: rgb(7,17,27)
        .rank
          line-height: 10px
          font-size: 10px
          color: rgb(147,153,159)
      .overview-right
        flex: 1
        // 视觉居中 但根据设备不同 宽度是不一定的 所以还是加个padding
        padding: 6px 0 6px 24px
        @media only screen and (max-width:320px)
          padding-left: 2px
        .score-wrapper
          // 给每个子元素单独添加 line-height 不用再父元素加
          margin-bottom: 8px
          font-size: 0
          .title
            display: inline-block
            line-height: 18px
            font-size: 12px
            vertical-align: top
            color: rgb(7,17,27)
          // 不用再专门给 star组件写 class="star" 会默认渲染为 div.star 的 DOM
          .star
            display: inline-block
            margin: 0 12px
          .score
            display: inline-block
            line-height: 18px
            font-size: 12px
            vertical-align: top
        .delivery-wrapper
          font-size: 0
          .title
            line-height: 18px
            font-size: 12px
            color: rgb(7,17,27)
          .delivery
            margin-left: 12px
            line-height: 18px
            font-size: 12px
            color: rgb(147,153,159)
    .rating-wrapper
      padding: 0 18px
      .rating-item
        display: flex
        padding: 18px 0
        border-1px-bottom(rgba(7,17,27,0.3))
        .avatar
          flex: 0 0 28px
          width: 28px
          margin-right: 12px
          img
            border-radius: 50%
        .content
          // 包含 name star recommend time
          flex: 1
          position: relative
          .name
            margin-bottom: 4px
            line-height: 12px
            font-size: 10px
            color: rgb(7,17,27)
          .star-wrapper
            margin-bottom: 6px
            font-size: 0
            .star
              display: inline-block
              margin-right: 6px
              vertical-align: top
            .delivery
              display: inline-block
              line-height: 12px
              font-size: 10px
              font-weight: 200
              color: rgb(147,153,159)
              vertical-align: top
          .text
            margin-bottom: 8px
            line-height: 18px
            font-size: 12px
            color: rgb(7,17,27)
          .recommend
            line-height: 16px
            font-size: 9px
            color: rgb(147,153,159)
            font-size: 0
            .icon-thumb_up, .recommend-item
              // 因为可能排列项目太多 会有下一行 所以向下也需要margin
              display: inline-block
              margin: 0 8px 4px 0
              font-size: 9px
              line-height: 16px
            .icon-thumb_up
              color: rgb(0,160,220)
            .recommend-item
              padding: 0 6px
              border: 1px solid rgba(7,17,27,0.3)
              border-radius: 1px
              background: #fff
              color: rgb(147,153,159)
          .time
            position: absolute
            top: 0
            right: 0
            font-size: 10px
            color: rgb(147,153,159)
            line-height: 12px
</style>