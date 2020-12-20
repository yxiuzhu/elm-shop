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
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper"></div>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    props: {
      seller: {
        type: Object
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    }
  }
</script>

<style lang='stylus'>
  // 这里不能而是用别名路径，别名路径只适用于js文件
  @import "../../common/stylus/mixin";
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
            vertical-align: toop
            width: 12px
            height: 12px
            margin-right: 4px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image:('decrease_1')
            &.discount
              bg-image:('discount_1')
            &.guarantee
              bg-image:('guarantee_1')
            &.invoice
              bg-image:('invoice_1')
            &.special
              bg-image:('special_1')
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
</style>