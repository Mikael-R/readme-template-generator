module.exports = toolbox => {
  const { prompt } = require('inquirer')

  const question = async ({
    type,
    message,
    defaultValue,
    choices,
    pageSize = 5,
    validate,
    transformer,
    customReturn = value => value
  }) => {
    const answer = await prompt({
      type,
      name: 'value',
      message,
      default: defaultValue,
      choices,
      pageSize,
      validate,
      transformer: transformer || customReturn
    })

    return customReturn(answer.value) || defaultValue
  }

  toolbox.question = question
}
