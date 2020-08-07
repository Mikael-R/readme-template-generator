import ExtendedGluegunToolbox from 'src/interfaces/extended-gluegun-toolbox'

export type GetUrlItem = (url: string | undefined, index: number) => string

export default (toolbox: ExtendedGluegunToolbox) => {
  const getUrlItem: GetUrlItem = (url, index) => {
    const {
      filesystem: { cwd }
    } = toolbox

    if (url === undefined) return
    if (url === '.') url = cwd()

    const item: string | undefined =
      url.split('/')[url.split('/').length - index] === url
        ? url.split('\\')[url.split('\\').length - index]
        : url.split('/')[url.split('/').length - index]

    if (!item) return ''

    return item
  }

  toolbox.getUrlItem = getUrlItem
}
