<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <support-ico class="icon" :size=1 :type="seller.supports[0].type"></support-ico>
          <!-- <span class="icon" :class="classMap[seller.supports[0].type]"></span> -->
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <!-- 设置首页的模糊背景 -->
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" alt="">
    </div>
    <!-- 5个弹出窗口 -->
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item, index) in seller.supports" :key="index">
                <support-ico class="icon" :size=2 :type="seller.supports[index].type"></support-ico>
                <!-- <span class="icon" :class="classMap[seller.supports[index].type]"></span> -->
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
  import Star from 'components/star/Star'
  import SupportIco from '../support-ico/support-ico'

  export default {
    components: {
      Star,
      SupportIco
    },
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      }
    },
    methods: {
      showDetail() {
        console.log('被点击叻哦');
        this.detailShow = true;
      },
      hideDetail() {
        this.detailShow = false;
      }
    }
  }
</script>

<style lang='stylus'>
  // 这里不能而是用别名路径，别名路径只适用于js文件
  @import "../../common/stylus/mixin.styl"

  .header
    color: #fff
    background: rgba(7, 17, 27, 0.5)
    .content-wrapper
      position: relative
      padding: 24px 12px 18px 24px
      display: flex
      .avatar
        // display: inline-block
        vertical-align: top
        img
          border-radius: 5px
      .content
        display: inline-block
        margin-left: 16px
        .title
          margin: 2px 0 8px 0
          .brand
            // span设置宽高没用，使用inline-block来占位
            display: inline-block
            vertical-align: top
            width: 30px
            height: 18px
            bg-image('brand')
            background-size: 30px 18px
            // 用来节约图片的加载资源
            background-repeat: no-repeat
          .name
            margin-left: 6px
            font-size: 16px
            line-height: 18px
            font-weight: bold
        .description
           margin-bottom: 10px
           color: rgb(255,255,255)
           font-weight: 200
           line-height: 12px
           font-size: 12px
        .support
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 4px
            background-size: 12px 12px
            background-repeat: no-repeat
          .text
            vertical-align: top
            line-height: 12px
            color: rgb(255,255,255)
            font-weight: 200
            font-size: 10px
      .support-count
        position: absolute
        right: 12px
        bottom: 14px
        // 可以把东西拉宽
        padding: 0 9px
        height: 24px
        line-height: 24px
        border-radius: 14px
        background: rgba(0, 0, 0, 0.2)
        text-align: center
        .count
          vertical-align: top
          padding-top: 2px
          // margin-right: 2px
          font-size: 10px
        .icon-keyboard_arrow_right
          line-height: 22px
          font-size: 10px
    .bulletin-wrapper
      position: relative
      // height: 28px
      line-height: 28px
      padding: 0 22px 0 12px
      // 三句省略文本出现
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      background: rgba(7, 17, 27, 0.2)
      .bulletin-title
        // position: absolute
        display: inline-block
        vertical-align: baseline
        // margin-top: 8px
        width: 22px
        height: 12px
        bg-image('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        vertical-align: top
        margin: 0 4px
        font-size: 10px
      .icon-keyboard_arrow_right
        position: absolute
        font-size: 10px
        right: 18px
        top: 9px
    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 18%
      z-index: -1
      filter: blur(10px)
    .detail
      position: fixed
      z-index: 100
      top: 0
      left: 0
      width: 100%
      height: 100%
      overflow: auto
      // 高斯模糊后面的背景（ios适用）
      backdrop-filter: blur(10px)
      // 背景文字都会模糊
      // filter: blur(10px)
      // 添加渐变动画
      opacity: 1
      background: rgba(7, 17, 27, 0.8)
      &.fade-enter-active, &.fade-leave-active
        transition: all 0.6s
      &.fade-enter, &.fade-leave-active
        opacity: 0
        background: rgba(7, 17, 27, 0)
      // 渐变动画设置结束
      .detail-wrapper
        width: 100%
        // 最小高度要有视口的高度
        min-height: 100%
        .detail-main
          margin-top: 64px
          // 用来把close的高度撑开，避免被覆盖
          padding-bottom: 64px
          .name
            line-height: 16px
            text-align: center
            font-size: 16px
            font-weight: 700
          .star-wrapper
            margin-top: 18px
            padding: 2px 0
            text-align: center
          .title
            display: flex
            width: 80%
            // 有居中效果
            margin: 28px auto 24px auto
            .line
              flex: 1
              position: relative
              top: -7px
              border-bottom: 2px solid rgba(255, 255, 255, 0.2)
            .text
              padding: 0 12px
              // 文字会加粗
              font-weight: 700
              font-size: 14px
          .supports
            width: 80%
            margin: 0 auto
            .support-item
              padding: 0 12px
              margin-bottom: 12px
              &:last-child
                margin-bottom: 0
              .icon
                display: inline-block
                width: 16px
                height: 16px
                vertical-align: top
                margin-right: 6px
                background-size: 16px 16px
                background-repeat: no-repeat
              .text
                line-height: 17px
                font-weight: 200
                font-size: 12px
          .bulletin
            width: 80%
            margin: 0 auto
            .content
              padding: 0 12px
              line-height: 24px
              font-weight: 200
              font-size: 12px
      .detail-close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 0 auto
        // 清除元素左右浮动
        clear: both
        font-size: 32px
</style>
