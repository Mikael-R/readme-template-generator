module.exports = toolbox => {
  const {
    filesystem: { read }
  } = toolbox

  const readJsonFile = file => {
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
