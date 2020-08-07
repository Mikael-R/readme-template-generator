import ExtendedGluegunToolbox from 'src/interfaces/extended-gluegun-toolbox'

export type ExistingFiles = (filePath: string) => string[]

export default (toolbox: ExtendedGluegunToolbox) => {
  const existingFiles: ExistingFiles = (filePath) => {
    const {
      filesystem: { list },
      getUrlItem
    } = toolbox

    const baseFile = getUrlItem(filePath, 1)
    const directory = filePath.replace(baseFile, '')
    const directoryListed = list(directory)

    if (!directoryListed) return []

    const existingFiles: string[] = directoryListed.filter(
      (file: string) => file.toLowerCase() === baseFile.toLowerCase()
    )

    return existingFiles
  }

  toolbox.existingFiles = existingFiles
}
