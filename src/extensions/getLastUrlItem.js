module.exports = toolbox => {
  const {
    filesystem: { cwd }
  } = toolbox

  const getLastUrlItem = url => {
    if (url === './') url = cwd()

    const lastItem =
      url.split('/')[url.split('/').length - 1] === url
        ? url.split('\\')[url.split('\\').length - 1]
        : url.split('/')[url.split('/').length - 1]

    return lastItem
  }

  toolbox.getLastUrlItem = getLastUrlItem
}
