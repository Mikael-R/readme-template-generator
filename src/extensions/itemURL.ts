import ExtendedGluegunToolbox from 'src/interfaces/extended-gluegun-toolbox'

export type ItemURL = (url: string, index: number) => string

export default (toolbox: ExtendedGluegunToolbox) => {
  const itemURL: ItemURL = (url, index) => {
    const {
      filesystem: { cwd }
    } = toolbox

    if (url === '.') url = cwd()

    const item =
      url?.split('/')[url.split('/').length - index] === url
        ? url?.split('\\')[url.split('\\').length - index]
        : url?.split('/')[url.split('/').length - index]

    if (!item) return ''

    return item
  }

  toolbox.itemURL = itemURL
}
