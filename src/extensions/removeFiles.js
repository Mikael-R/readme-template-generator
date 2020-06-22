module.exports = (toolbox) => {
  const { filesystem: { remove } } = toolbox

  const removeFiles = (files) => {
    files.map(file => remove(file))
  }

  toolbox.removeFiles = removeFiles
}
