module.exports = toolbox => {
  const {
    filesystem: { list, read }
  } = toolbox

  const existingFiles = fileBase => {
    const existing = []
    const files = list().filter(
      file => file.toLowerCase() === fileBase.toLowerCase()
    )

    files.map(file => {
      if (read(file) !== undefined) existing.unshift(file)
    })

    return existing
  }

  toolbox.existingFiles = existingFiles
}
