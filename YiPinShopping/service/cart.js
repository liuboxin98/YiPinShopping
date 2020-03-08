import request from './network.js'
import { baseURL, timeout } from './config.js'

export function getGoodsData(username, goodsid) {
  return request({
    url: baseURL + '/api/addGoodsToCart',
    method: 'post',
    data: {
      username,
      goodsid
    }
  })
}
