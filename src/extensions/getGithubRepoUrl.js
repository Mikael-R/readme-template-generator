module.exports = toolbox => {
  const {
    filesystem: { read, cwd }
  } = toolbox
  const { resolve } = require('path')

  const getGithubRepoUrl = dir => {
    if (dir === '.') dir = cwd()

    const gitFile = read(
      resolve(dir, '.git', 'logs', 'refs', 'remotes', 'origin', 'HEAD')
    )

    const webUrlRegex = /(http|https|ftp|ftps):\/\/[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,3}(\/\S*)?/

    const haveUrl = webUrlRegex.test(gitFile)

    const url = haveUrl ? gitFile.match(webUrlRegex)[0] : null

    return url
  }

  toolbox.getGithubRepoUrl = getGithubRepoUrl
}
