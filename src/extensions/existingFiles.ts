// eslint-disable-next-line no-unused-vars
import ExtendedGluegunToolbox from '../interfaces/extended-gluegun-toolbox'

export interface ExistingFiles {
  (toolbox: ExtendedGluegunToolbox, baseFile: string): Array<string>
}

const existingFiles: ExistingFiles = (toolbox, baseFile) => {
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

export default (toolbox: ExtendedGluegunToolbox) => {
  toolbox.existingFiles = existingFiles
}
