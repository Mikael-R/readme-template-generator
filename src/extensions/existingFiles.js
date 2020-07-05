module.exports = toolbox => {
  const {
    filesystem: { list, read }
  } = toolbox

  const existingFiles = baseFile => {
    const existing = []
    const files = list('.').filter(
      file => file.toLowerCase() === baseFile.toLowerCase()
    )

    files.map(file => {
      if (read(file) !== undefined) existing.unshift(file)
    })

    return existing
  }

  toolbox.existingFiles = existingFiles
}
