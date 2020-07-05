module.exports = toolbox => {
  const {
    filesystem: { cwd }
  } = toolbox

  const getUrlItem = (url, index = 1) => {
    if (typeof url !== 'string') return ''

    if (url === '.') url = cwd()

    const item =
      url.split('/')[url.split('/').length - index] === url
        ? url.split('\\')[url.split('\\').length - index]
        : url.split('/')[url.split('/').length - index]

    if (!item) return ''

    return item
  }

  toolbox.getUrlItem = getUrlItem
}
