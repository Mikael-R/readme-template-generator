import ExtendedGluegunToolbox from 'src/interfaces/extended-gluegun-toolbox'

type Info = {
  needUpdate: boolean,
  version: {
    now: string,
    latest: string
  }
}

export type NPMPackageInfo = () => Promise<Info>

export default (toolbox: ExtendedGluegunToolbox) => {
  const {
    filesystem: { read, resolve },
    http: { create }
  } = toolbox

  const NPMPackageInfo: NPMPackageInfo = async () => {
    const info: Info = {
      needUpdate: false,
      version: {
        now: '',
        latest: ''
      }
    }

    const api = create({
      baseURL: 'https://npmjs-package-info.herokuapp.com/api/v1'
    })

    const { ok, data } = await api.get('package/readme-template-generator')

    if (!ok) return info

    info.version.now = read(resolve(__dirname, '..', '..', 'package.json'), 'json')?.version
    info.version.latest = Object(data).lastVersion
    info.needUpdate = info.version.now < info.version.latest

    return info
  }

  toolbox.NPMPackageInfo = NPMPackageInfo
}
