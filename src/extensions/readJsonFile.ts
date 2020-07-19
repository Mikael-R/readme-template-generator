// eslint-disable-next-line no-unused-vars
import ExtendedGluegunToolbox from '../interfaces/extended-gluegun-toolbox'

export interface ReadJsonFile {
  (toolbox: ExtendedGluegunToolbox, file: string): any
}

const readJsonFile: ReadJsonFile = (toolbox, file) => {
  const {
    filesystem: { read }
  } = toolbox

  if (file.split('.')[file.split('.').length - 1] !== 'json') {
    return { error: 'File not is Json' }
  }

  const jsonFile = read(file)

  if (!jsonFile) {
    return { error: 'File not exists' }
  }

  return JSON.parse(jsonFile)
}

export default (toolbox: ExtendedGluegunToolbox) => {
  toolbox.readJsonFile = readJsonFile
}
