// 引入状态码statusCode
import statusCode from '../statusCode';
// 定义请求路径, BASEURL: 普通请求API; CBASEURL: 中台API,不使用中台可不引入CBASEURL
import { BASEURL } from '../config';
// 定义默认参数
const defaultOptions = {
  data: {},
  ignoreToken: false,
  form: false,
};
/**
 * 发送请求
 * @params
 * method: <String> 请求方式: POST/GET
 * url: <String> 请求路径
 * data: <Object> 请求参数
 * ignoreToken: <Boolean> 是否忽略token验证
 * form: <Boolean> 是否使用formData请求
 */
function request(options) {
  const _options = Object.assign(defaultOptions, options);
  const { method, url, data, ignoreToken, form } = _options;
  const app = getApp();
  // 设置请求头
  let header = {};
  if (form) {
    header = {
      'content-type': 'application/x-www-form-urlencoded',
    };
  } else {
    header = {
      'content-type': 'application/json', //自定义请求头信息
    };
  }
  if (!ignoreToken) {
    // 从全局变量中获取token
    const { token } = app.globalData;
    header.Authorization = `Bearer ${token}`;
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASEURL + url,
      data,
      header,
      method,
      success: (res) => {
        const { statusCode: code } = res;
        console.log('ssss', res, code);
        if (code === statusCode.SUCCESS) {
          resolve(res.data);
        } else if (code === statusCode.EXPIRE) {
          app.globalData.token = '';
          showToast(`登录过期, 请重新刷新页面`);
          reject(res.data);
        } else {
          showToast(`请求错误${url}, CODE: ${code}`);
          reject(res.data);
        }
      },
      fail: (err) => {
        console.log('%c err', 'color: red;font-weight: bold', err);
        showToast(err.errMsg);
        reject(err);
      },
    });
  });
}

// 封装toast函数
function showToast(title, icon = 'none', duration = 2500, mask = false) {
  wx.showToast({
    title: title || '',
    icon,
    duration,
    mask,
  });
}

function get(options) {
  return request({
    method: 'GET',
    ...options,
  });
}

function post(options) {
  // url, data = {}, ignoreToken, form
  return request({
    method: 'POST',
    ...options,
  });
}

module.exports = {
  request,
  get,
  post,
};
