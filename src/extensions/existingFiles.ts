import ExtendedGluegunToolbox from 'src/interfaces/extended-gluegun-toolbox'

export interface ExistingFiles {
  (file: string, directory?: string): string[]
}

export default (toolbox: ExtendedGluegunToolbox) => {
  const {
    filesystem: { list },
  } = toolbox

  const existingFiles: ExistingFiles = (file, directory = '.') => {
    const directoryListed = list(directory) || []

    const existingFiles = directoryListed.filter(
      f => f.toLowerCase() === file.toLowerCase()
    )

    return existingFiles
  }

  toolbox.existingFiles = existingFiles
}
