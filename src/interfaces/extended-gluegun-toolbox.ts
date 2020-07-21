import { IHelperExtendedGluegunToolbox } from '@lenne.tech/cli-plugin-helper/src'

import { IsWebUrl } from 'src/extensions/isWebUrl'
import { ExistingFiles } from 'src/extensions/existingFiles'
import { GenerateFile } from 'src/extensions/generateFile'
import { GetGithubRepoInfo } from 'src/extensions/getGithubRepoInfo'
import { GetUrlItem } from 'src/extensions/getUrlItem'
import { Message } from 'src/extensions/message'
import { Question } from 'src/extensions/question'
import { ReadJsonFile } from 'src/extensions/readJsonFile'
import { ShowBanner } from 'src/extensions/showBanner'

export default interface ExtendedGluegunToolbox extends IHelperExtendedGluegunToolbox {
  existingFiles: ExistingFiles,
  generateFile: GenerateFile,
  getGithubRepoInfo: GetGithubRepoInfo,
  getUrlItem: GetUrlItem,
  isWebUrl: IsWebUrl,
  message: Message,
  question: Question,
  readJsonFile: ReadJsonFile,
  showBanner: ShowBanner
}
