export function formatDate(date, fmt) {
  // 从 时间戳 和传入的格式 'yyyy-MM-DD hh:mm'(2017-11-11 12:12) 转化成对应的时间
  // 用正则匹配传进来的 fmt , 以一个或多个 y 开头的字符串
  // RegExp.$1 就是 yyyy 接着用后面的年份来替换
  // + '' 是隐式转换 把数字转化成字符串
  // 需要几个 y 产量就是几, 此处相当于 substr(0), 从第0位开始截取完整的年份
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    // 正则对应替换的内容
    let dateData = {
      'M+': date.getMonth() + 1,
      'D+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (let k in dateData) {
      // 通过动态的方法构造成正则表达式 之后.test(fmt)
      // 匹配则做替换
      if (new RegExp(`(${k})`).test(fmt)) {
        // 需要替换的值
        let str = dateData[k] + ''
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
      }
    }
    return fmt
  }
}
// 非正则方法
// <!-- value 格式为13位unix时间戳 -->
// <!-- 10位unix时间戳可通过value*1000转换为13位格式 -->
// Vue.filter('time', function(value) {
//   var date = new Date(value);
//   Y = date.getFullYear()
//   m = date.getMonth() + 1
//   d = date.getDate()
//   H = date.getHours()
//   i = date.getMinutes()
//   s = date.getSeconds()
//   if (m < 10) {
//     m = '0' + m
//   }
//   if (d < 10) {
//     d = '0' + d
//   }
//   if (H < 10) {
//   H = '0' + H
//   }
//   if (i < 10) {
//     i = '0' + i
//   }
//   if (s < 10) {
//     s = '0' + s
//   }
//   // <!-- 获取时间格式 2017-01-03 10:13:48 -->
//   var t = Y+'-'+m+'-'+d+' '+H+':'+i+':'+s
//   // <!-- 获取时间格式 2017-01-03 -->
//   var t = Y + '-' + m + '-' + d
//   return t;
// })

// 补0
function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

// 解析 url参数
// 如: ?id=12345&a=b
// return Object{id:12345,a:b}
export function urlParse() {
  let url = window.location.search
  let obj = {}
  // 包含 ?或者&字符 后面跟着所有非?或者&字符一个或多个 全局匹配
  // 对应匹配  ?  id  =  12345
  //           &   a  =   b
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  if (arr) {
    arr.forEach((item) => {
      // substring 删掉第一个字符 ? 再用split从等号分割
      let tempArr = item.substring(1).split('=')
      // 因为操作的是url参数 所以需要添加 decodeURIComponent
      let key = decodeURIComponent(tempArr[0])
      let val = decodeURIComponent(tempArr[1])
      obj[key] = val
    })
  }
  return obj
}