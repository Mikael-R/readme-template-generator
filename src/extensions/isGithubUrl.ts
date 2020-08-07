import ExtendedGluegunToolbox from 'src/interfaces/extended-gluegun-toolbox'

export type IsGithubUrl = (url: string) => boolean

export default (toolbox: ExtendedGluegunToolbox) => {
  const isGithubUrl: IsGithubUrl = (url) => {
    const pattern = /(?:git|ssh|https?|git@[-\w.]+):(\/\/)?(.*?)(.git|)(\/?|#[-\d\w._]+?)$/gm

    return pattern.test(url)
  }

  toolbox.isGithubUrl = isGithubUrl
}
