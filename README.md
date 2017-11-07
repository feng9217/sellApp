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

<h1>准备事项</h1>
移动端一般都会准备 2x/3x的图片 以适应不同DPR(设备像素比)的手机 该值与屏幕密度有关  
  
虽然之前应该是常用精灵图来减少图片的请求, 但是在使用vue + webpack构建项目的时候, 可以使用单张图, 因为webpack会做图片打包工作, 转换成base64, 可能最后连图片请求都不会有。  
  
关于SVG图片, 都是使用图标字体引入(icon-font)  
在 https://icomoon.io/app/#/select 选择左上角 import Icons 导入自己的SVG 选择右下角 Generate Font 生成图标字体  
生成后左上角有 preferences 可以对该字体库进行设置 之后便可以Download  
把压缩包解压, 需要放入项目中的是 fonts文件夹 和 style.css  
如果使用的是stylus 还需要把 style.css 改成stylus 语法