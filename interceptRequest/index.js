const loadConfig = require('./load-config.js')
const { isPromise } = require('../util.js')
const { default: axios } = require('axios')

module.exports = function presetBeforeServeFn(api, options) {
  setProxy(options)
  api.chainWebpack(config => {
    config.devServer
      .before(intercept)
  })
}
function intercept (app) {
  const devConfig = loadConfig()
  app.get('/test-in-main', async (req, res) => {
    await setCookie(res)
    return res.redirect(loadConfig().exchange.mianSystemUrl)
  })
  if (loadConfig().exchange.remoteUrl) {
    app.get(loadConfig().exchange.remoteUrl, async (req, res) => {
      const data = await axios.get(devConfig.exchange.localUrl)
      res.setHeader('Content-Type', 'text/html')
      return res.send(data.data)
    })
  } else {
    console.warn('\n需要在主框架测试，请提供exchange.remoteUrl')
  }
}
function setProxy (options) {
  const devConfig = loadConfig()
  options.devServer.proxy = Object.assign(options.devServer.proxy || {}, devConfig.proxyConfig)
}
async function setCookie (res) {
  const devConfig = loadConfig()
  const cookiePromise = devConfig.extraCookie()
  if (isPromise(cookiePromise)) {
    const cookie = await cookiePromise
    Object.keys(cookie).forEach(key => {
      res.cookie(key, cookie[key])
    })
  } else {
    console.log(`extraCookie应返回一个promise`)
  }
}
