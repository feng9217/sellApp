# sell-app-demo

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).  

头部组件演示:  
![image](https://github.com/feng9217/sellApp/blob/master/resource/demoGIF/headerDemo.gif)  

good页功能演示:  
![image](https://github.com/feng9217/sellApp/blob/master/resource/demoGIF/goodsDemo1.gif)  

good页中的food组件详情功能演示:  
![image](https://github.com/feng9217/sellApp/blob/master/resource/demoGIF/goodsDemo2.gif)  

ratings评价页演示:  
![image](https://github.com/feng9217/sellApp/blob/master/resource/demoGIF/ratings.gif)  

<h1>准备事项</h1>  

<h2>裁剪图片/字体图标</h2>  
移动端一般都会准备 2x/3x的图片 以适应不同DPR(设备像素比)的手机 该值与屏幕密度有关  
  
虽然之前应该是常用精灵图来减少图片的请求, 但是在使用vue + webpack构建项目的时候, 可以使用单张图, 因为webpack会做图片打包工作, 转换成base64, 可能最后连图片请求都不会有。  
  
关于SVG图片, 都是使用图标字体引入(icon-font)  
在 https://icomoon.io/app/#/select 选择左上角 import Icons 导入自己的SVG 选择右下角 Generate Font 生成图标字体  
生成后左上角有 preferences 可以对该字体库进行设置 之后便可以Download  
把压缩包解压, 需要放入项目中的是 fonts文件夹 和 style.css  
如果使用的是stylus 还需要把 style.css 改成stylus语法  
  
<h2>mock数据</h2>  
自备了一个 data.json 涵盖所用到的数据  
<em>商家信息: seller  商品信息: goods  评价信息: ratings</em>  
在 dev-server.js 中, 使用express来编写请求数据的接口  
调用 express.Router() 来定义对应的接口, 最后一定要记得 use !!!  
最后打开控制台, npm run dev, 开启监听 localhost:8080 接口后, 在地址栏输入对应的 api/ratings /goods /seller 就能测试是否能正常获取数据  
  
***
<h1>项目开发</h1>
PS: 移动端记得添加视口  
  
<h2>组件拆分</h2>  
header + 导航区 + 内容区(goods + ratings + seller)  
内容区的切换基于 vue-router 来实现  
  
***
<h2>header组件</h2>  
  
<h3>数据</h3>
使用了 axios 从之前定义的api获取了seller的数据, api为: /api/seller
并在其中加入了Promise  
  
<h3>结构划分</h3>  
总共划分了四个部分: content-wrapper商家信息部分 / board-wrapper公告部分 / background背景模糊区域 / detail详细信息层部分  



