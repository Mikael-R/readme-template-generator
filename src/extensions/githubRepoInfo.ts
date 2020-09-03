import ExtendedGluegunToolbox from 'src/interfaces/extended-gluegun-toolbox'

interface Info {
  haveConnection: boolean
  url: string
  name: string
  author: string
  api: {
    index: any
    contributors: any
  }
}

export interface GithubRepoInfo {
  url: {
    format: (url: string) => string
    test: (url: string) => boolean
    inCWD: () => string
  }
  information: (author: string, name: string) => Promise<Info>
}

export default (toolbox: ExtendedGluegunToolbox) => {
  const {
    filesystem: { read, resolve },
    http: { create },
  } = toolbox

  const pattern = /(https|http):\/\/github\.com\/([A-z0-9]|((?<!\/)-(?!(-|\/))))+\/(\w|-|\.)+/gm

  const api = create({
    baseURL: 'https://api.github.com',
    headers: { Accept: 'application/vnd.github.v4+json' },
  })

  const githubRepoInfo: GithubRepoInfo = {
    url: {
      format: url => {
        const lastGitInvalidWord = [false, false]

        const formattedURL = url
          ?.split('.')
          .reverse()
          .filter(group => {
            if (group.toLowerCase() === 'git') return lastGitInvalidWord[0]
            lastGitInvalidWord[0] = true
            return true
          })
          .reverse()
          .join('.')

          .split('+')
          .filter(group => {
            if (group.toLowerCase() === 'git') return lastGitInvalidWord[1]
            lastGitInvalidWord[1] = true
            return true
          })
          .join('+')

          .trim()

        return formattedURL
      },
      test: url => !!url?.match(pattern)?.length,
      inCWD: () => {
        const dir = resolve('.git', 'logs', 'refs', 'remotes', 'origin', 'HEAD')
        const gitFile = read(dir)

        const url = gitFile?.match(pattern)[0] || ''

        return url
      },
    },
    information: async (author, name) => {
      const info: Info = {
        haveConnection: false,
        url: null,
        name: null,
        author: null,
        api: {
          index: null,
          contributors: null,
        },
      }

      if (((await api.get('repos')) as any)?.data?.message)
        info.haveConnection = true

      if (!githubRepoInfo.url.test(`https://github.com/${author}/${name}`))
        return info

      info.url = `https://github.com/${author}/${name}`
      info.name = name
      info.author = author

      info.api.index = await (async () => {
        const { ok, data } = await api.get(`repos/${info.author}/${info.name}`)
        return ok ? data : null
      })()

      info.api.contributors = await (async () => {
        const { ok, data } = await api.get(
          `repos/${info.author}/${info.name}/contributors`
        )
        return ok ? data : null
      })()

      return info
    },
  }

  toolbox.githubRepoInfo = githubRepoInfo
}
