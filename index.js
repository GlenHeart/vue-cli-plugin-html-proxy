const presetBeforeServeFn = require('./interceptRequest')
const loadConfig = require('./interceptRequest/load-config.js')
module.exports = async (api, options) => {
  const { serve, build } = api.service.commands
  const serveFnCache = serve.fn
  const buildFnCache = build.fn
  serve.fn = async (...args) => {
    presetBeforeServeFn.call(null, api, options, answer)
    return serveFnCache(...args)
  }
  build.fn = () => {
    return buildFnCache(...args)
  }
}
