// 使用 localStorage 是为了存储当前商家(id)对应的 favorite 状态
export function saveToLocal(id,key,value) {
  // 开辟存储字段
  let seller = window.localStorage.__seller__
  // 本地从来没创建过
  if (!seller) {
    seller = {}
    // 每个商家都有对应的id 就有对应的 Object
    seller[id] = {}
  // 创建过 但不是当前操作的商家对应的id
  } else {
    // localstorage 存储的是字符串 所以要先转成json
    seller = JSON.parse(seller)
    if (!seller[id]) {
      seller[id] = {}
    }
  }
  seller[id][key] = value
  // 执行完后要以字符串形式存储
  window.localstorage.__seller__ = JSON.stringify(seller)
}

export function loadFromLocal(id,key,def) {}