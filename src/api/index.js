/**
 * * API 统一管理
 */

/**
 * @description API统一管理
 * @author 凉风有信、
 */

import request from '../utils/request'
export default {
  loginApi(params) {
    return request({
      url: '/sys/login',
      method: 'post',
      data: params
      // mock: true
    })
  },
  getUserInfoApi(params) {
    return request({
      url: '/sys/userinfo',
      method: 'post',
      data: params
    })
  },
  getProjectList(params) {
    return request({
      url: '/project/list',
      method: 'get',
      data: params
    })
  },
  saveProjectApi(params) {
    return request({
      url: '/project/save/data',
      method: 'post',
      data: params
    })
  },
  fetchProjectApi(params) {
    return request({
      url: '/project/getData',
      method: 'get',
      data: params
    })
  },
  uploadFileApi(params) {
    return request({
      url: '/project/upload',
      method: 'post',
      data: params
    })
  },
  updateProjectApi(params) {
    return request({
      url: '/project/edit',
      method: 'post',
      data: params
    })
  }
}