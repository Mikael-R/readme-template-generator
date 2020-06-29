module.exports = toolbox => {
  const isWebUrl = url => {
    const webUrlRegex = /(http|https|ftp|ftps):\/\/[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,3}(\/\S*)?/

    const haveUrl = webUrlRegex.test(url)

    return haveUrl
  }

  toolbox.isWebUrl = isWebUrl
}
