<template>
  <div class="goods">
    <div class="menu-wrapper">

    </div>
    <div class="foods-wrapper">

    </div>
  </div>
</template>

<script>
  export default {
    name: 'Goods',
  }
</script>

<style lang='stylus'>
  .goods
    display: flex
    // 定义视口大小，需要使用绝对定位
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background-color: tomato
    .foods-wrapper
      // 自适应宽度
      flex: 1
      background-color: greenyellow
</style>