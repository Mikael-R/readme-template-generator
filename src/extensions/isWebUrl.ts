// eslint-disable-next-line no-unused-vars
import ExtendedGluegunToolbox from '../interfaces/extended-gluegun-toolbox'

export interface IsWebUrl {
  (url: string): boolean
}

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

export default (toolbox: ExtendedGluegunToolbox) => {
  toolbox.isWebUrl = isWebUrl
}
