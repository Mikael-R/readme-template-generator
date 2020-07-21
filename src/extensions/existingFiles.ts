import ExtendedGluegunToolbox from '../interfaces/extended-gluegun-toolbox'

export interface ExistingFiles {
  (baseFile: string): Array<string>
}

export default (toolbox: ExtendedGluegunToolbox) => {
  const existingFiles: ExistingFiles = (baseFile) => {
    const {
      filesystem: { list, read }
    } = toolbox

    const existing: Array<string> = []

    const files: Array<string> = list('.').filter(
      (file: string) => file.toLowerCase() === baseFile.toLowerCase()
    )

    files.map(file => {
      if (read(file) !== undefined) existing.unshift(file)
    })

    return existing
  }

  toolbox.existingFiles = existingFiles
}
