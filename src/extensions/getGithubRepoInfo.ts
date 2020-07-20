// eslint-disable-next-line no-unused-vars
import ExtendedGluegunToolbox from '../interfaces/extended-gluegun-toolbox'

export interface GetGithubRepoInfo {
  (toolbox: ExtendedGluegunToolbox, dir: string): RepositoryInfo
}

interface RepositoryInfo {
  url?: string,
  name?: string,
  author?: string
}

const getGithubRepoInfo: GetGithubRepoInfo = (toolbox, dir) => {
  const { resolve } = require('path')
  const {
    filesystem: { read },
    getUrlItem
  } = toolbox

  const gitFile = read(
    resolve(dir, '.git', 'logs', 'refs', 'remotes', 'origin', 'HEAD')
  )

  const pattern = /(?:git|ssh|https?|git@[-\w.]+):(\/\/)?(.*?)(.git|)(\/?|#[-\d\w._]+?)$/gm

  const haveUrl = pattern.test(gitFile)

  const repositoryInfo: RepositoryInfo =
    haveUrl
      ? {
        url: gitFile.match(pattern)[0],
        name: getUrlItem(toolbox, gitFile.match(pattern)[0], 1),
        author: getUrlItem(toolbox, gitFile.match(pattern)[0], 2)
      }
      : {}

  return repositoryInfo
}

export default (toolbox: ExtendedGluegunToolbox) => {
  toolbox.getGithubRepoInfo = getGithubRepoInfo
}
