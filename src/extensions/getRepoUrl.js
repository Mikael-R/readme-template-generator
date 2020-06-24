module.exports = toolbox => {
  const { filesystem: { read } } = toolbox

  const getRepoUrl = async dir => {
    const gitFile = await read(`${dir}/.git/logs/refs/remotes/origin/HEAD`)

    const githubRepositoryURl =
      gitFile
        ? gitFile.split(' ')[gitFile.split(' ').length - 1].trim()
        : ''

    return githubRepositoryURl
  }

  toolbox.getRepoUrl = getRepoUrl
}
