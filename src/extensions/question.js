module.exports = (toolbox) => {
  const { prompt: { ask } } = toolbox

  const question = async ({ type, message, default_value, choices }) => {
    const answer = await ask({
      type,
      name: 'value',
      message,
      default: default_value,
      choices
    })

    return answer.value
  }

  toolbox.question = question
}
