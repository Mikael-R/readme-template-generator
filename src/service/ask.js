module.exports = async (toolbox, { type, name, message, choices = [] }) => {
  const question = {
    type,
    name,
    message,
    choices
  }
  const answer = await toolbox.prompt.ask(question)

  return answer
}