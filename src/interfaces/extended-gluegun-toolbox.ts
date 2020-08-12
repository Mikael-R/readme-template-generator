import { IHelperExtendedGluegunToolbox } from '@lenne.tech/cli-plugin-helper/src'

import { IsWebUrl } from 'src/extensions/isWebUrl'
import { ExistingFiles } from 'src/extensions/existingFiles'
import { GenerateFile } from 'src/extensions/generateFile'
import { GetUrlItem } from 'src/extensions/getUrlItem'
import { Message } from 'src/extensions/message'
import { Question } from 'src/extensions/question'
import { ShowBanner } from 'src/extensions/showBanner'
import { GithubRepository } from 'src/extensions/githubRepository'

export default interface ExtendedGluegunToolbox extends IHelperExtendedGluegunToolbox {
  existingFiles: ExistingFiles,
  generateFile: GenerateFile,
  getUrlItem: GetUrlItem,
  isWebUrl: IsWebUrl,
  message: Message,
  question: Question,
  showBanner: ShowBanner,
  githubRepository: GithubRepository
}
