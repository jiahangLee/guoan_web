import fetch from 'dva/fetch'

function parseJSON (response) {
  return response.json()
}

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  let message
  if (response.status === 404) {
    message = '404, 要访问的地址找不到了, 操作失败'
  } else if (response.status === 403) {
    message = '403, 服务器拒绝本次访问, 操作失败'
  } else if (response.status === 400) {
    message = '400, 本次请求无效, 操作失败'
  } else if (response.status === 401) {
    message = '401, 未取得访问授权, 操作失败'
  } else if (response.status === 405) {
    message = '405, 不允许的操作, 操作失败'
  } else if (response.status === 500) {
    message = '500, 后台服务运行出错, 操作失败'
  } else {
    message = '错误代码:' + response.status
  }
  const error = new Error(message)
  error.response = response
  error.status = response.status

  throw error
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request (url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({data}))
    .catch(err => ({err}))
}
