import ExtendedGluegunToolbox from '../interfaces/extended-gluegun-toolbox'

export interface ReadJsonFile {
  (file: string): any
}

export default (toolbox: ExtendedGluegunToolbox) => {
  const readJsonFile: ReadJsonFile = (file) => {
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

  toolbox.readJsonFile = readJsonFile
}
