module.exports = async (toolbox) => {
  const { filesystem } = toolbox
  const exist_lowercase = await filesystem.read('readme.md') !== undefined
  const exist_uppercase = await filesystem.read('README.md') !== undefined
  const exist_titled = await filesystem.read('Readme.md') !== undefined

  return (exist_lowercase || exist_uppercase || exist_titled) ? true : false
}