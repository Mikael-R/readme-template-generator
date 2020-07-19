// eslint-disable-next-line no-unused-vars
import ExtendedGluegunToolbox from '../interfaces/extended-gluegun-toolbox'

export interface GetGithubRepoUrl {
  (toolbox: ExtendedGluegunToolbox, dir: string): string
}

const getGithubRepoUrl: GetGithubRepoUrl = (toolbox, dir) => {
  const { resolve } = require('path')
  const {
    filesystem: { read }
  } = toolbox

  const gitFile = read(
    resolve(dir, '.git', 'logs', 'refs', 'remotes', 'origin', 'HEAD')
  )

  const pattern = /(?:git|ssh|https?|git@[-\w.]+):(\/\/)?(.*?)(.git|)(\/?|#[-\d\w._]+?)$/gm

  const haveUrl = pattern.test(gitFile)

  const url = haveUrl ? gitFile.match(pattern)[0] : ''

  return url
}

export default (toolbox: ExtendedGluegunToolbox) => {
  toolbox.getGithubRepoUrl = getGithubRepoUrl
}
