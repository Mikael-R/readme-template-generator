module.exports = () => {
  const cwd = process.cwd()
  const past =
    cwd.split('/')[cwd.split('/').length - 1] === cwd
      ? cwd.split('\\')[cwd.split('\\').length - 1]
      : cwd.split('/')[cwd.split('/').length - 1]

  return past
}