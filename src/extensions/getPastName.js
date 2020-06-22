module.exports = (toolbox) => {
  const { filesystem: { cwd } } = toolbox

  const getPastName = () => {
    const dir = cwd()
    const past =
      dir.split('/')[dir.split('/').length - 1] === dir
        ? dir.split('\\')[dir.split('\\').length - 1]
        : dir.split('/')[dir.split('/').length - 1]

    return past
  }

  toolbox.getPastName = getPastName
}
