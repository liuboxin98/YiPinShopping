import request from './network.js'

const baseUrl = "http://192.168.1.107:4000"
 
export function getMultiData() {
  return request({})
}
export function getGoodsData(typeid, page) {
  return request({
    url: baseUrl + '/api/getGoods',
    method: 'post',
    data: {
      typeid,
      page
    }
  })
}
export function getBanner() {
  return request({
    url: baseUrl + '/api/getBanner'
  })
}

export function getRecomment() {
  return request({
    url: baseUrl + '/api/getRecomment'
  })
}
