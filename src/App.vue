<template>
  <div id="app">
    <Header :seller="seller"/>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to='/Goods'>商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to='/Ratings'>评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to='/Seller'>商家</router-link>
      </div>
    </div>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染这里 -->
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Header from './components/header/Header'
import {getSeller} from 'api'
import qs from 'query-string'

export default {
  name: 'App',
  components: {
    Header
  },
  data() {
    return {
      seller: {
        // 从query请求中拿到id
        id: qs.parse(location.search).id
      }
    };
  },
  // 使用vue-resource获取到了seller对象数据
  created() {
    this._getSeller()
    // 删除vue-resource
    // this.$http.get('api/seller').then((response) => {
    //   // 原来返回的response只是一个属性，下面这样才会变成对象
    //   response = response.body;
    //   if(response.errno === ERR_OK) {
    //     this.seller = response.data;
    //     // console.log(this.seller);
    //   }
    // });
  },
  methods: {
    // 利用封装的axios获取数据
    _getSeller() {
      getSeller({
        id: this.seller.id
      }).then((seller) => {
        this.seller = seller
      })
    }
  }
};
</script>

<style lang="stylus">
@import './common/stylus'
.tab
  display: flex
  width: 100%
  height: 40px
  line-height: 40px
  // 普通增加1px边框
  // border-bottom: 1px solid rgba(7,17,27,0.1)
  border-1px(rgba(7, 17, 27, 0.1))
  .tab-item
    flex: 1
    text-align: center

    // &表示a的父元素
    & > a {
      // 使点击整个div都生效
      display: block
      font-size: 14px
      color: rgb(77, 85, 93)

      &.active {
        color: rgb(240, 20, 20)
      }
    }
</style>
