import ExtendedGluegunToolbox from 'src/interfaces/extended-gluegun-toolbox'

export interface ExistingFiles {
  (baseFile: string): string[]
}

export default (toolbox: ExtendedGluegunToolbox) => {
  const existingFiles: ExistingFiles = (baseFile) => {
    const {
      filesystem: { list, read }
    } = toolbox

    const existing: string[] = []

    const files: string[] = list('.').filter(
      (file: string) => file.toLowerCase() === baseFile.toLowerCase()
    )

    files.map(file => {
      if (read(file) !== undefined) existing.unshift(file)
    })

    return existing
  }

  toolbox.existingFiles = existingFiles
}
