module.exports = (toolbox) => {
  const { filesystem } = toolbox

  async function existReadmeFile() {
    const exist = []
    const files = [
      'Readme.md', 'readme.md', 'README.md',
      'Readme.MD', 'readme.MD', 'README.MD'
    ]

    for (i in files) {
      if (await filesystem.read(files[i]) !== undefined) exist.unshift(files[i])
    }

    return exist.length > 0 ? true : false
  }

  toolbox.existReadmeFile = existReadmeFile
}