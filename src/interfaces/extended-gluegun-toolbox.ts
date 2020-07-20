/* eslint-disable no-unused-vars */
import { IHelperExtendedGluegunToolbox } from '@lenne.tech/cli-plugin-helper/src'

import { IsWebUrl } from '../extensions/isWebUrl'
import { ExistingFiles } from '../extensions/existingFiles'
import { GenerateFile } from 'src/extensions/generateFile'
import { GetGithubRepoInfo } from 'src/extensions/getGithubRepoInfo'
import { GetUrlItem } from 'src/extensions/getUrlItem'
import { Message } from 'src/extensions/message'
import { Question } from 'src/extensions/question'
import { ReadJsonFile } from 'src/extensions/readJsonFile'
import { ShowBanner } from '../extensions/showBanner'

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
