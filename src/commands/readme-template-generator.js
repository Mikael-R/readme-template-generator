module.exports = {
  name: 'readme-template-generator',
  run: async toolbox => {
    const {
      existingFiles,
      deleteFiles,
      getGithubRepoUrl,
      getUrlItem,
      question,
      message,
      generateFile,
      isWebUrl
    } = toolbox

    const githubRepository = { url: getGithubRepoUrl('.') }
    githubRepository.name = getUrlItem(githubRepository.url)
    githubRepository.user = getUrlItem(githubRepository.url, 2)

    const projectName = githubRepository.name || getUrlItem('.')

    const badgeChoices = ['Open Source', 'Awesome']

    if (githubRepository.url) {
      badgeChoices.unshift(
        'Language Most Used',
        'Implementations',
        'Gitpod',
        'Social Medias',
        'License',
        'Last Commit'
      )
    }

    const herokuUrl = (await question({
      message: 'Heroku Url:',
      validate: value =>
        isWebUrl(value) || value === ''
          ? true
          : 'Invalid URL, if you not have a URL, leave it blank'
    }))
      ? badgeChoices.unshift('Heroku')
      : ''

    const replitUrl = (await question({
      message: 'Rep.it Url:',
      validate: value =>
        isWebUrl(value) || value === ''
          ? true
          : 'Invalid URL, if you not have a URL, leave it blank'
    }))
      ? badgeChoices.unshift('Repl.it')
      : ''

    let useBadges = await question({
      type: 'checkbox',
      message: 'Select badges for use:',
      choices: badgeChoices
    })

    // Remove all espaces and lowercase letters
    useBadges = useBadges.map(badge => badge.toLowerCase().replace(/\s/g, ''))

    const additionalFiles = existingFiles('readme.md')

    if (additionalFiles.length) {
      if (additionalFiles.indexOf('README.md') !== -1) {
        message({
          type: 'warning',
          content: 'If you do not remove README.md, it will be overwritten!'
        })
      }

      const confirmRemove = await question({
        type: 'confirm',
        message: 'There are other readme files, do you want to remove them?'
      })

      if (confirmRemove) deleteFiles(additionalFiles)
    }

    await generateFile({
      template: 'README.md.ejs',
      target: 'README.md',
      props: { projectName, useBadges, githubRepository, herokuUrl, replitUrl }
    })

    message({
      type: 'success',
      content: 'README.md file generated with success in current dir!'
    })
  }
}
