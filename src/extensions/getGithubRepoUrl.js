module.exports = toolbox => {
  const {
    filesystem: { read }
  } = toolbox
  const { resolve } = require('path')

  const getGithubRepoUrl = dir => {
    const gitFile = read(
      resolve(dir, '.git', 'logs', 'refs', 'remotes', 'origin', 'HEAD')
    )

    const pattern = /(?:git|ssh|https?|git@[-\w.]+):(\/\/)?(.*?)(.git|)(\/?|#[-\d\w._]+?)$/gm

    const haveUrl = pattern.test(gitFile)

    const url = haveUrl ? gitFile.match(pattern)[0] : ''

    return url
  }

  toolbox.getGithubRepoUrl = getGithubRepoUrl
}
