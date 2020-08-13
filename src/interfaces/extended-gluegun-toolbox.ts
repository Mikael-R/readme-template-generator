import { IHelperExtendedGluegunToolbox } from '@lenne.tech/cli-plugin-helper/src'

import { IsWebURL } from 'src/extensions/isWebURL'
import { ExistingFiles } from 'src/extensions/existingFiles'
import { GenerateFile } from 'src/extensions/generateFile'
import { ItemURL } from 'src/extensions/itemURL'
import { Message } from 'src/extensions/message'
import { Question } from 'src/extensions/question'
import { ShowBanner } from 'src/extensions/showBanner'
import { GithubRepoInfo } from 'src/extensions/githubRepoInfo'

export default interface ExtendedGluegunToolbox extends IHelperExtendedGluegunToolbox {
  existingFiles: ExistingFiles,
  generateFile: GenerateFile,
  itemURL: ItemURL,
  isWebURL: IsWebURL,
  message: Message,
  question: Question,
  showBanner: ShowBanner,
  githubRepoInfo: GithubRepoInfo
}
