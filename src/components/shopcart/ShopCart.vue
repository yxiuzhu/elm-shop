<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight': totalCount>0}">
              <i class="icon-shopping_cart" :class="{'highlight': totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight': totalPrice>0}">{{totalPrice}}￥</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click.stop.prevent="pay">
          <div class="pay" :class="payClass">{{payDesc}}</div>
        </div>
        <div class="ball-container">
          <div v-for="(ball, index) in balls" :key="index">
            <transition name="drop"
                        @before-enter="beforeDrop"
                        @enter="dropping"
                        @after-enter="afterDrop">
              <div class="ball" v-show="ball.show">
                <div class="inner inner-hook"></div>
              </div>
            </transition>
          </div>
        </div>
        <transition name="fold">
          <div class="shopcart-list" v-show="listShow">
            <div class="list-header">
              <h1 class="title">购物车</h1>
              <span class="empty" @click="empty">清空</span>
            </div>
            <div class="list-content" ref="listcontent">
              <ul>
                <li class="list-food" v-for="(food, index) in selectFoods" :key="index">
                  <span class="name">{{food.name}}</span>
                  <div class="price">
                    <span>￥{{food.price*food.count}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cart-control :food="food"></cart-control>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <!-- 设置透明的黑色背景 -->
    <transition name="fade">
      <div class="list-mask" @click="hideList" v-show="listShow"></div>
    </transition>
  </div>
</template>

<script>
  import CartControl from '../cartcontrol/CartControl';

  import BScroll from 'better-scroll';

  export default {
    name: 'ShopCart',
    components: {
      CartControl
    },
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [
            {
              price: 9,
              count: 2
            }
          ]
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        fold: true
      }
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count
        });
        return count;
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        }else {
          return '去结算';
        }
      },
      payClass() {
        if (this.totalPrice > this.minPrice) {
          return 'enough'
        } else {
          return 'not-enough'
        }
      },
      listShow() {
        if (!this.totalCount) {
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listcontent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        return show
      }
    },
    methods: {
      drop(el) {
        console.log(el);
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
          }
        }
      },
      // 把所有设置为true的小球都找到
      // ball.el为当前执行DOM动画的这个对象
      beforeDrop(el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            // 返回这个小球相对于视口的大小及位置
              // 如果是标准盒子模型，元素的尺寸等于width/height + padding + border-width的总和。
              // 如果box-sizing: border-box，元素的的尺寸等于 width/height。
            let rect = ball.el.getBoundingClientRect();
            // 计算小球起点和终点之间x和y的差值
            let x = rect.left - 32;
            // window.innerHeight为视口的高度
            let y = -(window.innerHeight - rect.top - 22);
            // 定义y侧的垂直位移，让外层元素做y方向的动画
            // 让小球显示
            el.style.display = '';
            // Internet Explorer 10、Firefox、Opera支持transform属性。
            // Safari和Chrome支持替代的 -webkit-transform 属性（3D和2D转换）。
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            // 定义x侧的位移
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      // 小球动画完成，进入时候的状态
      dropping(el, done) {
        // 它返回该元素的像素高度，高度包含该元素的padding和border，且是一个整数
        let rf = el.offsetHeight;
        // 使用nextTick这个接口，重置样式
        this.$nextTick(() => {
          // 没有变量时，使用模板字符串``，eslint会报错
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          // transitionend会在动画结束后触发
          // 添加这句话，掉落的小球会消失，且能添加的次数能超过5次
          el.addEventListener('transitionend', done);
        })
      },
      // 动画完成之后
      afterDrop(el) {
        // 小球做完动画之后，取出ball
        let ball = this.dropBalls.shift();
        // 将ball重置
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      // 设置shopcart组件是否折叠
      toggleList() {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold
      },
      // 清空购物车食物
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      pay() {
        if (this.totalPrice < this.minPrice) {
          return;
        }
        window.alert(`请支付${this.totalPrice}元`);
      },
      hideList() {
        this.fold = true
      }
    }
  }
</script>

<style lang='stylus'>
  @import '../../common/stylus/index.styl'

  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: rgb(20, 29, 39)
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          // 设置为盒模型
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: rgb(43, 52, 60)
            // 设置高亮属性
            &.highlight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              line-height: 48px
              font-size: 24px
              color: #80858a
              // 设置高亮属性
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
            color: #ffffff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 10px
          line-height: 26px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255,255,255,0.1)
          font-size: 16px
          font-weight: 700
          // 设置高亮属性
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          // 垂直居中
          height: 48px
          line-height: 48px
          // 水平居中
          text-align: center
          font-size: 12px
          font-weight: 700
          background: rgb(43, 51, 59)
          &.not-enough
            background: rgb(43, 51, 59)
          &.enough
            background: #00b43c
            color: #fff
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform: translate3d(0, -100%, 0)
      &.fold-enter-active, &.fold-leave-active
        transition: all 0.5s
      &.fold-enter, &.fold-leave-active
        transform: translate3d(0, 0, 0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 14px
          color: rgb(0, 160, 220)
      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #ffffff
        .list-food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px
  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    // 背景模糊的效果
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-to
      opacity: 0
      background: rgba(7, 17, 27, 0)
</style>
