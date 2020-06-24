module.exports = toolbox => {
  const {
    filesystem: { list, read }
  } = toolbox

  const existingFiles = async file => {
    const existing = []
    const files = list().filter(f => f.toLowerCase() === file.toLowerCase())

    for (const i in files) {
      if ((await read(files[i])) !== undefined) existing.unshift(files[i])
    }

    return existing
  }

  toolbox.existingFiles = existingFiles
}
