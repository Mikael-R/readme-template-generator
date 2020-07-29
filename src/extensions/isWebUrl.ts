import ExtendedGluegunToolbox from 'src/interfaces/extended-gluegun-toolbox'

export type IsWebUrl = (url: string) => boolean

export default (toolbox: ExtendedGluegunToolbox) => {
  const isWebUrl: IsWebUrl = (url) => {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
      'i' // fragment locator
    )

    return pattern.test(url)
  }

  toolbox.isWebUrl = isWebUrl
}
