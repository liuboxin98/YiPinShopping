import request from './network.js'
import { baseURL, timeout } from './config.js'

export function getGoodsData(gname, page) {
  return request({
    url: baseURL + '/api/searchGoods',
    method: 'post',
    data: {
      gname,
      page
    }
  })
}

