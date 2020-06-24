module.exports = toolbox => {
  const {
    filesystem: { list, read }
  } = toolbox

  const existingFiles = async file => {
    const existing = []
    const files = list().filter(f => f.toLowerCase() === file.toLowerCase())

    files.map(async file => {
      if (await read(file) !== undefined) existing.unshift(file)
    })

    return existing
  }

  toolbox.existingFiles = existingFiles
}
