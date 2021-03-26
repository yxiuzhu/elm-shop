# Vue-Elm-Shop

<h1 align="center">Welcome to Vue-Elm-Shop👋</h1>
<p align="center">
  <img src="https://img.shields.io/badge/node-v10.15.3-green" />
  <img src="https://img.shields.io/badge/npm-6.13.4-yellowgreen" />
  <img src="https://img.shields.io/badge/vue-^2.6.10-greenyellow" />
  <img src="https://img.shields.io/badge/vueCli-3.11.0-yellow" />
</p>

## 🚀 如何运行

```
# 克隆
git clone https://github.com/yxiuzhu/elm-shop.git
```

```
# 打开项目目录
cd elm-shop
```

```
# 安装依赖
npm install
```

```
# 开启本地服务运行项目
npm run serve
```

## 项目演示

- [项目演示地址](http://ustbhuangyi.com/music)（请用chrome手机模式预览）
- ![二维码](https://img-blog.csdnimg.cn/20210322224125424.png)

## 项目页面及功能

- Header 公告详情页
- Goods 商品列表
- Foods 食物详情页
- Ratings 评价详情页
- Seller 店铺详情页

## 📓Header 公告详情页

- support-ico 优惠图标组件抽样
- Star 星星组件抽样
- 背景图片高斯模糊
- CSS Sticky footers 布局

## 🍚Goods商品列表

- 引入第三方JS库better-scroll，处理移动列表滚动，实现商品左右列表联动
- 自定义Vue.js过渡动画，实现小球飞出动画及贝塞尔曲线缓动函数应用

## 🍗Foods 食物详情页

- Split 分隔组件抽样
- RatingSelect 评论组件抽样
- 时间格式化 引入第三方JS库Moment.js

## 📝Ratings 评价详情页

- Vue.js 组件复用

- 媒体查询适应小屏手机

## 📄Seller 店铺详情页

- 基于localStorage的移动端数据存取方案

- keep-alive实现组件缓存，体验优化

## 实用的组件

> 通用组件包括如下
> 
> - Star 星星组件
> - Split 分隔组件
> - Loading 组件
>
> 还有一些是为本项目量身订做的组件，与上面的通用组件都在 src/components 目录下

## CSS布局样式

> - 公共base.styl–媒体查询，解决移动端border-1px问题；结合BFC解决高度塌陷问题
> - icon.styl-通过icomoon.io网站制作文字图标样式
> - mixin.styl–移动端border-1px样式及背景图片大小适配

## 项目优化

>webpack-chain 件优化打包后的项目体积

## 作者

👤 **y_xiuzhu(杨秀竹)**

## 项目课程

👤 **ustbhuangyi(黄轶)**

🚀 [demo地址](http://ustbhuangyi.com/music)

🚀 [课程地址](https://coding.imooc.com/class/107.html)
