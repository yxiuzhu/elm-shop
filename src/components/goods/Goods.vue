<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuwrapperlist">
      <ul>
        <li v-for="(item, index) in goods" :key="index"
            class="menu-item"
            :class="{'current':currentIndex===index}"
            @click="selectMenu(index)">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" 
                  :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodswrapperlist">
      <ul>
        <li v-for="(item, index) in goods" :key="index"
            class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <!-- class这里加的hook没有实际用途，只是为了让js能获取到 -->
            <li v-for="(food, index) in item.foods" :key="index"
                class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';

  const ERR_OK = 0;

  export default {
    name: 'Goods',
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0
      }
    },
    computed: {
      // listHeight[]的数值和currentIndex之间的映射关系
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

      this.$http.get('api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          // 操作原生DOM，调用这个接口，然后在这个接口的回调函数进行操作
          // 能保证DOM已经渲染好，之后计算属性和值的时候不会报错
          this.$nextTick(() => {
            // DOM拿到数据后
            this._initScroll();
            // 拿到高度数组
            this._calculateHeight();
          })
        }
      })
    },
    methods: {
      // 响应点击菜单
      selectMenu(index) {
        console.log(index);
        let foodList = this.$refs.foodswrapperlist.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      // 初始化Better-Scroll
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuwrapperlist, {
          click: true
        });

        this.foodsScroll = new BScroll(this.$refs.foodswrapperlist, {
          click: true,
          // 探针能实时返回位置
          probeType: 3
        });

        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
          // console.log(this.scrollY);
        });
      },
      // 计算高度
      _calculateHeight() {
        // 操作DOM
        // 获取foodslist的li
        let foodList = this.$refs.foodswrapperlist.getElementsByClassName('food-list-hook');
        // $els访问的是DOM refs访问的是methods
        let height = 0;
        this.listHeight.push(height);
        // 拿到每一个foodlist高度，进行累加。进行区间的累计
        // 实际上listHeight是一个累加的区间数组，标识每一个区间的高度是多少
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
        // console.log(this.listHeight); //输出数组[0, 1042, 1199, 1321, 1633, 1850, 2088, 2400, 2903, 3604]
      },
    }
  }
</script>

<style lang='stylus'>
  @import "../../common/stylus/mixin";

  .goods
    display: flex
    // 定义视口大小，需要使用绝对定位
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      // 怎么分、内容的缩放、占位空间
      flex: 0 0 80px
      width: 80px
      background-color: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #ffffff
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
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
          // 在盒子里
          display: table-cell
          width: 56px
          // 垂直居中
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      // 自适应宽度
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 13px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 40% 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            font-weight: 700
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 14px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
</style>