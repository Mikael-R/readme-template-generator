module.exports = toolbox => {
  const {
    prompt: { ask }
  } = toolbox

  const question = async ({ type, message, defaultValue, choices }) => {
    const answer = await ask({
      type,
      name: 'value',
      message,
      default: defaultValue,
      choices
    })

    return answer.value
  }

  toolbox.question = question
}
