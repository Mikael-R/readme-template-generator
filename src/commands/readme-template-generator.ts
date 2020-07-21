import { GluegunCommand } from 'gluegun'

import ExtendedGluegunToolbox from 'src/interfaces/extended-gluegun-toolbox'

const command: GluegunCommand = {
  name: 'readme-template-generator',
  async run (toolbox: ExtendedGluegunToolbox) {
    const {
      existingFiles,
      getGithubRepoInfo,
      getUrlItem,
      question,
      message,
      generateFile,
      isWebUrl,
      readJsonFile,
      showBanner
    } = toolbox

    showBanner({ text: 'Readme|Template Generator' })

    message(
      'warning',
      'Project under development, this is a alpha version!\n' +
      'Contribute: https://github.com/Mikael-R/readme-template-generator\n'
    )

    if (existingFiles('README.md').indexOf('README.md') !== -1) {
      const overwrite = await question({
        type: 'confirm',
        message: 'Already exists a README.md file, overwrite it?'
      })

      if (!overwrite) process.exit(0)
    }

    const githubRepository = getGithubRepoInfo('.')

    const projectName = githubRepository.name || getUrlItem('.', 1)

    const packageJson = readJsonFile('package.json')

    const badgeChoices = ['Open Source', 'Awesome']

    if (githubRepository.url) {
      badgeChoices.push(
        'Language Most Used',
        'Implementations',
        'Gitpod',
        'Social Medias',
        'License',
        'Last Commit'
      )
    }

    if (packageJson.name) {
      badgeChoices.push('NPM Version', 'NPM Monthly Downloads')
    }

    const herokuUrl: string = await question({
      message: 'Heroku Url (use empty value to skip):',
      validate: (value: string) =>
        isWebUrl(`https://${value}`) || value === ''
          ? value === '' ? true : !!(badgeChoices.push('Heroku') + 1)
          : 'Invalid URL',
      customReturn: (value: string) => value !== '' ? `https://${value}` : value
    })

    const replitUrl: string =
      githubRepository.url &&
      (await question({
        message: 'Rep.it Url (use empty value to skip):',
        validate: (value: string) =>
          isWebUrl(`https://${value}`) || value === ''
            ? value === '' ? true : !!(badgeChoices.push('Repl.it') + 1)
            : 'Invalid URL',
        customReturn: (value: string) =>
          value !== '' ? `https://${value}.repl.run` : value
      }))

    const useBadges: Array<string> = await question({
      type: 'checkbox',
      message: 'Select badges for use:\n ',
      choices: badgeChoices,
      customReturn: (value: Array<string>) =>
        value.map((badge: string) => badge.toLowerCase().replace(/\s/g, ''))
    })

    generateFile({
      template: 'README.md.ejs',
      target: 'README.md',
      props: {
        projectName,
        useBadges,
        githubRepository,
        herokuUrl,
        replitUrl,
        packageJson
      }
    })

    message('success', '\nGenerated README.md file with success in current dir!')
  }
}

export default command
