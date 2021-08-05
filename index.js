const presetBeforeServeFn = require('./interceptRequest')
const getAnswers = require('./interactive/index')

module.exports = async (api, options) => {
  const { serve, build } = api.service.commands
  console.log(options, '112233')
  const answer = await getAnswers(getDevServerOptions(options))
  const serveFnCache = serve.fn
  const buildFnCache = build.fn
  serve.fn = async (...args) => {
    presetBeforeServeFn.call(null, api, options, answer)
    return serveFnCache(...args)
  }
  build.fn = () => {
    return buildFnCache(...args)
  }
  function getDevServerOptions(options) {
    return JSON.parse(JSON.stringify(options)).devServer
  }
}
