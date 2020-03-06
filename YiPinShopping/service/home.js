import request from './network.js'
import { baseURL, timeout } from './config.js'

export function getMultiData() {
  return request({})
}
export function getGoodsData(typeid, page) {
  return request({
    url: baseURL + '/api/getGoods',
    method: 'post',
    data: {
      typeid,
      page
    }
  })
}

export function getBanner() {
  return request({
    url: baseURL + '/api/getBanner'
  })
}

export function getRecomment() {
  return request({
    url: baseURL + '/api/getRecomment'
  })
}
