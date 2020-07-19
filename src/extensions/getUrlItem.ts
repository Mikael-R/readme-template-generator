// eslint-disable-next-line no-unused-vars
import ExtendedGluegunToolbox from '../interfaces/extended-gluegun-toolbox'

export interface GetUrlItem {
  (toolbox: ExtendedGluegunToolbox, url: string, index: number): string
}

const getUrlItem: GetUrlItem = (toolbox, url, index) => {
  const {
    filesystem: { cwd }
  } = toolbox

  if (url === '.') url = cwd()

  const item: string | undefined =
      url.split('/')[url.split('/').length - index] === url
        ? url.split('\\')[url.split('\\').length - index]
        : url.split('/')[url.split('/').length - index]

  if (!item) return ''

  return item
}

export default (toolbox: ExtendedGluegunToolbox) => {
  toolbox.getUrlItem = getUrlItem
}
