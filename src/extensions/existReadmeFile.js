module.exports = async (toolbox) => {
  const { filesystem } = toolbox
  const exist_lowercase = await filesystem.read('readme.md') !== undefined
  const exist_uppercase = await filesystem.read('README.md') !== undefined

  return (exist_lowercase || exist_uppercase) ? true : false
}