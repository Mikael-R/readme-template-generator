/* eslint-disable no-unused-vars */
import { GluegunCommand } from 'gluegun'

import ExtendedGluegunToolbox from '../interfaces/extended-gluegun-toolbox'
import { GithubRepository } from '../types'

const command: GluegunCommand = {
  name: 'readme-template-generator',
  run: async (toolbox: ExtendedGluegunToolbox) => {
    const {
      existingFiles,
      getGithubRepoUrl,
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
      toolbox,
      'warning',
      'Project under development, this is a alpha version!\n' +
      'Contribute: https://github.com/Mikael-R/readme-template-generator\n'
    )

    if (existingFiles(toolbox, 'README.md').indexOf('README.md') !== -1) {
      const overwrite = await question({
        type: 'confirm',
        message: 'Already exists a README.md file, overwrite it?'
      })

      if (!overwrite) process.exit(0)
    }

    const githubRepository: GithubRepository = {
      url: getGithubRepoUrl(toolbox, '.'),
      name: getUrlItem(toolbox, getGithubRepoUrl(toolbox, '.'), 1),
      user: getUrlItem(toolbox, getGithubRepoUrl(toolbox, '.'), 2)
    }

    const projectName: string = githubRepository.name || getUrlItem(toolbox, '.', 1)

    const packageJson = readJsonFile(toolbox, 'package.json')

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
      validate: value =>
        isWebUrl(`https://${value}`) || value === '' ? true : 'Invalid URL',
      customReturn: (value: string) => {
        if (value !== '') return `https://${value}`
        return value
      }
    })

    if (herokuUrl) badgeChoices.push('Heroku')

    const replitUrl: string =
      githubRepository.url &&
      (await question({
        message: 'Rep.it Url (use empty value to skip):',
        customReturn: (value: string) => {
          if (value !== '') return `https://${value}.repl.run`
          return value
        }
      }))

    if (replitUrl) badgeChoices.push('Repl.it')

    const useBadges: Array<string> = await question({
      type: 'checkbox',
      message: 'Select badges for use:\n',
      choices: badgeChoices,
      customReturn: (value: Array<string>) =>
        value.map((badge: string) => badge.toLowerCase().replace(/\s/g, ''))
    })

    generateFile({
      toolbox,
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

    message(toolbox, 'success', '\nGenerated README.md file with success in current dir!')
  }
}

export default command
