import ExtendedGluegunToolbox from 'src/interfaces/extended-gluegun-toolbox'

import axios from 'axios'

type Info = {
  name: string,
  author: string,
  api: {
    index: any,
    contributors: any
  }
}

export type GithubRepository = {
  url: {
    format: (url: string) => string,
    test: (url: string) => boolean,
    inCWD: () => string | null
  },
  information: (url: string) => Promise<Info>
}

export default (toolbox: ExtendedGluegunToolbox) => {
  const {
    getUrlItem,
    filesystem: { read, resolve }
  } = toolbox

  const pattern = /(https|http):\/\/github\.com\/([A-z0-9]|((?<!\/)-(?!(-|\/))))+\/(\w|-|\.)+/gm

  const githubRepository: GithubRepository = {
    url: {
      format: (url) => {
        let lastGitInvalidWord = false

        const formattedURL = url
          .split('.')
          .reverse()
          .filter(group => {
            if (group.toLowerCase() === 'git') return lastGitInvalidWord
            lastGitInvalidWord = true
            return true
          })
          .reverse()
          .join('.')

        return formattedURL
      },
      test: (url) => !!url?.match(pattern)?.length,
      inCWD: () => {
        const dir = resolve('.git', 'logs', 'refs', 'remotes', 'origin', 'HEAD')
        const gitFile = read(dir)

        const url = pattern.test(gitFile) ? gitFile.match(pattern)[0] : null

        return url
      }
    },
    information: async (url) => {
      const info: Info = {
        name: null,
        author: null,
        api: {
          index: null,
          contributors: null
        }
      }

      if (!githubRepository.url.test(url)) return info

      info.name = getUrlItem(url, 1)
      info.author = getUrlItem(url, 2)

      const apiURL = `https://api.github.com/repos/${info.author}/${info.name}`

      info.api.index = await axios.get(apiURL)
        .then(resp => resp.data)
        .catch(error => error.response?.data)
      info.api.index = await axios.get(`${apiURL}/contributors`)
        .then(resp => resp.data)
        .catch(error => error.response?.data)

      return info
    }
  }

  toolbox.githubRepository = githubRepository
}
