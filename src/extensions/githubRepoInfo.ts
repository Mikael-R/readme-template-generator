import ExtendedGluegunToolbox from 'src/interfaces/extended-gluegun-toolbox'

import axios from 'axios'

type Info = {
  url: string,
  name: string,
  author: string,
  api: {
    index: any,
    contributors: any
  }
}

export type GithubRepoInfo = {
  url: {
    format: (url: string) => string,
    test: (url: string) => boolean,
    inCWD: () => string
  },
  information: (author: string, name: string) => Promise<Info>
}

export default (toolbox: ExtendedGluegunToolbox) => {
  const {
    filesystem: { read, resolve }
  } = toolbox

  const pattern = /(https|http):\/\/github\.com\/([A-z0-9]|((?<!\/)-(?!(-|\/))))+\/(\w|-|\.)+/gm

  const githubRepoInfo: GithubRepoInfo = {
    url: {
      format: (url) => {
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
      test: (url) => !!url?.match(pattern)?.length,
      inCWD: () => {
        const dir = resolve('.git', 'logs', 'refs', 'remotes', 'origin', 'HEAD')
        const gitFile = read(dir)

        const url = gitFile?.match(pattern)[0] || ''

        return url
      }
    },
    information: async (author, name) => {
      const info: Info = {
        url: `https://github.com/${author}/${name}`,
        name,
        author,
        api: {
          index: null,
          contributors: null
        }
      }

      if (!githubRepoInfo.url.test(info.url)) return info

      const apiURL = `https://api.github.com/repos/${info.author}/${info.name}`

      info.api.index = await axios.get(apiURL)
        .then(resp => resp.data)
        .catch(() => null)
        // .catch(error => error.response?.data)
      info.api.contributors = await axios.get(`${apiURL}/contributors`)
        .then(resp => resp.data)
        .catch(() => null)
        // .catch(error => error.response?.data)

      return info
    }
  }

  toolbox.githubRepoInfo = githubRepoInfo
}
