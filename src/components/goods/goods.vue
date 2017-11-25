<template>
  <div class="goods">
    <scroll class="menu-wrapper" ref="menuWrapper" :probe-type="probeType" :listen-scroll="listenScroll" @scroll="scroll">
      <div @touchstart="onMenuTouchStart">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" :data-index="index" :class="{'current': currentIndex === index}" @click="selectItem(index)">
          <span class="text" border-1px-bottom>
            <span class="icon" v-show="item.type > 0" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
      </div>
    </scroll>
    <scroll class="foods-wrapper" ref="foodsWrapper" :probe-type="probeType" :listen-scroll="listenScroll" @scroll="scroll">
    <div>
      <ul>
        <li class="food-list" v-for="item in goods" ref="foodListGroup">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item" border-1px-bottom>
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">¥{{food.price}}</span><span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                </div>
                <div class="controlbut-wrapper" v-if="food">
                  <controlbut :food="food"></controlbut>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    </scroll>
    <shopcart :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
  </div>
</template>

<script type="text/javascript">
// 联动滚动问题 点击左边menu 右边列表会跳转到对应的 标题-商品列表 而滚动右边的时候 在对应的 标题 会高亮显示
// question1: better-scroll 好像不支持原生事件 @touchstart
// solution: 在其下创建一个div 包裹全部子元素 并@touchstart
// ----
// question2: 由于menu中有多行文字需要居中对齐 而使用了 display: table 这使得在 @touchstart 的时候 选择到的不是 想获取的带有 data-index 的 li 而是它的子元素 span
// solution: 将错就错 直接在span上设置 data-index 反正也是h5的自设属性
// ----
// question3: 为什么在功能一中, 能用VNODE抓取到商品列表的 foodListGroup, 而想获取高度时进行的获取VNODE的操作确是 undefined 呢??
// solution: 感觉这是一个总是会遇到的问题, 折腾了一会儿才想起来, 本来就能通过 this.$refs 抓到的DOM, 突然间获取不到了, 那就肯定是获取的时候还没有渲染上啊!!! 可以在调用前自己添加一个 setTimeout(() => {}, 20), 20是浏览器刷新时间, 也可以使用 this.$nextTick
// ----
// question4: 如何能监听实时滚动的 better-scroll 的Y值??
// solution: better-scroll 封装了很多功能, 包括监听滚动并实时返回滚动位置, 使用的时候需要对scroll组件传设置参数, :probeType = 3, :listenScroll = true, @scroll(pos){ 返回的 pos.y 带有滚动Y值信息 }
// ----
// question5: 设置了 :class="{'current': currentIndex === index}" 但是样式不随着滚动而改变
// solution: 在实现滚动右边,左边跟着高亮的时候,发现选取到的仍然是span的index仍然十分尴尬, 因为需要的样式是在li实现的, 之前是借助span的index来实现的, 所以滚动时样式当然不会改变, 所以看了下console.log, 发现使用 el.path[1] 也是能获取到li标签
// ----
// question6: 点击菜单, 虽然会滚动, 但高亮位置没改变
// solution: 因为高亮并没有依赖于点击, 而是根据 this.scrollY 的改动而实现的, 而this.scrollY是根据scroll事件而实时更新的
// 功能一
// 点击左边, 右边跳转的实现方法就是: 根据在 span 上设置的 data-index , 在@touchstart时获取这个index值, 并在操纵DOM的时候, 使用 better-scroll 的方法 scrolltoElement 滚动至 foodsWrapper 商品列表下的第 index 个子元素 foodListGroup[index], 实现了点击左边分类, 滚动至具体商品列表的效果。PS: 不能给 @touchstart加.stop阻止冒泡, 这样事件会传不到 scroll 使得整个list不会滚动
// 功能二
// 需要记录每个区间的高度, 获得一个 标识每个区间的高度的递增数组 listHeight, 然后需要实时获得一个纵轴Y值(this.scrollY)和索引值作对比, 如果在listHeight[2], 那对应的就是左侧边栏索引值的 index=2 位置
  import Scroll from '../scroll/scroll.vue'
  import {getGoodsData, getSellerData} from '../../common/js/getApiData.js'
  import {getData} from '../../common/js/dom.js'
  import shopcart from '../shop-cart/shop-cart.vue'
  import controlbut from '../controlbut/controlbut.vue'

  const ERR_OK = 0

  export default {
    props: {
      // seller: {
      //   type: Object
      // }
    },
    data() {
      return {
        goods: [],
        // food列表每个区间高度
        listHeight: [],
        scrollY: -1,
        seller: {}
      }
    },
    created() {
      // 设置该type 就是希望 better-scroll 在滚动的时候能实时返回滚动位置
      this.probeType = 3
      this.listenScroll = true
    },
    mounted() {
      this._getGoodsData()
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
      this._getSellerData()
    },
    computed: {
      // 实现右边滚动 左边对应高亮
      currentIndex() {
        const listHeight = this.listHeight
        // console.log(this.scrollY)
        // console.log(listHeight[0])
        // console.log(listHeight)
        // console.log(listHeight.length)
        if (this.scrollY > this.listHeight[0]) {
          for (let i = 0; i < listHeight.length; i++) {
            let height1 = listHeight[i]
            let height2 = listHeight[i + 1]
          // console.log(height1)
          // console.log(height2)
            if (this.scrollY >= height1 && this.scrollY < height2) {
              return i + 1
            }
          }
        } else {
          return 0
        }
        // if (scrollY > listHeight[listHeight.length]) {
        //   this.cal = listHeight.length + 1
        //   console.log(this.cal)
        //   return listHeight.length
        // }
        // console.log(listHeight)
      },
      selectFoods() {
        // 通过两层遍历找到被选中的foods
        // 并传给子组件 实现实时的计算控制
        let foods = []
        this.goods.forEach((item) => {
          item.foods.forEach((food) => {
            // 在子组件添加了.count属性
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    methods: {
      _getGoodsData() {
        getGoodsData().then((res) => {
          if (res.errno === ERR_OK) {
            console.log('goods:')
            this.goods = res.data
            console.log(this.goods)
          }
        })
      },
      // 初始化 better-scroll
      // 不费那功夫了 直接把封装好的 scroll 组件拿来用
      // _initScroll() {
      // }
      onMenuTouchStart(el) {
        let anchorIndex = getData(el.path[1], 'index')
        // console.log(el.target)
        // console.log(anchorIndex)
        this.$refs.foodsWrapper.scrollToElement(this.$refs.foodListGroup[anchorIndex], 0)
      },
      _calculateHeight() {
        this.listHeight = []
        let height = 0
        // 这样直接获取 foodList 是获取不到的 因为DOM还没渲染上
        // 所以在mounted调用前加上一个延时
        const foodList = this.$refs.foodListGroup
        // console.log(foodList)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          // console.log(item.clientHeight)
          // height += item.clientHeight
          height = height + item.clientHeight
          this.listHeight.push(height)
        }
        // console.log(this.listHeight)
        return this.listHeight
      },
      scroll(pos) {
        // this.scrollY = pos.y
        // 最好稍作处理, 不然返回值太多小数
        // 返回值向下取整, 再取绝对值(向下滚动 负值增大 存储的区间是正值)
        this.scrollY = Math.abs(Math.round(pos.y))
        // console.log(this.scrollY)
      },
      selectItem(index) {
        console.log(index)
        if (index >= 1 && index < 2) {
          this.scrollY = this.listHeight[index]
        } else {
          this.scrollY = this.listHeight[index - 1]
        }
      },
      _getSellerData() {
        getSellerData().then((res) => {
          if (res.errno === ERR_OK) {
            this.seller = res.data
            console.log('seller:')
            console.log(this.seller)
            // console.log(this.seller.deliveryPrice)
            // console.log(this.seller.minPrice)
          }
        })
      }
    },
    watch: {
      // scrollY(newY) {
      //   const listHeight = this.listHeight
      //   if (newY > 0) {
      //     this.currentIndex = 0
      //     return
      //   }
      //   for (let i = 0; i < listHeight.length; i++) {
      //     let height1 = listHeight[i]
      //     let height2 = listHeight[i + 1]
      //     if (-newY >= height1 && -newY < height2) {
      //       this.currentIndex = i
      //       return
      //     }
      //   }
      //   console.log(this.currentIndex)
      // }
    },
    components: {
      Scroll,
      shopcart,
      controlbut
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .goods
    display: flex
    position: absolute
    top: 174px
    width: 100%
    bottom: 46px
    overflow: hidden
    .menu-wrapper
      // 等分 内容不足时缩放情况 占位空间
      flex: 0 0 80px
      // 为了安卓浏览器 还要写width
      width: 80px
      background: #f3f5f7
      // 包含多行的垂直居中 所以用display: table
      .menu-item
        display: table
        height: 54px
        width: 56px
        line-height: 14px
        font-size: 0
        padding: 0 12px
        z-index: 1
        &.current
          font-weight: 700px
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          .text
            border-none()
        // 因为是display:table的关系 所以一起丢进span.text中
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          // 父样式的各种子样式
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          font-size: 12px
          border-1px-bottom(rgba(7,17,27,0.1))
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        color: rgb(147,153,159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px-bottom(rgba(7,17,27,0.3))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7,17,27)
          .desc, .extra
            font-size: 10px
            color: rgb(147,153,159)
          .desc
            margin-bottom: 8px
            line-height: 12px
          .extra
            line-height: 10px
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240,20,20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147,153,159)
          .controlbut-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>