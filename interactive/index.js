const inquirer = require('inquirer')

function interactive (env) {
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
        name: key
      }
    })
  }
  return promptList
}

module.exports = async function getAnswers (env, callback) {
  const promptList = interactive(env)
  const answer = await inquirer.prompt(promptList)
  callback && callback(answer)
  return answer
}
