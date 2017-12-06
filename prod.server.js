var express = require('express')
var config = require('./config/index')

// 当前环境变量下的 PORT
var port = process.env.PORT || config.build.port

var app = express()

var router = express.Router()

router.get('', function(req, res, next) {
  req.url = './index.html'
  next()
})

app.use(router)

// 定义异步接口
// 使用 express 来编写接口请求进行后台数据模拟(mock)
var appData = require('./data.json')
// 定义对应数据接口
var seller = appData.seller
var goods = appData.goods
var ratings = appData.ratings

var apiRoutes = express.Router()

apiRoutes.get('/seller', function(req, res) {
  res.json({
    // 通过errnumber返回字段 判断数据请求是否正常 一般是0
    errno: 0,
    data: seller
  })
})

apiRoutes.get('/goods', function(req, res) {
  res.json({
    // 通过errnumber返回字段 判断数据请求是否正常 一般是0
    errno: 0,
    data: goods
  })
})

apiRoutes.get('/ratings', function(req, res) {
  res.json({
    // 通过errnumber返回字段 判断数据请求是否正常 一般是0
    errno: 0,
    data: ratings
  })
})

// const app = express() 所以express对应的就是一个app对象
app.use('/api', apiRoutes)

// 配置static路径
app.use(express.static('./dist'))

// 启动服务器
module.export = app.listen(port, function(err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening an http://localhost:' + port + '\n')
})