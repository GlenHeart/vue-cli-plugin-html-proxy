const inquirer = require('inquirer')
const env = {
  dev: 'http://172.16.7.60',
  test: 'http://172.16.7.63'
}

function interactive (env) {
  const envNameMap = {
    dev: '开发',
    test: '测试',
    pre: '预发',
    proL: '生产'
  }
  const promptList = [{
    type: 'list',
    name: 'proxy',
    message: '选择启动环境',
    choices: genChoice()
  }]
  function genChoice () {
    return Object.keys(env).map(key => {
      return {
        value: env[key],
        name: envNameMap[key]
      }
    })
  }
  return promptList
}

module.exports = async function getAnswers (devServerOptions, callback) {
  const { env } = devServerOptions
  const promptList = interactive(env)
  const answer = await inquirer.prompt(promptList)
  callback(answer)
  return answer
}
