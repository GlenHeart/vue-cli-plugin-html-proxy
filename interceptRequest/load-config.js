const { resolve } = require('path')

module.exports = function loadConfig () {
  const obj = { proxy } = require(resolve(process.cwd(), './dev-config.js'))
  if (typeof proxy !== 'function') {
    throw new Error('proxy 应该返回一个函数')
  }
  return {
    proxyConfig: proxy(),
    ...obj
  }
}