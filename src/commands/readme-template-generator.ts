import { GluegunCommand } from 'gluegun'

import ExtendedGluegunToolbox from 'src/interfaces/extended-gluegun-toolbox'
import * as Types from 'src/types'

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
      showBanner,
      isGithubUrl
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

    const packageJson = readJsonFile('package.json')

    githubRepository.url = await question({
      message: 'Repository URL in GitHub:',
      defaultValue: githubRepository.url,
      validate: (value: string) =>
        isGithubUrl(value) || value === ''
          ? true
          : 'Invalid GitHub repository URL'
    })

    const projectNameDefault = githubRepository.name || getUrlItem(packageJson?.repository?.url, 1)?.split('.')[0] || packageJson?.name || getUrlItem('.', 1)

    const projectName = await question({
      message: 'Project name:',
      defaultValue: projectNameDefault
    })

    const description: string = await question({
      message: 'Write a short description about project:',
      defaultValue: packageJson?.description,
      validate: (value: string) => value === '' ? 'Description its necessary' : true
    })

    const badgeChoices = ['Open Source', 'Awesome']

    if (githubRepository.url) {
      badgeChoices.push(
        'Language Most Used',
        'Implementations',
        'Gitpod',
        'Repository Social Status',
        'License',
        'Last Commit',
        'Repository Size'
      )
    }

    if (packageJson.name) {
      badgeChoices.push('NPM Version', 'NPM Monthly Downloads')
    }

    const herokuUrl: string = await question({
      message: 'Heroku URL (use empty value to skip):',
      validate: (value: string) =>
        isWebUrl(`https://${value}`) || value === ''
          ? value === '' ? true : !!(badgeChoices.push('Heroku') + 1)
          : 'Invalid URL',
      customReturn: (value: string) => value !== '' ? `https://${value}` : value
    })

    const replitUrl: string = await question({
      message: 'Repl.it URL (use empty value to skip):',
      validate: (value: string) =>
        isWebUrl(`https://${value}`) || value === ''
          ? value === '' ? true : !!(badgeChoices.push('Repl.it') + 1)
          : 'Invalid URL',
      customReturn: (value: string) =>
        value !== '' ? `https://${value}.repl.run` : value
    })

    const logo: string = await question({
      message: 'Logo image URL or path (use empty value to skip):',
      validate: (value: string) => {
        if (value === '') return true
        if (!isWebUrl(value) && !existingFiles(value).length) return 'Value informed not is URL/Path'
        return true
      }
    })

    const images: Types.Images = {
      logo,
      screenshots: []
    }

    while (1) {
      const screenshot: string = await question({
        message: 'GIF/image URL or path for screenshots (use empty value to skip):',
        validate: (value: string) => {
          if (value === '') return true
          if (!isWebUrl(value) && !existingFiles(value).length) return 'Value informed not is URL/Path'
          return true
        }
      })

      if (!screenshot) break
    }

    const about: string = await question({
      type: 'editor',
      message: 'Write about project (use empty value to skip):'
    })

    const technologies: string[] = []

    while (true) {
      const tech = await question({
        message: 'List project technologies (use empty value to skip):'
      })

      if (!tech) break

      technologies.push(tech)
    }

    const author = {
      exists: false,
      github: '',
      twitter: '',
      website: '',
      linkedin: ''
    }

    author.github = await question({
      message: `You GitHub username ${!githubRepository.author ? '(use empty value to skip)' : ''}:`,
      defaultValue: githubRepository?.author
    })

    author.twitter = await question({
      message: 'You twitter username (use empty value to skip):',
      validate: (value: string) => {
        if (value !== '') badgeChoices.push('Author Twitter')
        return true
      }
    })

    author.linkedin = await question({
      message: 'You LinkedIn username (use empty value to skip):'
    })

    author.website = await question({
      message: 'You website (use empty value to skip):',
      validate: (value: string) => {
        if (value !== '' && !isWebUrl(value)) return 'Invalid URL'
        return true
      }
    })

    if (packageJson.author || author.website || author.twitter || author.github || author.linkedin) author.exists = true

    const useBadges: string[] = await question({
      type: 'checkbox',
      message: 'Select badges for use:\n ',
      choices: badgeChoices,
      customReturn: (value: string[]) =>
        value.map((badge) => badge.toLowerCase().replace(/\s/g, ''))
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
        packageJson,
        images,
        description,
        about,
        technologies,
        author
      }
    })

    message('success', '\nGenerated README.md file with success in current dir!\n')
  }
}

export default command
