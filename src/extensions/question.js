module.exports = toolbox => {
  const { prompt } = require('inquirer')

  const question = async ({
    type,
    message,
    defaultValue,
    choices,
    validate
  }) => {
    const answer = await prompt({
      type,
      name: 'value',
      message,
      default: defaultValue,
      choices,
      validate
    })

    return answer.value
  }

  toolbox.question = question
}
