
# Vue-Elm-Shop

<h1 align="center">Welcome to Vue-Elm-Shop👋</h1>
<p align="center">
  <img src="https://img.shields.io/badge/node-v10.15.3-green" />
  <img src="https://img.shields.io/badge/npm-6.14.8-yellowgreen" />
  <img src="https://img.shields.io/badge/vue-^2.6.11-greenyellow" />
  <img src="https://img.shields.io/badge/vueCli-4.5.0-yellow" />
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
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210330231905295.gif)


- [项目演示地址](http://47.115.112.11:8900/)（请用chrome手机模式预览）
 ![二维码](https://img-blog.csdnimg.cn/20210322224125424.png)

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
> - 图标icon.styl-通过icomoon.io网站制作文字图标样式
> - 混入mixin.styl–移动端border-1px样式及背景图片大小适配

## 项目优化

>webpack-chain 件优化打包后的项目体积

## 作者

👤 **y_xiuzhu(杨秀竹)**

[项目github地址，期待你的星星🌟](https://github.com/yxiuzhu/elm-shop)
## 项目课程

👤 **ustbhuangyi(黄轶)**

## 项目结构

```bash
common-文件夹存放的是通用的css和icon样式文件
componets-文件夹用来存放Vue组件
router-文件夹设置Vue Router
dist-webpack打包编译后的项目文件
Prod.server.js-利用express搭建node服务获取数据的代理接口文件
App.vue-根组件，设置子组件的引用与跳转
Main.js-创建Vue实例及插件的使用
README.md-项目简介
```
## 项目总结

**移动端border-1px样式**
![移动端border-1px样式](https://img-blog.csdnimg.cn/20210326204356285.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)
![移动端border-1px样式](https://img-blog.csdnimg.cn/20210328202741306.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)

**BFC解决高度塌陷问题**
![BFC解决高度塌陷问题](https://img-blog.csdnimg.cn/20210326204525632.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)
 **CSS Sticky footers 布局**
>应用背景：当页面内容不够长的时候，页脚块需要粘贴在视口底部；当页面内容足够长，页脚块会被内容向下推送

* 实现：父级 position:fixed，内容设为padding-bottom:64px，页脚相对定位，margin-top:-64px，clear:both为了保证兼容性，父级要清除元素左右浮动
![CSS Sticky footers 布局](https://img-blog.csdnimg.cn/20210326213509432.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)

**自适应布局**
1、左侧宽度固定80px，右侧宽度自适应
![自适应布局](https://img-blog.csdnimg.cn/2021032621432354.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)
2、媒体查询适应小屏手机
![自适应布局](https://img-blog.csdnimg.cn/20210326214526358.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)

**背景图片高斯模糊**

1、backdrop-filter: blur(10px)适用于ios系统；
2、filter：blur(10px)会导致整个屏幕的元素模糊

>注意，所有在内的子元素也会模糊，包括文字。所以采用定位布局，背景单独占用一个层，ios有一个设置backdrop-filter:blur(10px)，只会模糊背景,但不支持android
![背景图片高斯模糊](https://img-blog.csdnimg.cn/20210326214721845.png)

**Vue.js过渡动画**

>使用 JavaScript 钩子函数实现小球飞出动画及贝塞尔曲线缓动函数应用
* 涉及组件ShopCart.vue、Good.vue
* Good组件捕获添加食物的add点击事件，调用子组件ShopCart的钩子函数实现小球飞出动画
* 组件复用：通过父子组件之间的通信，实现子组件CartControl.vue的小球飞出动画
![Vue.js过渡动画](https://img-blog.csdnimg.cn/20210326221111413.gif)
![Vue.js过渡动画](https://img-blog.csdnimg.cn/20210326221416333.gif)

**Star 星星组件**

>根据指定大小的图片size及评分生成星星评分组件
>实现组件的抽样复用
>![Star 星星组件](https://img-blog.csdnimg.cn/20210330210555601.png)
![Star 星星组件](https://img-blog.csdnimg.cn/20210326221910994.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)

**时间戳的转换**

>时间戳的转换
>
* 1、利用过滤器
* 2、利用`Moment.js`开源库实现时间戳的转换
![时间戳的转换](https://img-blog.csdnimg.cn/20210326223217761.png)

**Seller 店铺详情页**

>商家实景图片的横向滚动
* 解决方案：
* 每个 `li` 要 `display：inline-block`，因为`width`不会自动撑开父级`ul`，所以需要将计算后的宽度赋值给`ul`的`width`，（每一张图片的`width+margin`）*图片数量-一个`margin`，因为最后一张图片没有`margin`；外层图片不换行`white-space: nowrap`
* 同时`new BScroll`里面要设置`scrollX: true,eventPassthrough: ‘vertical’`, // 滚动方向横向，竖向不能滚动
![图片的横向滚动](https://img-blog.csdnimg.cn/20210328204923642.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)

**基于localStorage的移动端数据存取方案**

* 使用`query-string`第三方库对`query`进行解析，获取查询地址，将对不同id的数据进行缓存
* 使用`good-storage`的第三方库进行`localStorage`的存取操作
![localStorage的移动端数据存取方案](https://img-blog.csdnimg.cn/20210329094739349.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)
**项目优化**

* 使用`webpack-bundle-analyzer`分析工具，`npm run report` 生成可视化的分析报告，
* 通过减小第三方库中不需要的功能，将打包后的项目体积减少28%
![可视化的分析报告](https://img-blog.csdnimg.cn/20210330210433109.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hhb3RpYW4xOTk3,size_16,color_FFFFFF,t_70)
