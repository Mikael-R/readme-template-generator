import { GluegunCommand } from 'gluegun'

import ExtendedGluegunToolbox from 'src/interfaces/extended-gluegun-toolbox'
import * as Types from 'src/types'

const command: GluegunCommand = {
  name: 'readme-template-generator',
  async run (toolbox: ExtendedGluegunToolbox) {
    const {
      existingFiles,
      itemURL,
      question,
      generateFile,
      isWebURL,
      showBanner,
      githubRepoInfo,
      filesystem: { read },
      print
    } = toolbox

    showBanner({ text: 'Readme|Template Generator' })

    print.warning(
      'Project under development, this is a beta version!\n' +
      'Contribute: https://github.com/Mikael-R/readme-template-generator\n'
    )

    if (existingFiles('README.md').indexOf('README.md') !== -1) {
      const overwrite: boolean = await question({
        type: 'list',
        message: '📢 Already exists a README.md file, overwrite it?',
        choices: ['Yes', 'No'],
        customReturn: (value: string) => value === 'Yes'
      })

      if (!overwrite) process.exit(0)
    }

    const packageJson = JSON.parse(read('package.json') || '{}')

    const githubRepoURL: string = await question({
      message: '🎥 Repository URL in GitHub (recommend not skip):',
      defaultValue: githubRepoInfo.url.format(githubRepoInfo.url.inCWD()) || githubRepoInfo.url.format(packageJson.repository?.url),
      validate: (value: string) => {
        if (value === '' || githubRepoInfo.url.test(`https://github.com/${value}`)) return true
        return 'Invalid GitHub repository URL'
      },
      customReturn: (value: string) => {
        if (githubRepoInfo.url.test(value) || value === '') return value
        return githubRepoInfo.url.format(`https://github.com/${value}`)
      }
    })

    const spinner = githubRepoURL && print.spin('Getting information about repository')

    const githubRepository = await githubRepoInfo.information(itemURL(githubRepoURL, 2), itemURL(githubRepoURL, 1))

    if (githubRepository.api.index) {
      spinner?.succeed('Found with success repository information in GitHub API')
    } else if (!await githubRepoInfo.testConnection()) {
      spinner?.warn('Not found repository because wi-fi connection')
    } else {
      spinner?.fail('Repository not found in GitHub API')
    }

    const badges: Types.Badges = {
      toSelect: [],
      selected: [],
      exists: (badgeName) => badges.selected.indexOf(badgeName) !== -1
    }

    const projectName: string = await question({
      message: '👋 Project name:',
      defaultValue: githubRepository.name || itemURL(packageJson.repository?.url, 1)?.split('.')[0] || packageJson?.name || itemURL('.', 1)
    })

    const status: 'development' | 'production' | 'finished' | 'skip' = await question({
      type: 'list',
      message: '🚧 Project status:',
      choices: ['Development', 'Production', 'Finished', 'Skip'],
      customReturn: (value: string) => value.toLowerCase()
    })

    const description: string = await question({
      message: '📝 Write a short description about project:',
      defaultValue: githubRepository.api.index?.description || packageJson.description,
      validate: (value: string) => value === '' ? 'Description its necessary' : true
    })

    if (githubRepository.url) {
      badges.toSelect.push(
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
      badges.toSelect.push('NPM Version', 'NPM Monthly Downloads')
    }

    const herokuUrl: string = await question({
      message: '🔗 Heroku URL (use empty value to skip):',
      validate: (value: string) => {
        if (value === '' || isWebURL(value)) {
          badges.toSelect.push('Heroku')
          return true
        }
        return 'Invalid URL'
      },
      customReturn: (value: string) => value !== '' ? `https://${value}` : value
    })

    const replitUrl: string = await question({
      message: '🔗 Repl.it URL (use empty value to skip):',
      validate: (value: string) => {
        if (value === '' || isWebURL(value)) {
          badges.toSelect.push('Repl.it')
          return true
        }
        return 'Invalid URL'
      },
      customReturn: (value: string) => value !== '' ? `https://${value}.repl.run` : value
    })

    const logo: string = await question({
      message: '🎴 Logo image URL or path (use empty value to skip):',
      validate: (value: string) => {
        if (value === '' || isWebURL(value) || existingFiles(itemURL(value, 1), itemURL(value, 1)).length) return true
        return 'Value informed not is URL/Path valid'
      }
    })

    const images: Types.Images = {
      logo,
      screenshots: []
    }

    while (1) {
      const screenshot: string = await question({
        message: '🌈 GIF/image URL or path for screenshots (use empty value to skip):',
        validate: (value: string) => {
          if (value === '' || isWebURL(value) || existingFiles(value).length) return true
          return 'Value informed not is URL/Path valid'
        }
      })

      if (!screenshot) break
    }

    const about: string = await question({
      type: 'editor',
      message: '📃 Write about project (use empty value to skip):'
    })

    const howToUse: string = await question({
      type: 'editor',
      message: '🤔 Inform how to use project:',
      defaultValue: '#### 💻 Desktop\n\n\n\n#### 🌐 Online',
      validate: (value: string) => value === '' ? 'Information how to use its necessary' : true
    })

    const technologies: string[] = []

    while (true) {
      const tech: string = await question({
        message: '🚀 List project technologies (use empty value to skip):'
      })

      if (!tech) break

      technologies.push(tech)
    }

    const features: Types.Features = {
      finished: [],
      pendent: []
    }

    while (true) {
      const finished: string = await question({
        message: '🎇 List project features finished (use empty value to skip):'
      })

      if (!finished) break

      features.finished.push(finished)
    }

    while (true) {
      const pendent: string = await question({
        message: '🎆 List project features pendents (use empty value to skip):'
      })

      if (!pendent) break

      features.pendent.push(pendent)
    }

    const contribute: Types.Contribute = {
      tutor: {
        show: false
      },
      contributors: {
        users: [],
        show: false
      }
    }

    contribute.tutor.show = githubRepository.url && await question({
      type: 'list',
      message: '💡 Add tutor how to contribute for this project?',
      choices: ['Yes', 'No'],
      customReturn: (value: string) => value === 'Yes'
    })

    contribute.contributors.users = githubRepository.api.contributors?.filter(contributor => contributor.type === 'User').sort((a, b) => b.contributions - a.contributions) || []

    contribute.contributors.show = contribute.contributors.users.length && await question({
      type: 'list',
      message: '🤗 Add contributors profile?',
      choices: ['Yes', 'No'],
      customReturn: (value: string) => value === 'Yes'
    })

    const author: Types.Author = {
      exists: false,
      name: packageJson.author,
      github: githubRepository.author,
      twitter: '',
      website: '',
      linkedin: ''
    }

    author.name = await question({
      message: `🤓 Author full name${!author.name ? ' (use empty value to skip)' : ''}:`,
      defaultValue: author.name
    })

    author.github = await question({
      message: `👤 Author GitHub username${!author.github ? ' (use empty value to skip)' : ''}:`,
      defaultValue: author.github
    })

    author.twitter = await question({
      message: '👤 Author twitter username (use empty value to skip):',
      validate: (value: string) => {
        if (value !== '') badges.toSelect.push('Author Twitter')
        return true
      }
    })

    author.linkedin = await question({
      message: '👤 Author LinkedIn username (use empty value to skip):'
    })

    author.website = await question({
      message: '👤 Author website (use empty value to skip):',
      validate: (value: string) => {
        if (value === '' || isWebURL(value)) return true
        return 'Invalid URL'
      }
    })

    if (author.name || author.website || author.twitter || author.github || author.linkedin) author.exists = true

    badges.selected = await question({
      type: 'checkbox',
      message: '📛 Select badges for use:',
      choices: badges.toSelect,
      customReturn: (value: string[]) => // convert to lowercase and remove spaces
        value.map((badge) => badge.toLowerCase().replace(/\s/g, ''))
    })

    const license: Types.License = {
      name: githubRepository.api.index?.license.name || read('LICENSE')?.split('\n')[0]?.trim() ||
      packageJson.license,
      url: githubRepository.api.index?.license.url || (githubRepository.url && read('LICENSE') && `${githubRepository.url}/blob/master/LICENSE`)
    }

    license.name = await question({
      message: `🔏 Project license name${!license.name ? ' (use empty value to skip)' : ''}:`,
      defaultValue: license.name
    })

    license.url = await question({
      message: `🔏 Project license URL${!license.name ? ' (use empty value to skip)' : ''}:`,
      defaultValue: license.url,
      validate: (value: string) =>
        license.name && value === '' ? `License URL for ${license.name}` : true
    })

    generateFile({
      template: 'README.md.ejs',
      target: 'README.md',
      props: {
        projectName,
        badges,
        githubRepository,
        herokuUrl,
        replitUrl,
        packageJson,
        status,
        images,
        description,
        about,
        howToUse,
        technologies,
        features,
        contribute,
        author,
        license
      }
    })

    print.success('\nGenerated README.md file with success in current dir!\n')
  }
}

export default command
