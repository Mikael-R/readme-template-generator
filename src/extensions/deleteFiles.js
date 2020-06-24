module.exports = toolbox => {
  const { filesystem: { remove } } = toolbox

  const deleteFiles = files => {
    files.map(file => remove(file))
  }

  toolbox.deleteFiles = deleteFiles
}
