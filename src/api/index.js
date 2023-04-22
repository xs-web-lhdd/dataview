/**
 * * API 统一管理
 */

/**
 * @description API统一管理
 * @author 凉风有信、
 */

import request from '../utils/request'
export default {
  login(params) {
    return request({
      url: '/users/login',
      method: 'post',
      data: params
      // mock: true
    })
  },
}