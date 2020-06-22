module.exports = toolbox => {
  const { filesystem: { cwd } } = toolbox

  const getLastUrlItem = (url) => {
    if (url === 'cwd') url = cwd()

    const last_item =
      url.split('/')[url.split('/').length - 1] === url
        ? url.split('\\')[url.split('\\').length - 1]
        : url.split('/')[url.split('/').length - 1]

    return last_item
  }

  toolbox.getLastUrlItem = getLastUrlItem
}
