import ExtendedGluegunToolbox from 'src/interfaces/extended-gluegun-toolbox'

export interface GetGithubRepoInfo {
  (dir: string): RepositoryInfo
}

interface RepositoryInfo {
  url?: string,
  name?: string,
  author?: string
}

export default (toolbox: ExtendedGluegunToolbox) => {
  const getGithubRepoInfo: GetGithubRepoInfo = (dir) => {
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
          name: getUrlItem(gitFile.match(pattern)[0], 1),
          author: getUrlItem(gitFile.match(pattern)[0], 2)
        }
        : {}

    return repositoryInfo
  }

  toolbox.getGithubRepoInfo = getGithubRepoInfo
}
