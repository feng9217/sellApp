import axios from 'axios'

export function getSellerData() {
  const url = '/api/seller'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}