module.exports = toolbox => {
  const { filesystem: { read } } = toolbox

  const getRepoUrl = async () => {
    const git_file = await read('.git/logs/refs/remotes/origin/HEAD')

    const github_repository_url =
      git_file
        ? git_file.split(' ')[git_file.split(' ').length - 1].trim()
        : ''

    return github_repository_url
  }

  toolbox.getRepoUrl = getRepoUrl
}
