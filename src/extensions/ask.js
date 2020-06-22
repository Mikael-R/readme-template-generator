module.exports = (toolbox) => {
  const { prompt } = toolbox

  async function ask({ type, name, message, choices = [] }) {
    const answer = await prompt.ask({
      type,
      name,
      message,
      choices
    })

    return answer
  }

  toolbox.ask = ask
}