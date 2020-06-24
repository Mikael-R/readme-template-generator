module.exports = toolbox => {
  const {
    print: { info, success, warning, error }
  } = toolbox

  const message = ({ type = 'info', content }) => {
    if (type === 'info') info(content)

    if (type === 'success') success(content)

    if (type === 'warning') warning(content)

    if (type === 'error') error(content)
  }

  toolbox.message = message
}
