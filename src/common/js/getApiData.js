import axios from 'axios'

export function getSellerData() {
  const url = '/api/seller'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getGoodsData() {
  const url = '/api/goods'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getRatingsData() {
  const url = '/api/ratings'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}